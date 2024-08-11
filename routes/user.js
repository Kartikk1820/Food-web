const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Recipie = require("../models/recipie.js");
const ExpressError = require("../utils/expressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveredirectUrl,
    passport.authenticate("local", {
      //if user authentication successful then async fn works
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );

router.get("/logout", userController.logout);

module.exports = router;
