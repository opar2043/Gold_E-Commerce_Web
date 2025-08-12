import { getCategoriesList } from '../../data/mockData';

const CategoryTabs = ({ selectedCategory, onCategoryChange, categories }) => {
  const categoriesList = getCategoriesList();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {/* All Categories Tab */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-[#FB8911] text-white shadow-lg transform scale-105'
              : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#FB8911]/10 hover:text-[#FB8911] shadow-sm'
          }`}
        >
          All Collections
        </button>

        {/* Individual Category Tabs */}
        {categoriesList.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-[#FB8911] text-white shadow-lg transform scale-105'
                : 'bg-[#FAF7F2] text-gray-700 hover:bg-[#FB8911]/10 hover:text-[#FB8911] shadow-sm'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Category Description */}
      {selectedCategory !== 'all' && categories[selectedCategory] && (
        <div className="bg-[#FAF7F2] rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-32 md:h-32 w-full h-48 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={categories[selectedCategory].image} 
                alt={categories[selectedCategory].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#120E0E] mb-2">
                {categories[selectedCategory].name}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {categories[selectedCategory].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* All Collections Description */}
      {selectedCategory === 'all' && (
        <div className="bg-[#FAF7F2] rounded-lg p-6 shadow-sm mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#120E0E] mb-2">
              Explore Our Complete Collection
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-3xl mx-auto">
              Discover our entire range of exquisite jewelry pieces, from classic gold jewelry to 
              modern gold creations. Each piece is carefully crafted with attention to detail 
              and quality that meets the highest standards.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
