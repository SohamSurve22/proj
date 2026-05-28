cd backend
npm install
mongouri in the .env
node setup.js
node seed.js
npm start

cd frontend
npm install
npm run build
npm start
## 1) Installation Steps

1. Open terminal in `bus-reservation`.
2. Install backend dependencies.
3. Install frontend dependencies.
4. Run setup script.
5. Run seed script.
6. Start backend.
7. Start frontend.

## 2) npm install Commands

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 3) MongoDB Setup

- Install MongoDB Community Server if not installed.
- Start MongoDB service locally.
- This project uses local DB URL:
  `mongodb://127.0.0.1:27017/busdb`

## 4) How to run setup.js

```bash
cd backend
npm run setup
```

Expected logs:
- `MongoDB Connected`
- `Database Ready`

## 5) How to run seed.js

```bash
cd backend
npm run seed
```

Expected log:
- `Sample Bus Data Inserted`

## 6) How to run backend

```bash
cd backend
npm start
```

Backend URL: `http://localhost:5000`

## 7) How to run frontend

```bash
cd frontend
npm start
```

Frontend URL: `http://localhost:3000`

## 8) Required Packages

### Backend
- `express`
- `mongoose`
- `cors`
- `dotenv`
- `nodemon` (dev only)

### Frontend
- `react`
- `react-dom`
- `react-scripts`
- `axios`

## 9) API Routes

### Bus APIs
- `POST /bus` -> add a bus
- `GET /buses` -> get all buses
- `GET /search?source=&destination=&date=` -> search buses

### Booking APIs
- `POST /booking` -> create booking + reduce seat + set payment paid
- `GET /bookings` -> get booking history

## 10) MongoDB Collection Fields

### Bus Collection
```js
{
  busName: String,
  source: String,
  destination: String,
  date: String,
  totalSeats: Number,
  availableSeats: Number,
  price: Number
}
```

### Booking Collection
```js
{
  passengerName: String,
  busId: String,
  seatNumber: Number,
  paymentMethod: String,
  paymentStatus: String
}
```

## 11) `.env` Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/busdb
```

- `PORT` is used in `server.js` with `process.env.PORT`.
- `MONGO_URI` is used in MongoDB connection with `process.env.MONGO_URI`.
- `require("dotenv").config()` is already used in backend files.

## 12) Viva Explanation Points

Use these short points in viva:

1. This is MERN-style app but JavaScript only (no TypeScript).
2. Backend has two models: `Bus` and `Booking`.
3. Search API filters by source, destination, and date.
4. Booking API decreases `availableSeats` after successful booking.
5. Seat number is auto generated from total - available.
6. Payment is fake; selected method stored and status fixed as `Paid`.
7. Frontend is single-page `App.js` with sections:
   - Add Bus
   - View Buses
   - Search Bus
   - Book Ticket
   - Booking History
8. `setup.js` initializes DB connection and readiness.
9. `seed.js` inserts 5 sample routes after clearing old data.
10. CSS is minimal plain CSS for clean exam UI.

## Sample Routes inserted by seed

- Mumbai -> Pune
- Mumbai -> Nashik
- Thane -> Goa
- Pune -> Nagpur
- Mumbai -> Surat

## Notes for Quick Exam Modifications

- Change API port / DB URL in `backend/.env`.
- Change bus sample data in `backend/seed.js`.
- Add/remove fields in `backend/models.js`.
- UI labels/forms can be edited in `frontend/src/App.js`.

