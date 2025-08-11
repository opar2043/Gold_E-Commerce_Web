import { FiUser, FiMapPin, FiCreditCard, FiArrowLeft, FiShield, FiLoader, FiEdit } from 'react-icons/fi';
import { useCart } from '../../context/useCart';

const OrderReview = ({ shippingData, billingData, paymentData, onPlaceOrder, onPrev, isProcessing }) => {
  const { items, total, subtotal, tax, shipping } = useCart();

  const maskedCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FiUser className="text-[#FB8911]" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Review Your Order</h2>
        </div>
        <p className="text-gray-600">Please review your order details before placing your order.</p>
      </div>

      <div className="space-y-6">
        
        {/* Order Items */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Order Items</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.cartId} className="flex gap-4 p-3 bg-white rounded-lg">
                <img
                  src={item.mainImage}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Price: ${item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Qty: {item.quantity}</span>
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#FB8911]" size={20} />
              <h3 className="text-lg font-medium text-gray-800">Shipping Address</h3>
            </div>
            <button className="text-[#FB8911] hover:text-[#e97a0a] flex items-center gap-1">
              <FiEdit size={16} />
              <span className="text-sm">Edit</span>
            </button>
          </div>
          <div className="text-gray-700">
            <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
            <p>{shippingData.address}</p>
            {shippingData.apartment && <p>{shippingData.apartment}</p>}
            <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
            <p>{shippingData.country}</p>
            <div className="mt-2 pt-2 border-t text-sm">
              <p>Email: {shippingData.email}</p>
              <p>Phone: {shippingData.phone}</p>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#FB8911]" size={20} />
              <h3 className="text-lg font-medium text-gray-800">Billing Address</h3>
            </div>
            <button className="text-[#FB8911] hover:text-[#e97a0a] flex items-center gap-1">
              <FiEdit size={16} />
              <span className="text-sm">Edit</span>
            </button>
          </div>
          
          {billingData.sameAsShipping ? (
            <div className="text-gray-700">
              <p className="text-sm text-green-600 mb-2">✓ Same as shipping address</p>
              <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
              <p>{shippingData.address}</p>
              {shippingData.apartment && <p>{shippingData.apartment}</p>}
              <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
              <p>{shippingData.country}</p>
            </div>
          ) : (
            <div className="text-gray-700">
              <p className="font-medium">{billingData.firstName} {billingData.lastName}</p>
              <p>{billingData.address}</p>
              {billingData.apartment && <p>{billingData.apartment}</p>}
              <p>{billingData.city}, {billingData.state} {billingData.zipCode}</p>
              <p>{billingData.country}</p>
            </div>
          )}
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiCreditCard className="text-[#FB8911]" size={20} />
              <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
            </div>
            <button className="text-[#FB8911] hover:text-[#e97a0a] flex items-center gap-1">
              <FiEdit size={16} />
              <span className="text-sm">Edit</span>
            </button>
          </div>
          
          {paymentData.method === 'card' && (
            <div className="text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <FiCreditCard size={16} />
                <span className="font-medium">Credit/Debit Card</span>
              </div>
              <p>Card: {maskedCardNumber(paymentData.cardNumber)}</p>
              <p>Expires: {paymentData.expiryDate}</p>
              <p>Name: {paymentData.cardName}</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({items.length} items)</span>
              <span>${subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>${tax?.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-[#FB8911]">${total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FiShield className="text-green-600 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-medium text-green-800">Secure Checkout</h4>
              <p className="text-xs text-green-700 mt-1">
                Your order is protected by 256-bit SSL encryption. We never store your payment information.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex gap-4">
          <button
            type="button"
            onClick={onPrev}
            disabled={isProcessing}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft size={20} />
            Back to Payment
          </button>
          
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing}
            className="flex-1 bg-[#FB8911] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e97a0a] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <FiLoader className="animate-spin" size={20} />
                Processing Order...
              </>
            ) : (
              <>
                <FiShield size={20} />
                Place Order
              </>
            )}
          </button>
        </div>

        {/* Terms Notice */}
        <div className="text-center text-xs text-gray-600">
          By placing your order, you agree to our{' '}
          <a href="#" className="text-[#FB8911] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#FB8911] hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
