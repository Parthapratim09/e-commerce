import express from "express";
import Order from "../models/Order.js";

const router = express.Router();
router.post("/create", async (req, res) => {
  try {
    const { userId, items, totalAmount, customerDetails, paymentId } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      customerDetails,
      paymentStatus: "Paid",
      paymentId
    });

    await newOrder.save();
    res.json({ message: "Order saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
