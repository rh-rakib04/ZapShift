import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
  const links = (
    <>
      <NavLink to="/">Services</NavLink>
      <NavLink to="/coverage">Coverage</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/be-a-rider">Be a Rider</NavLink>
    </>
  );

  // --------------------------------------------------
  // THEME SYSTEM (Persistent + Sync with DaisyUI)
  // --------------------------------------------------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // --------------------------------------------------

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="flex items-center">
          <img src="/logo.png" alt="" />
          <span className="-ms-4 mt-1 font-bold text-xl md:text-2xl ">
            ZapShift
          </span>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
          title="Toggle Dark/Light Mode"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <Link className="btn bg-secondary">Sign in</Link>
        <div className="flex items-center">
          <Link className="btn bg-[#CAEB66] rounded-2xl ">Be a Rider</Link>
          <div className="font-bold p-2 text-2xl rounded-full hidden md:flex bg-[#056873]">
            <FiArrowUpRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
