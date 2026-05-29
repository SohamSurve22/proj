const mongoose = require("mongoose");
require("dotenv").config();

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    require("./models");
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: "details" }).toArray();
    if (collections.length === 0) {
      await db.createCollection("details");
    }

    console.log("Database Ready");
  } catch (err) {
    console.log("Setup Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

setup();
