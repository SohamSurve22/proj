import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Admin({ onLogout }) {
  const [form, setForm] = useState({ movieName: "", genre: "", timing: "", price: "" });
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await axios.get(`${API}/bookings`);
    setBookings(res.data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const addMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/movie`, form);
      alert("Movie added");
      setForm({ movieName: "", genre: "", timing: "", price: "" });
    } catch {
      alert("Could not add movie");
    }
  };

  return (
    <div className="page">
      <div className="topbar">
        <h2>Admin Dashboard</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      <div className="card">
        <h3>Add Movie</h3>
        <form onSubmit={addMovie} className="form">
          <input
            placeholder="Movie Name"
            value={form.movieName}
            onChange={(e) => setForm({ ...form, movieName: e.target.value })}
          />
          <input
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />
          <input
            placeholder="Timing"
            value={form.timing}
            onChange={(e) => setForm({ ...form, timing: e.target.value })}
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button type="submit">Add Movie</button>
        </form>
      </div>

      <div className="card">
        <h3>All Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Movie</th>
              <th>Seats</th>
              <th>Timing</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.customerName}</td>
                <td>{b.movieName}</td>
                <td>{(b.selectedSeats || []).join(", ")}</td>
                <td>{b.timing}</td>
                <td>{b.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
