require("dotenv").config();
const express = require("express");
require("./event");
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const server = express();

const app = require("http").createServer(server);
const io = require("socket.io")(app);
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");

const fs = require("fs");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);

// db connection
main().catch((err) => console.log("Database Connection Error:", err));
async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database Connected");
}

// middle ware

// const auth = (req, res, next) => {
//   const token = req.get("Authorization").split("Bearer ")[1];
//   try {
//     var decoded = jwt.verify(token, process.env.SECRET_KEY);
//     if (decoded.email) {
//       next();
//     } else {
//       res.sendStatus(401);
//     }
//   } catch (error) {
//     res.sendStatus(401);
//   }
//   console.log(decoded);
// };

//with error handling

const auth = (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "No Authorization header provided" });
  }

  // Extract the token from the Authorization header
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid Authorization format" });
  }
  const token = parts[1];

  // Verify the JWT token
  try {
    const decoded = jwt.verify(token, publicKey);
    if (!decoded || !decoded.email) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded; // Add the decoded user info to the request object
    next();
  } catch (error) {
    // Handle different types of JWT errors
    let errorMessage = "Authentication failed";
    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Invalid token";
    }
    return res.status(401).json({ error: errorMessage });
  }
};

io.on("connection", (socket) => {
  console.log(`A socket connection to the server has been made - socket.id: `,socket.id);
  
  socket.on("msg",  (data) =>{
    console.log({data});
  })

  socket.emit('serverMSG',{server:'hi'})
});

server.use(cors());
//body parser
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // or false, depending on your needs
// server.use(express.urlencoded());
server.use(morgan("combined"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/auth", authRouter.router);
// server.use("/products", auth, productRouter.router);
server.use("/products", productRouter.router);
server.use("/users", auth, userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// server.use(express.urlencoded) //url encoded

server.use(express.static("public"));




app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
