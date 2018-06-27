
import React, { Component } from "react";
import { Template } from "meteor/templating";
import "./adminWalletDashboard.html";
import "../../style/style.css";

class AdminWalletDashboard extends Component {
  render() {
    return (
      <div>
        <h5>Enable Wallet </h5>
      </div>
    );
  }
}


export default AdminWalletDashboard;

Template.walletCheckout.helpers({
  adminWalletDashboard() {
    return {
      component: AdminWalletDashboard
    };
  }
});
