import React, { Component } from "react";
import ReactStars from "react-stars";
import PropTypes from "prop-types";
import moment from "moment";
import { Meteor } from "meteor/meteor";
import "../stylesheet/style.css";
import { registerComponent, composeWithTracker  } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Reviews } from "../../lib/collections";

class ProductReview extends Component {
    state = {
      review: "",
      rating: 0,
      averageRateing: null,
      user: Meteor.user()
    };

    componentDidMount() {
      this.avarageRating();
    }

    avarageRating = () => {
      const productName = Reaction.Router.getParam("handle");
      Meteor.call("reviews/average", productName, (err, payload) => {
        this.setState({ averageRateing: payload });
        Meteor.call("update/productSearchWithRating", productName, payload);
      });
    };

    ratingChanged = (e) => {
      this.setState({ rating: e });
    }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

   onSubmit = (e) => {
     e.preventDefault();
     if (this.state.rating < 1) {
       Alerts.toast("You must select a rating before submitting a review", "error", {
         placement: "productDetail",
         autoHide: 10000
       });
     } else if (this.state.review === "") {
       Alerts.toast("You can not submit a empty review", "error", {
         placement: "productDetail",
         autoHide: 10000
       });
     } else {
       const review  = this.state.review;
       const rating  = parseInt(this.state.rating, 10);
       const userEmail = this.state.user.emails[0].address;
       const productName = Reaction.Router.getParam("handle");
       Meteor.call("review/create", rating, review, userEmail, productName);
       Meteor.call("reviews/average", productName);
       this.setState({ rating: 0, review: ""  });
     }
   }

   render() {
     const admin = this.state.user.roles.J8Bhq3uTtdgwZx3rz[0];
     const dateFormat = (arg) => {
       const dateString = new Date(arg).toUTCString().split(" ").slice(0, 4).join(" ");
       return dateString;
     };

     const userReviews = this.props.reviews.map(userReview =>
       <div key={userReview._id}
         className="back"
       >
         <div className="inside">
           <h4>{userReview.review}</h4>
           <div className="move">
             <h6 className="space"><strong>
               {userReview.userEmail.split("@")[0]} on {dateFormat(userReview.createdAt)} {moment(userReview.createdAt, "YYYYMMDD").fromNow()}
             </strong>
             </h6>
             <div>
               <ReactStars
                 count={5}
                 size={18}
                 edit={false}
                 color2={"#ffd700"}
                 value={userReview.rating}
               />
             </div>
           </div>
           <hr/>
         </div>
       </div>
     );
     const signin = (
       <div>
         <h3>Sign in or Register to Leave a Rating and a Review </h3>
         <br/>
       </div>
     );

     const addReview = (
       <div>
         <form onSubmit={this.onSubmit}>
           <h3> Add Your Rating and Review</h3>
           <ReactStars
             count={5}
             size={15}
             color2={"#ffd700"}
             value={parseInt(this.state.rating, 10)}
             onChange={this.ratingChanged}
           />
           <br/>
           <textarea
             type="text"
             name="review"
             value={this.state.review}
             id="exampleFormControlTextarea1"
             rows="2"
             className="form-control form-control-lg mytextarea"
             onChange={this.onChange}
           />
           <br/>
           <button
             className="but"
             type="submit"
           >
    Add Review
           </button>
         </form>
         <br/>
       </div>
     );

     const title = (
       <div>
         <h2>No Reviews Yet</h2>
       </div>
     );
     const adminMessage = (
       <div>
         <h2>Admin not allowed to leave review</h2>
       </div>
     );

     const sort = (
       <div>
         <h1>Reviews</h1>
         <h3>Most Recent</h3>
       </div>
     );

     const show = () => {
       if (this.state.user.emails.length === 0) {
         return signin;
       } else if (admin === "owner") {
         return adminMessage;
       }
       return addReview;
     };

     return (
       <div>
         <h1>Average Rating</h1>
         <ReactStars
           size={35}
           color2={"#ffd700"}
           value={this.state.averageRateing}
           edit={false}
         />
         {show()}
         {this.props.reviews.length < 1 ? title : sort}
         <div className="scrollbar scrollbar-primary">
           {userReviews.reverse()}
         </div>
       </div>
     );
   }
}

const composer = (props, onData) => {
  const productName = Reaction.Router.getParam("handle");
  if (Meteor.subscribe("Reviews", productName).ready()) {
    const reviews = Reviews.find({}).fetch();
    onData(null, { reviews });
  }
};


registerComponent("Reviews", ProductReview, composeWithTracker(composer));


ProductReview.propTypes = {
  reviews: PropTypes.array
};

export default ProductReview;
