/**
 * File name: index.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-25
 * Web App name: Favourite Car List
 */
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let car = require("../models/cars");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    cars: "",
  });
});

module.exports = router;
