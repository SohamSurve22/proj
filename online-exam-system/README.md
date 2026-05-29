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

1. Open terminal in `online-exam-system`.
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
  `mongodb://127.0.0.1:27017/examdb`

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
- `Sample Question Data Inserted`
- `Sample Result Data Inserted`

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

### Question APIs
- `POST /question` -> add a question
- `GET /questions` -> get all questions

### Result APIs
- `POST /result` -> save a student result
- `GET /results` -> get all results

## 10) MongoDB Collection Fields

### Question Collection
```js
{
  question:      String,
  option1:       String,
  option2:       String,
  option3:       String,
  option4:       String,
  correctAnswer: String,  // "option1" / "option2" / "option3" / "option4"
  subject:       String
}
```

### Result Collection
```js
{
  studentName:    String,
  subject:        String,
  score:          Number,
  totalQuestions: Number
}
```

## 11) `.env` Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/examdb
```

- `PORT` is used in `server.js` with `process.env.PORT`.
- `MONGO_URI` is used in MongoDB connection with `process.env.MONGO_URI`.
- `require("dotenv").config()` is already used in all backend files.

## 12) Viva Explanation Points

Use these short points in viva:

1. This is a MERN-style app but JavaScript only (no TypeScript).
2. Backend has two models: `Question` and `Result`.
3. All schemas are in one `models.js` file; all routes are in `server.js`.
4. `correctAnswer` field stores the key name e.g. `"option2"`, NOT the option text. This allows dynamic scoring: `answers[q._id] === q.correctAnswer`.
5. Score calculation happens entirely on the frontend — no scoring logic in the backend. The final score is just stored to the database via `POST /result`.
6. The exam is filtered by subject — students type a subject name and only those questions appear.
7. Radio buttons are grouped by `name={q._id}` so each question has its own selection.
8. Frontend is a single-page `App.js` with five sections: Dashboard, Add Question, Attend Exam, View Questions, View Results.
9. `setup.js` initializes the DB connection and readies the collections.
10. `seed.js` inserts 5 sample questions across subjects and 3 sample results after clearing old data.
11. CSS uses a beige background (`#f5f1ea`) and deep navy accent (`#1e3a5f`) for a clean exam portal look.

## Sample Questions Inserted by seed.js

- OSI Model Routing Layer — Computer Networks
- LIFO Data Structure — Data Structures
- SQL SELECT Command — Database Management
- CPU Full Form — Computer Organization
- JavaScript Data Types — Web Technology

## Sample Results Inserted by seed.js

- Rahul Patil — Computer Networks (4/5)
- Sneha Joshi — Data Structures (3/5)
- Amit Sharma — Database Management (5/5)

## Notes for Quick Exam Modifications

- Change API port / DB URL in `backend/.env`.
- Change question/result sample data in `backend/seed.js`.
- Add/remove fields in `backend/models.js`.
- UI labels/forms can be edited in `frontend/src/App.js`.
- Change color theme in `frontend/src/App.css` (look for `#f5f1ea` and `#1e3a5f`).
