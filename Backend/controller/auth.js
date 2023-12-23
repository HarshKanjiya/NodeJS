const jwt = require("jsonwebtoken");
var express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

const model = require("../model/user");
// const mongoose = require("mongoose");
const User = model.User;

exports.signUp = (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });

  const hashPassword = bcrypt.hashSync(req.body.password, 16);
  user.password = hashPassword;
  user.token = token;
  user
    .save({})
    .then((savedUser) => {
      console.log("Product added successfully:", savedUser);
      res.status(201).json({ token });
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(400).json(error);
    });
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    if (!doc) {
      return res.status(403).send("User not found");
    }

    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      await doc.save();
      res.json({ token });
    } else {
      res.status(403).send("ERROR: Wrong username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};
