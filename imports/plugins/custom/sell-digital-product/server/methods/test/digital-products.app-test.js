import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { DigitalProducts } from "../../../lib/collections";

const modifier = {
  productId: `55QLiJq7L${Math.random()}rh3nD2WL`,
  productTitle: "Example Product",
  isDigital: true,
  fileUrl: "http://exampleLink.com/file",
  bytes: "1023040540",
  uploadSuccess: false
};

describe("Digital products", () => {
  it("Insert new digital product", () => {
    Meteor.call("upsertDigitalProduct", modifier,
      (err, payload) => {
        expect(payload).to.have.property("numberAffected");
        expect(payload.numberAffected).equal(1);
      });
  });

  it("Update digital product", () => {
    modifier.uploadSuccess = true;
    Meteor.call("upsertDigitalProduct", modifier,
      (err, payload) => {
        expect(payload).to.have.property("numberAffected");
        expect(payload).to.have.property("insertedId");
        expect(payload.numberAffected).equal(1);
      });
  });

  it("find digital product, should return ''", () => {
    Meteor.call("findDigitalProduct", modifier.productId,
      (err, payload) => {
        expect(payload).equal("");
      });
  });

  it("find digital product, should return digital product", () => {
    const product = DigitalProducts.findOne({
      isDigital: true
    });

    Meteor.call("findDigitalProduct", product.productId,
      (err, payload) => {
        expect(payload.fileUrl).equal(product.fileUrl);
        expect(payload.fileSize).equal(product.fileSize);
        expect(payload.isDigital).equal(true);
      });
  });
});


