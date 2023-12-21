const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [2, "Title is too short"],
    maxLength: 55,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Minimum price can be 0"],
  },
  discountPercentage: {
    type: Number,
    min: [0, "Minimum discount can be 0"],
    max: [100, "Maximum discount can be 100"],
    default: 0,
  },
  rating: {
    type: Number,
    min: [0, "Minimum rating can be 0"],
    max: [5, "Minimum rating can be 5"],
    required: true,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Minimum stock can be 0"],
  },
  brand: {
    type: String,
    required: true,
    minLength: 2,
  },
  category: {
    type: String,
    require: true,
    minLength: 2,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    minLength: 1,
    maxLength: 5,
  },
});

exports.Product = mongoose.model("Product", productSchema);
