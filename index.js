const express = require("express");
const productsRouter = require("./routes/products");
const mongoose = require("mongoose");
require("dotenv").config();
const conn = require("./server");
const bodyParser = require("body-parser");

const app = express();

//connection database
conn();

//app.use()
app.use(bodyParser.json());
app.use("/products" ,productsRouter);

app.get("/", (req,res) => {
     res.send("HELLO WORLD!");
});

const port = process.env.PORT;

app.listen(port, () => {
     console.log("Server is running on port 5000");
});