import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


  const connectionSchema = new mongoose.Schema(
    {
      linkedin_id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true, 
      },
      event: {
        type: String,
        required: true, 
      },
      notes: {
        type: String, 
      },
    },
    {
      timestamps: true, // Automatically add `createdAt` and `updatedAt`
    }
  );
  
  const Connection = mongoose.model("Connection", connectionSchema);

// Routes

// Create a connection
app.post("/connections", async (req, res) => {
  try {
    // Check if `linkedin_id` is present in the request body
    if (!req.body.linkedin_id) {
      return res.status(400).send({ error: "`linkedin_id` is required" });
    }
    if (!req.body.event) {
      return res.status(400).send({ error: "`event` is required" });
    }
    if (!req.body.name) {
      return res.status(400).send({ error: "`name` is required" });
    }

    // Create and save the connection
    const connection = new Connection(req.body);
    await connection.save();
    res.status(201).send(connection);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all connections
app.get("/connections", async (req, res) => {
  try {
    const connections = await Connection.find();
    res.send(connections);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a single connection by ID
app.get("/connections/:id", async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);
    if (!connection)
      return res.status(404).send({ error: "Connection not found" });
    res.send(connection);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a single connection by LinkedIn ID
app.get("/connections/linkedin/:linkedin_id", async (req, res) => {
  try {
    const connection = await Connection.findOne({
      linkedin_id: req.params.linkedin_id,
    });
    if (!connection)
      return res.status(404).send({ error: "Connection not found" });
    res.send(connection);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a connection by ID
app.put("/connections/:id", async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!connection)
      return res.status(404).send({ error: "Connection not found" });
    res.send(connection);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a connection by ID
app.delete("/connections/:id", async (req, res) => {
  try {
    const connection = await Connection.findByIdAndDelete(req.params.id);
    if (!connection)
      return res.status(404).send({ error: "Connection not found" });
    res.send({ message: "Connection deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
