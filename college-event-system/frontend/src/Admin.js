import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Admin({ onLogout }) {
  const [eventForm, setEventForm] = useState({
    eventName: "",
    eventDate: "",
    venue: "",
    organizer: "",
    maxParticipants: ""
  });
  const [participants, setParticipants] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    upcomingEvents: 0,
    attendanceSummary: { present: 0, absent: 0 },
    participantCountByEvent: []
  });

  const loadParticipants = async () => {
    try {
      const res = await axios.get(`${API}/participants`);
      setParticipants(res.data);
    } catch (error) {
      alert("Cannot load participants");
    }
  };

  const loadDashboard = async () => {
    try {
      const res = await axios.get(`${API}/dashboard`);
      setDashboard(res.data);
    } catch (error) {
      alert("Cannot load dashboard");
    }
  };

  const refresh = () => {
    loadParticipants();
    loadDashboard();
  };

  useEffect(() => {
    refresh();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      // Students can quickly edit these fields during practical.
      await axios.post(`${API}/event`, {
        ...eventForm,
        maxParticipants: Number(eventForm.maxParticipants)
      });
      alert("Event Added");
      setEventForm({
        eventName: "",
        eventDate: "",
        venue: "",
        organizer: "",
        maxParticipants: ""
      });
      refresh();
    } catch (error) {
      alert("Event Add Failed");
    }
  };

  const markAttendance = async (id, attendance) => {
    try {
      await axios.post(`${API}/attendance`, { id, attendance });
      alert("Attendance Updated");
      refresh();
    } catch (error) {
      alert("Attendance Failed");
    }
  };

  return (
    <div>
      <button className="logout" onClick={onLogout}>
        Logout
      </button>

      <div className="card">
        <h2>Dashboard</h2>
        <p>Total Events: {dashboard.totalEvents}</p>
        <p>Total Participants: {dashboard.totalParticipants}</p>
        <p>Upcoming Events: {dashboard.upcomingEvents}</p>
        <p>
          Attendance - Present: {dashboard.attendanceSummary.present} | Absent:{" "}
          {dashboard.attendanceSummary.absent}
        </p>
        <h3>Participants Per Event</h3>
        {dashboard.participantCountByEvent.map((x, i) => (
          <div key={i} className="item">
            {x.eventName}: {x.count}
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Add Event</h2>
        <form onSubmit={addEvent}>
          <input
            placeholder="Event Name"
            value={eventForm.eventName}
            onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })}
            required
          />
          <input
            type="date"
            value={eventForm.eventDate}
            onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
            required
          />
          <input
            placeholder="Venue"
            value={eventForm.venue}
            onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
            required
          />
          <input
            placeholder="Organizer"
            value={eventForm.organizer}
            onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Max Participants"
            value={eventForm.maxParticipants}
            onChange={(e) =>
              setEventForm({ ...eventForm, maxParticipants: e.target.value })
            }
            required
          />
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="card">
        <h2>Participants & Attendance</h2>
        {participants.map((p) => (
          <div key={p._id} className="item">
            <b>{p.studentName}</b> ({p.department}) - {p.eventName} - {p.attendance || "Absent"}
            <div className="small-buttons">
              <button onClick={() => markAttendance(p._id, "Present")}>Present</button>
              <button onClick={() => markAttendance(p._id, "Absent")}>Absent</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
