const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const conn = require("./server");
const bodyParser = require("body-parser");
const cors = require("cors");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const verifyToken = require("./middleware/verifyToken");

const app = express();

//connection database
conn();

//app.use()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use("/products", verifyToken, productsRouter);
app.use("/auth",authRouter);
app.use(cors());

app.get("/", (req,res) => {
     res.send("HELLO WORLD!");
});

const port = process.env.PORT;

app.listen(port, () => {
     console.log("Server is running on port 5000");
});