import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";

const pageInfo = {
  pageName: "About Us",
  pageAddress: "about",
  pageContent:
    "How can you effectively onboard onto a low support team How can you take charge of team workflow requirements including setting up syncs, managing stakeholders, identifying gaps in workflow and proactively proposing solutions? How can you onboard onto a large codebase with little or no support? How can you quickly learn a new technology and use that knowledge to build out features simultaneously? How would you manage personal time and estimate well timelines for delivering on all expectations? How can you actively leverage knowledge of the business goals to build a better product?",
  userId: "123445",
  shopId: "1",
  isEnabled: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

describe("static pages", () => {
  let pageId;
  it("should insert static page", () => {
    Meteor.call("insertPage",
      pageInfo.pageName,
      pageInfo.pageAddress,
      pageInfo.pageContent,
      pageInfo.userId,
      pageInfo.shopId,
      pageInfo.isEnabled,
      pageInfo.createdAt, (err, payload) => {
        pageId = payload;
        expect(payload).to.equal(typeof "string");
      });
  });

  it("should update static page", () => {
    Meteor.call("updatePage",
      pageId,
      pageInfo.pageName,
      pageInfo.pageAddress,
      pageInfo.pageContent,
      pageInfo.userId,
      pageInfo.shopId,
      pageInfo.isEnabled,
      pageInfo.createdAt,
      pageInfo.updatedAt, (err, payload) => {
        expect(payload).equal(1);
      });
  });

  it("should get static page", () => {
    Meteor.call("getPage",
      pageId, (err, payload) => {
        expect(payload.pageName).to.equal(pageInfo.pageName);
        expect(payload.pageAddress).to.equal(pageInfo.pageAddress);
        expect(payload.pageContent).to.equal(pageInfo.pageContent);
        expect(payload.userId).to.equal(pageInfo.userId);
        expect(payload.shopId).to.equal(pageInfo.shopId);
        expect(payload.isEnabled).to.equal(pageInfo.isEnabled);
        expect(payload._id).to.equal(pageInfo.pageId);
      });
  });

  it("should get static page", () => {
    Meteor.call("deletePage",
      pageId, (err, payload) => {
        expect(payload).to.equal(1);
      });
  });
});
