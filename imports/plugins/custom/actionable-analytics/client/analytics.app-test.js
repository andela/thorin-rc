/*eslint-disable */
import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { EDEADLK } from "constants";


describe("Analytics", () => {
  it("should return all the data for the orders", () => {
    const fromDate = new Date("2018-06-01")
    const toDate = new Date()
    Meteor.call("ordersAnalytics", 
    { 
        fromDate: fromDate, 
        toDate: toDate 
    },
      (err, payLoad) => {
        expect(payLoad).to.equal(typeof "object")
        });
    });

    it("should return all the data for the product", () => {
        const fromDate = new Date
        const toDate = new Date
        Meteor.call("productInventory", 
          (err, payLoad) => {
            expect(payLoad).to.equal(typeof "array")
            });
        });
});