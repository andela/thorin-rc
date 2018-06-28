/*eslint-disable */
import React from "react";
import { formatPriceString } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";

export const InventoryAnalytics = (props) => {
  const { inventoryAnalyticsData, inventorySearchHandle, inventorySearch, currentTab } = props;

  const searchArr = [];
  let notFound = false;

  const dateFormat = (arg) => {
    const dateString = new Date(arg).toUTCString().split(" ").slice(0, 4).join(" ");
    return dateString;
  };

  const inventoryAnalytic = new RegExp(inventorySearch.toLowerCase());

  inventoryAnalyticsData.map(item => {
    if (inventoryAnalytic.test(item.title.toLowerCase())) {
      searchArr.push(item);
    }
  });

  if (searchArr.length === 0) {
    notFound = true;
  }


  const payLoad = searchArr.map(analytics => {
    return (
      <tbody key={analytics._id}>
        <tr>
          <th scope="row" />
          <td>{analytics.title}</td>
          <td>{formatPriceString(analytics.price)}</td>
          <td >{analytics.width}</td>
          <td>{analytics.inventoryQuantity}</td>
          <td>{analytics.height}</td>
          <td>{analytics.weight}</td>
          <td>{analytics.length}</td>
          <td>{analytics.originCountry}</td>
          <td>{analytics.lowInventoryWarningThreshold}</td>
          <td>{dateFormat(analytics.createdAt)}</td>
          <td>{dateFormat(analytics.updatedAt)}</td>
        </tr>
      </tbody>
    );
  });


  return (
    <div id="tab3" className="container" style={{ display: currentTab === "tab3" ? "block" : "none" }} >
      <h2>Inventory Report</h2>

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
                onChange={inventorySearchHandle}
                name="search"
                value={inventorySearch}
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
                  <th>Price</th>
                  <th>Width</th>
                  <th>Quantity</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Length</th>
                  <th>Country of Origin</th>
                  <th>Low Inventory warning</th>
                  <th>created Date</th>
                  <th>Updated Date</th>
                </tr>
              </thead>
              {!notFound && payLoad}
            </table>
          </div>
          {notFound && <h2 style={{ textAlign: "center", color: "red" }}>Product does not Exist </h2>}
        </div>
      </div>

    </div>
  );
};

registerComponent("InventoryAnalytics", InventoryAnalytics);

export default InventoryAnalytics;
