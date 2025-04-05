// server.js
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const morgan = require('morgan');
const dotenv = require('dotenv');


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,      // Replace with your Razorpay Key ID
    key_secret: process.env.SECRET_KEY  // Replace with your Razorpay Secret Key
});

// Create Order API
app.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body; // Amount in rupees
        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: 'receipt_order_' + Math.floor(Math.random() * 10000),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order');
    }
});

// Verify Payment API
app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.SECRET_KEY) // Same secret
        .update(sign.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Run Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
const path = require('path'); // 👈 Add this at the top

// Serve HTML page

