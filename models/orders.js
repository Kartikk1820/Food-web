const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  image: {
    url: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
