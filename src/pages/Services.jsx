import React from "react";
import Banner from "../Components/Home/Banner";
import HowItWork from "../Components/Home/HowItWork";
import OurServices from "../Components/Home/OurServices";
import SalesTeam from "../Components/Home/SalesTeam";
import Facilities from "../Components/Home/Facilities";
import Priority from "../Components/Home/Priority";
import ReviewSwiper from "../Components/Home/ReviewSwiper";
import FAQ from "../Components/Home/FAQ";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Services = () => {
  return (
    <div>
      <Banner />
      <HowItWork />
      <OurServices />
      <SalesTeam />
      <Facilities />
      <Priority />
      <ReviewSwiper reviewPromise={reviewPromise} />
      <FAQ />
    </div>
  );
};

export default Services;
