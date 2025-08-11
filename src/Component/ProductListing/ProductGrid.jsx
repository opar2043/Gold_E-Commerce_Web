import ProductCard from './ProductCard';

const ProductGrid = ({ products, viewMode }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className={`${
      viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
        : 'flex flex-col gap-4'
    }`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
