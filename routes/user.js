const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync =require("../utils/wrapasync.js");
const passport = require("passport");
const {saveredirectUrl} = require("../middleware.js")

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.rendersignupform)
.post(wrapasync(userController.signup));

router.route("/login")
.get(userController.renderloginform)

.post(
    passport.authenticate("local", {
         failureRedirect: '/login',
         failureFlash: true }),
      userController.login);

      router.get("/logout",userController.logout);

module.exports = router;