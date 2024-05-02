// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Todo schema
const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
  user: String,
});
const Todo = mongoose.model("Todo", todoSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/todos", async (req, res) => {
  const { text, done, user } = req.body;
  const todo = new Todo({
    text,
    done,
    user,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, done },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
