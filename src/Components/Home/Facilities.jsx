import React from "react";
import img1 from "../../assets/live-tracking.png";
import img2 from "../../assets/safe-delivery.png";
import img3 from "../../assets/safe-delivery.png";
const Facilities = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col gap-5 border-y-2 border-secondary border-dotted py-20">
      <div className="flex flex-col md:flex-row text-secondary  bg-[#EAECED] gap-10 p-8 rounded-2xl">
        <img
          className="w-[150px] h-[160px ] mx-auto md:w-[200px] md:h-[220px]"
          src={img1}
          alt=""
        />
        <div className="border-l-2 border-secondary border-dotted pl-10 gap-4 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold">Live Parcel Tracking</h2>
          <p className="text-lg">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>{" "}
        </div>
      </div>
      <div className="flex flex-col md:flex-row text-secondary bg-[#EAECED] gap-10 p-8 rounded-2xl">
        <img
          className="w-[150px] h-[160px ] mx-auto md:w-[200px] md:h-[220px]"
          src={img2}
          alt=""
        />
        <div className="border-l-2 border-secondary border-dotted pl-10 gap-4 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold">100% Safe Delivery</h2>
          <p className="text-lg">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>{" "}
        </div>
      </div>
      <div className="flex flex-col md:flex-row text-secondary bg-[#EAECED] gap-10 p-8 rounded-2xl">
        <img
          className="w-[150px] h-[160px ] mx-auto md:w-[200px] md:h-[220px]"
          src={img3}
          alt=""
        />
        <div className="border-l-2 border-secondary border-dotted pl-10 gap-4 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold">24/7 Call Center Support</h2>
          <p className="text-lg">
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, or delivery concerns—anytime you
            need us.
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
<div>
  <img src="" alt="" />
</div>;
