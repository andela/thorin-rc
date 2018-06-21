import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Template } from "meteor/templating";
import "./walletlayout.html";
import "./../style/style.css";
import "./paystackFundWallet";
import { paystackFundWallet } from "./paystackFundWallet";

class WalletDashboard extends Component {
  state = {
    amount: "",
    trasnferAmount: "",
    walletId: "",
    user: Meteor.user(),
    balance: "",
    id: "",
    transferWalletId: "",
    transactionDisplay: [],
    disable: false
  };

  componentDidMount() {
    this.getWalletDetails();
    this.getTransactionDetails();
  }

  getWalletDetails = () => {
    Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
      this.setState({
        balance: payload.balance,
        walletId: payload.walletId,
        id: payload._id,
        transferWalletId: ""
      });
    });
  }

  getTransactionDetails = () => {
    const userId = Meteor.user()._id;
    Meteor.call("transaction/get", userId, (err, payload) => {
      if (!err) {
        this.setState({ transactionDisplay: payload });
      }
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitFund = (e) => {
    e.preventDefault();
    if (this.state.amount === "") {
      Alerts.toast("Add an amount", "error");
    } else if (this.state.amount < 100) {
      Alerts.toast("That is not a vaild amount", "error");
    } else {
      this.setState({
        disable: true
      });
      const total = Number(this.state.amount) + this.state.balance;
      const balance = Math.floor(total.toFixed(2));
      paystackFundWallet(Number(this.state.amount) * 100)
        .then(() => {
          Meteor.call("wallet/updateAmount", this.state.id, balance);
          const transactionType = "Fund Wallet";
          const userId = Meteor.user()._id;
          const walletId = this.state.walletId;
          this.transaction(userId, parseInt(this.state.amount, 10), walletId, transactionType);
          this.setState({
            balance: balance,
            amount: ""
          });
          Alerts.toast("Wallet Funded", "success");
          const NotifcationId = Meteor.user()._id;
          const type = "fund";
          this.notifcation(NotifcationId, type);
          this.setState({
            disable: false
          });
        });
    }
  }

  notifcation = (NotifcationId, type) => {
    const url = "/account/wallet";
    const sms = false;
    Meteor.call("notification/send", NotifcationId, type, url, sms);
  }

  transaction = (userId, amount, walletId, transactionType) => {
    Meteor.call("transaction/create", userId, amount, walletId, transactionType);
  }

  submitTransfer = (e) => {
    e.preventDefault();
    if (this.state.tranferWalletId === "") {
      Alerts.toast("Add receivers Wallet id", "error");
    } else if (this.state.transferWalletId.length < 7) {
      Alerts.toast("Wallet id not correct", "error");
    } else if (this.state.trasnferAmount === "") {
      Alerts.toast("Add an Amount", "error");
    } else if (this.state.transferWalletId == this.state.walletId) { // eslint-disable-line
      Alerts.toast("You cant transfer to Yourself", "error");
    } else if (this.state.balance < this.state.trasnferAmount) {
      Alerts.toast("You dont have upto that amount in ur wallet", "error");
    } else if (this.state.trasnferAmount < 100) {
      Alerts.toast("You cant trasnfer below N100", "error");
    } else {
      this.walletToWallet();
    }
  }

  walletToWallet = () => {
    const id = parseInt(this.state.transferWalletId, 10);
    const amount = parseInt(this.state.trasnferAmount, 10);
    Meteor.call("wallet/toWallet", id, Math.floor(amount.toFixed(2)), (err, payload) => {
      if (payload === 1) {
        Alerts.toast("Transfer Successful!", "success");
        const newBlanace = this.state.balance - this.state.trasnferAmount;
        Meteor.call("wallet/updateAmount", this.state.id, newBlanace);
        this.setState({ balance: newBlanace });
        this.getWalletDetails();
        const NotifcationId = Meteor.user()._id;
        const type = "transfer";
        this.notifcation(NotifcationId, type);
        const userId = Meteor.user()._id;
        const transactionType = "Transfer Fund";
        const walletId = id;
        this.transaction(userId, amount, walletId, transactionType);
        this.setState({ trasnferAmount: "" });
      } else {
        Alerts.toast("Transfer Failed Check Wallet Id!", "error");
      }
    });
    Meteor.call("wallet/findUser", id, (err, payload) => {
      const NotifcationId = payload.userId;
      const type = "fund";
      this.notifcation(NotifcationId, type);
      const userId = payload.userId;
      const transactionType = "Receive fund";
      const walletId = this.state.walletId;
      this.transaction(userId, amount, walletId, transactionType);
    });
  }

  render() {
    const dateFormat = (arg) => {
      const dateString = new Date(arg).toUTCString().split(" ").slice(0, 4).join(" ");
      return dateString;
    };

    const disoplayTransaction = this.state.transactionDisplay.map(shows =>
      <tbody key={shows._id}>
        <tr>
          <th scope="row" />
          <td>{dateFormat(shows.createdAt)}</td>
          <td>N{shows.amount}</td>
          <td>{shows.transactionType}</td>
          <td>{shows.walletId}</td>
        </tr>
      </tbody>
    );
    return (
      <div>
        <div className="container">
          <h1> Wallet </h1>
          <div className="left">
            <div className="jumbotron scale">
              <div>
                <h2>Current Balance: N{this.state.balance}</h2>
              </div>
              <h3>Wallet ID: {this.state.walletId}</h3>
              <form onSubmit={this.submitFund}>
                <h3>Fund Wallet</h3>
                <lable>Amount in Naira</lable>
                <div className="form-group size">
                  <input type="number"
                    className="form-control"
                    placeholder="Amount"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Wallet is funded with Paystack. Note money can't be transfer out of wallet</h6>
                <button
                  type="submit"
                  className="but"
                  disabled={this.state.disable}
                >
              Submit
                </button>
              </form>
            </div>
            <div className="jumbotron scale" style={{ marginLeft: "1%" }}>
              <h2>Transfer fund to Friends Wallet</h2>
              <form onSubmit={this.submitTransfer}>
                <div className="form-group size">
                  <label>Receivers Wallet Id</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="wallet Id"
                    name="transferWalletId"
                    value={this.state.transferWalletId}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group size">
                  <label>Amount To Trasnfer</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    value={this.state.trasnferAmount}
                    name="trasnferAmount"
                    onChange={this.onChange}
                  />
                </div>
                <h6>Note, you can't refund the money back once you transfer it</h6>
                <button
                  type="submit"
                  className="but"
                >
              Submit</button>
                <div />
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" scale" style={{ width: "100%" }}>
            <div className="bs-example" data-example-id="panel-without-body-with-table">
              <div className="panel panel-default" style={{ background: "#E3E3E3" }}>
                <div className="panel-heading"><h2>Transaction Details</h2></div>
                <div className="scrollbar2 scrollbar-primary">
                  <table className="table">
                    <thead>
                      <tr>
                        <th/>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Transaction Type</th>
                        <th>Wallet Id</th>
                      </tr>
                    </thead>
                    {disoplayTransaction}
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default WalletDashboard;

Template.walletDashboard.helpers({
  walletDashboard() {
    return {
      component: WalletDashboard
    };
  }
});
