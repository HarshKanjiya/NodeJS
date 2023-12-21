const fs = require("fs");
const model = require("../model/product");
const { Mongoose } = require("mongoose");
const Product = model.Product;

// MVC
const createProducts = (req, res) => {
  const product = new Product(req.body);
  product
    .save({})
    .then((savedProduct) => {
      console.log("Product added successfully:", savedProduct);
      res.status(201).json(savedProduct);
    })
    .catch((error) => {
      console.error("Error saving product:", error);
      res.status(400).json(error);
    });
};

const getAllProducts = (req, res) => {
  Product.find({})
    .then((products) => {
      console.log("Retrieved products:", products);
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      res.status(404).json(error);
    });
};

const getProduct = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((product) => {
      if (product) {
        console.log("Product Found:", product);
        res.status(200).json(product);
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

const replaceProduct = (req, res) => {
  const id = req.params.id;
  const newProductData = req.body;
  Product.findOneAndReplace({ _id: id }, newProductData)
    .then((updatedProduct) => {
      if (updatedProduct) {
        console.log("Product Updated:", updatedProduct);
        res.status(200).json(updatedProduct);
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

const updateProduct = (req, res) => {
  const id = req.params.id;
  const newProductData = req.body;
  Product.findOneAndUpdate({ _id: id }, newProductData)
    .then((updatedProduct) => {
      if (updatedProduct) {
        console.log("Product Updated:", updatedProduct);
        res.status(200).json(updatedProduct);
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

const deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .then((updatedProduct) => {
      if (updatedProduct) {
        console.log("Product Deleted:", updatedProduct);
        res.status(200).json(updatedProduct);
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
  createProducts,
  getAllProducts,
  getProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
