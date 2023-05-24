const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const userRout = require("./routes/userRout");
require("dotenv").config();
app.use(express.json());
app.use("/api/user", userRout);
try {
  mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(8080, () => {
      console.log("server running");
    });
  });
} catch (error) {
  console.log(error);
}
