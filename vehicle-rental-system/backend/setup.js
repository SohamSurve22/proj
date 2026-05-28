const mongoose = require("mongoose");
require("dotenv").config();
const Detail = require("./models");

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await Detail.createCollection();
    console.log("Database Ready");
  } catch (err) {
    console.log("Setup Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

setup();
