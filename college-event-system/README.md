# College Event Management System (Exam-Friendly)

Minimal full stack project for Mumbai University TY Full Stack Development practical exam.

## 1) Installation Steps

1. Open terminal in `college-event-system`
2. Install backend packages
3. Install frontend packages

## 2) npm install Commands

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 3) MongoDB Setup

- Install MongoDB Community Server.
- Start MongoDB service locally.
- This project uses local database URL only.

## 4) Run setup.js

```bash
cd backend
npm run setup
```

Expected output:
- `MongoDB Connected`
- `Database Ready`

## 5) Run seed.js

```bash
cd backend
npm run seed
```

Expected output:
- `Sample Event Data Inserted`

## 6) Run Backend

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

## 7) Run Frontend

```bash
cd frontend
npm start
```

Frontend runs on: `http://localhost:3000`

## 8) Required Packages

Backend:
- express
- mongoose
- cors
- dotenv
- nodemon

Frontend:
- react
- react-dom
- react-scripts
- axios

## 9) API Routes

- `POST /event` -> add event
- `GET /events` -> get all events
- `POST /register` -> student registration
- `GET /participants` -> get all registered students
- `POST /attendance` -> mark attendance
- `GET /dashboard` -> dashboard stats

## 10) Database and Collection Explanation

- Database name: `college`
- Collection name: `details`
- Only one schema and one collection is used for all data.

## 11) .env Setup Explanation

Create `backend/.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/college
```

Used in backend as:
- `require('dotenv').config()`
- `process.env.PORT`
- `process.env.MONGO_URI`

## 12) Admin Login Credentials

- Email: `admin@gmail.com`
- Password: `admin123`

## 13) Login Flow Explanation

- Student side is open directly (no login).
- Admin enters credentials in admin login page.
- If correct -> open admin dashboard.
- Else -> show `alert("Invalid Credentials")`.

## 14) Viva Explanation Points

- Built using MERN with JavaScript only.
- Used one MongoDB database (`college`) and one collection (`details`).
- Kept hardcoded admin login for exam simplicity.
- Student can register for events and see event list.
- Admin can add events, view participants, mark attendance, and see dashboard.
- Dashboard shows total events, participants, upcoming events, and attendance summary.
- Code is beginner-friendly, minimal files, and easy to explain quickly.

---

## Sample Events Added by Seed Script

- Tech Fest
- Hackathon
- Sports Day
- Cultural Night
- Robotics Workshop
