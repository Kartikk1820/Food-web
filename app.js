if (process.env.NODE_ENV != "production") {
  //jab hmm deployment phase m honge to node_env ki value production set kr denge
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const Recipie = require("./models/recipie.js");
const wrapAsync = require("./utils/wrapAsync.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError.js");
const recipieRouter = require("./routes/recipie.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const cartItemRouter = require("./routes/cartItem.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const { isLoggedIn } = require("./middleware.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/foodweb";
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view enjine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json()); //converting url to json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser("secretCode"));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookies: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.render("recipies/home.ejs");
});

app.post("/view-cart", (req, res) => {
  const cart = req.body.cart;
  console.log(cart);
  res.json({ cart: cart });
});

app.get("/services", (req, res) => {
  res.render("recipies/services.ejs");
});
app.get("/contactUs", (req, res) => {
  res.render("recipies/contact.ejs");
});
app.get("/offers", (req, res) => {
  res.render("recipies/offer.ejs");
});

app.use("/recipies", recipieRouter);
app.use("/recipies/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", cartItemRouter);

//if page not found
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
