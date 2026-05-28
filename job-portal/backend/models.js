const mongoose = require("mongoose");

// Keep all fields in one schema for easy exam explanation.
const detailSchema = new mongoose.Schema(
  {
    jobTitle: String,
    companyName: String,
    salary: String,
    location: String,
    description: String,
    applicantName: String,
    email: String,
    resume: String
  },
  { collection: "details" } // Required fixed collection name.
);

module.exports = mongoose.model("Detail", detailSchema);
