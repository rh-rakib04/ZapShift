import { Home, Package } from "lucide-react";
import {
  FaBiking,
  FaHistory,
  FaTasks,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa6";
import { MdBikeScooter, MdTask } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard/dashboard-home",
      icon: Home,
      roles: ["admin", "user", "rider"],
    },
    {
      name: "My Parcels",
      path: "/dashboard/my-parcels",
      icon: Package,
      roles: ["user"],
    },
    {
      name: "Payment History",
      path: "/dashboard/payment-history",
      icon: FaHistory,
      roles: ["user"],
    },
    {
      name: "Assigned Parcels",
      path: "/dashboard/assigned-parcels",
      icon: FaTasks,
      roles: ["rider"],
    },
    {
      name: "Completed Deliveries",
      path: "/dashboard/completed-deliveries",
      icon: MdTask,
      roles: ["rider"],
    },
    {
      name: "Rider Approval",
      path: "/dashboard/rider-approval",
      icon: FaBiking,
      roles: ["admin"],
    },
    {
      name: "Assign Riders",
      path: "/dashboard/assign-riders",
      icon: MdBikeScooter,
      roles: ["admin"],
    },
    {
      name: "User Management",
      path: "/dashboard/user-management",
      icon: FaUsers,
      roles: ["admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navbar */}
      <div className="navbar bg-secondary text-primary-content flex justify-between items-center shadow-lg sticky top-0 z-50">
        {/* Left Section - Menu Toggle & Logo */}
        <div >
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost  lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars className="w-5 h-5" />
          </label>
          <Link
            to="/"
            className="flex items-center gap-2 ml-2 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl md:text-2xl">ZapShift</span>
          </Link>
        </div>

        {/* Right Section - Theme Toggle & User Dropdown */}
        <div className="flex-none gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <FaMoon className="w-5 h-5" />
            ) : (
              <FaSun className="w-5 h-5" />
            )}
          </button>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2"
            >
              <div className="hidden sm:flex flex-col items-end">
                <p className="font-semibold text-sm">{user?.name || "User"}</p>
                <p className="text-xs opacity-80 capitalize">
                  {role || "user"}
                </p>
              </div>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary-content ring-offset-2 ring-offset-primary">
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt={user?.name || "User"}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-base-100 rounded-box w-56 text-base-content"
            >
              {/* User Info Header */}
              <li className="menu-title">
                <div className="flex items-center gap-3 p-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                      <img
                        src={user?.photoURL || "/default-avatar.png"}
                        alt={user?.name || "User"}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{user?.name || "User"}</p>
                    <p className="text-xs opacity-70">{user?.email}</p>
                    <p className="text-xs opacity-60 capitalize mt-1">
                      {role || "user"}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="divider my-1"></div>
              </li>
              <li>
                <Link to="/dashboard/dashboard-home">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaUser className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/dashboard-home">
                  <FaCog className="w-4 h-4" />
                  Settings
                </Link>
              </li>
              <li>
                <div className="divider my-1"></div>
              </li>
              <li>
                <a onClick={handleLogout} className="text-error">
                  <FaSignOutAlt className="w-4 h-4" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={(e) => setSidebarOpen(e.target.checked)}
        />
        <div className="drawer-content">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <aside className="w-64 min-h-full bg-base-100 shadow-xl">
            <div className="p-4 border-b border-base-300">
              <h2 className="text-xl font-bold text-primary">Dashboard Menu</h2>
            </div>
            <ul className="menu p-4 w-full text-base-content">
              {filteredMenuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-secondary text-primary-content"
                          : "hover:bg-base-200"
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="absolute bottom-0 w-full p-4 border-t border-base-300">
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline w-full"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
