const fs = require("fs");
const model = require("../model/product");
const { Mongoose } = require("mongoose");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");
const { log } = require("console");

//view

const getAllProductsSSR = (req, res) => {
  Product.find()
    .then((products) => {
      ejs.renderFile(
        path.resolve(__dirname, "../pages/index.ejs"), // Ensure this path is correct
        { products: products }, // Passing all products
        (err, str) => {
          if (err) {
            console.error("Error rendering EJS:", err);
            return res.status(500).send("Internal Server Error");
          }
          res.status(200).send(str);
        }
      );
    })
    .catch((error) => {
      console.error("Error retrieving products:", error);
      res.status(404).send("Products not found");
    });
};

const getAddForm = (req, res) => {
  ejs.renderFile(
    path.resolve(__dirname, "../pages/add.ejs"), // Ensure this path is correct
    (err, str) => {
      if (err) {
        console.error("Error rendering EJS:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.status(200).send(str);
    }
  );
};

// MVC
// REST API
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

const getAllProducts = async (req, res) => {
  try {
    let query = Product.find();
    let pageSize = 4;
    let page = req.query.page || 1; // Default to page 1 if not provided

    if (req.query.sort) {
      const products = await query
        .sort({ [req.query.sort]: req.query.order })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();
      res.json(products);
    } else if (req.query.page) {
      const products = await query
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();
      res.json(products);
    } else {
      const products = await query.exec();
      res.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


 
const getProduct = async (req, res) => {
  const id = req.params.id;

  await Product.findById(id)
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
  getAllProductsSSR,
  getAddForm,
  getProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
