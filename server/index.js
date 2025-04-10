const Razorpay = require("razorpay");
require("dotenv").config();

const db = require("./config/Dbconnection");
const express = require("express");
const mysql = require("mysql");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// const app = express();
// app.use(
//   cors({
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     origin: ["http://localhost:3001", "http://localhost:3000"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(bodyParser.json());

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_57SnPwyYn0nU51",
  key_secret: "A8m7i5gpDzVlr3VEHNKqdmbV",
});

app.post("/api/login", (req, res) => {
  const { name, email, picture } = req.body;

  const sql =
    "INSERT INTO userlogin (name, email, picture) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE picture=?";
  db.query(sql, [name, email, picture, picture], (err, result) => {
    if (err) {
      console.error("Error saving user:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json({ message: "User saved successfully" });
    }
  });
});

// Remove User Data After Logout & Reset Cart Count
app.post("/api/logout", (req, res) => {
  const { email } = req.body;

  const sql = "DELETE FROM userlogin WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json({ message: "User logged out successfully", cartItemCount: 0 });
    }
  });
});




app.post("/create-order", async (req, res) => {
  // console.log("Request received:", req.body);

  const { product_id, user_id, amount } = req.body;

  if (!product_id || !user_id) {
    return res.status(400).json({ error: "Product ID or User ID is missing!" });
  }

  const options = {
    amount: amount * 100, // Convert to paisa
    currency: "INR",
    receipt: JSON.stringify({ product_id, user_id }),
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    // console.log("Order Created:", order);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay API Error:", error);
    res.status(500).json({ error: "Order Creation Failed" });
  }
});

// Webhook Endpoint
app.post('/firdos/webhook', (req, res) => {
  console.log('Webhook Data:', req.body);
  res.status(200).json({ message: 'Webhook received successfully' });
});


app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Database connection failed", error: err });
    }
    res.json({ message: "Database connected successfully", result: result[0].result });
  });
});



app.get("/", (req, res) => {
  res.send("Welcome to Firdos Collection Backend!");
});



const ProductRoute = require("./routes/product/ProductRoute");
const { error } = require("console");
app.use("/", ProductRoute);

//  Start Server
const PORT = 2001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
