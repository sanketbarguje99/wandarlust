
const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/expresserror.js");
const {isLoggedIn,isReviewAuthor} = require("../middleware.js")


const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); 
const {validatereview} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// POST review
router.post("/", 
    validatereview,
    isLoggedIn,
     wrapasync(reviewController.createReview));

// DELETE review
const mongoose = require("mongoose");

// DELETE review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapasync(reviewController.destroyreview)
);
module.exports = router;