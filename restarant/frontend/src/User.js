import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function User() {
  const [search, setSearch] = useState({ category: "", itemName: "", price: "" });
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const loadItems = async (query = "") => {
    const res = await axios.get(`${API}/items${query}`);
    setItems(res.data);
  };

  const loadOrders = async () => {
    const res = await axios.get(`${API}/orders`);
    setOrders(res.data);
  };

  useEffect(() => {
    loadItems();
    loadOrders();
  }, []);

  const searchItems = async (e) => {
    e.preventDefault();
    try {
      const q = `?category=${search.category}&itemName=${search.itemName}&price=${search.price}`;
      loadItems(q);
    } catch (err) {
      alert("Search failed");
    }
  };

  const addToCart = (item) => {
    const existing = cart.find((cartItem) => cartItem._id === item._id);
    if (existing) {
      setCart(cart.map((cartItem) => (cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    const nextQuantity = Number(quantity);
    if (nextQuantity <= 0) {
      setCart(cart.filter((item) => item._id !== itemId));
      return;
    }
    setCart(cart.map((item) => (item._id === itemId ? { ...item, quantity: nextQuantity } : item)));
  };

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  const placeOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please add at least one food item to cart");
      return;
    }

    try {
      await Promise.all(
        cart.map((item) =>
          axios.post(`${API}/order`, {
            customerName,
            customerPhone,
            itemId: item._id,
            quantity: Number(item.quantity),
            deliveryAddress,
            paymentMethod
          })
        )
      );
      alert("Order Placed Successfully");
      setCustomerName("");
      setCustomerPhone("");
      setDeliveryAddress("");
      setPaymentMethod("UPI");
      setCart([]);
      loadOrders();
    } catch (err) {
      alert(err?.response?.data?.message || "Order failed");
    }
  };

  return (
    <>
      <div className="card">
        <h3>Search Menu</h3>
        <form onSubmit={searchItems} className="formGrid">
          <input
            placeholder="Category"
            value={search.category}
            onChange={(e) => setSearch({ ...search, category: e.target.value })}
          />
          <input placeholder="Food Item" value={search.itemName} onChange={(e) => setSearch({ ...search, itemName: e.target.value })} />
          <input type="number" placeholder="Max Price" value={search.price} onChange={(e) => setSearch({ ...search, price: e.target.value })} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="card">
        <h3>Menu Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Cart</th>
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
                  <button type="button" disabled={!item.available} onClick={() => addToCart(item)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Cart & Checkout</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="3">Cart is empty</td>
              </tr>
            ) : (
              cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, e.target.value)}
                    />
                  </td>
                  <td>Rs {Number(item.price) * Number(item.quantity)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="totalLine">Cart Total: Rs {cartTotal}</p>
        <form onSubmit={placeOrder} className="formGrid">
          <input placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          <input placeholder="Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
          <input placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required />
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          <button type="submit">Place Order</button>
        </form>
      </div>

      <div className="card">
        <h3>Track Delivery Status</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Food Item</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.itemName}</td>
                <td>{order.quantity}</td>
                <td>Rs {order.totalAmount}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default User;
