require("dotenv").config();
const mongoose = require("mongoose");

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Create collection if missing.
    await mongoose.connection.db.createCollection("details").catch(() => {});
    console.log("Database Ready");
  } catch (err) {
    console.log("Setup Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

setup();
