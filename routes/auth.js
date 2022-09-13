const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(authController.authRegister);
router.route("/login").post(authController.authLogin);

module.exports = router;