const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Detail = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// QUICK EXAM EDIT:
// Change PORT and MONGO_URI in backend/.env only.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

// Add menu item (admin use)
app.post("/item", async (req, res) => {
  try {
    const data = req.body;
    const item = await Detail.create({
      itemName: data.itemName,
      category: data.category,
      price: Number(data.price),
      available: data.available !== false
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Could not add menu item", error: err.message });
  }
});

// List + search menu items
app.get("/items", async (req, res) => {
  try {
    const { category = "", itemName = "", price = "" } = req.query;
    const query = {
      customerName: "",
      category: new RegExp(category, "i"),
      itemName: new RegExp(itemName, "i")
    };
    if (price) query.price = { $lte: Number(price) };
    const items = await Detail.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch menu items" });
  }
});

// Place food order
app.post("/order", async (req, res) => {
  try {
    const { customerName, customerPhone, itemId, quantity, deliveryAddress, paymentMethod } = req.body;
    const item = await Detail.findById(itemId);
    if (!item || !item.itemName || item.customerName) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    if (!item.available) {
      return res.status(400).json({ message: "Menu item is not available" });
    }

    const itemQuantity = Number(quantity);
    const totalAmount = Number(item.price) * itemQuantity;

    // Keep order record as a NEW document in same collection "details"
    const order = await Detail.create({
      itemName: item.itemName,
      category: item.category,
      price: item.price,
      available: item.available,
      customerName,
      customerPhone,
      quantity: itemQuantity,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentStatus: "Paid",
      orderStatus: "Preparing"
    });

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Order failed", error: err.message });
  }
});

// Order history and delivery tracking
app.get("/orders", async (req, res) => {
  try {
    const orders = await Detail.find({ customerName: { $ne: "" } }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch orders" });
  }
});

// Toggle item availability
app.put("/item/:id", async (req, res) => {
  try {
    const item = await Detail.findById(req.params.id);
    if (!item || item.customerName) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.available = req.body.available;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Could not update menu item", error: err.message });
  }
});

// Update delivery status
app.put("/order/:id", async (req, res) => {
  try {
    const order = await Detail.findById(req.params.id);
    if (!order || !order.customerName) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.orderStatus;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Could not update order", error: err.message });
  }
});

app.get("/", (req, res) => res.send("Restaurant Ordering API Running"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
