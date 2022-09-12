const Product = require("../models/Product");

const productCreate = async (req,res) => {
     const product = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
     });
     try {
          const saveProduct = await product.save();
          res.json(saveProduct);
     } catch (error) {
          res.json({ message : error });
     };
};

const productGet = async (req,res) => {
     try {
          const product = await Product.find();
          res.json(product);
     } catch (error) {
          res.json({ message : error });
     };
};

const productDetails = async (req,res) => {
     try {
          const product = await Product.findById(req.params.id);
          res.json(product);
     } catch (error) {
          res.json({ message : error });
     };
};

const productDelete = async (req,res) => {
     try {
          const product = await Product.remove({ _id : req.params.id });
          res.json(product);
     } catch (error) {
          res.json({ message : error });
     };
};

const productUpdate = async (req,res) => {
     try {
          const product = await Product.updateOne({ _id : req.params.id },
               {
                    name : req.body.name,
                    description : req.body.description,
                    price : req.body.price
               }
          );
          res.json(product);
     } catch (error) {
          res.json({ message : error });
     };
};

module.exports = {
     productCreate,
     productGet,
     productDetails,
     productDelete,
     productUpdate
};