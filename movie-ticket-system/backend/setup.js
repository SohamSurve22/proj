const mongoose = require("mongoose");
require("dotenv").config();

async function setupDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await mongoose.connection.db.createCollection("details");
    console.log("Database Ready");
  } catch (error) {
    if (error.codeName === "NamespaceExists") {
      console.log("MongoDB Connected");
      console.log("Database Ready");
    } else {
      console.log("Setup Error:", error.message);
    }
  } finally {
    await mongoose.connection.close();
  }
}

setupDB();
