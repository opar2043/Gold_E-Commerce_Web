import { useQuery } from '@tanstack/react-query';
import { categoriesAPI, productsAPI } from '../../services/api';

const APITest = () => {
  // Test categories API
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesAPI.getAll
  });

  // Test products API
  const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsAPI.getAll({ limit: 5 })
  });

  if (categoriesLoading || productsLoading) {
    return <div className="p-8">Loading API data...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Integration Test</h1>
      
      {/* Categories Test */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories API</h2>
        {categoriesError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {categoriesError.message}
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            ✅ Categories loaded successfully! Found {categoriesData?.data?.length || 0} categories.
          </div>
        )}
        
        {categoriesData?.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriesData.data.map(category => (
              <div key={category.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">ID: {category.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Products Test */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Products API</h2>
        {productsError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {productsError.message}
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            ✅ Products loaded successfully! Found {productsData?.data?.length || 0} products.
          </div>
        )}
        
        {productsData?.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productsData.data.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-lg font-bold text-[#FB8911]">${product.price}</p>
                <p className="text-sm text-gray-600">
                  Category: {product.subcategories?.categories?.name || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Subcategory: {product.subcategories?.name || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API URLs */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">API Endpoints Being Used:</h3>
        <ul className="text-sm text-gray-700">
          <li>• Categories: GET {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/categories</li>
          <li>• Products: GET {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products</li>
        </ul>
      </div>
    </div>
  );
};

export default APITest;
