import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Student() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    email: "",
    department: "",
    eventName: ""
  });

  const loadEvents = async () => {
    try {
      const res = await axios.get(`${API}/events`);
      setEvents(res.data);
    } catch (error) {
      alert("Cannot load events");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/register`, form);
      alert("Registration Successful");
      setForm({ studentName: "", email: "", department: "", eventName: "" });
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Student Event Registration</h2>
        <form onSubmit={register}>
          <input
            placeholder="Student Name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
          <select
            value={form.eventName}
            onChange={(e) => setForm({ ...form, eventName: e.target.value })}
            required
          >
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event._id} value={event.eventName}>
                {event.eventName}
              </option>
            ))}
          </select>
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="card">
        <h2>Event List</h2>
        {events.map((event) => (
          <div key={event._id} className="item">
            <b>{event.eventName}</b> | {event.eventDate} | {event.venue}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student;
