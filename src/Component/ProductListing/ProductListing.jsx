import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { categories, products as ALL_PRODUCTS, getProductsByCategory, getProductsBySubcategory } from '../../data/mockData';
import CategoryTabs from './CategoryTabs';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import SortDropdown from './SortDropdown';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';

const ProductListing = () => {
  const { category, subcategory } = useParams();
  const [_searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || 'all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedMetal, setSelectedMetal] = useState('all');
  const [selectedPurity, setSelectedPurity] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get current category data
  const currentCategory = selectedCategory !== 'all' ? categories[selectedCategory] : null;
  const currentSubcategory = currentCategory && selectedSubcategory !== 'all' 
    ? currentCategory.subcategories[selectedSubcategory] 
    : null;

  // Load products based on selection
  useEffect(() => {
    setLoading(true);
    let productData = [];
    
    if (selectedCategory === 'all') {
      // Show all products from all categories
      productData = ALL_PRODUCTS;
    } else if (selectedSubcategory === 'all') {
      productData = getProductsByCategory(selectedCategory);
    } else {
      productData = getProductsBySubcategory(selectedCategory, selectedSubcategory);
    }
    
    setProducts(productData);
    setLoading(false);
  }, [selectedCategory, selectedSubcategory]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Metal filter
    if (selectedMetal !== 'all') {
      filtered = filtered.filter(product => 
        product.specifications?.metal?.toLowerCase().includes(selectedMetal.toLowerCase())
      );
    }

    // Purity filter
    if (selectedPurity !== 'all') {
      filtered = filtered.filter(product => 
        product.specifications?.metal?.includes(selectedPurity)
      );
    }

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedMetal, selectedPurity, inStockOnly, sortBy]);

  // Handle category/subcategory changes
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('all');
    setSearchParams({ category: categoryId });
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    if (selectedCategory !== 'all') {
      setSearchParams({ category: selectedCategory, subcategory: subcategoryId });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 20000]);
    setSelectedMetal('all');
    setSelectedPurity('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Get page title
  const getPageTitle = () => {
    if (selectedCategory === 'all') return 'All Collections';
    if (currentSubcategory) return currentSubcategory.name;
    if (currentCategory) return currentCategory.name;
    return 'Collection';
  };

  const getPageDescription = () => {
    if (selectedCategory === 'all') return 'Explore our complete jewelry collection';
    if (currentSubcategory) return currentSubcategory.description;
    if (currentCategory) return currentCategory.description;
    return 'Discover beautiful jewelry pieces';
  };

  return (
    <div className="min-h-screen bg-[#F6F1EC] py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Collection</span>
            {currentCategory && (
              <>
                <span className="mx-2">/</span>
                <span>{currentCategory.name}</span>
              </>
            )}
            {currentSubcategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-[#FB8911] font-medium">{currentSubcategory.name}</span>
              </>
            )}
          </nav>
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#120E0E] mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600 text-lg">
              {getPageDescription()}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        {/* Subcategory Tabs */}
        {currentCategory && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleSubcategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSubcategory === 'all'
                    ? 'bg-[#FB8911] text-white'
                    : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#FB8911]/10'
                }`}
              >
                All {currentCategory.name}
              </button>
              {Object.entries(currentCategory.subcategories).map(([key, sub]) => (
                <button
                  key={key}
                  onClick={() => handleSubcategoryChange(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubcategory === key
                      ? 'bg-[#FB8911] text-white'
                      : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#FB8911]/10'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className={`transition-all duration-300 ${showFilters ? 'w-80' : 'w-0 overflow-hidden'} lg:w-80`}>
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedMetal={selectedMetal}
              setSelectedMetal={setSelectedMetal}
              selectedPurity={selectedPurity}
              setSelectedPurity={setSelectedPurity}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-[#FAF7F2] p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#FB8911] text-white rounded-md hover:bg-[#e6760d] transition-colors"
                >
                  <FiFilter size={16} />
                  Filters
                </button>
                
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `${filteredProducts.length} products found`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <SortDropdown 
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#FB8911] text-white' : 'bg-[#FAF7F2] text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#FB8911] text-white' : 'bg-[#FAF7F2] text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FiList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FB8911] border-t-transparent"></div>
              </div>
            ) : (
              <ProductGrid 
                products={filteredProducts}
                viewMode={viewMode}
              />
            )}

            {/* No Products Message */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM9 9V7a1 1 0 012 0v2a1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[#FB8911] text-white rounded-md hover:bg-[#e6760d] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
