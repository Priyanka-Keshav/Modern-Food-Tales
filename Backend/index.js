const express = require("express");
const app = express();
const connectDB = require("./Config/Food");
const cors = require("cors");

// Middleware to handle CORS
app.use(cors({ origin: "http://localhost:3000" })); // You can change this for production

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connectDB();

// Routes
const router = require("./Routes/FoodRoute");
app.use("/blog", router); // Blog-related routes

const new_router = require("./Routes/UserRoute");
app.use("/user", new_router); // User-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
