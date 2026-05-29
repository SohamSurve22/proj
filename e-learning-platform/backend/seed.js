const mongoose = require("mongoose");
require("dotenv").config();

const { Course, Student } = require("./models");

// QUICK EDIT FOR EXAM:
// - Modify courses array to match your question (titles, categories, instructors)

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Course.deleteMany({});
    await Student.deleteMany({});

    const courses = [
      {
        title:       "Full Stack Web Development",
        instructor:  "Rahul Sharma",
        category:    "Web Development",
        videoUrl:    "https://www.youtube.com/watch?v=example1",
        description: "Learn HTML, CSS, JavaScript, React and Node.js from scratch.",
      },
      {
        title:       "Python for Data Science",
        instructor:  "Priya Mehta",
        category:    "Data Science",
        videoUrl:    "https://www.youtube.com/watch?v=example2",
        description: "Master Python, Pandas, NumPy and data visualization tools.",
      },
      {
        title:       "Database Management Systems",
        instructor:  "Amit Joshi",
        category:    "Database",
        videoUrl:    "https://www.youtube.com/watch?v=example3",
        description: "SQL, MongoDB, normalization and database design concepts.",
      },
      {
        title:       "Android App Development",
        instructor:  "Sneha Patil",
        category:    "Mobile Development",
        videoUrl:    "https://www.youtube.com/watch?v=example4",
        description: "Build Android apps using Java and Android Studio.",
      },
      {
        title:       "Machine Learning Basics",
        instructor:  "Vikram Nair",
        category:    "Artificial Intelligence",
        videoUrl:    "https://www.youtube.com/watch?v=example5",
        description: "Supervised and unsupervised learning algorithms with hands-on projects.",
      },
    ];

    await Course.insertMany(courses);

    // QUICK EDIT FOR EXAM:
    // - Change sample student names/emails/progress if needed for viva demo.
    const sampleStudents = [
      {
        studentName: "Ananya Kulkarni",
        email:       "ananya@gmail.com",
        courseName:  "Full Stack Web Development",
        progress:    75,
      },
      {
        studentName: "Rohan Desai",
        email:       "rohan@gmail.com",
        courseName:  "Python for Data Science",
        progress:    50,
      },
      {
        studentName: "Pooja Sawant",
        email:       "pooja@gmail.com",
        courseName:  "Database Management Systems",
        progress:    90,
      },
    ];

    await Student.insertMany(sampleStudents);
    console.log("Sample Course Data Inserted");
    console.log("Sample Student Data Inserted");
    process.exit(0);
  } catch (err) {
    console.log("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
