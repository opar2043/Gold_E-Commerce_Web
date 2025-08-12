import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-800 to-amber-700 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* About Us Column */}
          <div className="text-white">
            <h3 className="text-2xl font-semibold mb-6">About Us</h3>
            <p className="text-amber-100 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet consectetur. Lectus 
              vitae ultrices convallis aliquet id urna sit 
              pellentesque. Feugiat volutpat iaculis magna 
              consectetur scelerisque feugiat laoreet. Pharetra 
              pharetra neque ut egestas vel a posuere urna.
            </p>
          </div>

          {/* Shop Column */}
          <div className="text-white">
            <h3 className="text-2xl font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-amber-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  New Arrival
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-amber-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Bestselling
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-amber-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Summer Collection
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div className="text-white">
            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-[#FAF7F2] bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a 
                href="#" 
                className="bg-[#FAF7F2] bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a 
                href="#" 
                className="bg-[#FAF7F2] bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="text-white text-lg" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;