const fs = require("fs");
const model = require("../model/user");
const mongoose = require("mongoose");
const User = model.User;

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      console.log("Retrieved users:", users);
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      res.status(404).json(error);
    });
};

const getUser = (req, res) => {
  const id = req.params.id;

  User.findById(id).populate('cart')
    .then((user) => {
      if (user) {
        console.log("User Found:", user);
        res.status(200).json(user);
      } else {
        console.log(`No product found with id ${id}`);
        res.status(404).send(`No product found with id ${id}`);
      }
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      res.status(500).json(error);
    });
};

const replaceUser = (req, res) => {
  const id = req.params.id;
  const newUserData = req.body;
  User.findOneAndReplace({ _id: id }, newUserData)
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("User Updated:", updatedUser);
        res.status(200).json(updatedUser);
      } else {
        console.log(`No user found with id ${id}`);
        res.status(404).send(`No user found with id ${id}`);
      }
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      res.status(500).json(error);
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const newUserData = req.body;
  User.findOneAndUpdate({ _id: id }, newUserData)
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("Product Updated:", updatedUser);
        res.status(200).json(updatedUser);
      } else {
        console.log(`No product found with id ${id}`);
        res.status(404).send(`No product found with id ${id}`);
      }
    })
    .catch((error) => {
      console.error("Error retrieving product:", error);
      res.status(500).json(error);
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id })
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("Product Deleted:", updatedUser);
        res.status(200).json(updatedUser);
      } else {
        console.log(`No product found with id ${id}`);
        res.status(404).send(`No product found with id ${id}`);
      }
    })
    .catch((error) => {
      console.error("Error in deleting product:", error);
      res.status(500).json(error);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  replaceUser,
  updateUser,
  deleteUser,
};
