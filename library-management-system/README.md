# Library Management System (MERN Stack Exam Practical)

Minimal Full Stack project using JavaScript only:
- Frontend: React + Axios + Plain CSS
- Backend: Node.js + Express + MongoDB + Mongoose

Built for Mumbai University TY practical exam style: simple, short, and easy to explain in viva.

## Folder Structure

```txt
library-management-system/
|
|-- backend/
|   |-- server.js
|   |-- models.js
|   |-- seed.js
|   |-- setup.js
|   |-- .env
|   |-- .gitignore
|   |-- package.json
|
|-- frontend/
|   |-- public/
|   |   |-- index.html
|   |-- src/
|   |   |-- App.js
|   |   |-- Login.js
|   |   |-- Admin.js
|   |   |-- User.js
|   |   |-- index.js
|   |   |-- App.css
|   |-- package.json
|
|-- README.md
```

## 1) Installation Steps

1. Open terminal in `library-management-system`.
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
- Open MongoDB Compass and connect to:

```txt
mongodb://127.0.0.1:27017
```

This project uses:

```txt
mongodb://127.0.0.1:27017/library
```

Database name: `library`
Collection name: `details`

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
- `Sample Book Data Inserted`

Seed data inserts:
- Clean Code
- Database System Concepts
- Let Us C
- Operating System Concepts
- Computer Networks

## 6) How to run backend

```bash
cd backend
npm start
```

Backend URL:

```txt
http://localhost:5000
```

## 7) How to run frontend

```bash
cd frontend
npm start
```

Frontend URL:

```txt
http://localhost:3000
```

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

- `POST /book` -> Add book from librarian side
- `GET /books` -> Get/search books
- `PUT /book/:id` -> Update book details or availability
- `POST /issue` -> Issue book to student
- `GET /issues` -> Track issued books and return dates
- `PUT /issue/:id` -> Mark issued book returned

## 10) Database + Collection Explanation

This project uses one MongoDB database and one collection only.

- Database: `library`
- Collection: `details`

Books and issue records are stored in the same collection.

Single collection fields:

```js
{
  bookTitle: String,
  author: String,
  category: String,
  isbn: String,
  available: Boolean,
  studentName: String,
  studentRollNo: String,
  issueDate: String,
  returnDate: String,
  status: String
}
```

Book records have `studentName` as an empty string.
Issue records have student details, issue date, return date, and status.

## 11) `.env` Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/library
```

- Backend uses `require("dotenv").config()`.
- MongoDB connection uses `process.env.MONGO_URI`.
- Server runs on `process.env.PORT`.

## 12) Librarian Login Credentials

Use these credentials on the Librarian Side:

```txt
Email: admin@gmail.com
Password: admin123
```

## 13) Authentication Support

Authentication is kept simple for practical-exam style.

- Login is handled in `frontend/src/Login.js`.
- Credentials are hardcoded.
- If credentials match, the Librarian Dashboard opens.
- If credentials do not match, the app shows `Invalid Credentials`.

## 14) Book Issue Flow

1. Librarian logs in.
2. Librarian adds books.
3. Librarian selects an available book.
4. Librarian enters student name, roll number, issue date, and return date.
5. Backend marks the original book unavailable.
6. Backend creates a new issue record in the same `details` collection.

## 15) Return Tracking Flow

1. Issued books are shown in the Track Return Dates table.
2. Librarian clicks `Mark Returned`.
3. Issue status changes to `Returned`.
4. Matching book record becomes available again.

## 16) Viva Explanation Points

1. JavaScript-only MERN stack is used.
2. One MongoDB database (`library`) and one collection (`details`) are used.
3. Books and issued records are separated using `studentName`.
4. React uses `useState` and `useEffect`.
5. No router is used; page switching is done using state in `App.js`.
6. Librarian login uses hardcoded credentials for exam simplicity.
7. Axios connects frontend to Express APIs.
8. CORS allows React on port `3000` to call Express on port `5000`.
9. Return tracking is handled using `status` and `returnDate`.
10. Setup and seed scripts make database preparation easy.

## Quick Exam Modifications

- Change database URL in `backend/.env`
- Change sample books in `backend/seed.js`
- Change schema fields in `backend/models.js`
- Change librarian credentials in `frontend/src/Login.js`
- Change UI labels in `frontend/src/*.js`
