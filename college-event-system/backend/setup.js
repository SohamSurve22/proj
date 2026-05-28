require("dotenv").config();
const mongoose = require("mongoose");
const Detail = require("./models");

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Insert one temporary document so DB + collection are created.
    await Detail.create({
      eventName: "Init Event",
      eventDate: "",
      venue: "",
      organizer: "",
      maxParticipants: 0
    });
    await Detail.deleteMany({ eventName: "Init Event" });

    console.log("Database Ready");
    process.exit(0);
  } catch (error) {
    console.log("Setup Error:", error.message);
    process.exit(1);
  }
}

setup();
