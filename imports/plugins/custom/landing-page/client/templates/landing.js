import LandingPage from "../components/landingPage";
import { Template } from "meteor/templating";

Template.Landing.helpers({
  MyHome() {
    return {
      component: LandingPage
    };
  }
});
