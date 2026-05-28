# Minimal Full Stack Movie Ticket Booking System

This is a Mumbai University TY Full Stack Development practical-style project using only:
- React (frontend)
- Node.js + Express (backend)
- MongoDB + Mongoose (database)
- Plain CSS

It is intentionally small, beginner-friendly, and explainable in viva.

## 1) Folder Structure

```text
movie-ticket-system/
├── backend/
│   ├── server.js
│   ├── models.js
│   ├── seed.js
│   ├── setup.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── Login.js
│   │   ├── Admin.js
│   │   ├── User.js
│   │   ├── index.js
│   │   ├── App.css
│   ├── package.json
├── README.md
```

## 2) Installation Steps

Open two terminals.

### Backend install
```bash
cd backend
npm install
```

### Frontend install
```bash
cd frontend
npm install
```

## 3) MongoDB Setup

- Install MongoDB locally and keep MongoDB service running.
- This project uses localhost only.

## 4) `.env` Setup Explanation

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movie
```

Backend uses:
- `require("dotenv").config()`
- `process.env.MONGO_URI`
- `process.env.PORT`

## 5) How to Run `setup.js`

From `backend` folder:

```bash
npm run setup
```

This script:
- connects MongoDB
- creates database `movie`
- creates collection `details`
- prints:
  - `MongoDB Connected`
  - `Database Ready`

## 6) How to Run `seed.js`

From `backend` folder:

```bash
npm run seed
```

This script:
- clears old data from `details`
- inserts 5 sample movies:
  - Project Hail Mary
  - Interstellar
  - Batman
  - Inception
  - F1
- prints: `Sample Movie Data Inserted`

## 7) How to Run Backend

From `backend` folder:

```bash
npm start
```

Backend URL: `http://localhost:5000`

## 8) How to Run Frontend

From `frontend` folder:

```bash
npm start
```

Frontend URL usually: `http://localhost:3000`

## 9) Required Packages

### Backend
- express
- mongoose
- cors
- dotenv

### Frontend
- react
- react-dom
- react-scripts
- axios

## 10) API Routes

- `POST /movie` -> add movie (admin)
- `GET /movies` -> get all movies
- `POST /booking` -> book ticket
- `GET /bookings` -> get all bookings

## 11) Database + Collection Explanation

Only one database and one collection are used:
- Database: `movie`
- Collection: `details`

All data is stored in same collection with this structure:

```js
{
  movieName: String,
  genre: String,
  timing: String,
  price: Number,
  customerName: String,
  selectedSeats: [String],
  paymentMethod: String,
  paymentStatus: String
}
```

Movie rows keep booking fields empty.
Booking rows include all fields.

## 12) Admin Login Credentials

- Email: `admin@gmail.com`
- Password: `admin123`

## 13) Login Flow Explanation

- User side opens directly (no login needed).
- Admin clicks **Admin Login**.
- If credentials are correct -> Admin Dashboard opens.
- Else -> `alert("Invalid Credentials")`.

## 14) Seat Selection Working

- Seats are simple array in frontend: `A1, A2, A3, B1, B2, B3`
- Rendered using `map()` in a grid.
- Colors:
  - available: white
  - selected: green
  - booked: gray (disabled)
- Seat state is managed by React `useState`.

## 15) Main Features Implemented

- Movie listing (name, genre, timing, price)
- Seat selection with clickable boxes
- Ticket booking with customer name
- Fake payment dropdown (UPI/Card/Cash)
- Payment status stored as `Paid`
- Ticket confirmation card
- Booking history table
- Admin add movie
- Admin view bookings

## 16) Viva Explanation Points (Quick)

1. This is MERN-style but JavaScript-only project.
2. I used one schema and one collection `details` as per requirement.
3. Movies and bookings are separated using query conditions on `customerName`.
4. Seat selection is done on frontend with simple state and button grid.
5. Booked seats are disabled by checking existing bookings for same movie + timing.
6. Admin auth is hardcoded for exam simplicity (no JWT/session).
7. Payment is fake dropdown but stored with status `Paid`.
8. Code is intentionally short and easy to explain in practical exam.

## 17) Notes for Exam Modification

- Change seats quickly in `frontend/src/User.js` (`seatList` array).
- Change admin login quickly in `frontend/src/Login.js`.
- Change default payment status in `backend/server.js`.
- Change sample movies in `backend/seed.js`.
