import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-[#E7EFF5] h-[500px] text-[#1D93F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl sm:text-2xl lg:text-5xl font-semibold mb-6 leading-snug tracking-tight animate-fade-in">
              Caring for You, Every Moment of Your Journey
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-lg mx-auto md:mx-0 text-blue-500">
              At Care+, we’re here with heartfelt, creative solutions to support
              you through every step of your personal path.
            </p>
            <Link to="/contact">
              <button className="bg-white text-[#1D93F7] font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300">
                Contact Us
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="https://i0.wp.com/www.curahealth.org/wp-content/uploads/2021/01/Cura-Header-Image.png?w=640&ssl=1"
              alt="Healthcare Professional"
              className="w-full rounded-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-6 tracking-wide"
            style={{ color: "#1D93F7" }}
          >
            Welcome to Care+
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We’re here to transform lives with cutting-edge healthcare, from
            everyday wellness to advanced treatments.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl text-indigo-800 font-semibold text-center mb-16 tracking-wide">
            What We Offer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Primary Care",
                desc: "Holistic health solutions for every stage of life.",
              },
              {
                title: "Specialty Services",
                desc: "Top-tier expertise in cardiology, neurology, and beyond.",
              },
              {
                title: "Urgent Care",
                desc: "Fast, reliable support when you need it most.",
              },
              {
                title: "Find Right Specialist",
                desc: "Expert guidance to find the right care provider.",
              },
              {
                title: "Health Care Packages",
                desc: "Affordable and personalized healthcare packages.",
              },
              {
                title: "Convenient Lab Testing",
                desc: "Convenient and hassle-free lab testing services.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#1D93F7]"
              >
                <h4
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#1D93F7" }}
                >
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#FFE7E8] text-indigo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl sm:text-5xl font-semibold mb-6 tracking-wide">
            Empower Your Health Today
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-800">
            Join us to explore personalized care and start your wellness journey
            now.
          </p>
          <Link to="/contact">
          <button className="bg-white text-[#1D93F7] font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300">
            Get Started
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
