import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import {
  Delete,
  Edit,
  ArrowUpward,
  ArrowDownward,
} from "@material-ui/icons";
import { isUndefined, isArray, isNull, isEqual } from "lodash";
import CSkeleton from "components/CSkeleton/CSkeleton"
import { IconButton, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import styleDefault from "./TableCustome.module.scss";
import Pagination from "./components/Pagination";
import PageSize from "./components/PageSize";
import Filtering from "./components/Filtering";

export default class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      ascendingState: true,
      soryName: null,
    };
  }

  componentDidMount = () => {};

  UNSAFE_componentWillReceiveProps = () => {};

  _getDataRow = (dataTable, { data, date, expand, transform, specialHtml }) => {
    const rulesIndex = data.split(".");
    let temp = dataTable;
    let indexArray;
    for (const rule in rulesIndex) {
      if (indexArray > -1) {
        let tempArray = [];
        for (const dataIndex in temp) {
          tempArray.push(`${temp[dataIndex][rulesIndex[rule]]}`);
        }

        temp = [...new Set(tempArray)];
      } else {
        temp = temp[rulesIndex[rule]];
      }

      if (isArray(temp)) {
        indexArray = rule;
        continue;
      }
    }

    if (!isUndefined(transform)) {
      temp = transform[temp];
    }

    if (!isUndefined(date)) {
      temp = moment(temp).format(`${date}`);
      if (temp === "Invalid date") temp = "-";
    }

    if (isNull(temp) || isUndefined(temp) || isEqual(temp, "")) {
      temp = "-";
    }

    return (
      <td
        key={data}
      >
        <div>
          {typeof temp === Array ? temp.toString() : temp }
        </div>
      </td>
    );
  };

  _renderHeaderNumColumns = (index) => {
    const { numColumns } = this.props;

    if (numColumns) {
      return <th className={styleDefault["td-tr-column-number"]}>No</th>;
    }
  };

  _renderBodyNumColumns = (number) => {
    const { numColumns, isLoading } = this.props;
    if (numColumns)
      return (
        <td className={styleDefault["td-tr-column-number"]}>
          <CSkeleton variant="rect" isLoading={isLoading}>
            <p>{number + 1}</p>
          </CSkeleton>
        </td>
      );
  };

  _renderSelectedBox = (data) => {
    const { selected, onSelected, isLoading, onChecked } = this.props;

    if (selected)
      return (
        <td className={styleDefault["td-tr-column-number"]}>
          <CSkeleton isLoading={isLoading} variant="rect">
            <Checkbox
              checked={onChecked && onChecked(data)}
              style={{
                color: "black",
                padding: "0px",
                width: "20px",
                heigh: "20px",
              }}
              onChange={() => onSelected(data)}
            />
          </CSkeleton>
        </td>
      );
  };

  _renderHeaderSelected = () => {
    const { selected } = this.props;

    if (selected) return <th className={styleDefault["td-tr-column-number"]} />;
  };

  _renderButtonDetail = (data) => {
    const { onDetail } = this.props;

    if (onDetail)
      return (
        <td classes={{ ...this.props.tableCellClasses }}>
          <Link />
          <IconButton style={{ padding: 0}} component="span" onClick={() => onDetail(data)}>
            <Edit />
          </IconButton>
        </td>
      );
  };
  _renderIconDownload = (data) => {
    return this.props.isLoading ? (
      <td>
        <CSkeleton isLoading={true} variant="rect" />
      </td>
    ) : (
      this.props.downloadPcar(data)
    );
  };
  _renderButtonDelete = (data) => {
    const { onDelete } = this.props;

    if (onDelete)
      return (
        <td classes={{ ...this.props.tableCellClasses }}>
          <IconButton component="span" onClick={() => onDelete(data)}>
            <Delete />
          </IconButton>
        </td>
      );
  };

  _renderSkeleton = (data, index) => {
    const { isLoading } = this.props;

    return (
      <td
        key={index}
        style={{
          padding: "0px 10px",
          borderRadius: "6px",
        }}
      >
        <CSkeleton variant="rect" isLoading={isLoading} />
      </td>
    );
  };

  _informationDataNull = () => {
    const { isLoading, data } = this.props;

    if (isUndefined(data?.data) || data?.data.length === 0) {
      if (!isLoading) {
        return <h5 style={{ textAlign: "center" }}>No Data</h5>;
      }
    }
  };

  _featureBottomTable = () => {
    const { data, pagination, onPagination, onPageSize } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {pagination && data?.meta && (
          <>
            <PageSize
              data={data?.meta}
              style={styleDefault}
              onPageSize={onPageSize}
            />
            <Pagination
              style={styleDefault}
              onPagination={onPagination}
              data={data?.meta}
            />
          </>
        )}
      </div>
    );
    // }
  };
  _renderDownloadIcon = () => {
    return (
      <>
        <th colSpan="3">Details</th>
      </>
    );
  };
  _renderBodyTable = () => {
    const {
      rules,
      data,
      isLoadingCount,
      isLoading,
      styleRowBody,
      onClick,
      isReport,
    } = this.props;

    let component;

    if (isUndefined(data?.data) || isLoading) {
      if (isLoading) {
        component = [...Array(isLoadingCount).keys()].map((d, i) => {
          return (
            <tr key={i}>
              {this._renderSelectedBox(d)}
              {this._renderBodyNumColumns(i)}
              {rules.map(this._renderSkeleton)}
              {this._renderButtonDelete(d)}
              {this._renderButtonDetail(d)}
              {isReport && this._renderIconDownload(d)}
            </tr>
          );
        });
      } else {
        component = null;
      }
    } else {
      component = data?.data.map((d, index) => (
        <tr
          onClick={() => {
            onClick && onClick(d);
          }}
          className={styleRowBody}
          key={index}
        >
          {this._renderSelectedBox(d)}
          {this._renderBodyNumColumns(index)}
          {rules.map(this._getDataRow.bind(null, d))}
          {this._renderButtonDelete(d)}
          {this._renderButtonDetail(d)}
          {isReport && this._renderIconDownload(d)}
        </tr>
      ));
    }

    return <tbody>{component}</tbody>;
  };

  render() {
    const {
      rules,
      isLoading,
      filters,
      onFilterSelection,
      onSearch,
      styleTable,
      onReset,
      displaySearch,
      isReport,
      onSort,
    } = this.props;
    return (
      <div>
        {filters && (
          <Filtering
            displaySearch={displaySearch}
            onReset={onReset}
            onSearch={onSearch}
            data={filters}
            isLoading={isLoading}
            onFilterSelection={onFilterSelection}
            style={styleDefault}
          />
        )}
        <table className={styleTable}>
          <thead>
            <tr>
              {this._renderHeaderSelected()}
              {this._renderHeaderNumColumns()}
              {rules.map((dataHead, index) => {
                
                let icon;
                if(dataHead.sortBy && !isNull(this.state.sortName)) {
                  if(dataHead.data === this.state.sortName) {
                    icon = true
                  }
                  else{
                    icon = false
                  }
                }
                return (
                  <th key={index} onClick={() => onSort(dataHead.data, (asc, data) => {
                    this.setState({ ascendingState: asc, sortName: data })
                  })}>
                    { dataHead.name}{" "}
                    {icon ?  this.state.ascendingState ? <ArrowDownward /> : <ArrowUpward /> : null}
                  </th>
                )
              })}
              {isReport && this._renderDownloadIcon()}
            </tr>
          </thead>
          {this._renderBodyTable()}
        </table>
        {this._informationDataNull()}
        {this._featureBottomTable()}
      </div>
    );
  }
}

