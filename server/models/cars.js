/**
 * File name: cars.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-25
 * Web App name: Favourite Car List
 */
let mongoose = require("mongoose");

// create a model class
let Car = mongoose.Schema(
  {
    Carname: String,
    Category: String,
    Carmodel: String,
    Price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", Car);
