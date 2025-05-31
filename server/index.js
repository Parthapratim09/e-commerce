import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';  // Note the .js extension
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // <== THIS IS REQUIRED

// Connect to MongoDB

mongoose.connect(process.env.ATLAS_DB_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });