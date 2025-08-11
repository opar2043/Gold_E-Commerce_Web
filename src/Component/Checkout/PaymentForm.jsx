import { useState } from 'react';
import { FiCreditCard, FiArrowRight, FiArrowLeft, FiLock, FiDollarSign } from 'react-icons/fi';

const PaymentForm = ({ data, onSubmit, onPrev }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const number = value.replace(/\D/g, '');
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    const number = value.replace(/\D/g, '');
    if (number.length >= 2) {
      return `${number.slice(0, 2)}/${number.slice(2, 4)}`;
    }
    return number;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      handleChange({ target: { name: 'cardNumber', value: formatted } });
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 4) {
      handleChange({ target: { name: 'expiryDate', value: formatted } });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      handleChange({ target: { name: 'cvv', value } });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.method === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }

      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    if (cleanNumber.startsWith('6')) return 'discover';
    return 'card';
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FiCreditCard className="text-[#FB8911]" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
        </div>
        <p className="text-gray-600">How would you like to pay for your order?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">Select Payment Method</h3>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="method"
                value="card"
                checked={formData.method === 'card'}
                onChange={handleChange}
                className="w-4 h-4 text-[#FB8911] border-gray-300 focus:ring-[#FB8911]"
              />
              <FiCreditCard size={20} className="text-gray-600" />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">Credit/Debit Card</span>
                <p className="text-xs text-gray-600">Visa, MasterCard, American Express, Discover</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors opacity-60">
              <input
                type="radio"
                name="method"
                value="paypal"
                checked={formData.method === 'paypal'}
                onChange={handleChange}
                disabled
                className="w-4 h-4 text-[#FB8911] border-gray-300 focus:ring-[#FB8911]"
              />
              <FiDollarSign size={20} className="text-gray-600" />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">PayPal</span>
                <p className="text-xs text-gray-600">Coming Soon</p>
              </div>
            </label>
          </div>
        </div>

        {/* Credit Card Form */}
        {formData.method === 'card' && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FiLock className="text-green-600" size={16} />
              <span className="text-sm text-green-600 font-medium">Secure SSL Encrypted</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  className={`w-full px-3 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234 5678 9012 3456"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {formData.cardNumber && (
                    <div className={`w-8 h-5 rounded text-xs flex items-center justify-center text-white font-bold ${
                      getCardType(formData.cardNumber) === 'visa' ? 'bg-blue-600' :
                      getCardType(formData.cardNumber) === 'mastercard' ? 'bg-red-500' :
                      getCardType(formData.cardNumber) === 'amex' ? 'bg-blue-500' :
                      getCardType(formData.cardNumber) === 'discover' ? 'bg-orange-500' :
                      'bg-gray-400'
                    }`}>
                      {getCardType(formData.cardNumber).toUpperCase().slice(0, 4)}
                    </div>
                  )}
                </div>
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleCvvChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                  errors.cardName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.cardName && (
                <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={formData.saveCard}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#FB8911] border-gray-300 rounded focus:ring-[#FB8911]"
                />
                <span className="text-sm text-gray-700">
                  Save this card for future purchases
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <FiLock className="text-blue-600 mt-0.5" size={16} />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Your payment is secure</h4>
              <p className="text-xs text-blue-700 mt-1">
                We use industry-standard encryption to protect your personal and payment information. 
                Your card details are never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 flex gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft size={20} />
            Back to Billing
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-[#FB8911] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e97a0a] transition-colors flex items-center justify-center gap-2"
          >
            Review Order
            <FiArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
