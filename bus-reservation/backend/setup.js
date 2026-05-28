const mongoose = require("mongoose");
require("dotenv").config();

// QUICK EDIT FOR EXAM:
// - Change MONGO_URI in .env

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Touch DB + collections by loading models
    require("./models");

    const db = mongoose.connection.db;
    await db.listCollections().toArray(); // triggers db creation if needed

    console.log("Database Ready");
    process.exit(0);
  } catch (err) {
    console.log("Setup failed:", err.message);
    process.exit(1);
  }
}

setup();

