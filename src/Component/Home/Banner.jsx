import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

const Banner = () => {
  const slides = [
    {
      img: banner1,
      title: "Welcome to Tannous Jewelry",
      desc: "We offer 18k–24k gold jewelry, certified golds, colored stones, and watches, with 21k and most pieces customizable to your desired design.",
    },
    {
      img: banner2,
      title: "Luxury Jewelry Collection",
      desc: "Experience the finest craftsmanship in luxury jewelry. Each piece is carefully selected and crafted to perfection for a lifetime of beauty.",
    },
    {
      img: banner3,
      title: "Custom Gold Designs",
      desc: "Turn your dream jewelry into reality. We create custom pieces to match your unique style and elegance.",
    },
    {
      img: banner4,
      title: "Certified Quality & Craftsmanship",
      desc: "Our gold jewelry meets the highest standards for quality, design, and durability.",
    },
  ];

  return (
    <section className="relative">
      <Carousel
        
        infiniteLoop
        interval={2000}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        autoPlay={true}
        swipeable
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-[80vh] lg:h-screen flex items-center justify-center text-center"
          >
            {/* Background Image */}
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Text Content */}
            <div className="relative z-10 max-w-3xl px-4">
              <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight mb-4">
                {slide.title}
              </h1>
              <p className="text-white/90 text-base md:text-lg mb-6">
                {slide.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-block rounded-lg border border-[#FB8911] bg-[#FB8911] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#d8730f] hover:border-[#d8730f]">
                  Shop Now
                </button>
                <Link
                  to="/collection"
                  className="inline-block rounded-lg border-2 border-white px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-black"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
