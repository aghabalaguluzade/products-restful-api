const User = require("../models/User");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
     name : Joi.string().required().min(3).max(255),
     email : Joi.string().required().email().min(3).max(255),
     password : Joi.string().required().min(6).max(255)
});

const loginSchema = Joi.object({
     email : Joi.string().required(),
     password : Joi.string().required()
});

const authRegister = async (req,res,next) => {
     const { name, email, password } = req.body;
     const { error } = registerSchema.validate({ name, email, password },{ abortEarly: false });
     if(error) {
          return res.status(400).send(error.message);
     }
     const salt = bcryptjs.genSaltSync(10);
     const hash = bcryptjs.hashSync(password, salt);
     const user = new User({ name, email, password : hash });
     try {
          const saveUser = await user.save();
          const token = jwt.sign({ _id : saveUser._id }, process.env.JWT_SECRET);

          res.header("Authorization", token).json({ accessToken : token });
     } catch (error) {
          res.json({ message : error });
     };
};

const authLogin = async (req,res,next) => {
     const { email, password } = req.body;
     const { error } = loginSchema.validate({ email, password });
     
     if(error) {
          res.status(400).send(error.message);
          return
     };
     
     const user = await User.findOne({ email });
     try {
          
          if(!user) {
               res.status(400).send("Invalid email");
               return;
          };
               
          const isValid = bcryptjs.compareSync(password, user.password);
          
          if(!isValid) {
               res.status(400).send("Invalid password");
               return;
          };

          const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET);

          res.header("Authorization", token).json({ accessToken : token });
     
     } catch (error) {
          res.status(400).send("Invalid email or password");
     };
};


module.exports = {
     authRegister,
     authLogin
}