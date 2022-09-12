const mongoose = require("mongoose");

const conn = () => {
     mongoose.connect(process.env.DB_URL, {
          dbName : "products-restful-api",
          useNewUrlParser: true,
          useUnifiedTopology: true
     }).then(()=> {
          console.log("Connected to the DB succesfully");
     }).catch((err) => {
          console.log(`DB connection error: ${err}`);
     });
};

module.exports = conn