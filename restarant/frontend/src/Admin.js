import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Admin() {
  const [form, setForm] = useState({ itemName: "", category: "", price: "", available: true });
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadItems = async () => {
    try {
      const res = await axios.get(`${API}/items`);
      setItems(res.data);
    } catch (err) {
      alert("Could not load menu items");
    }
  };

  const loadOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`);
      setOrders(res.data);
    } catch (err) {
      alert("Could not load orders");
    }
  };

  useEffect(() => {
    loadItems();
    loadOrders();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/item`, { ...form, price: Number(form.price) });
      alert("Menu item added");
      setForm({ itemName: "", category: "", price: "", available: true });
      loadItems();
    } catch (err) {
      alert("Could not add menu item");
    }
  };

  const toggleAvailability = async (item) => {
    try {
      await axios.put(`${API}/item/${item._id}`, { available: !item.available });
      loadItems();
    } catch (err) {
      alert("Could not update item");
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      await axios.put(`${API}/order/${orderId}`, { orderStatus });
      loadOrders();
    } catch (err) {
      alert("Could not update order status");
    }
  };

  return (
    <>
      <div className="card">
        <h3>Add Menu Item</h3>
        <form onSubmit={addItem} className="formGrid">
          <input
            placeholder="Food Item Name"
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })}
            required
          />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="card">
        <h3>Manage Menu</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>Rs {item.price}</td>
                <td>{item.available ? "Yes" : "No"}</td>
                <td>
                  <button type="button" onClick={() => toggleAvailability(item)}>
                    {item.available ? "Mark Unavailable" : "Mark Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>All Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Food Item</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>
                <td>{order.itemName}</td>
                <td>{order.quantity}</td>
                <td>Rs {order.totalAmount}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  <select value={order.orderStatus} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
