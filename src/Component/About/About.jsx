import { Link } from "react-router-dom";
import gold from "../../assets/gold.jpg";

const About = () => {
  return (
    <section className="bg-col py-14 px-6 lg:px-20 md:my-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#120E0E] mb-8">
          About <span className="text-[#FB8911]">Tannous Jewelry</span>
        </h1>

        {/* Intro Paragraph */}
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-12">
          At <strong>Tannous Jewelry</strong>, we believe jewelry is more than
          just an accessory – it’s a statement of elegance, heritage, and
          personal style. We specialize in 18k–24k gold jewelry, certified gold
          pieces, precious stones, and luxury watches, offering both ready-made
          and custom designs tailored to your taste.
        </p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src={gold}
              alt="Luxury Gold Jewelry"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#120E0E] mb-4">
              Our Craftsmanship
            </h2>
            <p className="text-gray-700 mb-6">
              Every piece of jewelry at Tannous Jewelry is created with
              unmatched precision and care. Our skilled artisans use
              time-honored techniques combined with modern design trends to
              craft pieces that stand the test of time.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#120E0E] mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Certified 18k–24k gold jewelry with authenticity guarantee
              </li>
              <li>Custom designs tailored to your personal style</li>
              <li>Luxury watches and rare gemstones available</li>
              <li>Expert guidance to help you choose the perfect piece</li>
              <li>Commitment to exceptional quality and customer service</li>
            </ul>
          </div>
        </div>


      </div>
    </section>
  );
};

export default About;
