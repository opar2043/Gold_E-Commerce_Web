import express from 'express';
import supabase from '../config/connection.js';

const router = express.Router();

// Debug route to test connection and get sample data
router.get('/debug', async (req, res) => {
  try {
    console.log('Debug route called');
    
    // Test basic connection
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);

    const { data: subcategories, error: subError } = await supabase
      .from('subcategories')
      .select('*')
      .limit(5);

    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    res.json({
      success: true,
      debug_info: {
        categories: {
          count: categories?.length || 0,
          sample: categories?.[0] || null,
          error: catError?.message || null
        },
        subcategories: {
          count: subcategories?.length || 0,
          sample: subcategories?.[0] || null,
          error: subError?.message || null
        },
        products: {
          count: products?.length || 0,
          sample: products?.[0] || null,
          error: prodError?.message || null
        }
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Debug test failed',
      error: error.message 
    });
  }
});

export default router;
