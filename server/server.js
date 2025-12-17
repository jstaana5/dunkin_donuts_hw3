import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";


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

    const items = await menuCollection.find({}).toArray(); 
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


// data persistence
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await client.db("dunkin_donuts")
      .collection("orders")
      .find({})
      .toArray();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body; // e.g. { status: "completed" }

    const result = await client.db("dunkin_donuts")
      .collection("orders")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

app.post("/api/menu", async (req, res) => {
  try {
    const newItem = req.body; // { name, price, image }
    const result = await client.db("dunkin_donuts")
      .collection("menu")
      .insertOne(newItem);

    res.json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
});

app.put("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await client.db("dunkin_donuts")
      .collection("menu")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

app.delete("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client.db("dunkin_donuts")
      .collection("menu")
      .deleteOne({ _id: new ObjectId(id) });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
