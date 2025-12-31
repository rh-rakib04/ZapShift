import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "completed"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  const totalEarnings = parcels.reduce((sum, parcel) => {
    return sum + calculatePayout(parcel);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Completed Deliveries
          </h1>
          <p className="text-base-content/70">
            View your completed delivery tasks and earnings ({parcels.length}{" "}
            completed)
          </p>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Completed</p>
                <p className="text-3xl font-bold">{parcels.length}</p>
              </div>
              <FaCheckCircle className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-success text-success-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold">৳{totalEarnings.toFixed(2)}</p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-info text-info-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Average per Delivery</p>
                <p className="text-3xl font-bold">
                  ৳
                  {parcels.length > 0
                    ? (totalEarnings / parcels.length).toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Completed Parcels Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          {parcels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>No.</th>
                    <th>Parcel Name</th>
                    <th>Pickup</th>
                    <th>Delivery</th>
                    <th>Parcel Cost</th>
                    <th>Your Payout</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel, i) => (
                    <tr key={parcel._id}>
                      <th>{i + 1}</th>
                      <td className="font-semibold">{parcel.parcelName}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary" />
                          {parcel.senderDistrict}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-success" />
                          {parcel.receiverDistrict}
                        </div>
                      </td>
                      <td className="font-semibold">৳{parcel.cost}</td>
                      <td className="font-bold text-success">
                        ৳{calculatePayout(parcel).toFixed(2)}
                      </td>
                      <td>
                        <span className="badge badge-success">Delivered</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary text-primary-content">
                          <FaMoneyBillWave />
                          Cash Out
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaCheckCircle className="text-6xl text-base-content/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                No Completed Deliveries Yet
              </h3>
              <p className="text-base-content/70">
                Complete your assigned deliveries to see them here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
