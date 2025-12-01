import React from "react";
import img from "../../assets/location-merchant.png";
import bgImg from "../../assets/be-a-merchant-bg.png";

const Priority = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundBlendMode: "overlay",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
      className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row bg-[#03373D] p-10 md:p-30 rounded-4xl text-white gap-5 my-10"
    >
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold ">
          Merchant and Customer Satisfaction <br /> is Our First Priority
        </h1>
        <p className="text-[#DADADA] mt-3">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col md:flex-row gap-2 my-5">
          <button className=" btn bg-[#CAEB66] text-[#03373D] rounded-2xl">
            Become a Merchant
          </button>
          <button className=" btn bg-transparent border-[#CAEB66] text-[#CAEB66] rounded-2xl">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
      <div>
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default Priority;
