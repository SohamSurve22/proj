import React, { useState, useEffect } from "react";
import axios from "axios";

// QUICK EDIT FOR EXAM:
// Change API port if backend is running on a different port.
const API_URL = "http://localhost:5000";

function Admin() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Add Room Form States
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Deluxe Room"); // Default selection
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/rooms`);
      setRooms(response.data);
    } catch (err) {
      console.error("Error fetching rooms:", err.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const newRoom = {
        roomNumber,
        roomType,
        price: Number(price),
        available
      };

      await axios.post(`${API_URL}/room`, newRoom);
      alert("New Room Added Successfully!");

      // Reset form
      setRoomNumber("");
      setPrice("");
      setAvailable(true);

      // Refresh list
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || "Could not add room");
    }
  };

  const toggleAvailability = async (roomId, currentStatus) => {
    try {
      await axios.put(`${API_URL}/room/${roomId}`, {
        available: !currentStatus
      });
      alert("Room availability updated successfully!");
      fetchRooms();
    } catch (err) {
      alert("Failed to update availability!");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="section-title">Admin Management Dashboard</h2>

      {/* Grid Layout for Forms & Management */}
      <div className="admin-grid">
        {/* Add Room Section */}
        <div className="section-container">
          <h3>Add New Room</h3>
          <form onSubmit={handleAddRoom}>
            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g., 201"
                required
              />
            </div>

            <div className="form-group">
              <label>Room Type</label>
              <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="AC Room">AC Room</option>
                <option value="Non-AC Room">Non-AC Room</option>
                <option value="Suite Room">Suite Room</option>
                <option value="Single Room">Single Room</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price per Night (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 2500"
                required
              />
            </div>

            <div className="form-group">
              <label>Initial Availability</label>
              <select
                value={available.toString()}
                onChange={(e) => setAvailable(e.target.value === "true")}
              >
                <option value="true">Available</option>
                <option value="false">Booked / Maintenance</option>
              </select>
            </div>

            <button type="submit" className="btn btn-teal">
              Add Room
            </button>
          </form>
        </div>

        {/* Room List & Availability Toggle */}
        <div className="section-container">
          <h3>Manage Rooms</h3>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Room #</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No rooms added yet.
                    </td>
                  </tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room._id}>
                      <td>{room.roomNumber}</td>
                      <td>{room.roomType}</td>
                      <td>₹{room.price}</td>
                      <td>
                        <span className={room.available ? "badge badge-success" : "badge badge-danger"}>
                          {room.available ? "Available" : "Booked"}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleAvailability(room._id, room.available)}
                          className={room.available ? "btn btn-danger btn-xs" : "btn btn-success btn-xs"}
                        >
                          {room.available ? "Mark Booked" : "Mark Available"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Booking Details Table */}
      <div className="section-container" style={{ marginTop: "30px" }}>
        <h3>All Booking Details</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Room #</th>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.customerName}</td>
                    <td>{booking.roomNumber}</td>
                    <td>{booking.roomType}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkOutDate}</td>
                    <td>{booking.paymentMethod}</td>
                    <td>
                      <span className="badge badge-success">{booking.paymentStatus}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
