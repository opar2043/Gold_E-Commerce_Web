import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useState } from 'react';

const RelatedProducts = ({ products }) => {
  const [wishlistedItems, setWishlistedItems] = useState(new Set());

  const handleWishlistToggle = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to cart:', product);
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

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#120E0E] mb-2">
          You Might Also Like
        </h2>
        <p className="text-gray-600">
          Similar products from our collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block bg-[#FAF7F2] rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.mainImage}
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
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => handleWishlistToggle(product.id, e)}
                  className={`p-2 rounded-full shadow-md transition-colors ${
                    wishlistedItems.has(product.id)
                      ? 'bg-red-50 text-red-500'
                      : 'bg-[#FAF7F2] text-gray-400 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <FiHeart size={14} />
                </button>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="p-2 bg-[#FAF7F2] text-gray-400 hover:bg-[#FB8911] hover:text-white rounded-full shadow-md transition-colors"
                >
                  <FiShoppingCart size={14} />
                </button>
              </div>
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
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          to="/collection"
          className="inline-flex items-center px-6 py-3 bg-[#FAF7F2] border-2 border-[#FB8911] text-[#FB8911] rounded-lg font-semibold hover:bg-[#FB8911] hover:text-white transition-colors duration-300"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
