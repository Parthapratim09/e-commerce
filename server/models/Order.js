import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      name: String,

      quantity: Number,

      price: Number,

      image: String
    }
  ],

  shippingAddress: {

    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    postalCode: {
      type: String,
      required: true
    },

    country: {
      type: String,
      required: true
    }

  },

  totalPrice: {
    type: Number,
    required: true
  },

  paymentId: {
    type: String
  },

  paymentMethod: {
  type: String,
  enum: ["Razorpay", "COD"],
  default: "COD"
},

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },

  // 🔥 NEW
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled"
    ],
    default: "Pending"
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  isDelivered: {
    type: Boolean,
    default: false
  },

  paidAt: Date,

  deliveredAt: Date

}, {
  timestamps: true
});

export default mongoose.model("Order", orderSchema);