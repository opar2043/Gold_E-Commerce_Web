import { Link } from "react-router-dom";
import loginanimation from "../../assets/login.json";
import Lottie from "lottie-react";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";


const Login = () => {
  async function handleSubmit(e) {
    e.preventDefault();
    const event = e.target;
    const email = event.email.value;
    const pass = event.pass.value;

    

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f2] px-4 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-2xl overflow-hidden border border-[#e5e0db]">
        
        {/* Form Section */}
        <div className="p-10 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#FB8911]"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#FB8911]"></div>

          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-[#2a2a2a] mb-3">
              Welcome Back
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#FB8911]"></div>
            </div>
            <p className="text-[#6d6d6d] font-light">
              Sign in to your Tannous Jewelry account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-[#FB8911] bg-transparent focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="pass"
                placeholder="Password"
                required
                className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-[#FB8911] bg-transparent focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="flex justify-between items-center">
              <Link
                to="/forgot-password"
                className="text-sm text-[#FB8911] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FB8911] hover:bg-[#d97a0f] text-white font-medium py-4 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span>Sign In</span>
              <FaArrowRight />
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-[#e5e0db]"></div>
            <span className="mx-4 text-[#9a9a9a] text-sm">OR</span>
            <div className="flex-grow border-t border-[#e5e0db]"></div>
          </div>

          <div className="flex justify-center space-x-6">
            <button className="p-3 rounded-full border text-[#db4437] border-[#db4437] hover:bg-[#f5f5f5] transition-all duration-300">
              <FaGoogle />
            </button>
          </div>

          <p className="text-center text-[#7a7a7a] text-sm mt-10">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#FB8911] hover:underline font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Luxury Image Section */}
        <div className="hidden lg:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FB8911]/20 z-10"></div>
          <Lottie
            animationData={loginanimation}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
            <h3 className="text-2xl font-serif text-[#FB8911] font-bold mb-2 drop-shadow-lg">
              Exclusive Member Benefits
            </h3>
            <p className="text-[#FB8911]/90 font-light">
              Access personalized recommendations and special offers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