CustomTable.propTypes = {
  /**
   * {DATA} to get data for dataTable * required set data { meta: {}, data: [] }
   */
  data: PropTypes.object.isRequired,

  /**
   * {RULES} to set Data for data table * required set data [{ name: '', data: '' }]
   * name = for table head,
   * data = data object from {DATA} per Column
   *
   * {optional}
   *  transform = for transform {DATA} to be new value *example status = 3 -> status = created * set data { "3": "created" }
   *  date = flexible  format "DD MMMM YYYY", set {DATA} date to be date UTC
   */
  rules: PropTypes.array.isRequired,

  /**
   * {numColumns} to include number column in table
   */
  numColumns: PropTypes.bool,

  /**
   * {downloadPcar} for download to enable download icon
   */
  downloadPcar: PropTypes.bool,

  isReport: PropTypes.bool,
  /**
   * {isloading} for loading to enable skeleton loading in table
   */
  isLoading: PropTypes.bool,

  /**
   * {handle function for searching feature}
   */
  onSearch: PropTypes.func,

  /**
   * {filters} to enable filters include search, set data [{ defaultValue: '', key: "", data: [] }]
   */
  filters: PropTypes.array,

  /**
   * {onFilterSelection} to handle filter selection callback key and defaultValue from {FILTERS}
   */

  onFilterSelection: PropTypes.func,

  /**
   * {pagination} enable pagination component
   */
  pagination: PropTypes.bool,

  /**
   * {onPAgination} handle function for onPagination
   */
  onPagination: PropTypes.func,

  /**
   * {onPageSize} enable component and handle callback function
   */
  onPageSize: PropTypes.func,

  /**
   * {styleRowBody} for give style on Tbody > tr
   */
  styleRowBody: PropTypes.any,

  /**
   * {styleTable} for give style on Table, required scss module
   * example
   *
   * pages
   * import styles from '.styles.module.scss'
   *
   * <TableCustom styleTable={styles['your classss']}/>
   */

  styleTable: PropTypes.any,
};

CustomTable.defaultProps = {
  headerStyles: {
    fontFamily: "Lato-Bold",
    fontSize: "15px",
    color: "black",
    textTransform: "capitalize",
  },
};
