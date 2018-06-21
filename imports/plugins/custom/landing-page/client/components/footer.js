import React, { Component } from "react";

const footerItems = [
  { imageUrl: "resources/images/pay.png",
    title: "Safe Easy Payment",
    content: "Pay with the world’s most popular payment platforms.",
    className: "col-xs-4 col-md-3 col-lg-3 first-footer-item",
    images: ["resources/images/paypal.jpg", "resources/images/visa.jpg", "resources/images/mastercard.png"]

  },
  { imageUrl: "resources/images/value.png",
    title: "Great Value",
    content: " We offer competitive prices on all products.",
    images: ["resources/images/quality.jpg", "resources/images/certified.jpg", "resources/images/quality-icon.png"],
    className: "col-xs-4 col-md-3 col-lg-2"
  },
  { imageUrl: "resources/images/delivery.png", title: "Worldwide Delivery",
    content: "We ship to every part of the world using secure courier services.",
    className: "col-xs-4 col-md-3 col-lg-3",
    images: ["resources/images/fedexx.png", "resources/images/ups.jpg", "resources/images/dhl.png"]
  },
  { imageUrl: "resources/images/line.png", title: "#ShopRC",
    content: "",
    className: "col-xs-12 col-md-3 col-lg-4"
  }
];

class PageFooter extends Component {
  footerItem = ({ imageUrl, title, content, className, images }) => (
    <div className={`${className} footer-item `} key={title}>
      <img src={imageUrl} className="footer-icon"/>
      <strong><h3>{title}</h3></strong>
      <span>{content}</span>
      { images &&
      <div className="logos">
        <img src={images[0]} className="footer-logo"/>
        <img src={images[1]} className="footer-logo"/>
        <img src={images[2]} className="footer-logo"/>
      </div>
      }
    </div>
  );


  render() {
    return (
      <div>
        <hr className="divider" />
        <div className="container footer-top">
          { footerItems.map((footerItem) => this.footerItem(footerItem)) }
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="copyright pull-left">
              <p>&copy; 2018 Reaction Commerce by Thorin Team</p>
            </div>
            <div className="pull-right">
              <div className="copyright">
                <img src="resources/images/tweet.png"className="social" />
                <img src="resources/images/fb.png" className="social"/>
                <img src="resources/images/ig.png" className="social"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageFooter;
