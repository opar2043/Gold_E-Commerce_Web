import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiTag, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const { items, itemCount, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      clearCart();
      setShowClearConfirm(false);
      setIsLoading(false);
    }, 500);
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-[#F6F1EC] py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/collection"
              className="flex items-center gap-2 text-gray-600 hover:text-[#FB8911] transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Continue Shopping</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#120E0E] mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-auto"
            >
              <FiTrash2 size={16} />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-lg shadow-sm">
            <FiTruck className="text-[#FB8911] flex-shrink-0" size={24} />
            <div>
              <p className="font-medium text-gray-800">Free Shipping</p>
              <p className="text-sm text-gray-600">On orders over $500</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-lg shadow-sm">
            <FiShield className="text-[#FB8911] flex-shrink-0" size={24} />
            <div>
              <p className="font-medium text-gray-800">Secure Payment</p>
              <p className="text-sm text-gray-600">SSL encrypted checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-lg shadow-sm">
            <FiTag className="text-[#FB8911] flex-shrink-0" size={24} />
            <div>
              <p className="font-medium text-gray-800">Best Price</p>
              <p className="text-sm text-gray-600">Guaranteed lowest prices</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-[#FAF7F2] rounded-lg shadow-sm">
              
              {/* Cart Items Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cart Items ({itemCount})
                </h2>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.cartId} item={item} />
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                  <Link
                    to="/collection"
                    className="flex items-center gap-2 text-[#FB8911] hover:text-[#e6760d] font-medium transition-colors"
                  >
                    <FiShoppingBag size={16} />
                    Add More Items
                  </Link>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#120E0E] mb-6 text-center">
            You Might Also Like
          </h2>
          <div className="text-center text-gray-600">
            <p>Recommended products will appear here based on your cart items.</p>
          </div>
        </div>

        {/* Clear Cart Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#FAF7F2] rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Clear Cart?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Clearing...' : 'Clear Cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
