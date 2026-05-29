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

1. Open terminal in `e-learning-platform`.
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
  `mongodb://127.0.0.1:27017/elearningdb`

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

Expected logs:
- `Sample Course Data Inserted`
- `Sample Student Data Inserted`

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

### Course APIs
- `POST /course` -> add a course
- `GET /courses` -> get all courses

### Student APIs
- `POST /student` -> enroll a student
- `GET /students` -> get all enrolled students

## 10) MongoDB Collection Fields

### Course Collection
```js
{
  title:       String,
  instructor:  String,
  category:    String,
  videoUrl:    String,
  description: String
}
```

### Student Collection
```js
{
  studentName: String,
  email:       String,
  courseName:  String,
  progress:    Number   // 0 to 100
}
```

## 11) `.env` Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/elearningdb
```

- `PORT` is used in `server.js` with `process.env.PORT`.
- `MONGO_URI` is used in MongoDB connection with `process.env.MONGO_URI`.
- `require("dotenv").config()` is already used in all backend files.

## 12) Viva Explanation Points

Use these short points in viva:

1. This is a MERN-style app but JavaScript only (no TypeScript).
2. Backend has two models: `Course` and `Student`.
3. All schemas are inside one `models.js` file.
4. All routes are inside `server.js` only — no separate routes folder.
5. Frontend is a single-page `App.js` with sections:
   - Dashboard (total courses, total students, average progress)
   - Add Course form
   - Enroll Student form
   - All Courses table
   - Enrolled Students table
6. Progress is stored as a number (0–100) representing percentage.
7. The course dropdown in the student form is populated dynamically from the courses fetched from the database.
8. `setup.js` initializes the DB connection and verifies collections are ready.
9. `seed.js` inserts 5 sample courses and 3 sample students after clearing old data.
10. CSS uses a dark theme with cyan accents for clean exam UI.

## Sample Courses Inserted by seed.js

- Full Stack Web Development — Rahul Sharma
- Python for Data Science — Priya Mehta
- Database Management Systems — Amit Joshi
- Android App Development — Sneha Patil
- Machine Learning Basics — Vikram Nair

## Sample Students Inserted by seed.js

- Ananya Kulkarni — Full Stack Web Development (75%)
- Rohan Desai — Python for Data Science (50%)
- Pooja Sawant — Database Management Systems (90%)

## Notes for Quick Exam Modifications

- Change API port / DB URL in `backend/.env`.
- Change course/student sample data in `backend/seed.js`.
- Add/remove fields in `backend/models.js`.
- UI labels/forms can be edited in `frontend/src/App.js`.
- Change color theme in `frontend/src/App.css` (look for cyan `#22d3ee`).
