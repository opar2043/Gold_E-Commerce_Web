import express from 'express';
import supabase from '../config/connection.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch categories',
        error: error.message 
      });
    }

    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/categories/:id - Get single category with subcategories
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get category with its subcategories
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select(`
        *,
        subcategories (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (categoryError) {
      console.error('Error fetching category:', categoryError);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch category',
        error: categoryError.message 
      });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// GET /api/categories/:id/subcategories - Get subcategories for a category
router.get('/:id/subcategories', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: subcategories, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', id)
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

export default router;
