import React, { Component } from "react";
import Categories from "./categories";

class Carousel extends Component {
  render() {
    return (
      <div className="row car">
        <div>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="collapse categories" id="categories">
              <Categories />
            </div>

            <div className="carousel-inner">

              <div className="item active">
                <img src="resources/images/fashion.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Revamp Your <span className="special-text">Style</span> This Season</h1>
                  <p>Shop our affordable clothing</p>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/watch-carousel.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Stylish <span className="special-text">Watches</span> to Compliment Your Look</h1>
                  <p>Find the perfect trendy timepiece</p>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/furniture.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Give Your <span className="special-text">Home</span> a New Look</h1>
                  <p>Choose furniture from our home catalog</p>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/tech.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <div className="gadgets">
                    <h1>Cool <span className="special-text">Gadgets</span> For You</h1>
                    <p>Explore the latest technology at our store</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/feet2.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Pamper Your <span className="special-text">Feet</span></h1>
                  <p>Get quality fashionable footwear at our store</p>
                </div>
              </div>
            </div>


            <a className="left carousel-control chevron" href="#myCarousel" data-slide="prev">
              <span className="fa fa-chevron-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control chevron" href="#myCarousel" data-slide="next">
              <span className="fa fa-chevron-right" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
