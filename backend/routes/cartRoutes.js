import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// Cart routes for session-based guest carts
// Using sessionId instead of userId since no authentication yet

// Get cart for a session
router.get('/:sessionId', cartController.getCart);

// Add item to cart
router.post('/:sessionId/add', cartController.addItem);

// Update cart item
router.put('/item/:itemId', cartController.updateItem);

// Remove item from cart
router.delete('/item/:itemId', cartController.removeItem);

// Clear entire cart
router.delete('/:sessionId/clear', cartController.clearCart);

// Get cart item count
router.get('/:sessionId/count', cartController.getItemCount);

export default router;
