import React from "react";
import { MdAttachEmail } from "react-icons/md";
import { MdSettingsPhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] text-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h5
              className="text-xl font-semibold mb-4"
              style={{ color: "#1D93F7" }}
            >
              <img src={logo} alt="Logo" className="w-40 object-cover" />
            </h5>
            <p className="text-slate-700 leading-relaxed">
              Your vibrant partner in modern healthcare.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-3">
            <h5
              className="text-xl font-semibold mb-4"
              style={{ color: "#1D93F7" }}
            >
              Explore
            </h5>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a
                  href="#"
                  className="hover:text-[#1D93F7] transition-colors duration-200"
                >
                  Patient Hub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#1D93F7] transition-colors duration-200"
                >
                  Join Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#1D93F7] transition-colors duration-200"
                >
                  Find a Location
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center gap-3">
            <h5 className="text-xl font-bold mb-4" style={{ color: "#1D93F7" }}>
              Reach Out
            </h5>
            <p className="text-slate-700 flex items-center justify-center gap-2">
              <MdAttachEmail />
              samrat.healthtech33@gmail.com
            </p>
            <p className="text-slate-700 flex items-center justify-center gap-2">
              <MdSettingsPhone /> +977-9860876022
            </p>
            <p className="text-slate-700 flex items-center justify-center gap-2">
              <GrLocation /> Kupandole, Lalitpur, Nepal
            </p>
          </div>
        </div>
        <p className="text-center mt-10 text-sm text-slate-600 tracking-wide">
          © 2025 Care Plus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
