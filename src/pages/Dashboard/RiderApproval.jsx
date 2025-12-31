import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaBiking, FaCheckCircle, FaTimesCircle, FaUser } from "react-icons/fa";

const RiderApproval = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure
      .patch(`/riders/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: `Rider ${status} successfully`,
          });
        }
      })
      .catch((error) => {
        console.error(`Error updating rider status to ${status}:`, error);
      });
  };

  const handleApprove = (rider) => {
    updateStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    updateStatus(rider, "rejected");
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "Pending", class: "badge-warning" },
      approved: { label: "Approved", class: "badge-success" },
      rejected: { label: "Rejected", class: "badge-error" },
    };
    const statusInfo = statusMap[status] || {
      label: status,
      class: "badge-neutral",
    };
    return (
      <span className={`badge ${statusInfo.class}`}>{statusInfo.label}</span>
    );
  };

  const pendingRiders = riders.filter((r) => r.status === "pending");
  const approvedRiders = riders.filter((r) => r.status === "approved");
  const rejectedRiders = riders.filter((r) => r.status === "rejected");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Rider Approval
          </h1>
          <p className="text-base-content/70">
            Review and manage rider applications ({riders.length} total)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-warning text-warning-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Pending</p>
                <p className="text-3xl font-bold">{pendingRiders.length}</p>
              </div>
              <FaBiking className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-success text-success-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Approved</p>
                <p className="text-3xl font-bold">{approvedRiders.length}</p>
              </div>
              <FaCheckCircle className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-error text-error-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Rejected</p>
                <p className="text-3xl font-bold">{rejectedRiders.length}</p>
              </div>
              <FaTimesCircle className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Riders Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          {riders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>No.</th>
                    <th>Rider Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>District</th>
                    <th>NID</th>
                    <th>Status</th>
                    <th>Work Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, index) => (
                    <tr key={rider._id}>
                      <th>{index + 1}</th>
                      <td className="font-semibold flex items-center gap-2">
                        <FaUser className="text-primary" />
                        {rider.riderName}
                      </td>
                      <td>{rider.riderEmail}</td>
                      <td>{rider.riderAge}</td>
                      <td>{rider.riderDistrict}</td>
                      <td className="font-mono">{rider.riderNID}</td>
                      <td>{getStatusBadge(rider.status)}</td>
                      <td>
                        <span className="badge badge-info">
                          {rider.workStatus || "N/A"}
                        </span>
                      </td>
                      <td>
                        {rider.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(rider)}
                              className="btn btn-sm btn-success"
                            >
                              <FaCheckCircle />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(rider)}
                              className="btn btn-sm btn-error"
                            >
                              <FaTimesCircle />
                              Reject
                            </button>
                          </div>
                        )}
                        {rider.status !== "pending" && (
                          <span className="text-sm text-base-content/50">
                            {rider.status === "approved" ? "Approved" : "Rejected"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaBiking className="text-6xl text-base-content/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Rider Applications</h3>
              <p className="text-base-content/70">
                There are no rider applications to review
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderApproval;
