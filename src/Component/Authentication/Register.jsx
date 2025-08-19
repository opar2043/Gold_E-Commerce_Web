// import { Link } from "react-router-dom";
// import registerAnimation from "../../assets/register.json";
// import Lottie from "lottie-react";
// import useAuth from "../../context/useAuth";
// import Swal from "sweetalert2";
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   'https://rldujrqylzgeqfmlvejo.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZHVqcnF5bHpnZXFmbWx2ZWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjQ3MjgsImV4cCI6MjA3MDkwMDcyOH0.bvsKIAqn-rPOkPUqQr_LS5zGb-HvxaFUXIukM79zDqE'
// );

// const Register = () => {
//   const { createUser } = useAuth();

//   const addUserToSupabase = (userData) => {
//     return supabase
//       .from('users')
//       .insert([userData])
//       .select();
//   };

//   function handleRegister(e) {
//     e.preventDefault();
//     const event = e.target;

//     const userObj = {
//       email: event.email.value,
//       name: event.name.value,
//       password_hash: event.pass.value,
//       street_address: event.street_address.value,
//       postal_code: event.postal_code.value,
//       city: event.city.value,
//       country: event.country.value,
//       phone: event.phone.value,
//     };

//     createUser(userObj.email, userObj.password_hash)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log("Firebase user:", user);

//         // Add uid to Supabase object
//         // const userWithUid = { userObj };

//         addUserToSupabase(userObj)
//           .then(({ data, error }) => {
//             if (error) {
//               console.error("Supabase insert error:", error);
//               Swal.fire({ title: "Supabase Error", text: error.message, icon: "error" });
//             } else {
//               console.log("Supabase user added:", data);
//               Swal.fire({ title: "Registered Successfully!", icon: "success" });
//             }
//           });
//       })
//       .catch((error) => {
//         console.error("Firebase registration error:", error.message);
//         Swal.fire({ title: "Registration Failed", text: error.message, icon: "error" });
//       });

//     console.log(userObj);
  


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf6f2] px-4 py-10">
//       <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-2xl overflow-hidden border border-[#e5e0db]">
//         <div className="hidden lg:flex relative overflow-hidden">
//           <div className="absolute inset-0 bg-slate-950/20 z-10"></div>
//           <Lottie animationData={registerAnimation} className="w-full h-full object-cover" />
//           <div className="absolute bottom-8 left-0 right-0 text-center z-20">
//             <h3 className="text-2xl font-serif text-slate-950 font-bold mb-2 drop-shadow-lg">
//               Join Our Exclusive Collection
//             </h3>
//             <p className="text-slate-950/80 font-light">Discover handcrafted jewelry for every occasion</p>
//           </div>
//         </div>

//         <div className="p-10 flex flex-col justify-center relative">
//           <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-slate-950"></div>
//           <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-slate-950"></div>

//           <div className="text-center mb-10">
//             <h2 className="text-4xl font-serif font-bold text-[#2a2a2a] mb-3">Create Account</h2>
//             <div className="flex justify-center mb-4"><div className="w-16 h-1 bg-slate-950"></div></div>
//             <p className="text-[#6d6d6d] font-light">Register to access premium jewelry collections</p>
//           </div>

//           <form onSubmit={handleRegister} className="space-y-6">
//             <div className="relative flex items-center gap-2 flex-col md:flex-row">
//               <input type="text" name="name" placeholder="Full Name" required className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//               <input type="email" name="email" placeholder="Email Address" required className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//             </div>

//             <div className="relative flex items-center gap-2 flex-col md:flex-row">
//               <input type="password" name="pass" placeholder="Password" required className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//               <input type="text" name="street_address" placeholder="Street Address" className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//             </div>

//             <div className="relative flex items-center gap-2 flex-col md:flex-row">
//               <input type="text" name="postal_code" placeholder="Postal Code" className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//               <input type="text" name="city" placeholder="City" className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//             </div>

//             <div className="relative flex items-center gap-2 flex-col md:flex-row">
//               <input type="text" name="country" placeholder="Country" className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//               <input type="text" name="phone" placeholder="Phone Number" className="w-full px-5 py-3 rounded-sm border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent focus:outline-none transition-all duration-300" />
//             </div>

//             <button type="submit" className="w-full bg-slate-950 hover:bg-slate-800 text-white font-medium py-4 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center">
//               <span>Register Now</span>
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//               </svg>
//             </button>
//           </form>

//           <div className="my-8 flex items-center">
//             <div className="flex-grow border-t border-[#e5e0db]"></div>
//             <span className="mx-4 text-[#9a9a9a] text-sm">OR</span>
//             <div className="flex-grow border-t border-[#e5e0db]"></div>
//           </div>

//           <p className="text-center text-[#7a7a7a] text-sm mt-10">
//             Already have an account?{" "}
//             <Link to="/login" className="text-slate-950 hover:underline font-medium">Sign In</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { Link } from "react-router-dom";
import registerAnimation from "../../assets/register.json";
import Lottie from "lottie-react";
import useAuth from "../../context/useAuth";
import Swal from "sweetalert2";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rldujrqylzgeqfmlvejo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZHVqcnF5bHpnZXFmbWx2ZWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjQ3MjgsImV4cCI6MjA3MDkwMDcyOH0.bvsKIAqn-rPOkPUqQr_LS5zGb-HvxaFUXIukM79zDqE"
);

const Register = () => {
  const { createUser } = useAuth();

  const addUserToSupabase = (userData) => {
    return supabase.from("users").insert([userData]).select();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const event = e.target;

    const userObj = {
      email: event.email.value,
      name: event.name.value,
      password_hash: event.pass.value,
      street_address: event.street_address.value,
      postal_code: event.postal_code.value,
      city: event.city.value,
      country: event.country.value,
      phone: event.phone.value,
    };

    createUser(userObj.email, userObj.password_hash)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Firebase user:", user);

        // Add to Supabase
        addUserToSupabase(userObj).then(({ data, error }) => {
          if (error) {
            console.error("Supabase insert error:", error);
            Swal.fire({
              title: "Supabase Error",
              text: error.message,
              icon: "error",
            });
          } else {
            console.log("Supabase user added:", data);
            Swal.fire({ title: "Registered Successfully!", icon: "success" });
          }
        });
      })
      .catch((error) => {
        console.error("Firebase registration error:", error.message);
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f2] px-4 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-2xl overflow-hidden border border-[#e5e0db]">
        {/* Left side animation */}
        <div className="hidden lg:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/20 z-10"></div>
          <Lottie
            animationData={registerAnimation}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
            <h3 className="text-2xl font-serif text-slate-950 font-bold mb-2 drop-shadow-lg">
              Join Our Exclusive Collection
            </h3>
            <p className="text-slate-950/80 font-light">
              Discover handcrafted jewelry for every occasion
            </p>
          </div>
        </div>

        {/* Right side form */}
        <div className="p-10 flex flex-col justify-center relative">
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
            <div className="relative flex items-center gap-2 flex-col md:flex-row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
            </div>

            <div className="relative flex items-center gap-2 flex-col md:flex-row">
              <input
                type="password"
                name="pass"
                placeholder="Password"
                required
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
              <input
                type="text"
                name="street_address"
                placeholder="Street Address"
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
            </div>

            <div className="relative flex items-center gap-2 flex-col md:flex-row">
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
            </div>

            <div className="relative flex items-center gap-2 flex-col md:flex-row">
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-5 py-3 border-b-2 border-[#d1d1d1] focus:border-slate-950 bg-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-medium py-4 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span>Register Now</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
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
