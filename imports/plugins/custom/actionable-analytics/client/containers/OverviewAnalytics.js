import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
export const OverviewAnalytics = (props) => {
  return (
    <div id="tab1"  className="container" style={{ display: props.currentTab === "tab1" ? "block" : "none" }} >
      <h2>Overview</h2>

      <div style={{ display: "flex" }}>
        <div className="row">
          <div className="col-sm-3 col-md-12">
            <div className="but">
              <div className="caption">
                <h3>Total Revenue: {props.totalRevenue}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row free">
          <div className="col-sm-3 col-md-12">
            <div className="but">
              <div className="caption">
                <h3>Total Cancel: {props.cancelOrder}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row free">
          <div className="col-sm-3 col-md-12">
            <div className="but">
              <div className="caption">
                <h3>Total Purchase: {props.totalPurchase}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row free">
          <div className="col-sm-3 col-md-12">
            <div className="but">
              <div className="caption">
                <h3>Total Order: {props.totalOrder}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      <date/>
    </div>
  );
};

registerComponent("OverviewAnalytics", OverviewAnalytics);

export default OverviewAnalytics;
