// API Service for Gold E-Commerce
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get all categories with subcategories
  getAllWithSubcategories: async () => {
    const categoriesResponse = await api.get('/categories');
    const categories = categoriesResponse.data.data;
    
    // Fetch subcategories for each category
    const categoriesWithSubs = await Promise.all(
      categories.map(async (category) => {
        const categoryResponse = await api.get(`/categories/${category.id}`);
        return categoryResponse.data.data;
      })
    );
    
    return { data: categoriesWithSubs };
  },

  // Get single category with subcategories
  getById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Get subcategories for a category
  getSubcategories: async (id) => {
    const response = await api.get(`/categories/${id}/subcategories`);
    return response.data;
  },
};

// Subcategories API
export const subcategoriesAPI = {
  // Get all subcategories
  getAll: async () => {
    const response = await api.get('/subcategories');
    return response.data;
  },

  // Get single subcategory
  getById: async (id) => {
    const response = await api.get(`/subcategories/${id}`);
    return response.data;
  },

  // Get products in a subcategory
  getProducts: async (id, params = {}) => {
    const response = await api.get(`/subcategories/${id}/products`, { params });
    return response.data;
  },
};

// Products API
export const productsAPI = {
  // Get all products with filtering and pagination
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get product by item_id (for compatibility with existing frontend)
  getByItemId: async (itemId) => {
    const response = await api.get(`/products/item/${itemId}`);
    return response.data;
  },

  // Get products by category name
  getByCategory: async (categoryName, params = {}) => {
    const response = await api.get(`/products/category/${encodeURIComponent(categoryName)}`, { params });
    return response.data;
  },

  // Get products by subcategory name
  getBySubcategory: async (subcategoryName, params = {}) => {
    const response = await api.get(`/products/subcategory/${encodeURIComponent(subcategoryName)}`, { params });
    return response.data;
  },

  // Search products
  search: async (searchTerm, params = {}) => {
    const response = await api.get('/products', { 
      params: { ...params, search: searchTerm } 
    });
    return response.data;
  },
};

// Cart API - Session-based guest cart system
export const cartAPI = {
  // Generate a unique session ID for guest cart
  generateSessionId: () => {
    return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Get session ID from localStorage or create new one
  getSessionId: () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = cartAPI.generateSessionId();
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  },

  // Get cart for current session
  getCart: async () => {
    const sessionId = cartAPI.getSessionId();
    const response = await api.get(`/cart/${sessionId}`);
    return response.data;
  },

  // Add item to cart
  addItem: async (productId, quantity = 1, size = null) => {
    const sessionId = cartAPI.getSessionId();
    const response = await api.post(`/cart/${sessionId}/add`, {
      productId,
      quantity,
      size
    });
    return response.data;
  },

  // Update cart item
  updateItem: async (itemId, quantity, size = null) => {
    const updateData = { quantity };
    if (size !== null) {
      updateData.size = size;
    }
    const response = await api.put(`/cart/item/${itemId}`, updateData);
    return response.data;
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async () => {
    const sessionId = cartAPI.getSessionId();
    const response = await api.delete(`/cart/${sessionId}/clear`);
    return response.data;
  },

  // Get cart item count
  getItemCount: async () => {
    const sessionId = cartAPI.getSessionId();
    const response = await api.get(`/cart/${sessionId}/count`);
    return response.data;
  }
};

// Helper functions for data transformation
export const dataHelpers = {
  // Transform API category data to match existing frontend structure
  transformCategories: (apiCategories) => {
    const transformed = {};
    apiCategories.forEach(category => {
      const categoryKey = category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
      
      // Transform subcategories
      const subcategories = {};
      if (category.subcategories && Array.isArray(category.subcategories)) {
        category.subcategories.forEach(sub => {
          const subKey = sub.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
          subcategories[subKey] = {
            id: subKey,
            name: sub.name,
            description: `Beautiful ${sub.name.toLowerCase()} collection`
          };
        });
      }
      
      transformed[categoryKey] = {
        id: categoryKey,
        name: category.name,
        description: `Premium ${category.name.toLowerCase()} collection`,
        subcategories: subcategories
      };
    });
    return transformed;
  },

  // Transform API product data to match existing frontend structure
  transformProduct: (apiProduct) => {
    // Handle images array - construct proper URLs using Supabase storage
    let imagesArray = ['/placeholder-image.jpg'];
    
    if (apiProduct.images && Array.isArray(apiProduct.images) && apiProduct.images.length > 0) {
      // Filter out any null/empty values and construct full URLs
      const validImages = apiProduct.images.filter(img => img && img.trim() !== '');
      if (validImages.length > 0) {
        imagesArray = validImages.map(imagePath => 
          `${SUPABASE_URL}/storage/v1/object/public/product_images/${imagePath}`
        );
      }
    }
    
    return {
      id: apiProduct.id,
      item_id: apiProduct.item_id,
      name: apiProduct.name,
      price: parseFloat(apiProduct.price),
      category: apiProduct.subcategories?.categories?.name?.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') || '',
      subcategory: apiProduct.subcategories?.name?.toLowerCase().replace(/\s+/g, '-') || '',
      images: imagesArray,
      description: apiProduct.description || '',
      details: apiProduct.description || '',
      size: apiProduct.size, // Raw database size field
      weight_grams: apiProduct.weight_grams, // Raw weight for display
      carat_type: apiProduct.carat_type, // Raw carat type for display
      specifications: {
        metal: apiProduct.carat_type,
        weight: `${apiProduct.weight_grams}g`,
        size: apiProduct.size
      },
      inStock: apiProduct.stock > 0,
      stock: apiProduct.stock,
      sizes: apiProduct.size ? [apiProduct.size] : []
    };
  },

  // Transform multiple products
  transformProducts: (apiProducts) => {
    return apiProducts.map(product => dataHelpers.transformProduct(product));
  }
};

// Export default api instance
export default api;
