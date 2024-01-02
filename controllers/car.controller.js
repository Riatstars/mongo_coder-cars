const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const body = req.body;
    const data = await Car.insertMany({
      make: body.make,
      model: body.model,
      release_date: body.release_date,
      transmission_type: body.transmission_type,
      size: body.size,
      style: body.style,
      price: body.price,
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
    console.log(err);
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE

    const body = req.body;

    const data = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          make: body.make,
          model: body.model,
          release_date: body.release_date,
          transmission_type: body.transmission_type,
          size: body.size,
          style: body.style,
          price: body.price,
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
    const data = await Car.deleteOne({ id: deleteId });
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
