import React from "react";
import { FiBriefcase, FiCreditCard, FiTruck } from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

const HowItWork = () => {
  return (
    <div className="w-10/12 mx-auto my-20">
      <h1 className="text-3xl md:text-4xl text-primary font-bold my-5">
        How it Works
      </h1>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
        <div className=" text-[#03373D] bg-[#EAECED] p-3 md:p-7 rounded-2xl flex flex-col gap-2 hover:shadow-2xl">
          <FiTruck className="w-12 h-12" />
          <h2 className="text-xl md:text-2xl font-semibold">
            {" "}
            Booking Pick & Drop
          </h2>
          <p className="text-md md:text-lg ">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        <div className=" text-[#03373D] bg-[#EAECED] p-3 md:p-7 rounded-2xl flex flex-col gap-2 hover:shadow-2xl">
          <FiCreditCard className="w-12 h-12" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Cash On Delivery
          </h2>
          <p className="text-md md:text-lg ">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        <div className=" text-[#03373D] bg-[#EAECED] p-3 md:p-7 rounded-2xl flex flex-col gap-2 hover:shadow-2xl">
          <HiOutlineBuildingStorefront className="w-12 h-12" />
          <h2 className="text-xl md:text-2xl font-semibold">Delivery Hub</h2>
          <p className="text-md md:text-lg ">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        <div className=" text-[#03373D] bg-[#EAECED] p-3 md:p-7 rounded-2xl flex flex-col gap-2 hover:shadow-2xl">
          <FiBriefcase className="w-12 h-12" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Booking SME & Corporate
          </h2>
          <p className="text-md md:text-lg ">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
