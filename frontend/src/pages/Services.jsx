import React from "react";

const Services = () => {
  return (
    <section className="py-28 bg-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl text-indigo-800 font-semibold text-center mb-16 tracking-wide">
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
              className="bg-white p-8 rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#1D93F7]"
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
  );
};

export default Services;
