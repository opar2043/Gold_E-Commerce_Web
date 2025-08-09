import { Link } from "react-router-dom";

const Error= () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E6] text-center p-6">
      {/* Big Error Number */}
      <h1 className="text-[150px] font-extrabold text-[#FB8911] leading-none">
        404
      </h1>

      {/* Error Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 bg-[#FB8911] hover:bg-[#e6760d] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
