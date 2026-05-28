const mongoose = require("mongoose");
require("dotenv").config();

// QUICK EDIT FOR EXAM:
// This file is run once to check if MongoDB is configured and connection is working.
async function setup() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Load model to compile schema
    const { Detail } = require("./models");

    // Retrieve database instance
    const db = mongoose.connection.db;

    // Check if "details" collection exists, if not, create it
    const collections = await db.listCollections({ name: "details" }).toArray();
    if (collections.length === 0) {
      await db.createCollection("details");
    }

    console.log("Database Ready");
    process.exit(0);
  } catch (err) {
    console.error("Setup failed:", err.message);
    process.exit(1);
  }
}

setup();
