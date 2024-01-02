const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const body = req.body;
    const { make, model, release_date, transmission_type, size, style, price } =
      body;
    if (
      !(
        make &&
        model &&
        release_date &&
        transmission_type &&
        size &&
        style &&
        price
      )
    ) {
      const error = new Error("Please provide all required fields");
      error.statusCode = 401;
      throw error;
    }
    const keys = Object.keys(body);
    keys.forEach((key) => {
      switch (key) {
        case "make":
        case "model":
        case "transmission_type":
        case "size":
        case "style":
          if ("string" !== typeof body[key]) {
            const error = new Error("Please provide correct data format");
            error.statusCode = 401;
            throw error;
          }
          break;
        case "release_date":
        case "price":
          if ("number" !== typeof body[key]) {
            const error = new Error("Please provide correct data format");
            error.statusCode = 401;
            throw error;
          }
          break;
        default:
          break;
      }
    });
    if (price < 1000) {
      const error = new Error("Price must be equal or greater than 1000!");
      error.statusCode = 401;
      throw error;
    }
    if (release_date < 1900) {
      const error = new Error("Date must be after 1900");
      error.statusCode = 401;
      throw error;
    }
    const data = await Car.create({
      make: make,
      model: model,
      release_date: release_date,
      transmission_type: transmission_type,
      size: size,
      style: style,
      price: price,
    });
    const response = { message: "Create Car Successfully", data: data };
    res.send(response);
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    let page = req.query.page ? req.query.page : 1;
    const limit = 10;
    let skip = (page - 1) * limit;
    const data = await Car.find({}).skip(skip).limit(limit);
    const total = await Car.find().count();
    const response = { message: "success", data: data, total: total };
    res.send(response);
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE

    const body = req.body;
    const { make, model, release_date, transmission_type, size, style, price } =
      body;
    if (
      !(
        make &&
        model &&
        release_date &&
        transmission_type &&
        size &&
        style &&
        price
      )
    ) {
      const error = new Error("Please provide all required fields");
      error.statusCode = 401;
      throw error;
    }
    const keys = Object.keys(body);
    console.log(body);
    keys.forEach((key) => {
      switch (key) {
        case "make":
        case "model":
        case "transmission_type":
        case "size":
        case "style":
          if ("string" !== typeof body[key]) {
            const error = new Error("Please provide correct data format");
            error.statusCode = 401;
            throw error;
          }
          break;
        case "release_date":
        case "price":
          if ("number" !== typeof body[key]) {
            const error = new Error("Please provide correct data format");
            error.statusCode = 401;
            throw error;
          }
          break;
        default:
          break;
      }
    });
    if (price < 1000) {
      const error = new Error("Price must be equal or greater than 1000!");
      error.statusCode = 401;
      throw error;
    }
    if (release_date < 1900) {
      const error = new Error("Date must be after 1900");
      error.statusCode = 401;
      throw error;
    }
    const allowedTransmissionType = [
      "MANUAL",
      "AUTOMATIC",
      "AUTOMATED_MANUAL",
      "DIRECT_DRIVE",
      "UNKNOWN",
    ];
    const allowedSize = ["Compact", "Midsize", "Large"];
    if (
      !(
        allowedTransmissionType.includes(transmission_type) &&
        allowedSize.includes(size)
      )
    ) {
      const error = new Error("Please choose from provided field");
      error.statusCode = 401;
      throw error;
    }
    const data = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          make: make,
          model: model,
          release_date: release_date,
          transmission_type: transmission_type,
          size: size,
          style: style,
          price: price,
        },
      },
      { returnNewDocument: true }
    );
    const data2 = await Car.findById(req.params.id);
    const response = { message: "Update Car Successfully", data: data2 };

    res.send(response);
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const deleteId = req.params.id;
    const deletedDoc = await Car.findById(deleteId);
    await Car.deleteOne({ id: deleteId });
    const response = {
      message: "Delete document success",
      deletedItem: deletedDoc,
    };
    res.send(response);
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

module.exports = carController;
