import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import { PaystackApi } from "./paystackapi";


describe("PaystackApi", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should return data from ThirdPartyAPI authorize", function () {
    const cardData = {
      payerName: "Test User",
      payerEmail: "me@example.com"
    };
    const paymentData = {
      currency: "NGN",
      total: "19.99"
    };

    const transactionType = "authorize";
    const transaction = PaystackApi.methods.authorize.call({
      transactionType: transactionType,
      cardData: cardData,
      paymentData: paymentData
    });
    expect(transaction).to.not.be.undefined;
  });

  it("should return risk status for flagged test card", function () {
    const cardData = {
      payerName: "Test User",
      payerEmail: "me@example.com"
    };
    const paymentData = {
      currency: "USD",
      total: "19.99"
    };

    const transactionType = "authorize";
    const transaction = PaystackApi.methods.authorize.call({
      transactionType: transactionType,
      cardData: cardData,
      paymentData: paymentData
    });

    expect(transaction.riskStatus).to.be.defined;
  });

  it("should return data from ThirdPartAPI capture", function (done) {
    const authorizationId = "abc123";
    const amount = 19.99;
    const results = PaystackApi.methods.capture.call({
      authorizationId: authorizationId,
      amount: amount
    });
    expect(results).to.not.be.undefined;
    done();
  });
});


describe("Submit payment", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should call Paystack API with card and payment data", function () {
    this.timeout(30000);
    const cardData = {
      payerName: "Test User",
      payerEmail: "me@example.com"
    };
    const paymentData = {
      currency: "NGN",
      total: "19.99"
    };

    const authorizeResult = {
      saved: true,
      currency: "NGN"
    };

    const authorizeStub = sandbox.stub(PaystackApi.methods.authorize, "call", () => authorizeResult);
    const results = Meteor.call("paystackSubmit", "authorize", cardData, paymentData);
    expect(authorizeStub).to.have.been.calledWith({
      transactionType: "authorize",
      cardData: cardData,
      paymentData: paymentData
    });
    expect(results.saved).to.be.true;
  });

  it("should throw an error if card data is not correct", function () {
    const badCardData = {
      name: "Test User"
    };

    const paymentData = {
      currency: "NGN",
      total: "19.99"
    };

    expect(function () {
      Meteor.call("paystackSubmit", "authorize", badCardData, paymentData);
    }
    ).to.throw;
  });
});

describe("Capture payment", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });
  it("should throw an error if transaction ID is not found", function () {
    sandbox.stub(PaystackApi.methods, "capture", function () {
      throw new Meteor.Error("Not Found");
    });
    expect(function () {
      Meteor.call("paystack/payment/capture", "abc123");
    }).to.throw;
  });
});
