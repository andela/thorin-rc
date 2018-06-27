import React from "react";
import _ from "lodash";
import { formatPriceString } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";

export const SalesAnalytics = (props) => {
  const { analyticsData, searchResult, searchItemInput, currentTab } = props;

  let available = false;

  const searchSales = new RegExp(searchResult.toLowerCase());

  const payLoad = _.map(analyticsData, (analytics, key) => {
    if (key.toLowerCase().match(searchSales) && !_.isEmpty(searchResult) || _.isEmpty(searchResult)) {
      available = true;
      return (
        <tbody key={key}>
          <tr>
            <th scope="row" />
            <td>{analytics.title}</td>
            <td>{analytics.quantitySold}</td>
            <td>{formatPriceString(analytics.totalSales)}</td>
            <td>{analytics.customerCount}</td>
            <td>{analytics.firstSale}</td>
            <td>{analytics.lastSale}</td>
          </tr>
        </tbody>
      );
    } else if (!key.toLowerCase().match(searchSales) && _.isEmpty(searchResult)
    ) {
      available = false;
    }
  });

  return (
    <div id="tab2"  className="container" style={{ display: currentTab === "tab2" ? "block" : "none" }} >
      <h2>Sales Report</h2>


      <div style={{ width: "30%" }}>
        <div>
          <div className="form-group">
            <div className="input-group date">
              <span className="input-group-addon theme-color" >
                <span> <strong> SEARCH </strong> </span>
              </span>

              <input
                id="salesReport"
                type="search"
                placeholder="search with product name"
                onChange={searchItemInput}
                name="search"
                value={searchResult}
                className="form-control"
              />
              <span className="input-group-addon theme-color" >
                <span className="fa fa-search" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>


      <div className="bs-example" data-example-id="panel-without-body-with-table">
        <div className="panel panel-default" style={{ background: "#E3E3E3" }}>
          <div className=" scrollbar-primary">
            <table className="table">
              <thead>
                <tr>
                  <th/>
                  <th>Product Name</th>
                  <th>Quantity Sold</th>
                  <th>Total Sales</th>
                  <th>Customer Count</th>
                  <th>First Sale</th>
                  <th>Last Sale</th>
                </tr>
              </thead>
              {available && payLoad}
            </table>
          </div>
          {!available && <h2 style={{ textAlign: "center",     color: "red" }}>Product does not Exist </h2>}
        </div>
      </div>
    </div>
  );
};

registerComponent("SalesAnalytics", SalesAnalytics);

export default SalesAnalytics;
