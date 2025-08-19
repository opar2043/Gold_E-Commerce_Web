import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedKaratType,
  setSelectedKaratType,
  inStockOnly,
  setInStockOnly,
  onClearFilters,
  availableKaratTypes = [] // This will come from the products fetched
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    karat: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Generate karat types from available products
  const karatTypes = [
    { value: 'all', label: 'All Karat Types' },
    ...availableKaratTypes.map(karat => ({
      value: karat,
      label: karat
    }))
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
    <div className="bg-[#FAF7F2] rounded-lg p-6 shadow-sm h-fit sticky top-4">
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

      {/* Karat Type */}
      <FilterSection
        title="Karat Type"
        isExpanded={expandedSections.karat}
        onToggle={() => toggleSection('karat')}
      >
        <div className="space-y-2">
          {karatTypes.map((karat) => (
            <label key={karat.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="karat"
                value={karat.value}
                checked={selectedKaratType === karat.value}
                onChange={(e) => setSelectedKaratType(e.target.value)}
                className="mr-3 text-[#FB8911] focus:ring-[#FB8911]"
              />
              <span className="text-sm text-gray-700">{karat.label}</span>
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
