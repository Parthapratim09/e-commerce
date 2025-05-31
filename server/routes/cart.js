import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET user's cart
router.get('/', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart || { items: [] });
});

// ADD/UPDATE item in cart
router.post('/add', protect, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(item => item.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
});

// REMOVE item from cart
router.delete('/remove/:productId', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
});

// UPDATE quantity
router.put('/update', protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(item => item.product.toString() === productId);
  if (item) {
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
});

export default router;