/* eslint-disable no-undef */
const express = require("express");
const modRoute = express.Router();

// Module model
let ModModel = require("../models/Mod");

modRoute.route("/").get((req, res) => {
  ModModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

modRoute.route("/create-mod").post((req, res, next) => {
  ModModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

modRoute.route("/edit-mod/:id").get((req, res) => {
  ModModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update module
modRoute.route("/update-mod/:id").post((req, res, next) => {
  ModModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Module successfully updated!");
      }
    }
  );
});

// Delete module
modRoute.route("/delete-mod/:id").delete((req, res, next) => {
  ModModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = modRoute;
