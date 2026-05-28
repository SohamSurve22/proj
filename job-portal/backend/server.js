require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Detail = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

// Add a new job (recruiter side).
app.post("/job", async (req, res) => {
  try {
    const newJob = new Detail(req.body);
    await newJob.save();
    res.json({ message: "Job Added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding job" });
  }
});

// Show all jobs (only records where jobTitle exists).
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Detail.find({ jobTitle: { $ne: null } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// Save applicant details + selected job in same collection.
app.post("/apply", async (req, res) => {
  try {
    const applied = new Detail(req.body);
    await applied.save();
    res.json({ message: "Application Submitted" });
  } catch (err) {
    res.status(500).json({ message: "Error applying job" });
  }
});

// Show only rows that have applicant data.
app.get("/applications", async (req, res) => {
  try {
    const data = await Detail.find({ applicantName: { $ne: null } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
