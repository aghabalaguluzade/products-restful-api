const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/").get(productController.productGet);
router.route("/").post(productController.productCreate);
router.route("/:id").get(productController.productDetails);
router.route("/:id").put(productController.productUpdate);
router.route("/:id").delete(productController.productDelete);

module.exports = router;