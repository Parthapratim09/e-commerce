import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  image: String,
  category: String,
  inStock: {
    type: Boolean,
    required: true,
    default: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

const Product = mongoose.model("Product", productSchema);

export default Product;
