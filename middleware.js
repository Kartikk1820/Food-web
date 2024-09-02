const ExpressError = require("./utils/expressError");
const { recipieSchema, reviewSchema } = require("./schema");
const Recipie = require("./models/recipie");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.originalUrl); /recipies/new
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create recipie!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveredirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let recipie = await Recipie.findByIdAndUpdate(id);
  if (!recipie.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of this recipie!");
    return res.redirect(`/recipies/${id}`);
  }
  next();
};

module.exports.validateRecipie = (req, res, next) => {
  let { error } = recipieSchema.validate(req.body);
  if (error) {
    errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findByIdAndUpdate(reviewId);

  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the author of this review!");
    return res.redirect(`/recipies/${id}`);
  }
  next();
};
