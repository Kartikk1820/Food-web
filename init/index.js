const mongoose = require("mongoose");
const Recipie = require("../models/recipie");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/foodweb";
main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Recipie.deleteMany({}); //delete previous exist data

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "669e54f395d24d767ba95bbf",
  }));
  await Recipie.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();
