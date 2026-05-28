import React, { useState, useEffect } from "react";
import axios from "axios";

// QUICK EDIT FOR EXAM:
// Change API port if backend is running on a different port.
const API_URL = "http://localhost:5000";

function User() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Form states
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // Default to UPI

  // Fetch all rooms and bookings on load
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

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedRoomId) {
      alert("Please select a room to book!");
      return;
    }

    try {
      const payload = {
        roomId: selectedRoomId,
        customerName,
        checkInDate,
        checkOutDate,
        paymentMethod
      };

      await axios.post(`${API_URL}/booking`, payload);
      alert("Booking Confirmed Successfully!");
      
      // Reset form
      setSelectedRoomId("");
      setCustomerName("");
      setCheckInDate("");
      setCheckOutDate("");
      setPaymentMethod("UPI");

      // Refresh listings
      fetchRooms();
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed!");
    }
  };

  return (
    <div className="user-dashboard">
      <h2 className="section-title">Customer Room Booking Portal</h2>

      {/* Available Rooms Section */}
      <div className="section-container">
        <h3>Available Rooms</h3>
        <div className="cards-grid">
          {rooms.length === 0 ? (
            <p>No rooms added yet. Contact Admin.</p>
          ) : (
            rooms.map((room) => (
              <div key={room._id} className="room-card">
                <h4>Room {room.roomNumber}</h4>
                <p><strong>Type:</strong> {room.roomType}</p>
                <p><strong>Price:</strong> ₹{room.price} / night</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={room.available ? "badge badge-success" : "badge badge-danger"}>
                    {room.available ? "Available" : "Booked"}
                  </span>
                </p>
                {room.available && (
                  <button
                    className="btn btn-teal btn-sm"
                    onClick={() => setSelectedRoomId(room._id)}
                  >
                    Select Room
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="section-container booking-form-container">
        <h3>Book a Room</h3>
        <form onSubmit={handleBooking} className="grid-form">
          <div className="form-group">
            <label>Selected Room</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              required
            >
              <option value="">-- Choose a Room --</option>
              {rooms
                .filter((r) => r.available)
                .map((r) => (
                  <option key={r._id} value={r._id}>
                    Room {r.roomNumber} - {r.roomType} (₹{r.price}/night)
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Check-In Date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Check-Out Date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="UPI">UPI</option>
              <option value="Card">Debit/Credit Card</option>
              <option value="Cash">Cash at Counter</option>
            </select>
          </div>

          <div className="form-group btn-group-align">
            <button type="submit" className="btn btn-teal">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>

      {/* Booking History Section */}
      <div className="section-container">
        <h3>Booking History</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Room #</th>
                <th>Room Type</th>
                <th>Price / Night</th>
                <th>Customer Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No bookings recorded yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.roomNumber}</td>
                    <td>{booking.roomType}</td>
                    <td>₹{booking.price}</td>
                    <td>{booking.customerName}</td>
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

export default User;
