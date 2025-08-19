import express from 'express';
import supabase from '../config/connection.js';

const router = express.Router();

// GET /api/subcategories - Get all subcategories
router.get('/', async (req, res) => {
  try {
    const { data: subcategories, error } = await supabase
      .from('subcategories')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('name');

    if (error) {
      console.error('Error fetching subcategories:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch subcategories',
        error: error.message 
      });
    }

    res.json({
      success: true,
      data: subcategories,
      count: subcategories.length
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/subcategories/:id - Get single subcategory
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: subcategory, error } = await supabase
      .from('subcategories')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching subcategory:', error);
      return res.status(404).json({ 
        success: false, 
        message: 'Subcategory not found',
        error: error.message 
      });
    }

    res.json({
      success: true,
      data: subcategory
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/subcategories/:id/products - Get products in a subcategory
router.get('/:id/products', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      min_price, 
      max_price, 
      sort_by = 'name', 
      sort_order = 'asc',
      limit = 20 
    } = req.query;

    let query = supabase
      .from('products')
      .select(`
        *,
        subcategories (
          id,
          name,
          categories (
            id,
            name
          )
        )
      `)
      .eq('subcategory_id', id);

    // Apply price filters
    if (min_price) {
      query = query.gte('price', parseFloat(min_price));
    }
    if (max_price) {
      query = query.lte('price', parseFloat(max_price));
    }

    // Apply sorting and limit
    query = query.order(sort_by, { ascending: sort_order === 'asc' });
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching products by subcategory:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch products',
        error: error.message 
      });
    }

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;
