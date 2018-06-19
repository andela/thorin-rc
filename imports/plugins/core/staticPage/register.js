import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static-Page-View",
  name: "reaction-static-pages-view",
  autoEnable: true,
  registry: [
    {
      route: "/pages/:pageAddress",
      name: "pages",
      template: "staticPageView"
    }
  ]
});
