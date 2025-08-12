import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { FiTag, FiCreditCard, FiShield, FiTruck, FiPercent } from 'react-icons/fi';

const CartSummary = () => {
  const { items, total, shipping, tax, discount, applyDiscount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = items.reduce((sum, item) => {
    const itemSavings = item.originalPrice > item.price ? 
      (item.originalPrice - item.price) * item.quantity : 0;
    return sum + itemSavings;
  }, 0);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    // Simulate API call
    setTimeout(() => {
      const code = promoCode.toUpperCase();
      let discountAmount = 0;
      let message = '';

      switch (code) {
        case 'SAVE10':
          discountAmount = subtotal * 0.1;
          message = '10% discount applied!';
          break;
        case 'GOLD50':
          discountAmount = 50;
          message = '$50 discount applied!';
          break;
        case 'NEWUSER':
          discountAmount = subtotal * 0.15;
          message = '15% new user discount applied!';
          break;
        case 'WELCOME':
          discountAmount = 25;
          message = '$25 welcome discount applied!';
          break;
        default:
          setPromoError('Invalid promo code');
          setIsApplyingPromo(false);
          return;
      }

      applyDiscount(discountAmount, code);
      setPromoSuccess(message);
      setPromoCode('');
      setIsApplyingPromo(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-[#FAF7F2] rounded-lg shadow-sm sticky top-4">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FiCreditCard size={20} />
          Order Summary
        </h2>
      </div>

      {/* Promo Code */}
      <div className="p-6 border-b border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FB8911] text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
            />
            <button
              onClick={handleApplyPromo}
              disabled={isApplyingPromo}
              className="px-4 py-2 bg-[#FB8911] text-white rounded-md hover:bg-[#e6760d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isApplyingPromo ? 'Applying...' : 'Apply'}
            </button>
          </div>
          
          {promoError && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              <FiTag size={14} />
              {promoError}
            </p>
          )}
          
          {promoSuccess && (
            <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
              <FiPercent size={14} />
              {promoSuccess}
            </p>
          )}
        </div>

        {/* Popular Promo Codes */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">Popular codes:</p>
          <div className="flex flex-wrap gap-2">
            {['SAVE10', 'GOLD50', 'NEWUSER'].map((code) => (
              <button
                key={code}
                onClick={() => setPromoCode(code)}
                className="px-2 py-1 bg-gray-100 hover:bg-[#FB8911]/10 text-xs text-gray-600 hover:text-[#FB8911] rounded transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-6 space-y-3">
        
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Item Savings</span>
            <span>-{formatCurrency(savings)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-1">
            <FiTruck size={14} />
            Shipping
          </span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
            {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {shipping > 0 && (
          <div className="text-xs text-gray-500">
            <p>Add {formatCurrency(500 - subtotal)} more for free shipping</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className="bg-[#FB8911] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span className="flex items-center gap-1">
              <FiTag size={14} />
              Discount
            </span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-gray-800">Total</span>
          <span className="text-[#FB8911]">{formatCurrency(total)}</span>
        </div>

        {/* Total Savings */}
        {(savings + discount) > 0 && (
          <div className="text-center text-sm text-green-600 font-medium">
            You saved {formatCurrency(savings + discount)}!
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 space-y-3">
        
        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="w-full bg-[#FB8911] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#e6760d] transition-colors flex items-center justify-center gap-2"
        >
          <FiCreditCard size={18} />
          Proceed to Checkout
        </Link>

        {/* Continue Shopping */}
        <Link
          to="/collection"
          className="w-full border-2 border-[#FB8911] text-[#FB8911] py-3 px-4 rounded-lg font-semibold hover:bg-[#FB8911] hover:text-white transition-colors text-center block"
        >
          Continue Shopping
        </Link>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
          <FiShield size={14} />
          <span>Secure SSL encrypted checkout</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Accepted Payment Methods:</p>
        <div className="flex justify-center gap-2">
          <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
          <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
          <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
          <div className="w-8 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
            PP
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
