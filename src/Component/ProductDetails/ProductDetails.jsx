import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products as ALL_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/useCart';
import { FiHeart, FiShoppingCart, FiStar, FiShield, FiTruck, FiRotateCcw, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import ProductImageGallery from './ProductImageGallery';
import ProductSpecifications from './ProductSpecifications';
import RelatedProducts from './RelatedProducts';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const productData = getProductById(id);
    if (productData) {
      setProduct(productData);
      setSelectedSize(productData.sizes?.[0] || '');
    }
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    console.log('Added to cart:', { product, quantity, selectedSize });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', product.name);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRelatedProducts = () => {
    if (!product) return [];
    return ALL_PRODUCTS
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F1EC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FB8911] border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F6F1EC] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link 
            to="/collection"
            className="px-6 py-3 bg-[#FB8911] text-white rounded-lg hover:bg-[#e6760d] transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1EC] py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#FB8911]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collection" className="hover:text-[#FB8911]">Collection</Link>
          <span className="mx-2">/</span>
          <Link to={`/collection/${product.category}`} className="hover:text-[#FB8911]">
            {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#FB8911] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Side - Product Info */}
          <div>
            <div className="sticky top-4">
              
              {/* Product Title and Rating */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#120E0E] mb-3">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                  
                  {product.certification && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <FiShield size={16} />
                      <span>{product.certification}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-[#FB8911]">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                        Save ${(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                
                {product.discount > 0 && (
                  <div className="text-green-600 text-sm font-medium">
                    {product.discount}% off - Limited time offer
                  </div>
                )}
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-800 mb-3">
                    Size: {selectedSize}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-[#FB8911] bg-[#FB8911] text-white'
                            : 'border-gray-300 bg-[#FAF7F2] text-gray-700 hover:border-[#FB8911]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  
                  <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-8">
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? 'bg-[#FB8911] text-white hover:bg-[#e6760d]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FiShoppingCart size={20} />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={handleWishlistToggle}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      isWishlisted
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-gray-300 bg-[#FAF7F2] text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    {isWishlisted ? <FaHeart size={20} /> : <FiHeart size={20} />}
                  </button>
                  
                  <button className="px-4 py-3 rounded-lg border-2 border-gray-300 bg-[#FAF7F2] text-gray-600 hover:bg-gray-50 transition-colors">
                    <FiShare2 size={20} />
                  </button>
                </div>

                {product.inStock && (
                  <button className="w-full py-3 border-2 border-[#FB8911] text-[#FB8911] rounded-lg font-semibold hover:bg-[#FB8911] hover:text-white transition-colors">
                    Buy Now
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FiTruck className="text-[#FB8911]" size={20} />
                    <span>Free shipping on orders over $500</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FiRotateCcw className="text-[#FB8911]" size={20} />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FiShield className="text-[#FB8911]" size={20} />
                    <span>Lifetime warranty on gold jewelry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FB8911] text-[#FB8911]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>


        </div>

        {/* Related Products */}
        <RelatedProducts products={getRelatedProducts()} />
      </div>
    </div>
  );
};

export default ProductDetails;
