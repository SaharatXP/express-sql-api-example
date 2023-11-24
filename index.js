const cors = require("cors");
const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const app = express();
// const initMySQL = require("./config/db");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");

app.use(express.json());
app.use(cors());
app.use("/api", authRouter);
app.use("/api", productRouter);

const port = 8000;

app.listen(port, async () => {
  console.log("Server started at port 8000");
});
