const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the CORS package
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const studentRouter = require("./routes/StudentRoutes");

app.use("/", studentRouter);

// Connect to MongoDB
const mongoose = require("mongoose");
const queryString =
  process.env.MONGODB_URI ||
  "mongodb+srv://bmchien:a96VMKMMJCNq4EA9@cluster0.9uzgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Configure mongoose
mongoose
  .connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"));

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err.message);
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
