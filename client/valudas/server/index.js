const Razorpay = require("razorpay");
require("dotenv").config();


// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID); 
// console.log("Razorpay Secret:", process.env.RAZORPAY_key_SECRET); 



const db = require("./config/Dbconnection");
const express = require("express");
const mysql = require('mysql2');  
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


const RAZORPAY_WEBHOOK_SECRET="H@ss@n99";

const app = express();
app.use(cors({
  origin: 'https://hassan-y-sipra-firdos-collection-website.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads')); // Add this


const razorpay = new Razorpay({
  key_id: "rzp_test_57SnPwyYn0nU51",
  key_secret: "A8m7i5gpDzVlr3VEHNKqdmbV",
});





app.post("/api/login", (req, res) => {
  const { name, email, picture } = req.body;

  const sql = "INSERT INTO userlogin (name, email, picture) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE picture=?";
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



// *********************create-order************************




app.post("/create-order", async (req, res) => {
  // console.log("Request received:", req.body);

  const { product_id, user_id, amount } = req.body;

  if (!product_id || !user_id) {
    return res.status(400).json({ error: "Product ID or User ID is missing!" });
  }

  const options = {
    amount: amount * 100, // Convert to paisa
    currency: "INR",
receipt: JSON.stringify({ product_id, user_id: Number(user_id) }),
    payment_capture:1,
    
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


app.get("/", (req, res) => {
  console.log("razorpay webhook data:");
  res.status(200).json({ message: "WEBHOOK RECEIVED SUCCESSFULLY" });
});







// webhook


// app.post("/firdos/webhook", (req, res) => {
//   try {
//     console.log("📥 Razorpay Webhook Received:");
//     res.status(status).send(body,"➡️ Event Type:")
//     res.send("📦 Payload:", JSON.stringify(req.body, null, 2));
//   } catch (error) {
//     console.log(error.message);
//   }
// });





app.post('/firdos/webhook', (req, res) => {
  const webhookData = req.body;

  if (webhookData.event === 'order.paid' || webhookData.event === 'payment.failed') {
    const orderData = webhookData.payload.order.entity;
    const paymentData = webhookData.payload.payment.entity;
  

    // Receipt se user_id aur product_id fetch karo
    const receipt = orderData.receipt ? JSON.parse(orderData.receipt) : {};
    const userId = receipt.user_id || orderData.notes?.user_id || null;

    if (!userId) {
      console.error('User ID not found in order data');
      return res.status(400).send('User ID missing');
    }

    // UNIX timestamp ko MySQL DATETIME format me convert karo
    const createdAt = new Date(orderData.created_at * 1000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '); // YYYY-MM-DD HH:MM:SS format

    const status = webhookData.event === 'order.paid' ? 'paid' : 'failed';

    console.log('Payment Status:', status);
    console.log('Order ID:', orderData.id);
    console.log('Amount:', orderData.amount);

    const insertOrderQuery = `
      INSERT INTO orders (user_id, product_id, status, created_at, order_id, amount)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertOrderQuery, [
      userId,
      receipt.product_id || null,
      status, // Payment status ('paid' or 'failed')
      createdAt, // Converted DATETIME format
      orderData.id,
      orderData.amount
    ], (err, results) => {
      if (err) {
        console.error('Error inserting order data:', err);
        res.status(500).send('Error saving order data');
      } else {
        console.log('Order data inserted:', results);
        res.status(200).send('Order data saved successfully');
      }
    });
  } else {
    res.status(400).send('Invalid event');
  }
});








const ProductRoute = require("./routes/product/ProductRoute");
const { error } = require("console");
app.use("/", ProductRoute);

//  Start Server
const PORT = 1500;
app.listen(1500, () => {
  console.log("Server is running")
});
