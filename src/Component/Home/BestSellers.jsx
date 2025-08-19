import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaHeart, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import product images
import gold from '../../assets/gold.jpg';
import gold1 from '../../assets/gold1.png';
import gold2 from '../../assets/gold2.png';

const BestSellers = () => {
  const [wishlist, setWishlist] = useState([]);

  const products = [
    {
      id: 1,
      title: "Gold Chain",
      description: "Elegant 24k gold chain with premium finish",
      price: 85.00,
      originalPrice: 95.00,
      image: gold,
      discount: "-11%"
    },
    {
      id: 2,
      title: "Riona Pearl",
      description: "Beautiful pearl ring with gold setting",
      price: 45.00,
      originalPrice: 55.00,
      image: gold1,
      discount: "-18%"
    },
    {
      id: 3,
      title: "Modern Platinum",
      description: "Contemporary platinum rings set",
      price: 120.00,
      originalPrice: 140.00,
      image: gold2,
      discount: "-14%"
    }
  ];

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    // Add to cart functionality
    console.log('Added to cart:', product);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button className="text-amber-600 hover:text-amber-800 transition-colors">
              <FaChevronLeft size={20} />
            </button>
            
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Best Sellers</h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-16 h-0.5 bg-amber-600"></div>
                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                <div className="w-16 h-0.5 bg-amber-600"></div>
              </div>
            </div>
            
            <button className="text-amber-600 hover:text-amber-800 transition-colors">
              <FaChevronRight size={20} />
            </button>
          </div>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Browse our website for the hottest items now
          </p>
        </div>

        {/* Products Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={60}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              900: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 60,
              },
            }}
            className="pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-[#FAF7F2] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  {/* Product Image with Icons */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}
                    </div>

                    {/* Action Icons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-[#FAF7F2] p-2 rounded-full shadow-md hover:bg-amber-50 transition-colors"
                      >
                        <FaShoppingCart className="text-amber-600" size={16} />
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`bg-[#FAF7F2] p-2 rounded-full shadow-md transition-colors ${
                          wishlist.includes(product.id)
                            ? 'bg-red-50 text-red-500'
                            : 'hover:bg-red-50 text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <FaHeart size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-amber-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-[#FAF7F2] rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10">
            <FaChevronLeft className="text-amber-600" size={16} />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-[#FAF7F2] rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10">
            <FaChevronRight className="text-amber-600" size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #d97706;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BestSellers;
