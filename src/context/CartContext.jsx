import  { createContext, useReducer, useEffect } from 'react';
import { CART_ACTIONS } from './cartActions';

// Initial cart state
const initialState = {
  items: [],
  isOpen: false,
  total: 0,
  subtotal: 0,
  itemCount: 0,
  shipping: 0,
  tax: 0,
  discount: 0
};


// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, selectedSize } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem = {
          ...product,
          cartId: `${product.id}-${selectedSize || 'default'}`,
          quantity,
          selectedSize,
          addedAt: new Date().toISOString()
        };
        newItems = [...state.items, newItem];
      }

      return { ...state, items: newItems };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.cartId !== action.payload.cartId);
      return { ...state, items: newItems };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: { cartId } });
      }

      const newItems = state.items.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      );
      return { ...state, items: newItems };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    case CART_ACTIONS.TOGGLE_CART: {
      return { ...state, isOpen: !state.isOpen };
    }

    case CART_ACTIONS.APPLY_DISCOUNT: {
      const { discountAmount, discountCode } = action.payload;
      return { 
        ...state, 
        discount: discountAmount,
        discountCode: discountCode
      };
    }

    case CART_ACTIONS.CALCULATE_TOTALS: {
      const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      
      // Calculate shipping (free over $500)
      const shipping = subtotal > 500 ? 0 : 25;
      
      // Calculate tax (8.5%)
      const tax = subtotal * 0.085;
      
      // Calculate total
      const total = subtotal + shipping + tax - state.discount;

      return {
        ...state,
        subtotal,
        total: Math.max(0, total),
        itemCount,
        shipping,
        tax
      };
    }

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('yasini-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.items.forEach(item => {
          dispatch({ 
            type: CART_ACTIONS.ADD_ITEM, 
            payload: { 
              product: item, 
              quantity: item.quantity, 
              selectedSize: item.selectedSize 
            } 
          });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('yasini-cart', JSON.stringify({ items: state.items }));
    dispatch({ type: CART_ACTIONS.CALCULATE_TOTALS });
  }, [state.items]);

  // Cart actions
  const addToCart = (product, quantity = 1, selectedSize = '') => {
    dispatch({ 
      type: CART_ACTIONS.ADD_ITEM, 
      payload: { product, quantity, selectedSize } 
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { cartId } });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  const applyDiscount = (discountAmount, discountCode) => {
    dispatch({ type: CART_ACTIONS.APPLY_DISCOUNT, payload: { discountAmount, discountCode } });
  };

  const getCartItemCount = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return state.total;
  };

  const isItemInCart = (productId, selectedSize = '') => {
    return state.items.some(item => 
      item.id === productId && item.selectedSize === selectedSize
    );
  };

  const getItemQuantity = (productId, selectedSize = '') => {
    const item = state.items.find(item => 
      item.id === productId && item.selectedSize === selectedSize
    );
    return item ? item.quantity : 0;
  };

  const value = {
    // State
    ...state,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    applyDiscount,
    
    // Getters
    getCartItemCount,
    getCartTotal,
    isItemInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
