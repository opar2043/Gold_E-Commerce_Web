import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, viewMode }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || '');
    console.log('Added to cart:', product);
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <Link 
        to={`/product/${product.id}`}
        className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex gap-4 p-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <img
              src={product.mainImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between h-full">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Specifications */}
                <div className="text-xs text-gray-500 mb-2">
                  {product.specifications?.metal && (
                    <span className="mr-3">{product.specifications.metal}</span>
                  )}
                  {product.specifications?.weight && (
                    <span>{product.specifications.weight}</span>
                  )}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#FB8911]">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 text-red-500'
                        : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    {isWishlisted ? <FaHeart size={14} /> : <FiHeart size={14} />}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-3 py-2 bg-[#FB8911] text-white rounded-md hover:bg-[#e6760d] transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view
  return (
    <Link 
      to={`/product/${product.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
          {!product.inStock && (
            <div className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Out of Stock
            </div>
          )}
          {product.certification && (
            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Certified
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isWishlisted
                ? 'bg-red-50 text-red-500'
                : 'bg-white text-gray-400 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            {isWishlisted ? <FaHeart size={16} /> : <FiHeart size={16} />}
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white text-gray-400 hover:bg-[#FB8911] hover:text-white rounded-full shadow-md transition-colors"
          >
            <FiShoppingCart size={16} />
          </button>
          <button className="p-2 bg-white text-gray-400 hover:bg-gray-800 hover:text-white rounded-full shadow-md transition-colors">
            <FiEye size={16} />
          </button>
        </div>

        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}>
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleImageChange(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex 
                    ? 'bg-[#FB8911]' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Specifications */}
        {product.specifications?.metal && (
          <div className="text-xs text-gray-500 mb-3">
            {product.specifications.metal}
            {product.specifications.weight && ` • ${product.specifications.weight}`}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#FB8911]">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {product.inStock && (
            <span className="text-xs text-green-600 font-medium">
              In Stock
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Link>
  );
};

export default ProductCard;
