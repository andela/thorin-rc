import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Template } from "meteor/templating";
import { formatPriceString } from "/client/api";
import { SideBarAnalytics } from "../containers/SidebarAnalytics";
import { InventoryAnalytics } from "../containers/InventoryAnalytics";
import { OverviewAnalytics } from "../containers/OverviewAnalytics";
import { SalesAnalytics } from "../containers/SalesAnalytics";
import { analyticsDetails } from "../helperFunctions/analyticsDetails";
import { averageSales } from "../helperFunctions/averageSales";
import { DateSelection } from "../containers/date";
import { DailySalesResult } from "../containers/dailySalesResult";

import _ from "lodash";
import "./analytics.html";
import "./../style/style.css";


class Analytics extends Component {
    state = {
      currentTab: "tab1",
      totalRevenue: 0,
      fromDate: new Date("2018-06-20"),
      toDate: new Date(),
      dateChange: false,
      productInventory: [],
      cancelOrder: 0,
      totalPurchase: 0,
      totalOrder: 0,
      totalDaySales: 0,
      analyticsResult: {},
      search: "",
      inventorySearch: ""
    }

    componentDidMount() {
      this.AnalyticsDetails(this.state.fromDate, this.state.toDate);
      this.getProductInventory();
      this.getCanceledOrders();
    }

    componentDidUpdate() {
      if (this.state.dateChange) {
        this.AnalyticsDetails(this.state.fromDate, this.state.toDate);
      }
    }

    getCanceledOrders =() => {
      Meteor.call("getCanceledOrders", (err, payload) => {
        if (!err) {
          this.setState({ cancelOrder: payload.length });
        }
      });
    }

    getProductInventory = () => {
      Meteor.call("productInventoryResult", (err, payload) => {
        if (!err) {
          this.setState({ productInventory: payload });
        }
      });
    }

    AnalyticsDetails = (fromDate, toDate) => {
      Meteor.call("ordersAnalytics", {
        fromDate: fromDate,
        toDate: toDate
      },
      (err, payLoad) => {
        if (err) {
          return err;
        }
        if (payLoad) {
          const analytics = analyticsDetails(payLoad, fromDate, toDate);
          this.setState({
            dateChange: false,
            ordersData: payLoad,
            totalOrder: payLoad.length,
            totalRevenue: analytics.totalSales,
            totalPurchase: analytics.totalItemsPurchased,
            totalShippingCost: analytics.totalShippingCost,
            analyticsResult: analytics.analytics,
            ordersAnalytics: analytics.ordersAnalytics,
            grossProfit: (analytics.totalSales - analytics.totalCostPrice)
          });
          this.setState({
            totalDaySales: averageSales(this.state.totalRevenue, fromDate, toDate)
          });
        }
      });
    }


    fromInputChange = (e) => {
      if (!_.isEmpty(e.target.value)) {
        this.setState({
          fromDate: Date.parse(e.target.value),
          dateChange: true
        });
      }
    }

    toInputChange = (e) => {
      if (!_.isEmpty(e.target.value)) {
        this.setState({
          toDate: Date.parse(e.target.value),
          dateChange: true
        });
      }
    }

    overview = () => {
      this.setState({
        currentTab: "tab1"
      });
    }

    sales = () => {
      this.setState({
        currentTab: "tab2"
      });
    }

    inventory = () => {
      this.setState({
        currentTab: "tab3"
      });
    }

    productSales = () => {
      this.setState({
        currentTab: "tab4"
      });
    }

    searchItemInput = (e) => {
      this.setState({ search: e.target.value });
    }

    inventorySearchHandle = (e) => {
      this.setState({ inventorySearch: e.target.value });
    }


    render() {
      return (
        <div>
          <SideBarAnalytics
            onClickOverview={this.overview}
            onClickSales={this.sales}
            onClickInventory={this.inventory}
            onClickProductSales={this.productSales}
          />

          <DateSelection
            inputChange1={this.fromInputChange}
            inputChange2={this.toInputChange}
          />

          <OverviewAnalytics
            currentTab={this.state.currentTab}
            totalRevenue={formatPriceString(this.state.totalRevenue)}
            cancelOrder={this.state.cancelOrder}
            totalPurchase={this.state.totalPurchase}
            totalOrder={this.state.totalOrder}
          />

          <SalesAnalytics
            currentTab={this.state.currentTab}
            analyticsData={this.state.analyticsResult}
            searchResult={this.state.search}
            searchItemInput={this.searchItemInput}
          />

          <InventoryAnalytics
            currentTab={this.state.currentTab}
            inventoryAnalyticsData={this.state.productInventory}
            inventorySearchHandle= {this.inventorySearchHandle}
            inventorySearch={this.state.inventorySearch}
          />

          <DailySalesResult
            currentTab={this.state.currentTab}
            totalDaySales={formatPriceString(this.state.totalDaySales)}

          />
        </div>
      );
    }
}


export default Analytics;


Template.analytics.helpers({
  analytics() {
    return {
      component: Analytics
    };
  }
});

