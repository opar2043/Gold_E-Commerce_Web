import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedMetal,
  setSelectedMetal,
  selectedPurity,
  setSelectedPurity,
  inStockOnly,
  setInStockOnly,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    metal: true,
    purity: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const metalTypes = [
    { value: 'all', label: 'All Metals' },
    { value: 'gold', label: 'Gold' },
    { value: 'white gold', label: 'White Gold' },
    { value: 'silver', label: 'Silver' },
    { value: 'platinum', label: 'Platinum' }
  ];

  const purityLevels = [
    { value: 'all', label: 'All Purities' },
    { value: '14k', label: '14k' },
    { value: '18k', label: '18k' },
    { value: '22k', label: '22k' },
    { value: '24k', label: '24k' }
  ];

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-gray-800 hover:text-[#FB8911] transition-colors"
      >
        <span>{title}</span>
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#FB8911] transition-colors"
        >
          <FiX size={14} />
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">$</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#FB8911]"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <span className="text-sm text-gray-600">$</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#FB8911]"
              placeholder="Max"
            />
          </div>
          
          {/* Price Range Slider */}
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="20000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="0"
              max="20000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-1"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* Metal Type */}
      <FilterSection
        title="Metal Type"
        isExpanded={expandedSections.metal}
        onToggle={() => toggleSection('metal')}
      >
        <div className="space-y-2">
          {metalTypes.map((metal) => (
            <label key={metal.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="metal"
                value={metal.value}
                checked={selectedMetal === metal.value}
                onChange={(e) => setSelectedMetal(e.target.value)}
                className="mr-3 text-[#FB8911] focus:ring-[#FB8911]"
              />
              <span className="text-sm text-gray-700">{metal.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Purity Level */}
      <FilterSection
        title="Gold Purity"
        isExpanded={expandedSections.purity}
        onToggle={() => toggleSection('purity')}
      >
        <div className="space-y-2">
          {purityLevels.map((purity) => (
            <label key={purity.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="purity"
                value={purity.value}
                checked={selectedPurity === purity.value}
                onChange={(e) => setSelectedPurity(e.target.value)}
                className="mr-3 text-[#FB8911] focus:ring-[#FB8911]"
              />
              <span className="text-sm text-gray-700">{purity.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        isExpanded={expandedSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="mr-3 text-[#FB8911] focus:ring-[#FB8911] rounded"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </FilterSection>

      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setPriceRange([0, 1000]);
              setSelectedMetal('all');
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-[#FB8911] hover:text-white rounded-full transition-colors"
          >
            Under $1,000
          </button>
          <button
            onClick={() => {
              setSelectedMetal('gold');
              setSelectedPurity('22k');
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-[#FB8911] hover:text-white rounded-full transition-colors"
          >
            22k Gold
          </button>
          <button
            onClick={() => {
              setPriceRange([5000, 20000]);
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-[#FB8911] hover:text-white rounded-full transition-colors"
          >
            Luxury Items
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #FB8911;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #FB8911;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;
