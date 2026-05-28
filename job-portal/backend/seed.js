require("dotenv").config();
const mongoose = require("mongoose");
const Detail = require("./models");

const sampleJobs = [
  {
    jobTitle: "Frontend Developer",
    companyName: "CodeWave",
    salary: "6 LPA",
    location: "Mumbai",
    description: "Build simple React UI."
  },
  {
    jobTitle: "Backend Developer",
    companyName: "NodeNest",
    salary: "7 LPA",
    location: "Pune",
    description: "Create REST APIs using Express."
  },
  {
    jobTitle: "UI/UX Designer",
    companyName: "PixelCraft",
    salary: "5 LPA",
    location: "Mumbai",
    description: "Design clean user screens."
  },
  {
    jobTitle: "Data Analyst",
    companyName: "InsightHub",
    salary: "5.5 LPA",
    location: "Navi Mumbai",
    description: "Analyze data and build reports."
  },
  {
    jobTitle: "Cybersecurity Intern",
    companyName: "SecureNet",
    salary: "Stipend 15k",
    location: "Thane",
    description: "Support security testing tasks."
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Detail.deleteMany({});
    await Detail.insertMany(sampleJobs);
    console.log("Sample Job Data Inserted");
  } catch (err) {
    console.log("Seed Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

seed();
