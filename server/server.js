import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; 
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/Order.js";
import errorHandler from "./middleware/errorMiddleware.js";



dotenv.config();

const app = express();
app.use(cors(process.env.NODE_ENV === "production" ? { origin: process.env.FRONTEND_URL } : {}));
app.use(express.json());

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  console.error("Razorpay keys missing Contact Developer");
}

if (!process.env.ATLAS_DB_URL) {
  console.error("MongoDB URL missing in .env");
  process.exit(1);
}




const port = process.env.PORT || 5000;


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/products', productRoutes);
app.use(errorHandler);

// Connect to MongoDB

mongoose.connect(process.env.ATLAS_DB_URL, { 
  useNewUrlParser: true, 
  // useUnifiedTopology: true 
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });