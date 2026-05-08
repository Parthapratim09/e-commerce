import Order from '../models/Order.js';
import Product from "../models/Product.js";

// export const getAllOrders = async (req, res) => {

//   try {

//     const orders = await Order.find({})
//       .populate("user", "name email")
//       .populate("orderItems.product", "name images");

//     res.json(orders);

//   } catch (error) {

//     res.status(500).json({
//       message: "Failed to fetch orders"
//     });

//   }

// };


// export const markOrderDelivered = async (req, res) => {

//   try {

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({
//         message: "Order not found"
//       });
//     }

//     order.isDelivered = true;
//     order.deliveredAt = new Date();

//     await order.save();

//     res.json({
//       message: "Order marked as delivered"
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: "Failed to update order"
//     });

//   }

// };


// GET all orders
export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch {

    res.status(500);
    throw new Error("Failed to fetch orders");

  }

};


// UPDATE order status
// export const updateOrderStatus = async (req, res) => {

//   try {

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       res.status(404);
//       throw new Error("Order not found");
//     }

//     if (req.body.status === "Delivered") {
//   order.isDelivered = true;
//   order.deliveredAt = Date.now();
// }

//     order.orderStatus = req.body.status;


//     const updatedOrder = await order.save();

//     res.json(updatedOrder);

//   } catch {

//     res.status(500);
//     throw new Error("Failed to update order");
//   }

// };


export const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        message: "Order not found"
      });

    }

    
    order.orderStatus = req.body.status;

    

    if (
      req.body.status === "Delivered" &&
      !order.isDelivered
    ) {

      order.isDelivered = true;

      order.deliveredAt = Date.now();

      
      if (order.paymentMethod === "COD") {

        order.isPaid = true;

        order.paymentStatus = "Paid";

        order.paidAt = Date.now();

      }

      

      for (const item of order.orderItems) {

        const product = await Product.findById(
          item.product
        );

        if (!product) continue;

      
        if (product.countInStock >= item.quantity) {

          product.countInStock -= item.quantity;

        } else {

          product.countInStock = 0;

        }

        await product.save();

      }

    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to update order status"
    });

  }

};