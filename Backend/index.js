require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const path = require('path')

// db connection
main().catch((err) => console.log("Database Connection Error:", err));
async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database Connected");
} 

// middle ware
server.use(cors());
server.use(express.json()); //body parser
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)))
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'dist','index.html'))
})

// server.use(express.urlencoded) //url encoded

server.use(express.static("public"));

server.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});


