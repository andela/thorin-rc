/* eslint-disable no-unused-expressions */

const APP_BASE_URL = "http://localhost:3000";

module.exports = {
  "User should be able to sort and filter search": browser => {
    browser
      .url(APP_BASE_URL)
      .waitForElementVisible("body", 5000)
      .assert.urlEquals(`${APP_BASE_URL}/`)
      .pause(9000)
      .assert.visible("body")
      .assert.visible(".fa-search")
      .click(".fa-search")
      .setValue(".text-edit-input.search-input", "basic")
      .pause(2000)
      .assert.containsText(".overlay-title", "BASIC REACTION PRODUCT")
      .assert.containsText(".currency-symbol", "$12.99 - $19.99")
      .pause(2000)
      .click(".form-control.filter-by-select option:nth-child(1)")
      .assert.containsText(".overlay-title", "BASIC REACTION PRODUCT")
      .pause(9000)
      .click("#select-vendor option:nth-child(1)")
      .click("#filterBy option:nth-child(2)")
      .assert.containsText(".overlay-title", "BASIC REACTION PRODUCT")
      .assert.containsText(".currency-symbol", "$12.99 - $19.99");
  },
  "User should be able to search by vendor": browser => {
    browser
      .click("#select-vendor option:nth-child(1)")
      .click("#filterBy option:nth-child(2)")
      .assert.containsText(".overlay-title", "BASIC REACTION PRODUCT")
      .assert.containsText(".currency-symbol", "$12.99 - $19.99")
      .pause(2000);
  },
  "User should be able to perform sorting on product": browser => {
    browser
      .pause(2000)
      .click("#sortBy option:nth-child(1)")
      .assert.containsText(".overlay-title", "BASIC REACTION PRODUCT")
      .assert.containsText(".currency-symbol", "$12.99 - $19.99")
      .end();
  }
};
