import supabase from '../config/connection.js';

const cartController = {
  // Get cart for a session (guest cart)
  getCart: async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      // Get or create cart for this session
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        throw cartError;
      }

      // If no cart exists, create one
      if (!cart) {
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ session_id: sessionId, user_id: null })
          .select('id')
          .single();

        if (createError) throw createError;
        cart = newCart;
      }

      // Get cart items with product details
      const { data: cartItems, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          size,
          added_at,
          products (
            id,
            item_id,
            name,
            description,
            carat_type,
            weight_grams,
            price,
            images,
            stock,
            subcategories (
              id,
              name,
              categories (
                id,
                name
              )
            )
          )
        `)
        .eq('cart_id', cart.id);

      if (itemsError) throw itemsError;

      // Transform image URLs to full Supabase storage URLs
      const transformedItems = cartItems.map(item => {
        if (item.products && item.products.images) {
          const transformedImages = item.products.images
            .filter(img => img && img.trim() !== '')
            .map(imagePath => 
              `${process.env.SUPABASE_URL}/storage/v1/object/public/product_images/${imagePath}`
            );
          
          return {
            ...item,
            products: {
              ...item.products,
              images: transformedImages,
              mainImage: transformedImages[0] || '/placeholder-image.jpg'
            }
          };
        }
        return item;
      });

      // Calculate totals
      const subtotal = transformedItems.reduce((sum, item) => {
        return sum + (parseFloat(item.products.price) * item.quantity);
      }, 0);

      const shipping = subtotal > 500 ? 0 : 25;
      const tax = subtotal * 0.085;
      const total = subtotal + shipping + tax;

      res.json({
        success: true,
        data: {
          cartId: cart.id,
          items: transformedItems,
          totals: {
            subtotal: parseFloat(subtotal.toFixed(2)),
            shipping: parseFloat(shipping.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            total: parseFloat(total.toFixed(2))
          },
          itemCount: transformedItems.reduce((sum, item) => sum + item.quantity, 0)
        }
      });

    } catch (error) {
      console.error('Get cart error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving cart',
        error: error.message
      });
    }
  },

  // Add item to cart
  addItem: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { productId, quantity = 1, size = null } = req.body;

      // Validate product exists
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('id, stock')
        .eq('id', productId)
        .single();

      if (productError || !product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Check stock
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
      }

      // Get or create cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        throw cartError;
      }

      if (!cart) {
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ session_id: sessionId, user_id: null })
          .select('id')
          .single();

        if (createError) throw createError;
        cart = newCart;
      }

      // Check if item already exists in cart
      const { data: existingItem, error: existingError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .eq('size', size)
        .single();

      if (existingError && existingError.code !== 'PGRST116') {
        throw existingError;
      }

      if (existingItem) {
        // Update existing item quantity
        const newQuantity = existingItem.quantity + quantity;
        
        if (product.stock < newQuantity) {
          return res.status(400).json({
            success: false,
            message: 'Insufficient stock for requested quantity'
          });
        }

        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Add new item to cart
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            quantity,
            size
          });

        if (insertError) throw insertError;
      }

      res.json({
        success: true,
        message: 'Item added to cart successfully'
      });

    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding item to cart',
        error: error.message
      });
    }
  },

  // Update cart item
  updateItem: async (req, res) => {
    try {
      const { itemId } = req.params;
      const { quantity, size } = req.body;

      if (quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be greater than 0'
        });
      }

      // Get cart item with product info for stock check
      const { data: cartItem, error: itemError } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          products (stock)
        `)
        .eq('id', itemId)
        .single();

      if (itemError || !cartItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found'
        });
      }

      // Check stock
      if (cartItem.products.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
      }

      // Update the item
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          ...(size !== undefined && { size })
        })
        .eq('id', itemId);

      if (updateError) throw updateError;

      res.json({
        success: true,
        message: 'Cart item updated successfully'
      });

    } catch (error) {
      console.error('Update cart item error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating cart item',
        error: error.message
      });
    }
  },

  // Remove item from cart
  removeItem: async (req, res) => {
    try {
      const { itemId } = req.params;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      res.json({
        success: true,
        message: 'Item removed from cart successfully'
      });

    } catch (error) {
      console.error('Remove cart item error:', error);
      res.status(500).json({
        success: false,
        message: 'Error removing item from cart',
        error: error.message
      });
    }
  },

  // Clear entire cart
  clearCart: async (req, res) => {
    try {
      const { sessionId } = req.params;

      // Get cart
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        throw cartError;
      }

      if (cart) {
        const { error: clearError } = await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cart.id);

        if (clearError) throw clearError;
      }

      res.json({
        success: true,
        message: 'Cart cleared successfully'
      });

    } catch (error) {
      console.error('Clear cart error:', error);
      res.status(500).json({
        success: false,
        message: 'Error clearing cart',
        error: error.message
      });
    }
  },

  // Get cart item count
  getItemCount: async (req, res) => {
    try {
      const { sessionId } = req.params;

      // Get cart
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        throw cartError;
      }

      let itemCount = 0;

      if (cart) {
        const { data: items, error: itemsError } = await supabase
          .from('cart_items')
          .select('quantity')
          .eq('cart_id', cart.id);

        if (itemsError) throw itemsError;

        itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      }

      res.json({
        success: true,
        data: { itemCount }
      });

    } catch (error) {
      console.error('Get item count error:', error);
      res.status(500).json({
        success: false,
        message: 'Error getting cart item count',
        error: error.message
      });
    }
  }
};

export default cartController;
