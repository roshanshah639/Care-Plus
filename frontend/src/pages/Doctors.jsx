import React from "react";
import doctor1 from "../assets/doctor1.webp";
import doctor2 from "../assets/doctor2.webp";
import doctor3 from "../assets/doctor3.webp";
import doctor4 from "../assets/doctor4.webp";
import doctor5 from "../assets/doctor5.webp";
import doctor6 from "../assets/doctor6.webp";

const Doctors = () => {
  const teamMembers = [
    {
      name: "Dr. Akriti Bharati",
      title: "Senior Fertility Specialist",
      image: doctor1,
    },
    {
      name: "Dr. Nija Rajbhandari",
      title: "Senior Fertility Specialist",
      image: doctor2,
    },
    {
      name: "Dr. Pratikshya Pandey",
      title: "Senior Fertility Specialist",
      image: doctor3,
    },
    { name: "Dr. Upama Basnet", title: "Fertility Specialist", image: doctor4 },
    {
      name: "Dr. Lata Shrestha",
      title: "Senior Fertility Specialist",
      image: doctor5,
    },
    {
      name: "Dr. Husneyara Haque",
      title: "Fertility Specialist",
      image: doctor6,
    },
  ];

  return (
    <section className="bg-[#FFE7E8] py-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#333333] text-center mb-12 tracking-tight">
          Our Specialists Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#00A79D] opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 bg-[#F4BBC4]">
                <h2 className="text-2xl font-semibold text-[#333333] mb-2">
                  {member.name}
                </h2>
                <p className="text-[#666666] text-lg">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
