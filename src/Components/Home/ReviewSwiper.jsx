import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import img from "../../assets/customer-top.png";

export default function ReviewSwiper({ reviewPromise }) {
  const swiperRef = useRef(null);
  const [reviews, setReviews] = useState([]);
 
  useEffect(() => {
    reviewPromise.then((data) => setReviews(data || []));
  }, [reviewPromise]);

  if (!reviews.length) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-xl text-primary">No reviews found.</h2>
      </section>
    );
  }

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <img src={img} className="mx-auto my-5" alt="" />
        <h2 className="text-3xl md:text-4xl text-primary text-center font-extrabold my-5">
          What our customers are saying
        </h2>
        <p className=" mt-3 max-w-xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro.
        </p>
      </div>

      <div className="relative pb-24">
        {/* ----------------- SWIPER ----------------- */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1.3}
          centeredSlides
          loop={reviews.length > 1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          pagination={{ clickable: true, el: ".custom-dots" }}
          className="px-10"
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: isActive ? 1.14 : 0.8,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 
             max-w-md mx-auto relative"
                >
                  {/* QUOTE ICON */}
                  <FaQuoteLeft className="text-primary text-3xl mb-3" />

                  {/* USER INFO */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={r.user_photoURL}
                      alt={r.userName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {r.userName}
                      </h3>

                      {/* OPTIONAL: EMAIL */}
                      {/* <p className="text-xs text-gray-500">{r.user_email}</p> */}

                      {/* USER ROLE OR DATE */}
                      <p className="text-xs text-gray-500">
                        {new Date(r.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {r.review}
                  </p>

                  {/* STAR RATING */}
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const filled = index + 1 <= Math.round(r.ratings);
                      return (
                        <span
                          key={index}
                          className={
                            filled ? "text-yellow-400" : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      );
                    })}
                    <span className="text-xs text-gray-500 ml-1">
                      {r.ratings}
                    </span>
                  </div>
                </motion.div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ----------------- ARROWS & DOTS (outside card) ----------------- */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 
                     flex items-center gap-5 bg-white px-6 py-3
                     rounded-full shadow-md"
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 rounded-full text-primary hover:bg-gray-200 transition"
          >
            <FaArrowLeft />
          </button>

          <div className="custom-dots flex gap-2"></div>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 rounded-full text-primary hover:bg-gray-200 transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
