const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Recipie = require("../models/recipie.js");
const ExpressError = require("../utils/expressError.js");
const { validateRecipie, isLoggedIn, isOwner } = require("../middleware.js");

const recipieController = require("../controller/recipie.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index Route
router.route("/").get(wrapAsync(recipieController.index)).post(
  isLoggedIn,
  upload.single("recipie[image]"), //req.file save upload file information
  validateRecipie,
  wrapAsync(recipieController.createRecipie)
);

//New Route
router.get("/new", isLoggedIn, recipieController.renderNewForm);

//Show Route
router
  .route("/:id")
  .get(wrapAsync(recipieController.showRecipies))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("recipie[image]"),
    validateRecipie,
    wrapAsync(recipieController.updateRecipie)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(recipieController.destroyRecipie));

//edit
router.get("/:id/edit", wrapAsync(recipieController.renderEditForm));

// //cart
// router.get("/:id/addCart", (req, res) => {
//   let { id } = req.params;
//   res.cookie("id", id);
//   res.redirect(`/recipies/${id}`);
// });

module.exports = router;
