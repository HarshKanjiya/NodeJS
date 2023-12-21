const express = require("express");
const router = express.Router();
const {
    createUsers,
    getAllUsers,
    getUser,
    replaceUser,
    updateUser,
    deleteUser,
  } = require("../controller/user");

router
  .post("/", createUsers)
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);



  exports.router = router