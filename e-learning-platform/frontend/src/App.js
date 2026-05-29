import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  // QUICK EDIT FOR EXAM:
  // - Change API URL above if backend port changes.

  const [courseForm, setCourseForm] = useState({
    title: "",
    instructor: "",
    category: "",
    videoUrl: "",
    description: "",
  });

  const [studentForm, setStudentForm] = useState({
    studentName: "",
    email: "",
    courseName: "",
    progress: "",
  });

  const [courses,  setCourses]  = useState([]);
  const [students, setStudents] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      alert("Could not fetch courses");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data);
    } catch (err) {
      alert("Could not fetch students");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  // --- DASHBOARD CALCULATIONS ---
  const totalCourses  = courses.length;
  const totalStudents = students.length;
  // Average progress across all enrolled students
  const avgProgress =
    students.length > 0
      ? Math.round(
          students.reduce((sum, s) => sum + s.progress, 0) / students.length
        )
      : 0;

  // --- ADD COURSE ---
  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/course`, courseForm);
      alert("Course added successfully!");
      setCourseForm({ title: "", instructor: "", category: "", videoUrl: "", description: "" });
      fetchCourses();
    } catch (err) {
      alert("Could not add course");
    }
  };

  // --- ENROLL STUDENT ---
  const enrollStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/student`, {
        ...studentForm,
        progress: Number(studentForm.progress),
      });
      alert("Student enrolled successfully!");
      setStudentForm({ studentName: "", email: "", courseName: "", progress: "" });
      fetchStudents();
    } catch (err) {
      alert("Could not enroll student");
    }
  };

  // Reusable card wrapper (same pattern as sample)
  const card = (title, body) => (
    <div className="card">
      <h2>{title}</h2>
      {body}
    </div>
  );

  return (
    <div className="container">
      <h1>E-Learning Platform</h1>

      {/* ── DASHBOARD ── */}
      {card(
        "Dashboard",
        <div className="stats">
          <div className="stat-box">
            <span className="stat-num">{totalCourses}</span>
            <span className="stat-label">Total Courses</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{totalStudents}</span>
            <span className="stat-label">Total Students</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{avgProgress}%</span>
            <span className="stat-label">Avg Progress</span>
          </div>
        </div>
      )}

      {/* ── ADD COURSE ── */}
      {card(
        "Add Course",
        <form onSubmit={addCourse} className="grid">
          <input
            placeholder="Course Title"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
            required
          />
          <input
            placeholder="Instructor Name"
            value={courseForm.instructor}
            onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
            required
          />
          {/* QUICK EDIT FOR EXAM: Change category options below */}
          <select
            value={courseForm.category}
            onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option>Web Development</option>
            <option>Data Science</option>
            <option>Database</option>
            <option>Mobile Development</option>
            <option>Artificial Intelligence</option>
            <option>Cybersecurity</option>
            <option>Cloud Computing</option>
          </select>
          <input
            placeholder="Video Lecture URL"
            value={courseForm.videoUrl}
            onChange={(e) => setCourseForm({ ...courseForm, videoUrl: e.target.value })}
            required
          />
          <input
            placeholder="Course Description"
            value={courseForm.description}
            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
            required
          />
          <button type="submit">Add Course</button>
        </form>
      )}

      {/* ── ENROLL STUDENT ── */}
      {card(
        "Enroll Student",
        <form onSubmit={enrollStudent} className="grid">
          <input
            placeholder="Student Name"
            value={studentForm.studentName}
            onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={studentForm.email}
            onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
            required
          />
          {/* Dropdown populated from fetched courses */}
          <select
            value={studentForm.courseName}
            onChange={(e) => setStudentForm({ ...studentForm, courseName: e.target.value })}
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Progress % (0-100)"
            min="0"
            max="100"
            value={studentForm.progress}
            onChange={(e) => setStudentForm({ ...studentForm, progress: e.target.value })}
            required
          />
          <button type="submit">Enroll Student</button>
        </form>
      )}

      {/* ── VIEW COURSES ── */}
      {card(
        "All Courses",
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Instructor</th>
              <th>Category</th>
              <th>Video URL</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={c._id}>
                <td>{i + 1}</td>
                <td>{c.title}</td>
                <td>{c.instructor}</td>
                <td>{c.category}</td>
                <td>
                  <a href={c.videoUrl} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                </td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ── VIEW STUDENTS ── */}
      {card(
        "Enrolled Students",
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td>{s.studentName}</td>
                <td>{s.email}</td>
                <td>{s.courseName}</td>
                <td>
                  {/* Progress bar - Students can remove this if not needed */}
                  <div className="progress-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: s.progress + "%" }}
                    />
                    <span className="progress-text">{s.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
