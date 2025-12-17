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


// Hardcoded URI (since you’re not using config.env)
const uri = "mongodb+srv://jstaana5:lol12345@ddhw3.yonygqk.mongodb.net/dunkin_donuts";

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
    const db = client.db("dunkin_donuts"); // ✅ fixed DB name
    const ordersCollection = db.collection("orders");

    const order = {
      items: req.body.items,   // cart items from frontend
      total: req.body.total,   // total amount
      timestamp: new Date(),   // auto add timestamp
    };

    const result = await ordersCollection.insertOne(order);
    res.json({ success: true, orderId: result.insertedId });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).send("Error saving order");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
