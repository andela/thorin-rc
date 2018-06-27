import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
export const DailySalesResult = (props) => {
  return (
    <div id="tab4"  className="container" style={{ display: props.currentTab === "tab4" ? "block" : "none" }} >
      <h2>Overview</h2>

      <div style={{ display: "flex" }}>
        <div className="row free">
          <div className="col-sm-3 col-md-12">
            <div className="but">
              <div className="caption">
                <h1>Total Sales: {props.totalDaySales}</h1>
              </div>
            </div>
          </div>
        </div>

      </div>
      <date/>
    </div>
  );
};

registerComponent("DailySalesResult", DailySalesResult);

export default DailySalesResult;
