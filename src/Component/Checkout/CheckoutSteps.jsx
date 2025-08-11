import { FiTruck, FiMapPin, FiCreditCard, FiUser, FiCheck } from 'react-icons/fi';

const CheckoutSteps = ({ currentStep, onStepClick, completedSteps = {} }) => {
  const steps = [
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Delivery details',
      icon: FiTruck
    },
    {
      id: 'billing',
      title: 'Billing',
      description: 'Payment address',
      icon: FiMapPin
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Payment method',
      icon: FiCreditCard
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Order confirmation',
      icon: FiUser
    }
  ];

  const isStepActive = (stepId) => currentStep === stepId;
  const isStepCompleted = (stepId) => completedSteps[stepId];
  const isStepClickable = (stepIndex) => {
    // Allow clicking on current step or any completed previous step
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    return stepIndex <= currentIndex;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between relative">
        
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200 z-0">
          <div 
            className="h-full bg-[#FB8911] transition-all duration-500"
            style={{ 
              width: `${(steps.findIndex(step => step.id === currentStep) / (steps.length - 1)) * 100}%` 
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = isStepActive(step.id);
          const completed = isStepCompleted(step.id);
          const clickable = isStepClickable(index);

          return (
            <div
              key={step.id}
              className={`relative z-10 flex flex-col items-center cursor-pointer transition-all duration-300 ${
                clickable ? 'hover:scale-105' : 'cursor-not-allowed opacity-50'
              }`}
              onClick={() => clickable && onStepClick(step.id)}
            >
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : active
                    ? 'bg-[#FB8911] border-[#FB8911] text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {completed ? (
                  <FiCheck size={20} />
                ) : (
                  <Icon size={20} />
                )}
              </div>

              {/* Step Info */}
              <div className="mt-3 text-center">
                <div
                  className={`text-sm font-medium transition-colors duration-300 ${
                    active || completed ? 'text-[#120E0E]' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs transition-colors duration-300 ${
                    active || completed ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-6 block sm:hidden">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Step {steps.findIndex(step => step.id === currentStep) + 1} of {steps.length}</span>
          <span>{Math.round(((steps.findIndex(step => step.id === currentStep) + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#FB8911] h-2 rounded-full transition-all duration-500"
            style={{
              width: `${((steps.findIndex(step => step.id === currentStep) + 1) / steps.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
