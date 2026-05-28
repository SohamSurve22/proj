import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  // QUICK EDIT FOR EXAM:
  // - Change API URL above if backend port changes.
  // - Hardcoded admin login: admin / Admin123

  const [page, setPage] = useState("user"); // user | admin
  const [adminForm, setAdminForm] = useState({ username: "", password: "" });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [busForm, setBusForm] = useState({
    busName: "",
    source: "",
    destination: "",
    date: "",
    totalSeats: "",
    price: "",
  });
  const [searchForm, setSearchForm] = useState({
    source: "",
    destination: "",
    date: "",
  });
  const [bookingForm, setBookingForm] = useState({
    passengerName: "",
    busId: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [buses, setBuses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${API}/buses`);
      setBuses(res.data);
    } catch (err) {
      alert("Could not fetch buses");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/bookings`);
      setBookings(res.data);
    } catch (err) {
      alert("Could not fetch bookings");
    }
  };

  useEffect(() => {
    fetchBuses();
    fetchBookings();
  }, []);

  const addBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/bus`, {
        ...busForm,
        totalSeats: Number(busForm.totalSeats),
        availableSeats: Number(busForm.totalSeats),
        price: Number(busForm.price),
      });
      alert("Bus added");
      setBusForm({
        busName: "",
        source: "",
        destination: "",
        date: "",
        totalSeats: "",
        price: "",
      });
      fetchBuses();
    } catch (err) {
      alert("Bus add failed");
    }
  };

  const searchBus = async (e) => {
    e.preventDefault();
    try {
      const { source, destination, date } = searchForm;
      const res = await axios.get(
        `${API}/search?source=${source}&destination=${destination}&date=${date}`
      );
      setSearchResults(res.data);
    } catch (err) {
      alert("Search failed");
    }
  };

  const openPayment = (e) => {
    e.preventDefault();
    if (!bookingForm.passengerName || !bookingForm.busId) {
      alert("Enter passenger name and select bus");
      return;
    }
    setShowPayment(true);
  };

  const payAndBook = async () => {
    try {
      const res = await axios.post(`${API}/booking`, {
        ...bookingForm,
        paymentMethod,
      });
      setTicket(res.data);
      alert("Booking successful. Payment status: Paid");
      setBookingForm({ passengerName: "", busId: "" });
      setPaymentMethod("UPI");
      setShowPayment(false);
      fetchBuses();
      fetchBookings();
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  const adminLogin = (e) => {
    e.preventDefault();
    if (adminForm.username === "admin" && adminForm.password === "Admin123") {
      setIsAdminLoggedIn(true);
      alert("Admin login success");
    } else {
      alert("Wrong admin credentials");
    }
  };

  const card = (title, body) => (
    <div className="card">
      <h2>{title}</h2>
      {body}
    </div>
  );

  return (
    <div className="container">
      <h1>Online Bus Reservation System</h1>
      <div className="topNav">
        <button onClick={() => setPage("user")}>User Page</button>
        <button onClick={() => setPage("admin")}>Admin Page</button>
      </div>

      {page === "admin" &&
        !isAdminLoggedIn &&
        card(
          "Admin Login",
          <form onSubmit={adminLogin} className="grid">
            <input
              placeholder="Username"
              value={adminForm.username}
              onChange={(e) =>
                setAdminForm({ ...adminForm, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              required
            />
            <button type="submit">Login</button>
          </form>
        )}

      {page === "admin" &&
        isAdminLoggedIn &&
        card(
          "Add Bus (Admin)",
          <form onSubmit={addBus} className="grid">
            <input
              placeholder="Bus Name"
              value={busForm.busName}
              onChange={(e) => setBusForm({ ...busForm, busName: e.target.value })}
              required
            />
            <input
              placeholder="Source"
              value={busForm.source}
              onChange={(e) => setBusForm({ ...busForm, source: e.target.value })}
              required
            />
            <input
              placeholder="Destination"
              value={busForm.destination}
              onChange={(e) => setBusForm({ ...busForm, destination: e.target.value })}
              required
            />
            <input
              type="date"
              value={busForm.date}
              onChange={(e) => setBusForm({ ...busForm, date: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Total Seats"
              value={busForm.totalSeats}
              onChange={(e) => setBusForm({ ...busForm, totalSeats: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={busForm.price}
              onChange={(e) => setBusForm({ ...busForm, price: e.target.value })}
              required
            />
            <button type="submit">Add Bus</button>
          </form>
        )}

      {(page === "user" || (page === "admin" && isAdminLoggedIn)) &&
        card(
          "View Buses",
          <table>
            <thead>
              <tr>
                <th>Bus</th>
                <th>Route</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((b) => (
                <tr key={b._id}>
                  <td>{b.busName}</td>
                  <td>
                    {b.source} to {b.destination}
                  </td>
                  <td>{b.date}</td>
                  <td>
                    {b.availableSeats}/{b.totalSeats}
                  </td>
                  <td>Rs {b.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      {page === "user" &&
        card(
          "Search Bus",
          <>
            <form onSubmit={searchBus} className="grid">
              <input
                placeholder="Source"
                value={searchForm.source}
                onChange={(e) =>
                  setSearchForm({ ...searchForm, source: e.target.value })
                }
                required
              />
              <input
                placeholder="Destination"
                value={searchForm.destination}
                onChange={(e) =>
                  setSearchForm({ ...searchForm, destination: e.target.value })
                }
                required
              />
              <input
                type="date"
                value={searchForm.date}
                onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                required
              />
              <button type="submit">Search</button>
            </form>

            <table>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Available Seats</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((b) => (
                  <tr key={b._id}>
                    <td>{b.busName}</td>
                    <td>
                      {b.source} to {b.destination}
                    </td>
                    <td>{b.date}</td>
                    <td>{b.availableSeats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      {page === "user" &&
        card(
          "Book Ticket",
          <>
            <form onSubmit={openPayment} className="grid">
              <input
                placeholder="Passenger Name"
                value={bookingForm.passengerName}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, passengerName: e.target.value })
                }
                required
              />
              <select
                value={bookingForm.busId}
                onChange={(e) => setBookingForm({ ...bookingForm, busId: e.target.value })}
                required
              >
                <option value="">Select Bus</option>
                {buses
                  .filter((b) => b.availableSeats > 0)
                  .map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.busName} ({b.source} to {b.destination}) - Seats {b.availableSeats}
                    </option>
                  ))}
              </select>
              <button type="submit">Proceed To Payment</button>
            </form>

            {ticket && (
              <div className="ticket">
                <h3>Ticket Generated</h3>
                <p>Passenger: {ticket.passengerName}</p>
                <p>Bus: {ticket.busId?.busName}</p>
                <p>
                  Route: {ticket.busId?.source} to {ticket.busId?.destination}
                </p>
                <p>Seat Number: {ticket.seatNumber}</p>
                <p>Travel Date: {ticket.busId?.date}</p>
                <p>Payment: {ticket.paymentMethod} ({ticket.paymentStatus})</p>
              </div>
            )}
          </>
        )}

      {(page === "user" || (page === "admin" && isAdminLoggedIn)) &&
        card(
          "Booking History (From bookings Collection)",
          <table>
            <thead>
              <tr>
                <th>Passenger</th>
                <th>Bus</th>
                <th>Route</th>
                <th>Seat</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bk) => (
                <tr key={bk._id}>
                  <td>{bk.passengerName}</td>
                  <td>{bk.busId?.busName}</td>
                  <td>
                    {bk.busId?.source} to {bk.busId?.destination}
                  </td>
                  <td>{bk.seatNumber}</td>
                  <td>{bk.paymentMethod}</td>
                  <td>{bk.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      {showPayment && (
        <div className="overlay">
          <div className="paymentBox">
            <h3>Payment</h3>
            <p>Select payment method</p>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
            <div className="paymentActions">
              <button onClick={payAndBook}>Pay & Confirm</button>
              <button className="cancelBtn" onClick={() => setShowPayment(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

