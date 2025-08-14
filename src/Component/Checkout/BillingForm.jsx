import { useState } from 'react';
import { FiMapPin, FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';

const BillingForm = ({ data, shippingData, onSubmit, onPrev }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'sameAsShipping') {
      const newFormData = {
        ...formData,
        sameAsShipping: checked
      };
      
      if (checked) {
        // Copy shipping data to billing
        newFormData.firstName = shippingData.firstName;
        newFormData.lastName = shippingData.lastName;
        newFormData.address = shippingData.address;
        newFormData.apartment = shippingData.apartment;
        newFormData.city = shippingData.city;
        newFormData.state = shippingData.state;
        newFormData.zipCode = shippingData.zipCode;
        newFormData.country = shippingData.country;
      }
      
      setFormData(newFormData);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    if (formData.sameAsShipping) return true;
    
    const newErrors = {};
    const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode'];

    required.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // ZIP code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
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

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FiMapPin className="text-[#FB8911]" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Billing Address</h2>
        </div>
        <p className="text-gray-600">Where should we send your invoice?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Same as Shipping Checkbox */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="sameAsShipping"
              checked={formData.sameAsShipping}
              onChange={handleChange}
              className="w-4 h-4 text-[#FB8911] border-gray-300 rounded focus:ring-[#FB8911]"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-800">
                Same as shipping address
              </span>
              <p className="text-xs text-gray-600 mt-1">
                Use the same address for billing and shipping
              </p>
            </div>
            {formData.sameAsShipping && (
              <FiCheck className="text-green-500" size={20} />
            )}
          </label>
        </div>

        {/* Show shipping address summary when same as shipping is checked */}
        {formData.sameAsShipping && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="text-sm font-medium text-green-800 mb-2">Billing Address:</h4>
            <div className="text-sm text-green-700">
              <p>{shippingData.firstName} {shippingData.lastName}</p>
              <p>{shippingData.address}</p>
              {shippingData.apartment && <p>{shippingData.apartment}</p>}
              <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
              <p>{shippingData.country}</p>
            </div>
          </div>
        )}

        {/* Billing Address Form - Only show when not same as shipping */}
        {!formData.sameAsShipping && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent"
                placeholder="Apt 4B"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10001"
                  maxLength={10}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB8911] focus:border-transparent"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 flex gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft size={20} />
            Back to Shipping
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-[#FB8911] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e97a0a] transition-colors flex items-center justify-center gap-2"
          >
            Continue to Payment
            <FiArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
