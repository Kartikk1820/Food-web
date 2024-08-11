const Recipie = require("../models/recipie.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let recipie = await Recipie.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  recipie.reviews.push(newReview);
  console.log(newReview);
  await newReview.save();
  let newRecipie = await (await recipie.save()).populate("reviews");
  req.flash("success", "New Review Created!");
  res.redirect(`/recipies/${recipie._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Recipie.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/recipies/${id}`);
};
