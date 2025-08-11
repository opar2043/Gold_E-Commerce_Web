import { useState, useEffect } from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

const Banner = () => {
  const bannerImages = [banner1, banner2, banner3, banner4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div>
      <section className="bg-col lg:grid lg:h-screen lg:place-content-center mb-5">
        <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-5 md:items-center gap-6 py-10 px-2">
          {/* Text Section - Narrower */}
          <div className="md:col-span-2 max-w-lg text-left space-y-6">
            <h1 className="text-xl font-bold text-col md:text-4xl lg:text-6xl leading-tight">
              Welcome to
              <strong className="text-[#FB8911]"> Yasini</strong>
            </h1>

            <p className="mt-4 text-col text-base md:text-lg leading-relaxed">
              We offer 18k–24k gold jewelry, certified diamonds, colored stones,
              and watches, with 21k and most pieces customizable to your desired
              design.
            </p>

            <p className="text-col text-sm md:text-base opacity-80">
              Experience the finest craftsmanship in luxury jewelry. Each piece 
              is carefully selected and crafted to perfection, ensuring you get 
              the highest quality gold jewelry that lasts a lifetime.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:mt-8">
              <button
                className="inline-block rounded-lg border border-[#120E0E] bg-[#120E0E] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#FB8911] hover:text-white hover:border-[#FB8911] hover:shadow-xl transform hover:scale-105"
              >
                Shop Now
              </button>

              <button
                className="inline-block rounded-lg border-2 border-[#120E0E] px-6 py-3 font-semibold text-[#120E0E] shadow-lg transition-all duration-300 hover:bg-[#120E0E] hover:text-white transform hover:scale-105"
              >
                View Collection
              </button>
            </div>
          </div>

          {/* Image Section - Wider */}
          <div className="md:col-span-3 relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={bannerImages[currentImageIndex]} 
                alt={`Jewelry Banner ${currentImageIndex + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] object-cover transition-all duration-1000 ease-in-out"
              />
              
              {/* Image Overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-[#FB8911] shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
