import React, { Component } from "react";

import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";

export default class Pagination extends Component {
  render() {
    const { data: meta, style, onPagination } = this.props;
    const styleDefault = style;

    const web = this.props.displayMode === "web";
    const nextPage = meta.hasNextPage;
    const prevPage = meta.hasPreviousPage;
    const PageNumber = meta.pageNumber;
    const totalPages = meta?.totalPages;
    return (
      <div>
        <div className={styleDefault["pagination"]}>
          <div className={styleDefault["paging"]}>
            {prevPage && (
              <div
                className={styleDefault["next-page"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber - 1)
                }
              >
                <KeyboardArrowLeft className="arrow-icon" />
              </div>
            )}
            {web && PageNumber - 3 > 0 && (
              <div
                className={styleDefault["page-inactive"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber - 3)
                }
              >
                {PageNumber - 3}
              </div>
            )}
            {web && PageNumber - 2 > 0 && (
              <div
                className={styleDefault["page-inactive"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber - 2)
                }
              >
                {PageNumber - 2}
              </div>
            )}
            {PageNumber - 1 > 0 && (
              <div
                className={styleDefault["page-inactive"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber - 1)
                }
              >
                {PageNumber - 1}
              </div>
            )}
            <div
              className={styleDefault["page-active"]}
              onClick={() => onPagination("PageNumber", PageNumber)}
            >
              {PageNumber}
            </div>
            {PageNumber + 1 <= totalPages && (
              <div
                className={styleDefault["page-inactive"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber + 1)
                }
              >
                {PageNumber + 1}
              </div>
            )}
            {web && PageNumber + 2 < totalPages && (
              <div
                className={styleDefault["page-inactive"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber + 2)
                }
              >
                {PageNumber + 2}
              </div>
            )}
            {web && PageNumber + 3 < totalPages && (
              <div
                className={styleDefault["page-inactive"]}
                onClick={() =>
                  onPagination("PageNumber", PageNumber + 3)
                }
              >
                {PageNumber + 3}
              </div>
            )}
            {nextPage && (
              <div
                className={styleDefault["next-page"]}
                onClick={() =>
                    onPagination("PageNumber", PageNumber + 1)
                }
              >
                <KeyboardArrowRight className="arrow-icon" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
