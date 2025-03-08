import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FEE1E8] text-[#9C326D] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          {/* Contact Information */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg font-light text-[#7A2656] leading-relaxed">
              At <strong>Care+</strong>, we merge technology with care to
              guide your health journey. With personalized solutions and expert
              support, we empower you to make informed choices. Your well-being,
              our innovation.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl mb-2">Our Location</h2>
                <p className="flex gap-2 items-center text-base sm:text-lg font-light text-[#7A2656]">
                  <CiLocationOn className="text-[#9C326D] text-xl" />
                  Kupandole, Lalitpur, Bagmati, Nepal
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl mb-2">Phone</h2>
                <a
                  href="tel:+977-9860876022"
                  className="flex gap-2 items-center text-base sm:text-lg font-light text-[#7A2656] hover:text-[#9C326D] transition-all"
                >
                  <FiPhoneCall className="text-[#9C326D] text-xl" />
                  +977-9860876022, 9860876022
                </a>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl mb-2">Email</h2>
                <a
                  href="mailto:samrat.healthtech33@gmail.com"
                  className="flex gap-2 items-center text-base sm:text-lg font-light text-[#7A2656] hover:text-[#9C326D] transition-all"
                >
                  <CiMail className="text-[#9C326D] text-xl" />
                  samrat.healthtech33@gmail.com
                </a>
                <a
                  href="mailto:samrat.group369@gmail.com"
                  className="flex gap-2 items-center text-base sm:text-lg font-light text-[#7A2656] hover:text-[#9C326D] transition-all"
                >
                  <CiMail className="text-[#9C326D] text-xl" />
                  samrat.group369@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3533.0714006399603!2d85.325828!3d27.684188000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQxJzAzLjEiTiA4NcKwMTknMzMuMCJF!5e0!3m2!1sen!2snp!4v1740729121448!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
