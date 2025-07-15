// // routes/products.js
// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch products." });
//   }
// });

// module.exports = router;

import express from 'express';
import Product from '../models/Product.js';
import { protect } from '../middleware/authMiddleware.js';
import Review from '../models/Review.js';



const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: { path: 'author', select: 'name' }
      });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// router.post('/:id/reviews',protect, async (req, res) => {
//   const { comment, rating } = req.body;
//   const productId = req.params.id;

//   if (!rating || !comment) {
//     return res.status(400).json({ error: 'Rating and comment are required' });
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ error: 'Product not found' });

//     const review = new Review({
//       comment,
//       rating,
//       author: req.user.id, // set by verifyToken middleware
//       product: product._id,
//     });

//     await review.save();

//     product.reviews.push(review._id);
//     await product.save();

//     const populatedReview = await review.populate('author', 'name');
//     const reviews = await Review.find({ product: productId }).populate('author', 'name');

//     res.status(201).json(reviews);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to post review' });
//   }
// });

router.post('/:id/reviews', protect, async (req, res) => {
  const { comment, rating } = req.body;
  const productId = req.params.id;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }

  if (!rating || !comment) {
    return res.status(400).json({ error: 'Rating and comment are required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const review = new Review({
      comment,
      rating,
      author: req.user._id,
      product: product._id,
    });

    await review.save();

    product.reviews.push(review._id);
    await product.save();

    const reviews = await Review.find({ product: productId }).populate('author', 'name');

    res.status(201).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post review' });
  }
});


export default router;

