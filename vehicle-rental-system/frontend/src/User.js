import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function User() {
  const [search, setSearch] = useState({ vehicleType: "", brand: "", price: "" });
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [rentalDays, setRentalDays] = useState("");
  const [total, setTotal] = useState(0);

  const loadVehicles = async (query = "") => {
    const res = await axios.get(`${API}/vehicles${query}`);
    setVehicles(res.data);
  };

  const loadBookings = async () => {
    const res = await axios.get(`${API}/bookings`);
    setBookings(res.data);
  };

  useEffect(() => {
    loadVehicles();
    loadBookings();
  }, []);

  const searchVehicles = async (e) => {
    e.preventDefault();
    try {
      const q = `?vehicleType=${search.vehicleType}&brand=${search.brand}&price=${search.price}`;
      loadVehicles(q);
    } catch (err) {
      alert("Search failed");
    }
  };

  const selectedVehicle = vehicles.find((v) => v._id === vehicleId);

  // QUICK EXAM EDIT:
  // Total charge formula: pricePerDay * rentalDays
  useEffect(() => {
    const days = Number(rentalDays || 0);
    setTotal(selectedVehicle ? selectedVehicle.pricePerDay * days : 0);
  }, [vehicleId, rentalDays, selectedVehicle]);

  const bookVehicle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/booking`, {
        customerName,
        vehicleId,
        rentalDays: Number(rentalDays)
      });
      alert("Booking Confirmed");
      setCustomerName("");
      setVehicleId("");
      setRentalDays("");
      setTotal(0);
      loadBookings();
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <>
      <div className="card">
        <h3>Search Vehicles</h3>
        <form onSubmit={searchVehicles} className="formGrid">
          <input
            placeholder="Vehicle Type"
            value={search.vehicleType}
            onChange={(e) => setSearch({ ...search, vehicleType: e.target.value })}
          />
          <input placeholder="Brand" value={search.brand} onChange={(e) => setSearch({ ...search, brand: e.target.value })} />
          <input type="number" placeholder="Max Price" value={search.price} onChange={(e) => setSearch({ ...search, price: e.target.value })} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="card">
        <h3>Vehicle List</h3>
        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Brand</th>
              <th>Type</th>
              <th>Price/Day</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>{v.vehicleName}</td>
                <td>{v.brand}</td>
                <td>{v.vehicleType}</td>
                <td>Rs {v.pricePerDay}</td>
                <td>{v.available ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Book Vehicle</h3>
        <form onSubmit={bookVehicle} className="formGrid">
          <input placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} required>
            <option value="">Select Vehicle</option>
            {vehicles
              .filter((v) => v.available)
              .map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vehicleName} - Rs {v.pricePerDay}/day
                </option>
              ))}
          </select>
          <input type="number" placeholder="Rental Days" value={rentalDays} onChange={(e) => setRentalDays(e.target.value)} required />
          <input value={`Total Charge: Rs ${total}`} readOnly />
          <button type="submit">Confirm Booking</button>
        </form>
      </div>

      <div className="card">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Days</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.customerName}</td>
                <td>{b.vehicleName}</td>
                <td>{b.rentalDays}</td>
                <td>Rs {b.totalCharge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default User;
