import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
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
    </>
  );

  return (
    <div>
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

      <div className="navbar bg-[#FFF8ED]  md:px-10">
        {/* Left Side - Brand & Mobile Menu */}
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
              className="menu menu-sm dropdown-content font-semibold w-52 p-2  bg-white rounded-lg z-10 "
            >
              {links}
            </ul>
          </div>

          {/* Center - Navigation Links */}
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal font-semibold text-lg text-gray-700">
              {links}{" "}
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <img src="/public/e-shopping.jpeg" alt="" className="w-4 md:w-8" />
          <NavLink to="/" className="text-md md:text-5xl font-bold ">
            Jeweluxe
          </NavLink>
        </div>

        <div className="navbar-end flex items-center space-x-6">
          <button className="relative flex items-center gap-2 text-gray-700 font-semibold hover:text-[#FB8911]  transition-colors duration-200">
            <FiShoppingCart size={28} />
            <span className="absolute -top-2 -right-3 bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              10
            </span>
          </button>

          <button className="p-2 rounded-full border border-gray-300 hover:border-[#FB8911] hover:text-[#FB8911] transition-colors duration-200">
            <FiUser size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
