import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { FiMinus, FiPlus, FiTrash2, FiHeart, FiShield } from 'react-icons/fi';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    // Simulate API call delay
    setTimeout(() => {
      updateQuantity(item.cartId, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const handleRemove = () => {
    removeFromCart(item.cartId);
    setShowRemoveConfirm(false);
  };

  const itemTotal = item.price * item.quantity;
  const savings = item.originalPrice > item.price ? (item.originalPrice - item.price) * item.quantity : 0;

  return (
    <div className="p-6 relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#FB8911] border-t-transparent"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product/${item.id}`} className="block">
            <img
              src={item.mainImage}
              alt={item.name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200 hover:border-[#FB8911] transition-colors"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <Link 
                to={`/product/${item.id}`}
                className="block hover:text-[#FB8911] transition-colors"
              >
                <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                  {item.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.description}
              </p>

              {/* Product Attributes */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                {item.selectedSize && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    Size: {item.selectedSize}
                  </span>
                )}
                {item.specifications?.metal && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {item.specifications.metal}
                  </span>
                )}
                {item.certification && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                    <FiShield size={12} />
                    {item.certification}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item.quantity - 1)}
                      disabled={item.quantity <= 1 || isUpdating}
                      className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-3 py-2 min-w-[50px] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.quantity + 1)}
                      disabled={isUpdating}
                      className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-lg font-bold text-[#FB8911]">
                    ${itemTotal.toLocaleString()}
                  </div>
                  {savings > 0 && (
                    <div className="text-xs text-green-600">
                      Save ${savings.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Price and Actions */}
            <div className="hidden md:flex flex-col items-end justify-between min-w-[200px]">
              
              {/* Price */}
              <div className="text-right mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#FB8911]">
                    ${itemTotal.toLocaleString()}
                  </span>
                </div>
                
                {item.originalPrice > item.price && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">
                      ${(item.originalPrice * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-green-600 ml-2">
                      Save ${savings.toLocaleString()}
                    </span>
                  </div>
                )}
                
                <div className="text-sm text-gray-500 mt-1">
                  ${item.price.toLocaleString()} each
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-600">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1 || isUpdating}
                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="px-3 py-2 min-w-[60px] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={isUpdating}
                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-[#FB8911] hover:bg-[#FB8911]/10 rounded transition-colors">
                  <FiHeart size={16} />
                </button>
                <button
                  onClick={() => setShowRemoveConfirm(true)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Remove Button */}
      <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-gray-500 hover:text-[#FB8911] transition-colors">
            <FiHeart size={16} />
            <span className="text-sm">Save for Later</span>
          </button>
          <button
            onClick={() => setShowRemoveConfirm(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <FiTrash2 size={16} />
            <span className="text-sm">Remove</span>
          </button>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Remove Item?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove "{item.name}" from your cart?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRemoveConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default CartItem;
