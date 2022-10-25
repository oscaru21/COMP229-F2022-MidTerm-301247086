/**
 * File name: cars.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-25
 * Web App name: Favourite Car List
 */
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  //show the add view
  res.render("cars/add", {
    title: "Add a Car:"
  });
});


// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  //CREATE NEW CAR OBJECT
  let newCar = car({
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });

  car.create(newCar, (err, Car) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the car list
      res.redirect("/cars");
    }
  });
});

//MOVED DELETE ROUTE BEFORE EDIT ROUTES TO AVOID COLLISIONS
// GET - process the delete
router.get("/delete", (req, res, next) => {
  //removes all the documents with Carname equals to "Sentra"
  car.remove({ Carname: "Sentra" }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/cars");
    }
  });
});

// GET the Car Details page in order to edit an existing Car
router.get("/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  car.findById(id, (err, carToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("cars/details", {
        title: "Details",
        cars: carToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  let id = req.params.id; 

  let updatedCar = car({
    _id: id,
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });

  car.updateOne({ _id: id }, updatedCar, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/cars");
    }
  });
});

module.exports = router;
