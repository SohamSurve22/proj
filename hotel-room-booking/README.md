# Minimalist Hotel Room Booking System (MERN Stack)

This project is a minimalist Full Stack Hotel Room Booking System built using a pure JavaScript MERN stack (React, Node.js, Express, MongoDB).
Specifically designed for the **Mumbai University Third Year Full Stack Development (FSD) Practical Exam**, this project uses a simplified, single-collection structure to be easily completed and explained in under 1.5 hours.

---

## Project Structure

```text
hotel-room-booking/
│
├── backend/
│   ├── server.js         # API endpoints (GET/POST/PUT) and server start
│   ├── models.js         # Mongoose schema (single collection model)
│   ├── setup.js          # MongoDB connection check & collection touch
│   ├── seed.js           # Seeds database with 5 sample rooms
│   ├── .env              # Environment configurations (PORT, MongoDB URI)
│   ├── .gitignore        # Ignores node_modules and env file
│   └── package.json      # Backend scripts and dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html    # Base HTML template for React
│   ├── src/
│   │   ├── App.js        # Main component & state-based routing
│   │   ├── App.css       # Clean stylesheet (White & Teal theme)
│   │   ├── Login.js      # Admin Login Form component
│   │   ├── User.js       # Customer Booking Dashboard component
│   │   ├── Admin.js      # Admin Room Management Dashboard
│   │   └── index.js      # React mounting entrypoint
│   └── package.json      # Frontend scripts and dependencies
│
└── README.md             # Guide & Viva Questions (This file)
```

---

## 1. Installation & Setup Instructions

### Prerequisites
Make sure **Node.js** and **MongoDB Community Server** are installed and running locally on your computer.

### Step 1: Clone or Copy Project Files
Place the folders `backend` and `frontend` in your working directory.

### Step 2: Install Backend Dependencies
Open your terminal, navigate to the `backend` folder, and run:
```bash
cd backend
npm install
```

### Step 3: Configure environment variables
Verify or create `backend/.env` file with the following content:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hotel
```

### Step 4: Run MongoDB Database Setup Script
Execute the database setup script to verify connection and initialize database `hotel` and collection `details`:
```bash
npm run setup
```
*(Prints: `MongoDB Connected` followed by `Database Ready`)*

### Step 5: Seed Sample Rooms Data
Execute the seed script to insert 5 sample rooms (Deluxe Room, AC Room, Non-AC Room, Suite Room, Single Room):
```bash
npm run seed
```
*(Prints: `Sample Room Data Inserted`)*

### Step 6: Start Backend Server
Start the development server using nodemon:
```bash
npm run dev
```
*(Prints: `Server running on port 5000`)*

### Step 7: Install & Start Frontend
Open a **new** terminal tab, navigate to the `frontend` folder, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm start
```
*(React app opens automatically at `http://localhost:3000`)*

---

## 2. Required Packages & Libraries

### Backend Dependencies:
* **express**: Web framework to create REST APIs.
* **mongoose**: MongoDB object modeling tool (ODM) for schema validation.
* **cors**: Middleware to allow cross-origin requests from the React frontend (port 3000) to Express backend (port 5000).
* **dotenv**: Loads environment variables from `.env` into `process.env`.
* **nodemon** (DevDependency): Restarts the server automatically on code changes.

### Frontend Dependencies:
* **react**: UI component library.
* **react-dom**: Mounts components to the browser DOM.
* **react-scripts**: Configuration tools for running React.
* **axios**: Promise-based HTTP client to make API requests to the backend server.

---

## 3. Database Design: Single-Collection Architecture

To make it incredibly fast to code during exams, this project uses **only one database** (`hotel`) and **only one collection** (`details`) in MongoDB.

### Data Schema (defined in `backend/models.js`):
```json
{
  "roomNumber": "String",
  "roomType": "String",
  "price": "Number",
  "available": "Boolean",

  "customerName": "String",
  "checkInDate": "String",
  "checkOutDate": "String",

  "paymentMethod": "String",
  "paymentStatus": "String"
}
```

### How Rooms and Bookings Co-exist:
1. **Room Templates:** Saved with `customerName: null`, representing the rooms themselves. Toggled between `available: true` and `available: false`.
2. **Booking Records:** When a booking is processed, a copy of the room details plus the customer's name, dates, payment method, and `paymentStatus: "Paid"` is saved as a new document in the same collection.
3. This architecture avoids complex Mongo `$lookup` operations or collection referencing, allowing beginners to query bookings using a simple `.find({ customerName: { $ne: null } })`.

---

## 4. API Endpoints (defined in `backend/server.js`)

| Method | Endpoint | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| **POST** | `/room` | Creates a new room (Admin Only) | `{ "roomNumber": "106", "roomType": "Deluxe Room", "price": 3000 }` |
| **GET** | `/rooms` | Retrieves all room templates (customerName is null) | *(None)* |
| **POST** | `/booking` | Reserves a room, marks room template `available: false`, and inserts booking ledger | `{ "roomId": "...", "customerName": "John Doe", "checkInDate": "2026-06-01", "checkOutDate": "2026-06-05", "paymentMethod": "UPI" }` |
| **GET** | `/bookings` | Retrieves booking history records (customerName is not null) | *(None)* |
| **PUT** | `/room/:id` | Toggles availability state of a room template | `{ "available": false }` |

---

## 5. Flow Explanations

### Admin Login Flow
1. Admin navigates to **Admin Login** tab.
2. Form captures `Email` and `Password`.
3. Validation checks credentials directly against hardcoded strings in frontend:
   * **Email:** `admin@gmail.com`
   * **Password:** `admin123`
4. If correct, state switches to show the Admin Panel dashboard. Otherwise, displays `alert("Invalid Credentials")`.

### Room Booking Flow
1. Customer views available rooms dynamically loaded from `/rooms`.
2. Clicking **Select Room** or choosing from the dropdown auto-populates the booking form.
3. Customer inputs name, dates, and chooses a **Payment Method** (UPI, Card, Cash).
4. Submitting calls `POST /booking` API.
5. Backend updates the target room to `available: false` and inserts a new booking document with `paymentStatus: "Paid"`.
6. Alert confirms booking, and dashboard lists update automatically.

---

## 6. Viva-Voce Quick Guide (Mumbai University Practical Exam)

Be prepared to answer these questions for the external examiner:

1. **Why CORS is used?**
   * Express server runs on port `5000` and React runs on port `3000`. Browsers block cross-origin requests by default. `cors` package permits React to query the API.
2. **What does `dotenv` do?**
   * It loads parameters like database URI and port from a local `.env` file, keeping database credentials out of git commits.
3. **How does state-based routing work in your app?**
   * Instead of importing heavy libraries like `react-router-dom`, we use a simple `currentPage` state variable in `App.js` and render components using conditional statements: `currentPage === 'user' && <User />`.
4. **Explain how rooms and bookings reside in one collection.**
   * Rooms have `customerName` set to `null` so we fetch them using `.find({ customerName: null })`. Bookings contain non-null customer names, so we query history using `.find({ customerName: { $ne: null } })`.
5. **Why are mongoose schemas used?**
   * MongoDB is schema-less by default. Mongoose schemas allow us to enforce structural fields, default values, and data types (e.g. converting price strings to numbers).
6. **What is standard port for MongoDB?**
   * `27017` is the default port for local MongoDB database connections.
