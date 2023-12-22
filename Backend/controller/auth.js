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

exports.createUsers = (req, res) => {
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
      res.status(201).json(savedUser);
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(400).json(error);
    });
};

exports.login = (req, res) => {
  try{
    const user = User.findOne({email:req.body.email})
  const isAuth = bcrypt.compareSync(req.body.password, user.password);
if(isAuth){
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
}
  }catch(error){
    return res.status(403).send('Wrong username or password')
  }
  
  
  



  
};
