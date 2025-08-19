import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsAPI, dataHelpers } from '../../services/api';
import { useCart } from '../../context/useCart';
import { FiHeart, FiShoppingCart, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
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

  // Predefined ring sizes for user selection
  const ringSizes = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

  // Check if current product is a ring
  const isRing = product && product.subcategory === 'rings';

  // Fetch product from API
  const { data: productResponse, isLoading: loading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getById(id),
    enabled: !!id
  });

  // Transform and set product data
  useEffect(() => {
    if (productResponse?.data) {
      const transformedProduct = dataHelpers.transformProduct(productResponse.data);
      setProduct(transformedProduct);
      
      // For rings, set default size to first ring size, otherwise use database size
      const isRing = transformedProduct.subcategory === 'rings';
      if (isRing) {
        setSelectedSize('6'); // Default ring size
      } else {
        setSelectedSize(transformedProduct.size || '');
      }
    }
  }, [productResponse]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    // Validate size selection for rings
    if (isRing && !selectedSize) {
      alert('Please select a size for this ring.');
      return;
    }
    
    try {
      await addToCart(product, quantity, selectedSize);
      alert(`${product.name} has been added to your cart!`);
      console.log('Added to cart:', { product, quantity, selectedSize });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', product.name);
  };

  const getRelatedProducts = () => {
    if (!product) return [];
    // For now, return empty array. We'll implement this with a separate API call later
    return [];
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
              
              {/* Product Title and Details */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#120E0E] mb-4">
                  {product.name}
                </h1>
                
                {/* Product Details Grid */}
                <div className="grid grid-cols-1 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Item ID:</span>
                    <span className="text-gray-800 font-semibold">{product.item_id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Karat Type:</span>
                    <span className="text-gray-800 font-semibold">{product.specifications?.metal || product.carat_type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Weight:</span>
                    <span className="text-gray-800 font-semibold">{product.specifications?.weight}</span>
                  </div>
                  
                  {product.size && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Size:</span>
                      <span className="text-gray-800 font-semibold">{product.size}</span>
                    </div>
                  )}
                </div>

                {/* Description with specifications */}
                <div className="text-gray-600 text-lg leading-relaxed">
                  {product.description && (
                    <p className="mb-4">{product.description}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    <p><strong>Specifications:</strong></p>
                    <p>• Material: {product.carat_type} Gold</p>
                    <p>• Weight: {product.specifications?.weight}</p>
                    {product.size && <p>• Size: {product.size}</p>}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-[#FB8911]">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Size Selection - Only for rings and products that need sizes */}
              {(product.subcategory === 'rings' || (product.subcategory !== 'bangle-bracelets' && product.subcategory !== 'bangle-sets')) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-800 mb-3">
                    Size: {selectedSize}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(product.subcategory === 'rings' ? ringSizes : (product.sizes || [])).map((size) => (
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


            </div>
          </div>
        </div>



        {/* Related Products */}
        <RelatedProducts products={getRelatedProducts()} />
      </div>
    </div>
  );
};

export default ProductDetails;
