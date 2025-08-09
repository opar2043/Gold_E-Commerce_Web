import gold from "../../assets/gold.jpg";

const Banner = () => {
  return (
    <div>
      <section className="bg-col lg:grid lg:h-screen lg:place-content-center mb-5">
        <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 md:items-center gap-4 py-10 px-2">
          <div className="max-w-prose text-left">
            <h1 className="text-xl font-bold text-col md:text-4xl lg:text-6xl">
              Welcome to
              <strong className="text-[#FB8911]"> Jeweluxe </strong>
              World
            </h1>

            <p className="mt-4 text-col ">
              We offer 18k–24k gold jewelry, certified diamonds, colored stones,
              and watches, with 21k and most pieces customizable to your desired
              design.
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <button
                className="inline-block rounded border border-[#120E0E] bg-[#120E0E] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#FB8911] hover:text-white hover:border-[#FB8911]"
               
              >
                Get Started
              </button>

              <button
                className="inline-block rounded border border-[#120E0E] px-5 py-3 font-medium text-[#120E0E] shadow-sm transition-colors hover:bg-[#120E0E] hover:text-white"
                href="#"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="">
            <img src={gold} alt="" className="w-full rounded-md" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
