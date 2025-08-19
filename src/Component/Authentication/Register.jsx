import { Link } from "react-router-dom";
import registerAnimation from "../../assets/register.json";
import Lottie from "lottie-react";

const Register = () => {
    function handleRegister(e){
    e.preventDefault()
      const event = e.target;
      const email = event.email.value;
      const name = event.name.value;
      const pass = event.pass.value;
      
      console.log(email , pass , name);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f2] px-4 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-2xl overflow-hidden border border-[#e5e0db]">
        {/* Luxury Image Section */}
        <div className="hidden lg:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/20 z-10"></div>
          <Lottie 
            animationData={registerAnimation} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
            <h3 className="text-2xl font-serif text-slate-950 font-bold mb-2 drop-shadow-lg">Join Our Exclusive Collection</h3>
            <p className="text-slate-950/80 font-light">Discover handcrafted jewelry for every occasion</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-10 flex flex-col justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-slate-950"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-slate-950"></div>
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-[#2a2a2a] mb-3">
              Create Account
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-slate-950"></div>
            </div>
            <p className="text-[#6d6d6d] font-light">
              Register to access premium jewelry collections
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-950 transition-all duration-300 group-focus-within:w-full"></div>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="pass"
                placeholder="Password"
                required
                className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-medium py-4 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span>Register Now</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-[#e5e0db]"></div>
            <span className="mx-4 text-[#9a9a9a] text-sm">OR</span>
            <div className="flex-grow border-t border-[#e5e0db]"></div>
          </div>

          <p className="text-center text-[#7a7a7a] text-sm mt-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-slate-950 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;