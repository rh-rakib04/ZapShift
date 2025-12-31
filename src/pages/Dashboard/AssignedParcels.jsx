import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AssignedParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "assigned-rider"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=assigned-rider`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "Status updated successfully",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      "assigned-rider": { label: "Assigned", class: "badge-info" },
      "rider-arriving": { label: "Arriving", class: "badge-primary" },
      "parcel-pick-up": { label: "Picked Up", class: "badge-warning" },
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
            Assigned Parcels
          </h1>
          <p className="text-base-content/70">
            Manage your assigned delivery tasks ({parcels.length} assigned)
          </p>
        </div>
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
                    <th>Pickup Location</th>
                    <th>Delivery Location</th>
                    <th>Status</th>
                    <th>Tracking ID</th>
                    <th>Actions</th>
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
                      <td>{getStatusBadge(parcel.deliveryStatus)}</td>
                      <td className="font-mono">{parcel.trackingId}</td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          {parcel.deliveryStatus === "assigned-rider" && (
                            <>
                              <button
                                onClick={() =>
                                  handleDeliveryStatusUpdate(
                                    parcel,
                                    "rider-arriving"
                                  )
                                }
                                className="btn btn-sm btn-success"
                              >
                                <FaCheckCircle />
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleDeliveryStatusUpdate(parcel, "rejected")
                                }
                                className="btn btn-sm btn-error"
                              >
                                <FaTimesCircle />
                                Reject
                              </button>
                            </>
                          )}
                          {parcel.deliveryStatus === "rider-arriving" && (
                            <button
                              onClick={() =>
                                handleDeliveryStatusUpdate(
                                  parcel,
                                  "parcel-pick-up"
                                )
                              }
                              className="btn btn-sm btn-warning"
                            >
                              <FaBox />
                              Mark Picked Up
                            </button>
                          )}
                          {parcel.deliveryStatus === "parcel-pick-up" && (
                            <button
                              onClick={() =>
                                handleDeliveryStatusUpdate(
                                  parcel,
                                  "parcel-delivered"
                                )
                              }
                              className="btn btn-sm btn-success"
                            >
                              <FaTruck />
                              Mark Delivered
                            </button>
                          )}
                          {parcel.deliveryStatus === "parcel-delivered" && (
                            <span className="badge badge-success badge-lg">
                              Completed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaBox className="text-6xl text-base-content/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Assigned Parcels</h3>
              <p className="text-base-content/70">
                You don't have any assigned parcels at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedParcels;
