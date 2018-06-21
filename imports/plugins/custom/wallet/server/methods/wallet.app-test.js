/*eslint-disable */
import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";


describe("Wallet", () => {
  it("should trow error if balance is string", () => {
    const userId = "userone1111";
    const balance =  "01";
    const walletId = 1234567;
    Meteor.call("wallet/create", userId, balance, walletId,
      (err, payload) => {
        expect(err[0].message).to.equal("Match error: Expected number, got string");
      });
  });

  it("should trow error if walletId is string", () => {
    const userId = "userone1111";
    const balance =  "01";
    const walletId = "1234567";
    Meteor.call("wallet/create", userId, balance, walletId,
      (err, payload) => {
        expect(err[0].message).to.equal("Match error: Expected number, got string");
      });
  });

  it("should trow error if userId is only number", () => {
    const userId = 123456;
    const balance =  "01";
    const walletId = "1234567";
    Meteor.call("wallet/create", userId, balance, walletId,
      (err, payload) => {
        expect(err[0].messsge).to.equal("Match error: Expected string, got number");
      });
  });

  it("create new wallet when a new user register", () => {
    const userId = "userone1111";
    const balance =  0;
    const walletId = 1234567;
    Meteor.call("wallet/create", userId, balance, walletId,
      (err, payload) => {
        expect(payload).to.equal(typeof "string");
      });
  });

  it("get wallet details ", () => {
    const userId = "userone1111";
    Meteor.call("wallet/get", userId,
      (err, payload) => {
        expect(payload.userId).to.equal("jfjf2hnfhj");
        expect(payload.walletId).to.equal(12345);
        expect(payload.balance).to.equal(0);
      });
  });

  it("fund wallet", () => {
    const userId = "userone1111";
    const balance =  500;
    Meteor.call("wallet/updateAmount", userId, balance,
      (err, payload) => {
        expect(payload).to.equal(true);
      });
  });

  it("get new wallet balance", () => {
    const userId = "userone1111";
    Meteor.call("wallet/get", userId,
      (error, payload) => {
        expect(payload.balance).to.equal(2000);
      }
    );
  });

  it("create new wallet when another new user register", () => {
    const userId = "userone1112";
    const balance =  2000;
    const walletId = 7654321;
    Meteor.call("wallet/create", userId, balance, walletId,
      (err, payload) => {
        expect(payload).to.equal(typeof "string");
      });
  });

  it("get wallet details of second user ", () => {
    const userId = "userone1112";
    Meteor.call("wallet/get", userId,
      (err, payload) => {
        expect(payload.userId).to.equal("userone1112");
        expect(payload.walletId).to.equal(12345);
        expect(payload.balance).to.equal(0);
      });
  });

  it("transfer from wallet to wallet", () => {
    const walletId = 1234567;
    const amount = 500;
    Meteor.call("wallet/toWallet", walletId, amount,
      (error, payload) => {
        expect(payload).to.equal("done");
      }
    );
  });
});
