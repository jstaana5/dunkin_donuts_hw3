import React, { useState, useEffect } from "react";

export function Checkout({ cartItems, totalAmount, clearCart }) {
  const [orders, setOrders] = useState([]);

  // Place a new order
  const placeOrder = async () => {
    const order = { items: cartItems, total: totalAmount, status: "pending" };

    const res = await fetch("https://dunkin-donuts-hw3.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    alert("Order placed successfully! ID: " + data.orderId);

    clearCart();
    fetchOrders(); // refresh orders list after placing new one
  };

  // Fetch all past orders
  const fetchOrders = async () => {
  try {
    const res = await fetch("https://dunkin-donuts-hw3.onrender.com/api/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    console.log("Fetched orders:", data); // ✅ check in browser console
    setOrders(data);
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
};

  // Update order status
  const markCompleted = async (id) => {
    await fetch(`https://dunkin-donuts-hw3.onrender.com/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    fetchOrders(); // refresh after update
  };

  // Load orders when Checkout mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl mb-4" style={{ color: "#DD1467" }}>Checkout</h1>

      {/* Cart display */}
      {cartItems.length > 0 ? (
        <div className="space-y-3">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between bg-gray-50 p-3 rounded-xl">
              <div>
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm" style={{ color: "#FF6600" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <p className="text-lg mt-4">Total: ${totalAmount.toFixed(2)}</p>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Confirm Order button */}
      <button
        onClick={placeOrder}
        disabled={cartItems.length === 0}
        className="cursor-pointer mt-6 w-full text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
        style={{ backgroundColor: "#FF6600" }}
      >
        Confirm Order
      </button>

      {/* Past Orders */}
      <h2 className="text-xl mt-8 mb-4" style={{ color: "#DD1467" }}>My Orders</h2>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order._id} className="bg-gray-50 p-4 rounded-xl mb-3">
            <p><strong>ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status || "pending"}</p>
            <button
              onClick={() => markCompleted(order._id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Mark Completed
            </button>
          </div>
        ))
      ) : (
        <p>No past orders found.</p>
      )}
    </div>
  );
}
