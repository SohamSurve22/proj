import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Admin() {
  const [form, setForm] = useState({ vehicleName: "", brand: "", vehicleType: "", pricePerDay: "", available: true });
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await axios.get(`${API}/bookings`);
      setBookings(res.data);
    } catch (err) {
      alert("Could not load bookings");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const addVehicle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/vehicle`, { ...form, pricePerDay: Number(form.pricePerDay) });
      alert("Vehicle added");
      setForm({ vehicleName: "", brand: "", vehicleType: "", pricePerDay: "", available: true });
    } catch (err) {
      alert("Could not add vehicle");
    }
  };

  return (
    <>
      <div className="card">
        <h3>Add Vehicle</h3>
        <form onSubmit={addVehicle} className="formGrid">
          <input
            placeholder="Vehicle Name"
            value={form.vehicleName}
            onChange={(e) => setForm({ ...form, vehicleName: e.target.value })}
            required
          />
          <input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
          <input
            placeholder="Vehicle Type"
            value={form.vehicleType}
            onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price Per Day"
            value={form.pricePerDay}
            onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="card">
        <h3>All Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Days</th>
              <th>Total Charge</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.customerName || "-"}</td>
                <td>{b.vehicleName}</td>
                <td>{b.rentalDays || "-"}</td>
                <td>{b.totalCharge ? `Rs ${b.totalCharge}` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
