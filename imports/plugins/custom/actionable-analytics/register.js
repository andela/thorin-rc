import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Analysis",
  name: "Analysis",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "analytics"
  },
  registry: [
    {
      route: "/dashboard/analytics",
      provides: "dashboard",
      name: "Analytics",
      label: "Analytics",
      description: "View Analysis",
      icon: "fa fa-bar-chart",
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow",
      template: "analytics"
    }
  ]
});
