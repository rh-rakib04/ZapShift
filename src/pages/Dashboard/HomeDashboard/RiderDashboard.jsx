import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaEye,
} from "react-icons/fa";

const RiderDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: assignedParcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "assigned-rider"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=assigned-rider`
      );
      return res.data;
    },
  });

  const { data: completedParcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "completed"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      return res.data;
    },
  });

  const calculateTotalEarnings = () => {
    return completedParcels.reduce((total, parcel) => {
      const payout =
        parcel.senderDistrict === parcel.receiverDistrict
          ? parcel.cost * 0.8
          : parcel.cost * 0.6;
      return total + payout;
    }, 0);
  };

  const stats = [
    {
      title: "Assigned Parcels",
      value: assignedParcels.length,
      icon: FaTasks,
      textColor: "text-info",
      iconBg: "bg-info/10",
      link: "/dashboard/assigned-parcels",
    },
    {
      title: "Completed Deliveries",
      value: completedParcels.length,
      icon: FaCheckCircle,
      textColor: "text-success",
      iconBg: "bg-success/10",
      link: "/dashboard/completed-deliveries",
    },
    {
      title: "Total Earnings",
      value: `৳${calculateTotalEarnings().toFixed(2)}`,
      icon: FaMoneyBillWave,
      textColor: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      title: "Pending Tasks",
      value: assignedParcels.filter(
        (p) => p.deliveryStatus === "assigned-rider"
      ).length,
      icon: FaClock,
      textColor: "text-warning",
      iconBg: "bg-warning/10",
    },
  ];

  const recentAssigned = assignedParcels.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Rider Dashboard
        </h1>
        <p className="text-base-content/70">
          Manage your assigned parcels and track your deliveries
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
            <Link
              to="/dashboard/assigned-parcels"
              className="btn btn-primary text-primary-content"
            >
              <FaTasks className="w-5 h-5" />
              View Assigned Parcels
            </Link>
            <Link
              to="/dashboard/completed-deliveries"
              className="btn btn-outline btn-success"
            >
              <FaCheckCircle className="w-5 h-5" />
              Completed Deliveries
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Assigned Parcels */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl">Recent Assigned Parcels</h2>
            <Link
              to="/dashboard/assigned-parcels"
              className="btn btn-sm btn-ghost"
            >
              View All
            </Link>
          </div>
          {recentAssigned.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Parcel Name</th>
                    <th>Pickup Location</th>
                    <th>Status</th>
                    <th>Tracking ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssigned.map((parcel) => (
                    <tr key={parcel._id}>
                      <td className="font-semibold">{parcel.parcelName}</td>
                      <td>{parcel.senderDistrict}</td>
                      <td>
                        <span className="badge badge-info">
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
                      <td>
                        <Link
                          to="/dashboard/assigned-parcels"
                          className="btn btn-sm btn-primary text-primary-content"
                        >
                          <FaEye />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaTasks className="text-5xl text-base-content/20 mx-auto mb-4" />
              <p className="text-base-content/70">No assigned parcels yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
