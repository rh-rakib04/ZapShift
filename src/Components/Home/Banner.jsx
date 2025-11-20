import React from "react";
import Img1 from "../../assets/banner/banner1.png";
import Img2 from "../../assets/banner/banner2.png";
import Img3 from "../../assets/banner/banner3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <div className="mx-auto  w-11/12">
      <Carousel infiniteLoop={true} autoPlay={true} interval={3000}>
        <div>
          <img className="mx-auto" src={Img1} />
        </div>
        <div>
          <img className="mx-auto" src={Img2} />
        </div>
        <div>
          <img className="mx-auto" src={Img3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
