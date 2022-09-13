const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
     name : {
          type : String,
          required : true
     },
     description : {
          type : String,
          required : true
     },
     price : {
          type : Number,
          required : true
     },
     createdAt : {
          type : Date,
          default : Date.now
     },
     user : {
          type : mongoose.Types.ObjectId
     }
});

module.exports = mongoose.model("Product",ProductSchema);