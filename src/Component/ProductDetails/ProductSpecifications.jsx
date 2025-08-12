const ProductSpecifications = ({ specifications }) => {
  if (!specifications) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No specifications available for this product.</p>
      </div>
    );
  }

  const formatSpecKey = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const renderSpecValue = (key, value) => {
    // Special formatting for certain specification types
    if (key.toLowerCase().includes('weight') && typeof value === 'string') {
      return (
        <span className="font-medium text-[#FB8911]">{value}</span>
      );
    }
    
    if (key.toLowerCase().includes('metal') && typeof value === 'string') {
      return (
        <span className="font-medium text-amber-700">{value}</span>
      );
    }
    
    if (key.toLowerCase().includes('gold') && typeof value === 'string') {
      return (
        <span className="font-medium text-blue-600">{value}</span>
      );
    }
    
    return <span className="text-gray-700">{value}</span>;
  };

  const getSpecIcon = (key) => {
    if (key.toLowerCase().includes('metal')) return '🥇';
    if (key.toLowerCase().includes('gold')) return '💎';
    if (key.toLowerCase().includes('weight')) return '⚖️';
    if (key.toLowerCase().includes('width') || key.toLowerCase().includes('length')) return '📏';
    if (key.toLowerCase().includes('clarity')) return '🔍';
    if (key.toLowerCase().includes('color')) return '🎨';
    if (key.toLowerCase().includes('carat')) return '💍';
    if (key.toLowerCase().includes('finish')) return '✨';
    return '📋';
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Product Specifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(specifications).map(([key, value]) => (
          <div 
            key={key} 
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#FB8911]/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">
                {getSpecIcon(key)}
              </span>
              <div className="flex-1 min-w-0">
                <dt className="text-sm font-medium text-gray-600 mb-1">
                  {formatSpecKey(key)}
                </dt>
                <dd className="text-base">
                  {renderSpecValue(key, value)}
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          Important Information
        </h4>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• All weights are approximate and may vary slightly</li>
          <li>• Colors may appear different due to monitor settings</li>
          <li>• Gemstone clarity and color grades are certified by reputable institutions</li>
          <li>• Custom sizing available for most ring products</li>
          <li>• All gold jewelry comes with authenticity certification</li>
        </ul>
      </div>

      {/* Care Instructions */}
      <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span>🧼</span>
          Care Instructions
        </h4>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• Clean with soft cloth and mild soap solution</p>
          <p>• Store in individual pouches to prevent scratching</p>
          <p>• Avoid contact with perfumes, lotions, and chemicals</p>
          <p>• Professional cleaning recommended annually</p>
          <p>• Remove jewelry before swimming, exercising, or sleeping</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
