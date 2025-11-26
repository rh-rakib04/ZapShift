import React from "react";
import { Link, Outlet } from "react-router";
import img from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/" className="flex items-center">
        <img src="/logo.png" alt="" />
        <span className="-ms-4 mt-1 font-bold text-xl md:text-2xl ">
          ZapShift
        </span>
      </Link>
      <div className="flex flex-col md:flex-row mx-auto ">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1 my-auto">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
