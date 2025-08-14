import React from "react";

const Contact = () => {
  return (
    <section className="bg-[#FAF7F2] py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#120E0E] mb-8">
          Contact <span className="text-[#FB8911]">Tannous Jewelry</span>
        </h1>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Have questions about our products, services, or your order? We’re here
          to help. Reach out to us using the form below, or visit our store for
          a personalized jewelry experience.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#120E0E] mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FB8911]"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FB8911]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FB8911]"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#FB8911] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-[#d8730f] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Store Information */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-[#120E0E] mb-4">
                Visit Our Store
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 123 Gold Street, xyz, xyz
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> +=== 123 456 789
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> info@tannousjewelry.com
              </p>
              <p className="text-gray-700">
                <strong>Hours:</strong> Sat – Thu: 10:00 AM – 9:00 PM
              </p>
            </div>

            {/* Google Map */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.734665530184!2d90.39251031498158!3d23.794640684566955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c71f1b2f1e2f%3A0xdeadbeefcafe1234!2sDhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                width="100%"
                height="250"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
