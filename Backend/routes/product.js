const express = require("express");
const router = express.Router();
const {
    createProducts,
    getAllProducts,
    getProduct,
    replaceProduct,
    updateProduct,
    deleteProduct,
  } = require("../controller/product");

router
  .post("/", createProducts)
  .get("/", getAllProducts)
  .get("/:id", getProduct)
  .put("/:id", replaceProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);



  exports.router = router