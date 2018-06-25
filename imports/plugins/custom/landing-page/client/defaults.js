import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "Landing",
  layoutHeader: "NavBar",
  layoutFooter: ""
});
