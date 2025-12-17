import React from "react";

export function Checkout({ cartItems, totalAmount, clearCart }) {
  const placeOrder = async () => {
    const order = { items: cartItems, total: totalAmount };

    const res = await fetch("https://dunkin-donuts-hw3.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    alert("Order placed successfully! ID: " + data.orderId);

    // clear cart after placing order
    clearCart();
  };

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl mb-4" style={{ color: "#DD1467" }}>Checkout</h1>

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

      <button
        onClick={placeOrder}
        disabled={cartItems.length === 0}
        className="cursor-pointer mt-6 w-full text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
        style={{ backgroundColor: "#FF6600" }}
      >
        Confirm Order
      </button>
    
    </div>
  );
}
