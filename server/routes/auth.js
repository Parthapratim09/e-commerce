import express from 'express';
import { protect } from '../middleware/authMiddleware.js';  // Note .js extension
import { register, login, getMe } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;  // Changed from module.exports