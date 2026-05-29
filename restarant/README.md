# Restaurant Ordering Web Application (Exam Practical)

Minimal Full Stack project using JavaScript only:
- Frontend: React + Axios + Plain CSS
- Backend: Node.js + Express + MongoDB + Mongoose

Built for Mumbai University TY practical exam style: simple, short, and easy to explain in viva.

## Folder Structure

```txt
restarant/
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

1. Open terminal in `restarant`.
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
- Open MongoDB Compass later and connect to:

```txt
mongodb://127.0.0.1:27017
```

This project uses:

```txt
mongodb://127.0.0.1:27017/restaurant
```

Database name: `restaurant`
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
- `Sample Menu Data Inserted`

Seed data inserts:
- Paneer Butter Masala
- Veg Biryani
- Margherita Pizza
- Masala Dosa
- Cold Coffee

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

- `POST /item` -> Add menu item from admin side
- `GET /items` -> Get/search menu items
- `POST /order` -> Place food order
- `GET /orders` -> Get order history and delivery status
- `PUT /item/:id` -> Toggle menu item availability
- `PUT /order/:id` -> Update delivery status

## 10) Database + Collection Explanation

This project uses one MongoDB database and one collection only.

- Database: `restaurant`
- Collection: `details`

Menu items and order records are stored in the same collection.

Single collection fields:

```js
{
  itemName: String,
  category: String,
  price: Number,
  available: Boolean,
  customerName: String,
  customerPhone: String,
  quantity: Number,
  totalAmount: Number,
  deliveryAddress: String,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String
}
```

Menu records have `customerName` as an empty string.
Order records have customer details and delivery status.

## 11) `.env` Setup Explanation

File: `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant
```

- Backend uses `require("dotenv").config()`.
- MongoDB connection uses `process.env.MONGO_URI`.
- Server runs on `process.env.PORT`.

## 12) Admin Login Credentials

- Email: `admin@gmail.com`
- Password: `admin123`

## 13) Order Amount Calculation

Formula:

```txt
Total Amount = Item Price x Quantity
```

The backend calculates and saves `totalAmount` when the order is placed.

## 14) Customer Flow

1. Customer searches or browses menu items.
2. Customer adds food items to cart.
3. Customer enters name, phone number, delivery address, and payment method.
4. Customer places order.
5. Order appears in delivery tracking with status `Preparing`.

## 15) Admin Flow

1. Admin logs in using hardcoded credentials.
2. Admin adds menu items.
3. Admin marks food items available or unavailable.
4. Admin views all orders.
5. Admin updates order status:
   - `Preparing`
   - `Out for Delivery`
   - `Delivered`
   - `Cancelled`

## 16) Viva Explanation Points

1. JavaScript-only MERN stack is used.
2. One MongoDB database (`restaurant`) and one collection (`details`) are used.
3. Menu items and order records are separated using `customerName`.
4. React uses `useState` and `useEffect`.
5. No router is used; page switching is done using state in `App.js`.
6. Admin login is hardcoded for exam simplicity.
7. Axios connects frontend to Express APIs.
8. CORS allows React on port `3000` to call Express on port `5000`.
9. Delivery tracking is handled using `orderStatus`.
10. Setup and seed scripts make database preparation easy.

## Quick Exam Modifications

- Change database URL in `backend/.env`
- Change sample menu in `backend/seed.js`
- Change schema fields in `backend/models.js`
- Change admin credentials in `frontend/src/Login.js`
- Change UI labels in `frontend/src/*.js`
