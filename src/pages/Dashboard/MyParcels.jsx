import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { ImEye } from "react-icons/im";
import { FaRegEdit, FaTrash, FaMoneyBillWave } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      "pending-pickup": { label: "Pending Pickup", class: "badge-warning" },
      "assigned-rider": { label: "Assigned", class: "badge-info" },
      "rider-arriving": { label: "Rider Arriving", class: "badge-info" },
      "parcel-pick-up": { label: "Picked Up", class: "badge-primary" },
      "parcel-delivered": { label: "Delivered", class: "badge-success" },
    };
    const statusInfo = statusMap[status] || {
      label: status,
      class: "badge-neutral",
    };
    return (
      <span className={`badge ${statusInfo.class}`}>{statusInfo.label}</span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            My Parcels
          </h1>
          <p className="text-base-content/70">
            Manage and track all your parcels ({parcels.length} total)
          </p>
        </div>
        <Link
          to="/send-parcel"
          className="btn btn-primary text-primary-content"
        >
          <FaRegEdit className="w-5 h-5" />
          Send New Parcel
        </Link>
      </div>

      {/* Parcels Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          {parcels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>No.</th>
                    <th>Parcel Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Tracking ID</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel, index) => (
                    <tr key={parcel._id}>
                      <th>{index + 1}</th>
                      <td className="font-semibold">{parcel.parcelName}</td>
                      <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                      <td>{getStatusBadge(parcel.deliveryStatus)}</td>
                      <td>
                        <Link
                          to={`/parcel-track/${parcel.trackingId}`}
                          className="link link-primary font-mono"
                        >
                          {parcel.trackingId}
                        </Link>
                      </td>
                      <td>{parcel.parcelWeight} kg</td>
                      <td className="font-semibold">৳{parcel.cost}</td>
                      <td>
                        {parcel.paymentStatus === "paid" ? (
                          <span className="badge badge-success">Paid</span>
                        ) : (
                          <Link
                            to={`/dashboard/payment/${parcel._id}`}
                            className="btn btn-sm btn-secondary text-primary-content"
                          >
                            <FaMoneyBillWave />
                            Pay
                          </Link>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            to={`/parcel-track/${parcel.trackingId}`}
                            className="btn btn-sm btn-ghost"
                            title="View Details"
                          >
                            <ImEye />
                          </Link>
                          <button
                            onClick={() => handleDelete(parcel._id)}
                            className="btn btn-sm btn-error btn-ghost"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-2">No Parcels Yet</h3>
              <p className="text-base-content/70 mb-6">
                Start by sending your first parcel
              </p>
              <Link
                to="/send-parcel"
                className="btn btn-secondary text-primary-content"
              >
                Send Your First Parcel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
