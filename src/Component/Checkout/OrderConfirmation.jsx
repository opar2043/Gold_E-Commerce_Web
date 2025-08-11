import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiMail, FiTruck, FiDownload, FiShoppingBag, FiCalendar, FiMapPin } from 'react-icons/fi';

const OrderConfirmation = ({ orderNumber, shippingData, total, items }) => {
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const estimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // 7 days from now
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FiCheck className="text-green-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Order Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-mono font-medium text-[#FB8911]">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-lg">${total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">Credit Card</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
                    <p className="text-gray-600">{shippingData.address}</p>
                    {shippingData.apartment && (
                      <p className="text-gray-600">{shippingData.apartment}</p>
                    )}
                    <p className="text-gray-600">
                      {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <FiCalendar className="text-gray-400" size={16} />
                  <span className="text-gray-600">
                    Estimated Delivery: <span className="font-medium">{estimatedDelivery()}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.cartId} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>Qty: {item.quantity}</span>
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      <span>${item.price.toLocaleString()}</span>
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
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <FiMail className="text-blue-600" size={24} />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Email Confirmation</h4>
              <p className="text-sm text-gray-600">
                You'll receive an email confirmation at {shippingData.email} shortly.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                <FiShoppingBag className="text-yellow-600" size={24} />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">
                We'll prepare your order for shipment within 1-2 business days.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <FiTruck className="text-green-600" size={24} />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Shipping & Delivery</h4>
              <p className="text-sm text-gray-600">
                Your order will be shipped and delivered by {estimatedDelivery()}.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <FiDownload size={20} />
              Download Receipt
            </button>

            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <FiTruck size={20} />
              Track Your Order
            </button>

            <Link
              to="/collection"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FB8911] text-white rounded-lg hover:bg-[#e97a0a] transition-colors"
            >
              <FiShoppingBag size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Support Information */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-medium text-gray-800 mb-2">Need Help?</h4>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <div className="flex items-center justify-center gap-2">
              <FiMail size={16} />
              <span>support@goldcommerce.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📞</span>
              <span>1-800-GOLD-123</span>
            </div>
          </div>
        </div>

        {/* Order Number Reminder */}
        <div className="text-center mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Please save your order number:</strong>{' '}
            <span className="font-mono text-[#FB8911] font-medium">{orderNumber}</span>
            <br />
            You'll need it to track your order or contact customer service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
