import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();
// router.post("/create", async (req, res) => {
//   try {
//     const { userId, items, totalAmount, customerDetails, paymentId } = req.body;

//     const newOrder = new Order({
//       userId,
//       items,
//       totalAmount,
//       customerDetails,
//       paymentStatus: "Paid",
//       paymentId
//     });

//     await newOrder.save();
//     res.json({ message: "Order saved successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/create", protect, async (req, res) => {

  try {

    const {
      orderItems,
      shippingAddress,
      totalPrice,
      paymentId,
      paymentMethod,
      paymentStatus
    } = req.body;

    const newOrder = new Order({

      user: req.user._id,

      orderItems,

      shippingAddress,

      totalPrice,

      paymentId,

      paymentMethod,

      paymentStatus,

      isPaid: paymentMethod === "Razorpay",

      paidAt:
        paymentMethod === "Razorpay"
          ? Date.now()
          : null

    });

    await newOrder.save();

    res.status(201).json({
      message: "Order saved successfully!"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

});

router.get(
  "/admin",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/admin/:id/status",
  protect,
  admin,
  updateOrderStatus
);


router.get(
  "/my-orders",
  protect,
  async (req, res) => {

    try {

      const orders = await Order.find({
        user: req.user._id
      })
      .sort({ createdAt: -1 });

      res.json(orders);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to fetch orders"
      });

    }

  }
);



router.get(
  "/latest-address",
  protect,
  async (req, res) => {

    try {

      const latestOrder = await Order.findOne({
        user: req.user._id
      }).sort({ createdAt: -1 });

      if (!latestOrder) {

        return res.json(null);

      }

      res.json(
        latestOrder.shippingAddress
      );

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to fetch address"
      });

    }

  }
);


router.get(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const order = await Order.findById(
        req.params.id
      );

      if (!order) {

        return res.status(404).json({
          message: "Order not found"
        });

      }

      res.json(order);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to fetch order"
      });

    }

  }
);

router.get(
"/admin/payments",
protect,
admin,
async (req, res) => {

try {

const orders = await Order. find()
.populate("user", "name email")
.sort({ createdAt: -1 });

res.json(orders);

} catch (err) {

console.error(err);

res.status(500). json({
message: "Failed to fetch payments"
});
}
}
);
export default router;


router.put(
"/admin/:id/payment",
protect,
admin,
async (req, res) => {
try {
const order = await Order.findById(
req.params.id
);
if (!order) {
return res.status(404).json({
message: "Order not found"
});
}
order.paymentStatus = "Paid";
order.isPaid = true;
order.paidAt = Date.now();
await order.save();
res.json({
message: "Payment updated"
});
} catch (err) {
console.error(err);
res.status(500).json({
message: "Failed to update payment"
});
}
}
);