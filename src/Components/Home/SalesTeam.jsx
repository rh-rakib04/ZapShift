import React from "react";
import client1 from "../../assets/brands/amazon.png";
import client2 from "../../assets/brands/amazon_vector.png";
import client3 from "../../assets/brands/casio.png";
import client4 from "../../assets/brands/moonstar.png";
import client5 from "../../assets/brands/randstad.png";
import client6 from "../../assets/brands/star.png";
import client7 from "../../assets/brands/start_people.png";
import Marquee from "react-fast-marquee";
const SalesTeam = () => {
  return (
    <div className="my-20">
      <h1 className="text-2xl md:text-3xl text-primary text-center font-extrabold mb-15">
        We've helped thousands of sales teams
      </h1>
      <Marquee className="flex items-center my-5 gap-5 ">
        <div>
          <img className="mx-10 md:mx-20" src={client1} alt="" />
        </div>
        <div>
          <img className="mx-10 md:mx-20" src={client2} alt="" />
        </div>
        <div>
          <img className="mx-10 md:mx-20" src={client3} alt="" />
        </div>
        <div>
          <img className="mx-10 md:mx-20" src={client4} alt="" />
        </div>
        <div>
          <img className="mx-10 md:mx-20" src={client5} alt="" />
        </div>
        <div>
          <img className="mx-10 md:mx-20" src={client6} alt="" />
        </div>
        <div>
          <img className="mx-10 md:mx-20" src={client7} alt="" />
        </div>
      </Marquee>
    </div>
  );
};

export default SalesTeam;
