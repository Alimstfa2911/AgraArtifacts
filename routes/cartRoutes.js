import express from 'express';
import { getUserCart, updateUserCart } from '../controllers/cartController.js';
const router = express.Router();

// Route to get the user's cart
router.get('/api/v1/cart/:userId', getUserCart);

// POST route for updating/creating the user's cart
router.post('/api/v1/cart/:userId', updateUserCart);

export default router;




