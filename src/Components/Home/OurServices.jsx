import React from "react";
import { FaGlobeAsia, FaUndoAlt } from "react-icons/fa";
import {
  FaBoxOpen,
  FaBuilding,
  FaMoneyBillWave,
  FaTruckMoving,
} from "react-icons/fa6";

const OurServices = () => {
  return (
    <div className="text-center  py-15 my-10 bg-[#03373D]">
      <h1 className="text-3xl text-white md:text-4xl font-bold my-5">
        Our Services
      </h1>
      <p className="text-white px-10 mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-11/12 mx-auto my-5 ">
        <div className="flex flex-col gap-2 justify-center items-center p-7  rounded-2xl hover:shadow-2xl bg-base-100 ">
          <FaTruckMoving className="w-12 h-12 text-secondary  bg-primary p-2 rounded-full" />
          <h3 className="text-2xl font-semibold">
            Express & Standard Delivery
          </h3>
          <p>
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>{" "}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center p-7  rounded-2xl hover:shadow-2xl bg-base-100 ">
          <FaGlobeAsia className="w-12 h-12 text-secondary bg-primary p-2 rounded-full" />
          <h3 className="text-2xl font-semibold">Nationwide Delivery</h3>
          <p>
            We deliver parcels nationwide with home delivery in every district,
            ensuring your products reach customers within 48–72 hours.
          </p>{" "}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center p-7  rounded-2xl hover:shadow-2xl bg-base-100 ">
          <FaBoxOpen className="w-12 h-12 text-secondary bg-primary p-2 rounded-full" />
          <h3 className="text-2xl font-semibold">Fulfillment Solution</h3>
          <p>
            We also offer customized service with inventory management support,
            online order processing, packaging, and after sales support.
          </p>{" "}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center p-7  rounded-2xl hover:shadow-2xl bg-base-100 ">
          <FaMoneyBillWave className="w-12 h-12 text-secondary bg-primary p-2 rounded-full" />
          <h3 className="text-2xl font-semibold">Cash on Home Delivery</h3>
          <p>
            100% cash on delivery anywhere in Bangladesh with guaranteed safety
            of your product.
          </p>{" "}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center p-7  rounded-2xl hover:shadow-2xl bg-base-100 ">
          <FaBuilding className="w-12 h-12 text-secondary bg-primary p-2 rounded-full" />
          <h3 className="text-2xl font-semibold">
            Corporate Service / Contract In Logistics
          </h3>
          <p>
            Customized corporate services which includes warehouse and inventory
            management support.
          </p>{" "}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center p-7  rounded-2xl hover:shadow-2xl bg-base-100 ">
          <FaUndoAlt className="w-12 h-12 text-secondary bg-primary p-2 rounded-full" />
          <h3 className="text-2xl font-semibold">Parcel Return</h3>
          <p>
            Through our reverse logistics facility we allow end customers to
            return or exchange their products with online business merchants.
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
