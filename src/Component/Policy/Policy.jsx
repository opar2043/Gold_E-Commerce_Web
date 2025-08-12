import {
  FaTruck,
  FaUndoAlt,
  FaShippingFast,
  FaHeadset,
  FaLock,
} from "react-icons/fa";
import gold1 from "../../assets/gold3.png";
import gold2 from "../../assets/gold2.png";
const Policy = () => {
  const policy = [
    {
      title: "Safe Delivery",
      icon: <FaTruck size={30} />,
      text: "Your orders are delivered securely and on time with full tracking.",
    },
    {
      title: "Return Policy",
      icon: <FaUndoAlt size={30} />,
      text: "Easy returns within 14 days of purchase for a hassle-free experience.",
    },
    {
      title: "Fast Shipping",
      icon: <FaShippingFast size={30} />,
      text: "Get your products quickly with our express delivery options.",
    },
  ];

  const policy2 = [
    {
      image: gold1,
      price: 249.99,
      title: "Elegant Gold Necklace",
      text: "A beautifully crafted 22k gold necklace perfect for special occasions.",
    },
    {
      image: gold2,
      price: 149.99,
      title: "gold Stud Earrings",
      text: "Classic gold stud earrings that add sparkle to your everyday look.",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {policy.map((pol) => (
          <div className="flex items-center gap-3 bg-[#FAF7F2] rounded-md p-3">
            <div className="text-gold">{pol.icon}</div>
            <div className="flex flex-col">
              <h2 className="text-col font-bold ">{pol.title}</h2>
              <p className="text-gray-700 text-sm">{pol.text}</p>
            </div>
          </div>
        ))}
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
  {policy2.map((pol, i) => (
    <div
      key={i}
      className="flex flex-col md:flex-row items-center gap-6 bg-[#FAF7F2] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="md:w-1/2 w-full overflow-hidden rounded-lg">
        <img
          src={pol.image}
          alt={pol.title}
          className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
        />
      </div>

     
      <div className="flex flex-col justify-between md:w-1/2 w-full text-center md:text-left space-y-4">
        <h2 className="text-2xl font-bold text-col">{pol.title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{pol.text}</p>

        <button className="inline-block rounded-lg border border-[#120E0E] bg-[#120E0E] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#FB8911] hover:border-[#FB8911]">
          ${pol.price}
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Policy;
