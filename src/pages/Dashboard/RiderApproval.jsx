import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
  return (
    <div className="p-5">
      <h1>Rider Approval</h1>
      <div>
        <h1 className="text-4xl font-bold ">
          RiderApproval : {riders.length}{" "}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Rider Name</th>
                <th>Rider Email</th>
                <th>Rider Age</th>
                <th>Rider District</th>
                <th>Rider NID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.riderName}</td>
                  <td>{rider.riderEmail}</td>
                  <td>{rider.riderAge}</td>
                  <td>{rider.riderDistrict}</td>
                  <td>{rider.riderNID}</td>
                  <td>
                    {rider.status === "pending" ? (
                      <span className="text-yellow-500 font-bold">Pending</span>
                    ) : rider.status === "approved" ? (
                      <span className="text-green-500 font-bold">Approved</span>
                    ) : (
                      <span className="text-red-500 font-bold">Rejected</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(rider)}
                      className="btn btn-xs btn-success mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(rider)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiderApproval;
