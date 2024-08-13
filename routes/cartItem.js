const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const CartItem = require("../models/cartItems.js");
const Recipe = require("../models/recipie.js");
const User = require("../models/user.js");
const ExpressError = require("../utils/expressError.js");
const { validateRecipie, isLoggedIn, isOwner } = require("../middleware.js");
const { saveredirectUrl } = require("../middleware.js");
const { use } = require("passport");
const { recipieSchema } = require("../schema.js");

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectUrl = req.originalUrl;
    res.status(401).json({
      success: false,
      message: "User not authenticated",
      redirect: "/login",
    });
  }
}

router.post("/addToCart/:id", saveredirectUrl, isLoggedIn, async (req, res) => {
  const { id: recipieId } = req.params;
  const recipie = await Recipe.findById(recipieId);
  const user = await User.findById(req.user._id);
  const CartItemExist = await CartItem.findOne({ name: recipie.name });
  if (
    CartItemExist &&
    CartItemExist.owner._id.equals(res.locals.currUser._id)
  ) {
    quantity = CartItemExist.quantity + 1;
    totalPrice = CartItemExist.price * quantity;
    updatedCartItem = await CartItem.findByIdAndUpdate(CartItemExist.id, {
      quantity: quantity,
      price: totalPrice,
    });
    // console.log(updatedCartItem);
    req.flash("success", "Item Added to Cart!");
    res.redirect("/recipies");
  } else {
    try {
      const newCartItem = new CartItem({
        name: recipie.name,
        price: recipie.price,
        image: recipie.image,
        quantity: 1,
        owner: req.user._id,
      });
      // console.log(newCartItem);
      await newCartItem.save();
      req.flash("success", "Item Added to Cart!");
      res.redirect("/recipies");
    } catch (error) {
      res.status(500).json({ message: "Error adding recipe to cart" });
    }
  }
});

router.get("/add-to-cart/:id", (req, res) => {
  const { id } = req.params;
  req.flash("success", "Added to Cart!");
  res.redirect(`/recipies/${id}`);
});

router.post(
  "/add-to-cart/:id",
  saveredirectUrl,
  checkLoggedIn,
  async (req, res) => {
    console.log(req.body);
    const { recipeId } = req.body;
    const recipie = await Recipe.findById(recipeId);
    // const user = await User.findById(req.user._id);
    // console.log(user);

    const CartItemExist = await CartItem.findOne({ name: recipie.name });
    if (
      CartItemExist &&
      CartItemExist.owner._id.equals(res.locals.currUser._id)
    ) {
      quantity = CartItemExist.quantity + 1;
      totalPrice = CartItemExist.price * quantity;
      updatedCartItem = await CartItem.findByIdAndUpdate(CartItemExist.id, {
        quantity: quantity,
        price: totalPrice,
      });
      // console.log(updatedCartItem);
    } else {
      try {
        const newCartItem = new CartItem({
          name: recipie.name,
          price: recipie.price,
          image: recipie.image,
          quantity: 1,
          owner: req.user._id,
        });
        // console.log(newCartItem);
        await newCartItem.save();
        res.json({ message: "Recipe added to cart" });
      } catch (error) {
        res.status(500).json({ message: "Error adding recipe to cart" });
      }
    }
  }
);

router.delete("/cartItems/:id", async (req, res) => {
  let { id } = req.params;
  const deletedCartItem = await CartItem.findByIdAndDelete(id);
  // console.log(deletedCartItem);
  res.redirect("/cartItems");
});

router.get(
  "/cartItems",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let userId = await User.find({ username: req.session.passport.user });
    loginUser = userId[0]._id;
    let cartItems = await CartItem.find({ owner: loginUser });
    // console.log(cartItems);
    res.render("cart/cart.ejs", { cartItems });
  })
);

router.get("/cartItems/placeOrder", isLoggedIn, (req, res) => {
  req.flash("success", "Order Place Suceessfully!");
  res.redirect("/recipies");
});

module.exports = router;
