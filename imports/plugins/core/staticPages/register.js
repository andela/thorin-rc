import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static Pages",
  name: "staticPages",
  icon: "fa fa-file",
  autoEnable: true,
  settings: {
    name: "Static Pages"
  },
  registry: [
    {
      provides: ["dashboard"],
      route: "/dashboard/static",
      name: "static-pages",
      label: "Static Pages",
      description: "Create static pages",
      icon: "fa fa-file",
      priority: 1,
      container: "core",
      permissions: [
        {
          label: "dashboard/static",
          permission: "dashboard/static"
        }
      ],
      template: "staticPages"
    }
  ]
});
