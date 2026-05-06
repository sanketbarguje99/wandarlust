const Listing = require("./models/listing");
const {listingschema } = require("./schema.js")
const ExpressError =require("./utils/expresserror.js")
const { reviewschema } = require("./schema.js");
const Review = require("./models/review");
const mongoose = require("mongoose");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated())  {
      req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged in to create listing!");
   return  res.redirect("/login");
  }
  next()
}


module.exports.saveRedirectUrl = (req,res,next) =>{
  if( req.session.redirectUrl) {
    res.locals.redirectUrl =  req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validatelisting = (req,res,next) =>{
 let {error} = listingschema.validate(req.body);
if(error){
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg );
}else{
    next();
}
}

module.exports.validatereview = (req, res, next) => {
    let { error } = reviewschema.validate(req.body.review); 
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};



module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId, id } = req.params;


  reviewId = reviewId.trim();


  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    req.flash("error", "Invalid Review ID");
    return res.redirect(`/listings/${id}`);
  }

  let review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};