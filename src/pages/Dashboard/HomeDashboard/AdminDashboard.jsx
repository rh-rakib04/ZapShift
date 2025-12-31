import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Legend,
  Pie,
  PieChart,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaBiking,
} from "react-icons/fa";
import { MdBikeScooter } from "react-icons/md";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryState = [] } = useQuery({
    queryKey: ["delivery-status/stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const getPieChartData = (data) => {
    return data.map((item) => {
      return { name: item._id, value: item.count };
    });
  };

  const stats = [
    {
      title: "Total Parcels",
      value: deliveryState.reduce((sum, item) => sum + item.count, 0),
      icon: FaBox,
      bgColor: "bg-primary",
      textColor: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      title: "Pending Pickup",
      value:
        deliveryState.find((item) => item._id === "pending-pickup")?.count || 0,
      icon: FaClock,
      bgColor: "bg-warning",
      textColor: "text-warning",
      iconBg: "bg-warning/10",
    },
    {
      title: "In Transit",
      value:
        deliveryState.find((item) => item._id === "assigned-rider")?.count || 0,
      icon: FaTruck,
      bgColor: "bg-info",
      textColor: "text-info",
      iconBg: "bg-info/10",
    },
    {
      title: "Delivered",
      value:
        deliveryState.find((item) => item._id === "parcel-delivered")?.count ||
        0,
      icon: FaCheckCircle,
      bgColor: "bg-success",
      textColor: "text-success",
      iconBg: "bg-success/10",
    },
  ];

  const COLORS = ["#03373d", "#94c6cb", "#caeb66", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Admin Dashboard
        </h1>
        <p className="text-base-content/70">
          Overview of all parcel delivery operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-base-content/70 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.iconBg}`}>
                    <IconComponent className={`text-3xl ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Delivery Status</h2>
            <div
              className="w-full"
              style={{ minHeight: "400px", height: "400px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPieChartData(deliveryState)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={120}
                    dataKey="value"
                  >
                    {getPieChartData(deliveryState).map((entry, index) => (
                      <Pie
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Status Distribution</h2>
            <div
              className="w-full"
              style={{ minHeight: "400px", height: "400px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getPieChartData(deliveryState)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#03373d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/dashboard/assign-riders"
              className="btn btn-primary btn-outline text-primary"
            >
              <MdBikeScooter className="w-5 h-5" />
              Assign Riders
            </Link>
            <Link
              to="/dashboard/rider-approval"
              className="btn btn-secondary btn-outline"
            >
              <FaBiking className="w-5 h-5" />
              Approve Riders
            </Link>
            <Link
              to="/dashboard/user-management"
              className="btn btn-accent btn-outline"
            >
              <FaUsers className="w-5 h-5" />
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
