import introJs from "intro.js";
import onboardingSteps from "./customerOnboardingSteps";

const intro = introJs();
const shopTour = () => {
  const steps = onboardingSteps;
  intro.setOptions({
    overlayOpacity: 0.9,
    showProgress: true,
    exitOnEsc: true,
    showStepNumbers: true,
    stepNumberPosition: "top-left",
    showBullets: true,
    disableInteraction: false,
    skipLabel: "Exit",
    scrollToElement: true,
    steps
  });
  setTimeout(() => {
    intro.start();
  }, 1000);
};


export default shopTour;
