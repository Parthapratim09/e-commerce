import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import { protect } from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
router.post("/create-order", protect, async (req, res) => {
  try {
    const { amount } = req.body;
     if (!amount || amount <= 0) {
      res.status(400);
      throw new Error("Invalid payment amount");
    }
    
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
