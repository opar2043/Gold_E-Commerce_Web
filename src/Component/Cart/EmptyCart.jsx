import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiTrendingUp } from 'react-icons/fi';

const EmptyCart = () => {
  const featuredCategories = [
    {
      name: 'Yellow Gold Jewelry',
      path: '/collection/yellow-gold-jewelry',
      icon: '🥇',
      description: 'Classic gold pieces'
    },
    {
      name: 'Watches',
      path: '/collection/watches',
      icon: '⌚',
      description: 'Luxury timepieces'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F1EC] py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Empty Cart Illustration */}
        <div className="text-center py-16">
          
          {/* Cart Icon */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <FiShoppingBag size={64} className="text-gray-400" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl font-bold text-[#120E0E] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. 
            Start exploring our beautiful jewelry collection!
          </p>

          {/* Primary Action */}
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 bg-[#FB8911] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e6760d] transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiShoppingBag size={24} />
            Start Shopping
          </Link>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#120E0E] text-center mb-8">
            Explore Our Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="bg-[#FAF7F2] rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 group text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#FB8911] transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Wishlist */}
          <div className="bg-[#FAF7F2] rounded-lg p-6 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
              <FiHeart size={32} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Check Your Wishlist
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              You might have some items saved for later
            </p>
            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 text-[#FB8911] hover:text-[#e6760d] font-medium transition-colors"
            >
              <FiHeart size={16} />
              View Wishlist
            </Link>
          </div>

          {/* Best Sellers */}
          <div className="bg-[#FAF7F2] rounded-lg p-6 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
              <FiTrendingUp size={32} className="text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Popular Items
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              See what other customers love
            </p>
            <Link
              to="/collection?sort=rating"
              className="inline-flex items-center gap-2 text-[#FB8911] hover:text-[#e6760d] font-medium transition-colors"
            >
              <FiTrendingUp size={16} />
              Best Sellers
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-[#FAF7F2] rounded-lg p-8 shadow-sm text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Need Help Finding Something?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our jewelry experts are here to help you find the perfect piece. 
            Whether you're looking for a special gift or treating yourself, 
            we'll guide you to the ideal choice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#FB8911] text-white rounded-lg font-semibold hover:bg-[#e6760d] transition-colors"
            >
              Contact Us
            </Link>
            <button className="px-6 py-3 border-2 border-[#FB8911] text-[#FB8911] rounded-lg font-semibold hover:bg-[#FB8911] hover:text-white transition-colors">
              Live Chat
            </button>
          </div>
        </div>

        {/* Benefits Reminder */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="text-gray-600">
            <div className="text-2xl mb-2">🚚</div>
            <div className="font-medium">Free Shipping</div>
            <div className="text-sm">On orders over $500</div>
          </div>
          <div className="text-gray-600">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-medium">Secure Payment</div>
            <div className="text-sm">SSL encrypted checkout</div>
          </div>
          <div className="text-gray-600">
            <div className="text-2xl mb-2">↩️</div>
            <div className="font-medium">Easy Returns</div>
            <div className="text-sm">30-day return policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
