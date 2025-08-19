import express from 'express';
import supabase from '../config/connection.js';

const router = express.Router();

// GET /api/products - Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      subcategory,
      min_price,
      max_price,
      carat_type,
      sort_by = 'name',
      sort_order = 'asc',
      page = 1,
      limit = 20,
      search
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
      `);

    // Apply filters
    if (category) {
      query = query.eq('subcategories.categories.name', category);
    }

    if (subcategory) {
      query = query.eq('subcategories.name', subcategory);
    }

    if (min_price) {
      query = query.gte('price', parseFloat(min_price));
    }

    if (max_price) {
      query = query.lte('price', parseFloat(max_price));
    }

    if (carat_type) {
      query = query.eq('carat_type', carat_type);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    const validSortFields = ['name', 'price', 'weight_grams', 'created_at'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'name';
    const sortDirection = sort_order === 'desc' ? false : true;
    
    query = query.order(sortField, { ascending: sortDirection });

    // Apply pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch products',
        error: error.message 
      });
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        pages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
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
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found',
        error: error.message 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/products/item/:item_id - Get product by item_id (for frontend compatibility)
router.get('/item/:item_id', async (req, res) => {
  try {
    const { item_id } = req.params;

    const { data: product, error } = await supabase
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
      .eq('item_id', item_id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found',
        error: error.message 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/products/category/:category_name - Get products by category name
router.get('/category/:category_name', async (req, res) => {
  try {
    const { category_name } = req.params;
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
        subcategories!inner (
          id,
          name,
          categories!inner (
            id,
            name
          )
        )
      `)
      .eq('subcategories.categories.name', category_name);

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
      console.error('Error fetching products by category:', error);
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

// GET /api/products/subcategory/:subcategory_name - Get products by subcategory name
router.get('/subcategory/:subcategory_name', async (req, res) => {
  try {
    const { subcategory_name } = req.params;
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
        subcategories!inner (
          id,
          name,
          categories (
            id,
            name
          )
        )
      `)
      .eq('subcategories.name', subcategory_name);

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
