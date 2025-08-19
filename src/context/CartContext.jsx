import React, { createContext, useReducer, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartAPI } from '../services/api';
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
  discount: 0,
  loading: false,
  error: null
};


// Cart reducer - simplified for backend integration
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART_DATA: {
      const { items, totals, itemCount } = action.payload;
      return {
        ...state,
        items: items || [],
        total: totals?.total || 0,
        subtotal: totals?.subtotal || 0,
        shipping: totals?.shipping || 0,
        tax: totals?.tax || 0,
        itemCount: itemCount || 0,
        loading: false,
        error: null
      };
    }

    case CART_ACTIONS.SET_LOADING: {
      return { ...state, loading: action.payload };
    }

    case CART_ACTIONS.SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
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

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const queryClient = useQueryClient();

  // Fetch cart data from backend
  const { data: cartData, isLoading, error, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: cartAPI.getCart,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error('Cart fetch error:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  });

  // Update state when cart data changes
  useEffect(() => {
    if (cartData?.success && cartData?.data) {
      dispatch({ 
        type: CART_ACTIONS.SET_CART_DATA, 
        payload: cartData.data 
      });
    }
  }, [cartData]);

  // Set loading state
  useEffect(() => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: isLoading });
  }, [isLoading]);

  // Add item to cart mutation
  const addItemMutation = useMutation({
    mutationFn: ({ productId, quantity, size }) => cartAPI.addItem(productId, quantity, size),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      console.error('Add to cart error:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  });

  // Update item mutation
  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, quantity, size }) => cartAPI.updateItem(itemId, quantity, size),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      console.error('Update cart item error:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  });

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: (itemId) => cartAPI.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      console.error('Remove cart item error:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => cartAPI.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      console.error('Clear cart error:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  });

  // Cart actions
  const addToCart = async (product, quantity = 1, selectedSize = '') => {
    try {
      await addItemMutation.mutateAsync({
        productId: product.id,
        quantity,
        size: selectedSize
      });
    } catch (error) {
      console.error('Add to cart failed:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await removeItemMutation.mutateAsync(itemId);
    } catch (error) {
      console.error('Remove from cart failed:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await updateItemMutation.mutateAsync({ itemId, quantity });
    } catch (error) {
      console.error('Update quantity failed:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
    } catch (error) {
      console.error('Clear cart failed:', error);
      throw error;
    }
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  const applyDiscount = (discountAmount, discountCode) => {
    dispatch({ type: CART_ACTIONS.APPLY_DISCOUNT, payload: { discountAmount, discountCode } });
  };

  const getCartItemCount = () => {
    return state.itemCount;
  };

  const getCartTotal = () => {
    return state.total;
  };

  const isItemInCart = (productId, selectedSize = '') => {
    return state.items.some(item => 
      item.products?.id === productId && item.size === selectedSize
    );
  };

  const getItemQuantity = (productId, selectedSize = '') => {
    const item = state.items.find(item => 
      item.products?.id === productId && item.size === selectedSize
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
    getItemQuantity,
    
    // Additional state
    loading: isLoading || addItemMutation.isPending || updateItemMutation.isPending || removeItemMutation.isPending || clearCartMutation.isPending,
    error: error?.message || state.error,
    refetchCart: refetch
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
