# Job Portal (Mumbai University TY Practical)

Minimal Full Stack Job Portal using **React + Node.js + Express + MongoDB** (JavaScript only).

## 1) Installation Steps

1. Open terminal in project root:
   `d:\Soham\Engineering\SEM6\FSD\Trial\job-portal`
2. Install backend packages.
3. Install frontend packages.

## 2) npm install Commands

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd ../frontend
npm install
```

## 3) MongoDB Setup

- Start local MongoDB service in your system.
- This project uses local DB only:
  `mongodb://127.0.0.1:27017/jobs`

## 4) How to Run setup.js

```bash
cd backend
npm run setup
```

Expected output:
- `MongoDB Connected`
- `Database Ready`

## 5) How to Run seed.js

```bash
cd backend
npm run seed
```

Expected output:
- `Sample Job Data Inserted`

## 6) How to Run Backend

```bash
cd backend
npm start
```

Backend URL:
- `http://localhost:5000`

## 7) How to Run Frontend

```bash
cd frontend
npm start
```

Frontend URL:
- `http://localhost:3000`

## 8) Required Packages

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

## 9) API Routes

- `POST /job` -> Add new job
- `GET /jobs` -> Get all jobs
- `POST /apply` -> Apply for selected job
- `GET /applications` -> Get all applications

## 10) Database + Collection Explanation

- Only one database: `jobs`
- Only one collection: `details`
- All job + application records are stored in this same collection.

## 11) .env Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jobs
```

Backend uses:
- `require('dotenv').config()`
- `process.env.MONGO_URI`
- `process.env.PORT`

## 12) Recruiter Login Credentials

- Email: `recruiter@gmail.com`
- Password: `recruiter123`

## 13) Application Flow Explanation

1. Applicant opens app.
2. Applicant views jobs.
3. Applicant selects a job.
4. Applicant fills name, email, resume link/filename.
5. Applicant clicks apply.
6. Data saved to `details` collection.
7. Application history shows applied jobs.

## 14) Login Flow Explanation

1. Open Recruiter Login.
2. Enter email and password.
3. If correct -> Recruiter Dashboard opens.
4. Else -> `alert("Invalid Credentials")`.

## 15) Viva Explanation Points

- Project uses MERN stack with JavaScript only.
- No JWT/session/OAuth/bcrypt used (simple practical login).
- Only one DB (`jobs`) and one collection (`details`).
- All backend routes in one file (`server.js`).
- Single schema in one file (`models.js`).
- React functional components only.
- State-based page switching used (no React Router).
- Simple CSS and beginner-friendly structure.

## Folder Structure

```text
job-portal/
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
│   │   ├── Recruiter.js
│   │   ├── Applicant.js
│   │   ├── index.js
│   │   ├── App.css
│   ├── package.json
└── README.md
```

## Notes for Exam

- To change recruiter credentials quickly, edit `frontend/src/Login.js`.
- To change sample jobs, edit `backend/seed.js`.
- To change MongoDB URL or backend port, edit `backend/.env`.
