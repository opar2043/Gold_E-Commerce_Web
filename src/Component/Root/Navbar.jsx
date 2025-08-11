import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import gold1 from "../../assets/gold3.png";
const Navbar = () => {
  const links = (
    <>
      <NavLink to={"/"}>
        <li>
          <a>Home</a>
        </li>
        <hr className="md:border md:border-[#120e0ed8] w-8 mx-auto hidden" />
      </NavLink>
      <NavLink to={"/collection"}>
        <li>
          <a>Collection</a>
        </li>
        <hr className="md:border md:border-[#120e0ed8] w-8 mx-auto hidden" />
      </NavLink>
      <NavLink to={"/about"}>
        <li>
          <a>About</a>
        </li>
        <hr className="md:border md:border-[#120e0ed8]  w-8 mx-auto hidden" />
      </NavLink>
      <NavLink to={"/contact"}>
        <li>
          <a>Contact</a>
        </li>
        <hr className="md:border md:border-[#120e0ed8]  w-8 mx-auto hidden" />
      </NavLink>
      <NavLink to={"/wishlist"}>
        <li>
          <a>Wishlist</a>
        </li>
        <hr className="md:border md:border-[#120e0ed8]  w-8 mx-auto hidden" />
      </NavLink>
    </>
  );

  return (
    <div>
<<<<<<< HEAD
      <div className="bg-[#110F0D] py-3 px-4 md:px-8 flex flex-row justify-between items-center text-white">
        <div className="flex items-center justify-start gap-3">
          <img src={gold1} alt="Logo" className="w-6 md:w-8" />
          <p className="text-white text-2xl md:text-4xl font-extrabold tracking-wide">
            Jeweluxe
          </p>
        </div>

        <div className="mt-2 md:mt-0 text-center md:text-right  md:text-base">
          <p className="text-xs">Monday - Friday</p>
          <p className="text-xs">10:00 AM - 7:00 PM</p>
        </div>
      </div>
=======
{/* Upper Navbar - Black Background */}
<div className="bg-[#110F0D] py-2 px-3 md:px-8 flex flex-col lg:flex-row justify-between items-center text-white">
  
  {/* Left Side - Logo and Website Name */}
  <div className="flex items-center justify-start gap-3">
    <img src={gold1} alt="Logo" className="w-6 md:w-8" />
    <p className="text-white text-2xl md:text-4xl font-extrabold tracking-wide">
      Yasini
    </p>
  </div>

  {/* Middle - Metal Prices */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-3 lg:mt-0">
    {/* Gold Price */}
    <div className="flex items-center gap-2 text-center">
      <span className="text-[#FB8911] font-bold text-sm md:text-base">GOLD</span>
      <span className="text-white text-sm md:text-base">$2,045.50</span>
      <div className="flex flex-col items-center">
        <FiChevronUp className="text-green-400 text-xs" />
        <FiChevronDown className="text-gray-500 text-xs opacity-30" />
      </div>
      <span className="text-green-400 text-xs md:text-sm">+1.2% (+$24.50)</span>
    </div>

    {/* Silver Price */}
    <div className="flex items-center gap-2 text-center">
      <span className="text-gray-300 font-bold text-sm md:text-base">SILVER</span>
      <span className="text-white text-sm md:text-base">$23.85</span>
      <div className="flex flex-col items-center">
        <FiChevronUp className="text-gray-500 text-xs opacity-30" />
        <FiChevronDown className="text-red-400 text-xs" />
      </div>
      <span className="text-red-400 text-xs md:text-sm">-0.8% (-$0.19)</span>
    </div>

    {/* Platinum Price */}
    <div className="flex items-center gap-2 text-center">
      <span className="text-gray-100 font-bold text-sm md:text-base">PLATINUM</span>
      <span className="text-white text-sm md:text-base">$978.30</span>
      <div className="flex flex-col items-center">
        <FiChevronUp className="text-green-400 text-xs" />
        <FiChevronDown className="text-gray-500 text-xs opacity-30" />
      </div>
      <span className="text-green-400 text-xs md:text-sm">+0.5% (+$4.85)</span>
    </div>
  </div>

  {/* Right Side - User Profile */}
  <div className="mt-3 lg:mt-0">
    <button className="p-2 rounded-full border border-gray-600 hover:border-[#FB8911] hover:text-[#FB8911] transition-colors duration-200">
      <FiUser size={24} />
    </button>
  </div>
</div>
>>>>>>> 99e4d8edf6087d5b1be305bdc6b3d04b1b993ce7

      {/* Lower Navbar - Navigation */}
      <div className="navbar bg-[#FFF8ED] md:px-10">
        {/* Left Side - Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content font-semibold w-52 p-2 bg-white rounded-lg z-10"
            >
              {links}
            </ul>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal font-semibold text-lg text-gray-700">
              {links}
            </ul>
          </div>
        </div>

        {/* Center - Logo and Search */}
        <div className="navbar-center flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
          {/* Logo */}
          <div className="flex justify-center items-center gap-2">
            <img src="/public/e-shopping.jpeg" alt="" className="w-4 md:w-8" />
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <input
              type="text"
              placeholder="Search gold jewelry, rings, necklaces..."
              className="w-full pl-12 pr-4 py-3 text-sm md:text-base border-2 border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:border-[#FB8911] focus:ring-2 focus:ring-[#FB8911]/20 transition-all duration-200 placeholder-gray-500"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Right Side - Cart */}
        <div className="navbar-end">
          <button className="relative flex items-center gap-2 text-gray-700 font-semibold hover:text-[#FB8911] transition-colors duration-200">
            <FiShoppingCart size={28} />
            <span className="absolute -top-2 -right-3 bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              10
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
