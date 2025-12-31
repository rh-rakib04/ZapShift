import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaMoneyBillWave,
  FaPlus,
  FaEye,
} from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const stats = [
    {
      title: "Total Parcels",
      value: parcels.length,
      icon: FaBox,
      textColor: "text-primary",
      iconBg: "bg-primary/10",
      link: "/dashboard/my-parcels",
    },
    {
      title: "Pending",
      value: parcels.filter((p) => p.deliveryStatus === "pending-pickup")
        .length,
      icon: FaClock,
      textColor: "text-warning",
      iconBg: "bg-warning/10",
    },
    {
      title: "Delivered",
      value: parcels.filter((p) => p.deliveryStatus === "parcel-delivered")
        .length,
      icon: FaCheckCircle,
      textColor: "text-success",
      iconBg: "bg-success/10",
    },
    {
      title: "Total Payments",
      value: payments.length,
      icon: FaMoneyBillWave,
      textColor: "text-info",
      iconBg: "bg-info/10",
      link: "/dashboard/payment-history",
    },
  ];

  const recentParcels = parcels.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-base-content/70">
          Here's an overview of your parcels and deliveries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const content = (
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
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

          return stat.link ? (
            <Link key={index} to={stat.link}>
              {content}
            </Link>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/send-parcel" className="btn btn-secondary text-primary-content">
              <FaPlus className="w-5 h-5" />
              Send New Parcel
            </Link>
            <Link to="/dashboard/my-parcels" className="btn btn-outline btn-secondary text-primary">
              <FaEye className="w-5 h-5" />
              View All Parcels
            </Link>
            <Link
              to="/dashboard/payment-history"
              className="btn btn-outline btn-secondary"
            >
              <FaMoneyBillWave className="w-5 h-5" />
              Payment History
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Parcels */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl">Recent Parcels</h2>
            <Link
              to="/dashboard/my-parcels"
              className="btn btn-sm btn-ghost"
            >
              View All
            </Link>
          </div>
          {recentParcels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Parcel Name</th>
                    <th>Status</th>
                    <th>Tracking ID</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentParcels.map((parcel) => (
                    <tr key={parcel._id}>
                      <td className="font-semibold">{parcel.parcelName}</td>
                      <td>
                        <span
                          className={`badge ${
                            parcel.deliveryStatus === "parcel-delivered"
                              ? "badge-success"
                              : parcel.deliveryStatus === "pending-pickup"
                              ? "badge-warning"
                              : "badge-info"
                          }`}
                        >
                          {parcel.deliveryStatus}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/parcel-track/${parcel.trackingId}`}
                          className="link link-primary"
                        >
                          {parcel.trackingId}
                        </Link>
                      </td>
                      <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link
                          to={`/parcel-track/${parcel.trackingId}`}
                          className="btn btn-sm btn-ghost"
                        >
                          <FaEye />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaBox className="text-5xl text-base-content/20 mx-auto mb-4" />
              <p className="text-base-content/70 mb-4">No parcels yet</p>
              <Link to="/send-parcel" className="btn btn-secondary text-primary-content">
                <FaPlus className="w-5 h-5" />
                Send Your First Parcel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
