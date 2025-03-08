import React from "react";
import Doctors from "./Doctors";
import aboutBanner from "../assets/aboutbanner.webp";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            We are a dedicated team driven by a commitment to excellence,
            innovation, and delivering transformative solutions that advance
            healthcare and improve patient outcomes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#FFDFDE]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Our Story */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to transform ideas into reality, our
                journey began with a small team of passionate individuals.
                Today, we have grown into a dynamic organization serving clients
                across various sectors with innovative solutions.
              </p>
              <p className="text-gray-600">
                Our commitment to quality and customer satisfaction drives
                everything we do, ensuring we deliver exceptional results every
                time.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <img
                src={aboutBanner}
                alt="Our Team"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To empower businesses and individuals through innovative
                solutions, fostering growth and sustainability in everything we
                undertake.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be a global leader in delivering transformative solutions
                that shape the future and inspire positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Doctors />

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Let's collaborate to bring your ideas to life. Contact us today to
            get started!
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
