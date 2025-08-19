import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { FiArrowLeft, FiShield, FiCheck, FiCreditCard, FiTruck, FiUser, FiMapPin } from 'react-icons/fi';
import CheckoutSteps from './CheckoutSteps';
import ShippingForm from './ShippingForm';
import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import OrderReview from './OrderReview';
import OrderConfirmation from './OrderConfirmation';

const CHECKOUT_STEPS = {
  SHIPPING: 'shipping',
  BILLING: 'billing', 
  PAYMENT: 'payment',
  REVIEW: 'review',
  CONFIRMATION: 'confirmation'
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.SHIPPING);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form data state
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [billingData, setBillingData] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== CHECKOUT_STEPS.CONFIRMATION) {
      navigate('/cart');
    }
  }, [items.length, currentStep, navigate]);

  // Step navigation
  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const steps = Object.values(CHECKOUT_STEPS);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = Object.values(CHECKOUT_STEPS);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  // Form validation
  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingData[field].trim() !== '');
  };

  const validateBilling = () => {
    if (billingData.sameAsShipping) return true;
    const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => billingData[field].trim() !== '');
  };

  const validatePayment = () => {
    if (paymentData.method === 'card') {
      return paymentData.cardNumber && paymentData.expiryDate && 
             paymentData.cvv && paymentData.cardName;
    }
    return true;
  };

  // Handle form submissions
  const handleShippingSubmit = (data) => {
    setShippingData(data);
    if (billingData.sameAsShipping) {
      setBillingData({
        ...billingData,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        apartment: data.apartment,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      });
    }
    nextStep();
  };

  const handleBillingSubmit = (data) => {
    setBillingData(data);
    nextStep();
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    nextStep();
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order number
      const orderNum = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setOrderNumber(orderNum);
      
      // Clear cart
      clearCart();
      
      // Move to confirmation
      setCurrentStep(CHECKOUT_STEPS.CONFIRMATION);
      
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Icons for checkout steps - used by CheckoutSteps component
  // const stepIcons = {
  //   [CHECKOUT_STEPS.SHIPPING]: FiTruck,
  //   [CHECKOUT_STEPS.BILLING]: FiMapPin,
  //   [CHECKOUT_STEPS.PAYMENT]: FiCreditCard,
  //   [CHECKOUT_STEPS.REVIEW]: FiUser,
  //   [CHECKOUT_STEPS.CONFIRMATION]: FiCheck
  // };

  if (currentStep === CHECKOUT_STEPS.CONFIRMATION) {
    return (
      <OrderConfirmation 
        orderNumber={orderNumber}
        shippingData={shippingData}
        total={total}
        items={items}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1EC] py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FB8911] transition-colors mb-4"
          >
            <FiArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#120E0E] mb-2">
              Secure Checkout
            </h1>
            <p className="text-gray-600">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} • Total: ${total?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-green-600 mb-8">
          <FiShield size={20} />
          <span className="text-sm font-medium">SSL Secured & Encrypted</span>
        </div>

        {/* Progress Steps */}
        <CheckoutSteps 
          currentStep={currentStep}
          onStepClick={goToStep}
          completedSteps={{
            [CHECKOUT_STEPS.SHIPPING]: validateShipping(),
            [CHECKOUT_STEPS.BILLING]: validateBilling(),
            [CHECKOUT_STEPS.PAYMENT]: validatePayment()
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-[#FAF7F2] rounded-lg shadow-sm p-6">
              
              {currentStep === CHECKOUT_STEPS.SHIPPING && (
                <ShippingForm
                  data={shippingData}
                  onSubmit={handleShippingSubmit}
                  onNext={nextStep}
                />
              )}

              {currentStep === CHECKOUT_STEPS.BILLING && (
                <BillingForm
                  data={billingData}
                  shippingData={shippingData}
                  onSubmit={handleBillingSubmit}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {currentStep === CHECKOUT_STEPS.PAYMENT && (
                <PaymentForm
                  data={paymentData}
                  onSubmit={handlePaymentSubmit}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {currentStep === CHECKOUT_STEPS.REVIEW && (
                <OrderReview
                  shippingData={shippingData}
                  billingData={billingData}
                  paymentData={paymentData}
                  onPlaceOrder={handlePlaceOrder}
                  onPrev={prevStep}
                  isProcessing={isProcessing}
                />
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAF7F2] rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} • ${item.price.toLocaleString()}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(total - (total * 0.085) - (total > 500 ? 0 : 25)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{total > 500 ? 'FREE' : '$25.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(total * 0.085).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-[#FB8911]">${total?.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-4 border-t">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiShield size={12} />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCreditCard size={12} />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck size={12} />
                    <span>Insured shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
