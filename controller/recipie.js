const Recipie = require("../models/recipie.js");

module.exports.index = async (req, res, next) => {
  let recipies = await Recipie.find({});
  let highlightRecipie = recipies.slice(0, 4);
  res.render("recipies/menu.ejs", { recipies, highlightRecipie });
};

module.exports.renderNewForm = (req, res, next) => {
  res.render("recipies/new.ejs");
};

module.exports.showRecipies = async (req, res, next) => {
  let { id } = req.params;
  let recipie = await Recipie.findById(id)
    .populate({
      path: "reviews", //here we use use nexted populate
      populate: {
        //hmm apne reeviews k saath populate krna chahte hai ab hmm chahte hai ki har ek individual review k path m author aa jaye
        path: "author",
      },
    })
    .populate("owner");
  if (!recipie) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/recipies");
  }
  res.render("recipies/show.ejs", { recipie });
};

module.exports.createRecipie = async (req, res, next) => {
  // let { name, description, image, price } = req.body.recipie;

  const url = req.file.path;
  const filename = req.file.filename;

  if (!req.body.recipie) {
    throw new ExpressError(400, "Send valid data for recipie");
  }

  const newRecipie = new Recipie(req.body.recipie);
  // if (!newRecipie.name) {
  //   throw new ExpressError(400, "Name is missing");
  // }

  console.log(newRecipie);
  newRecipie.image = { url, filename };
  newRecipie.owner = req.user._id;
  await newRecipie.save();
  req.flash("success", "New Recipie created!");
  res.redirect("/recipies");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let recipie = await Recipie.findById(id);
  if (!recipie) {
    req.flash("error", "Recipie you requested does not exist");
    res.redirect("/listings");
  }
  res.render("recipies/edit.ejs", { recipie });
};

module.exports.updateRecipie = async (req, res, next) => {
  let { id } = req.params;
  let recipie = await Recipie.findByIdAndUpdate(id, {
    ...req.body.recipie,
  });
  if (typeof req.file !== "undefined") {
    //agar req.file exist krti hai to vo undefined se match nhi hoga
    let url = req.file.path;
    let filename = req.file.filename;
    recipie.image = { url, filename };
    await recipie.save();
  }
  req.flash("success", "Recipie updated!");
  res.redirect(`/recipies/${id}`);
};

module.exports.destroyRecipie = async (req, res, next) => {
  let { id } = req.params;
  let deletedRecipie = await Recipie.findByIdAndDelete(id);
  console.log(deletedRecipie);
  req.flash("success", "Recipie Deleted!");
  res.redirect("/recipies");
};
