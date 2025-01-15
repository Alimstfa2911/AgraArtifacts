import Cart from '../models/cart.js';

export const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get cart' });
  }
};

// Update or create a cart for a specific user
export const updateUserCart = async (req, res) => {
    const { userId } = req.params;
    const { items } = req.body;
    
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (cart) {
        cart.items = items;  // Update the items in the cart
        await cart.save();
      } else {
        cart = new Cart({ user: userId, items });  // Create a new cart
        await cart.save();
      }
  
      res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update cart' });
    }
  };


