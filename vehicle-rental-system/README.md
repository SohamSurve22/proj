# Vehicle Rental Management System (Exam Practical)

Minimal Full Stack project using JavaScript only:
- Frontend: React + Axios + Plain CSS
- Backend: Node.js + Express + MongoDB + Mongoose

Built for Mumbai University TY practical exam style (short, simple, explainable in viva).

## Folder Structure

```txt
vehicle-rental-system/
│
├── backend/
│   ├── server.js
│   ├── models.js
│   ├── seed.js
│   ├── setup.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── Login.js
│   │   ├── Admin.js
│   │   ├── User.js
│   │   ├── index.js
│   │   ├── App.css
│   ├── package.json
│
├── README.md
```

## 1) Installation Steps

1. Open terminal in `vehicle-rental-system`.
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

- Install MongoDB Community Server.
- Start MongoDB locally.
- This project uses local MongoDB URL:
  `mongodb://127.0.0.1:27017/rental`

## 4) How to run setup.js

```bash
cd backend
npm run setup
```

Expected output:
- `MongoDB Connected`
- `Database Ready`

## 5) How to run seed.js

```bash
cd backend
npm run seed
```

Expected output:
- `Sample Vehicle Data Inserted`

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

### Frontend
- `react`
- `react-dom`
- `react-scripts`
- `axios`

## 9) API Routes

- `POST /vehicle` -> Add vehicle (admin)
- `GET /vehicles` -> Get all vehicles / search vehicles
- `POST /booking` -> Create booking + calculate total charge
- `GET /bookings` -> Booking history

## 10) Database + Collection Explanation

- Database name: `rental`
- Collection name: `details` (single collection only)
- All data (vehicles + bookings) is stored in same collection.

Single collection fields:

```js
{
  vehicleName: String,
  brand: String,
  vehicleType: String,
  pricePerDay: Number,
  available: Boolean,
  customerName: String,
  rentalDays: Number,
  totalCharge: Number
}
```

## 11) `.env` Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/rental
```

- Backend uses `require("dotenv").config()`.
- MongoDB connection uses `process.env.MONGO_URI`.
- Server runs on `process.env.PORT`.

## 12) Admin Login Credentials

- Email: `admin@gmail.com`
- Password: `admin123`

## 13) Rental Charge Calculation

Formula:

`Total Charge = Price Per Day x Rental Days`

This is auto calculated in frontend and also saved from backend booking API.

## 14) Login Flow Explanation

- Click **Admin Side**
- Enter admin email/password
- If correct -> Admin Dashboard opens
- Else -> `alert("Invalid Credentials")`

User side is open directly (no login):
- Vehicle search
- Vehicle booking
- Charge calculation
- Booking history

## 15) Viva Explanation Points

1. JavaScript only stack used (no TypeScript).
2. One MongoDB database (`rental`) and one collection (`details`) used.
3. Vehicles and bookings are both stored in same collection.
4. Admin login is simple hardcoded credential check for exam simplicity.
5. Booking API calculates `totalCharge = pricePerDay * rentalDays`.
6. Search by vehicle type, brand, and price is done with query params.
7. Frontend uses only `useState` and `useEffect`.
8. No router, no redux, no jwt, no bcrypt (kept short for practical).

## Seed Vehicle Data

`seed.js` inserts:
- Honda City
- Hyundai Creta
- Royal Enfield
- Activa 6G
- Tata Nexon

## Quick Exam Modifications

- Change port or DB URL in `backend/.env`
- Change admin credentials in `frontend/src/Login.js`
- Change sample data in `backend/seed.js`
- Change schema fields in `backend/models.js`
- Change UI labels in `frontend/src/*.js`
