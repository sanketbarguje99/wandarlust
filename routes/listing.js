const express = require("express");
const router = express.Router();
const wrapasync =require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validatelisting} = require("../middleware.js")

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});



router.route("/")
.get(wrapasync(listingController.index))
.post(
    validatelisting,
    isLoggedIn,upload.single('image'),
    wrapasync(listingController.createlisting)
);

// NEW route 
router.get("/new",isLoggedIn ,listingController.renderNewform);

//search route
router.get("/search", wrapasync(listingController.searchListings));


router.route("/:id")
.get(
  wrapasync(listingController.ShowListing)
)
.put(
    validatelisting,
    isLoggedIn,
    isOwner,
    upload.single("image"),
    wrapasync(listingController.updatelisting)
)
  .delete(
  isLoggedIn ,
  isOwner,
  wrapasync(listingController.destroylisting));

  //edit route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
   wrapasync(listingController.renderEditform ));



module.exports =router;