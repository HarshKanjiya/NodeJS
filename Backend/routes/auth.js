const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/signUp", authController.createUsers);

exports.router = router;
