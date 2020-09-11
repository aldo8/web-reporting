import React, { Component } from "react";
import DropdownComponent from "components/DropdownComponent/DropdownComponent";
import SearchInput from "components/SearchInput/SearchInput";
import CSkeleton from "components/CSkeleton/CSkeleton";
import { isBoolean } from 'lodash';

export default class FilterAndSearch extends Component {

  _handleSearch = (event) => {
    this.props.onSearch(event)
  }

  render() {
    const {
      style,
      data,
      isLoading,
      onFilterSelection,
      onSearch,
      onReset,
    } = this.props;

    const styles = style;
    const isDataBool = isBoolean(data);

    return (
      <div className={styles["filters-container"]}>
        <div className={styles["dropdowns-container"]}>
          {!isDataBool && data.map((data, index) => {
            return (
              <div className={styles["dropdown-container"]} key={index}>
                <DropdownComponent
                  selected={data.defaultValue}
                  data={data.data}
                  onSelectAction={(param) => onFilterSelection(param, data.key)}
                />
              </div>
            );
          })}

          <div className={styles["search-container"]} style={isDataBool ? { marginLeft: 0 } : {} }>
            <CSkeleton isLoading={isLoading} variant="rect">
              <SearchInput displaySearch={this.props.displaySearch} onSearch={onSearch} />
            </CSkeleton>
            <button className={styles["button-reset"]} onClick={onReset}>
              reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
