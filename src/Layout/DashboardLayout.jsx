import { Package } from "lucide-react";
import { FaBiking, FaHistory, FaUsers } from "react-icons/fa";
import { MdBikeScooter } from "react-icons/md";
import React from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();
  return (
    <div>
      {/* TOP NAVBAR */}
      <div className="navbar bg-base-100/70 backdrop-blur-md shadow-sm px-4 sticky top-0 z-50 rounded-b-xl">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-xl md:text-2xl">ZapShift</span>
        </div>

        {/* RIGHT — USER PROFILE */}
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right hidden sm:block leading-tight">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs opacity-60">{user?.role}</p>
          </div>

          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt={user?.name} />
            </div>
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div></div>
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Dashboard</div>
          </nav>
          {/* Page content here */}
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}

            <ul className="menu w-full grow">
              <p className=" text-md mt-5 font-bold">Menu</p>
              {/* Home */}
              <li>
                <NavLink
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </NavLink>
              </li>
              {/* MyParcels */}
              <li>
                <NavLink
                  to="/dashboard/my-parcels"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="MyParcel"
                >
                  {/* Home icon */}
                  <Package className="w-4 h-4" />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </NavLink>
              </li>
              {/* Payment History */}
              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                >
                  {/* Home icon */}
                  <FaHistory className="w-4 h-4" />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </NavLink>
              </li>
              {role === "admin" && (
                <>
                  {/* RiderApproval */}
                  <li>
                    <NavLink
                      to="/dashboard/rider-approval"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Rider Approval"
                    >
                      {/* Home icon */}
                      <FaBiking className="w-4 h-4" />
                      <span className="is-drawer-close:hidden">
                        Rider Approval
                      </span>
                    </NavLink>
                  </li>
                  {/* AssignRiders */}
                  <li>
                    <NavLink
                      to="/dashboard/assign-riders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign Riders"
                    >
                      {/* Home icon */}
                      <MdBikeScooter className="w-4 h-4" />

                      <span className="is-drawer-close:hidden">
                        Assign Riders
                      </span>
                    </NavLink>
                  </li>
                  {/* UserManagement */}
                  <li>
                    <NavLink
                      to="/dashboard/user-management"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="User Management"
                    >
                      {/* Home icon */}
                      <FaUsers className="w-4 h-4" />
                      <span className="is-drawer-close:hidden">
                        User Management
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
