const { MongoClient, ServerApiVersion } = require("mongodb");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());


app.get("/", (req, res) => {
  console.log("Root route hit!");
  res.send("<h1>Backend is running!</h1>");
});


const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ✅ Connect once and reuse the client
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();




// ✅ Route: Get all menu items
app.get("/api/menu", async (req, res) => {
  try {
    const db = client.db("dunkin_donuts");   // ✅ exact DB name
    const menuCollection = db.collection("menu");

    const items = await menuCollection.find({}).toArray(); // ✅ query the collection
    console.log("Fetched items:", items); // log to terminal for debugging
    res.json(items);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).send("Error fetching menu");
  }
});

// ✅ Route: Place an order
app.post("/api/orders", async (req, res) => {
  try {
    const order = {
      items: req.body.items,       // array of menu items
      total: req.body.total,       // total price
      customer: "Guest",           // fixed value since no login
      createdAt: new Date()
    };

    const result = await client.db("dunkin_donuts")
      .collection("orders")
      .insertOne(order);

    res.status(201).json({ message: "Order saved!", orderId: result.insertedId });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

const placeOrder = async (cartItems, cartTotal) => {
  const order = {
    items: cartItems,
    total: cartTotal
  };

  const res = await fetch("https://dunkin-donuts-hw3.onrender.com/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  const data = await res.json();
  console.log("Order response:", data);
  alert("Order placed successfully!");
};


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
