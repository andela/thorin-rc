/*eslint-disable */
import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

export const SideBarAnalytics = props => (
  <div>

    <ul className="nav nav-tabs">

      <li role="presentation" className="active">
        <a onClick={props.onClickOverview}  href="#tab1"  data-toggle="tab">
          <strong>OVERVIEW</strong>
        </a>
      </li>

      <li role="presentation" className="spaceout">
        <a onClick={props.onClickSales}  href="#tab2"  data-toggle="tab">
          <strong> SALES</strong>
        </a>
      </li>


      <li role="presentation" className="spaceout">
        <a onClick={props.onClickInventory} href="#tab3" data-toggle="tab">
          <strong>DATA AND INVENTORY</strong>
        </a>
      </li>

      <li role="presentation" className="spaceout">
        <a onClick={props.onClickProductSales} href="#tab4" data-toggle="tab">
          <strong>Daily Sales Result</strong>
        </a>
      </li>

    </ul>
  </div>
);

registerComponent("SideBarAnalytics", SideBarAnalytics);
export default SideBarAnalytics;
