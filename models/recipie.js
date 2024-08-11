const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Review = require("./review.js");

const recipieSchema = new Schema({
  image: {
    url: String,
    filename: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Desert", "Snacks", "Indian Thali", "Juices"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

recipieSchema.post("findOneAndDelete", async (recipie) => {
  if (recipie) {
    await Review.deleteMany({ _id: { $in: recipie.reviews } }); //delete id's which belongs to recipie.reviews
  }
});

const Recipie = mongoose.model("Recipie", recipieSchema);
module.exports = Recipie;
