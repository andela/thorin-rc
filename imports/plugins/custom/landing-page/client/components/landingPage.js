import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";
import Carousel from "./carousel";
import FeaturedProducts from "./products";
import FlashDeals from "./flashDeals";
import Footer from "./footer";
import "../styles/landing.less";
class LandingPage extends getRawComponent("Products") {
  render() {
    return (
      <div>
        <main>
          <Carousel />
          <FlashDeals />
          <hr className="divider"/>
          <FeaturedProducts />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>

    );
  }
}

registerComponent("LandingPage", LandingPage, getHOCs("Products"));

export default LandingPage;
