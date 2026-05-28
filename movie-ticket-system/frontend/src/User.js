import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";
const seatList = ["A1", "A2", "A3", "B1", "B2", "B3"]; // Students can add more seats here

export default function User() {
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [ticket, setTicket] = useState(null);

  const loadData = async () => {
    const [movieRes, bookingRes] = await Promise.all([
      axios.get(`${API}/movies`),
      axios.get(`${API}/bookings`)
    ]);
    setMovies(movieRes.data);
    setBookings(bookingRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedMovie = movies.find((m) => m._id === selectedMovieId);
  const bookedSeats = bookings
    .filter((b) => b.movieName === selectedMovie?.movieName && b.timing === selectedMovie?.timing)
    .flatMap((b) => b.selectedSeats || []);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const bookTicket = async () => {
    if (!customerName || !selectedMovie || selectedSeats.length === 0) {
      alert("Please fill all booking details");
      return;
    }
    try {
      const payload = {
        movieName: selectedMovie.movieName,
        genre: selectedMovie.genre,
        timing: selectedMovie.timing,
        price: selectedMovie.price,
        customerName,
        selectedSeats,
        paymentMethod
      };
      const res = await axios.post(`${API}/booking`, payload);
      setTicket(res.data);
      alert("Booking successful");
      setSelectedSeats([]);
      setCustomerName("");
      setPaymentMethod("UPI");
      loadData();
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div className="page">
      <h2>Movie Ticket Booking</h2>

      <div className="card">
        <h3>Available Movies</h3>
        <div className="movie-grid">
          {movies.map((m) => (
            <div
              key={m._id}
              className={`movie-box ${selectedMovieId === m._id ? "active" : ""}`}
              onClick={() => {
                setSelectedMovieId(m._id);
                setSelectedSeats([]);
              }}
            >
              <p><b>{m.movieName}</b></p>
              <p>{m.genre}</p>
              <p>{m.timing}</p>
              <p>Rs. {m.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Book Ticket</h3>
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <p className="small">Selected Movie: {selectedMovie?.movieName || "None"}</p>
        <div className="seat-grid">
          {seatList.map((seat) => (
            <button
              key={seat}
              className={`seat ${
                bookedSeats.includes(seat)
                  ? "booked"
                  : selectedSeats.includes(seat)
                  ? "selected"
                  : ""
              }`}
              disabled={bookedSeats.includes(seat)}
              onClick={() => toggleSeat(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>UPI</option>
          <option>Card</option>
          <option>Cash</option>
        </select>
        <button onClick={bookTicket}>Confirm Booking</button>
      </div>

      {ticket && (
        <div className="card">
          <h3>Ticket Confirmation</h3>
          <p>Customer: {ticket.customerName}</p>
          <p>Movie: {ticket.movieName}</p>
          <p>Seats: {(ticket.selectedSeats || []).join(", ")}</p>
          <p>Timing: {ticket.timing}</p>
          <p>Payment: {ticket.paymentMethod}</p>
        </div>
      )}

      <div className="card">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Movie</th>
              <th>Seats</th>
              <th>Timing</th>
              <th>Payment</th>
              <th>Status</th>
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
                <td>{b.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
