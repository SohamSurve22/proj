require("dotenv").config();
const mongoose = require("mongoose");
const Detail = require("./models");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data first for repeatable exam demo.
    await Detail.deleteMany({});

    const sampleEvents = [
      {
        eventName: "Tech Fest",
        eventDate: "2026-06-05",
        venue: "Main Hall",
        organizer: "CS Dept",
        maxParticipants: 200
      },
      {
        eventName: "Hackathon",
        eventDate: "2026-06-10",
        venue: "Lab 2",
        organizer: "IT Dept",
        maxParticipants: 120
      },
      {
        eventName: "Sports Day",
        eventDate: "2026-06-12",
        venue: "College Ground",
        organizer: "Sports Committee",
        maxParticipants: 300
      },
      {
        eventName: "Cultural Night",
        eventDate: "2026-06-15",
        venue: "Auditorium",
        organizer: "Cultural Club",
        maxParticipants: 250
      },
      {
        eventName: "Robotics Workshop",
        eventDate: "2026-06-20",
        venue: "Seminar Room",
        organizer: "Robotics Cell",
        maxParticipants: 80
      }
    ];

    await Detail.insertMany(sampleEvents);
    console.log("Sample Event Data Inserted");
    process.exit(0);
  } catch (error) {
    console.log("Seed Error:", error.message);
    process.exit(1);
  }
}

seed();
