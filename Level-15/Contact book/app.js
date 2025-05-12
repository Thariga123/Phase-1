import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const client = new MongoClient(uri);
let contactsCollection;

async function initDB() {
  try {
    await client.connect();
    const db = client.db("contactDB");
    contactsCollection = db.collection("contacts");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
}

function validateContact(contact) {
  const { name, email, phone } = contact;
  if (!name || !email || !phone) {
    throw new Error("Name, email, and phone are required.");
  }
}

app.post("/contacts", async (req, res) => {
  try {
    validateContact(req.body);
    const result = await contactsCollection.insertOne(req.body);
    res.status(201).json({ message: "Contact added", id: result.insertedId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const filter = {};
    if (req.query.group) filter.group = req.query.group;
    if (req.query.name) filter.name = { $regex: req.query.name, $options: "i" };

    const contacts = await contactsCollection.find(filter).toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/contacts/search", async (req, res) => {
  const query = req.query.q || req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" or "query" is required' });
  }

  try {
    const results = await contactsCollection.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { group: { $regex: query, $options: "i" } }
      ]
    }).toArray();

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/contacts/:id", async (req, res) => {
  try {
    const result = await contactsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found or no changes made" });
    }
    res.json({ message: "Contact updated" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    const result = await contactsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

app.listen(port, async () => {
  await initDB();
  console.log(`🚀 Server running at http://localhost:${port}`);
});
