import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "assigned-rider"],
    enabled: !!user?.email, // IMPORTANT
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=assigned-rider`
      );
      console.log("Fetched parcels:", res.data);
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
            title: "Drag me!",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleReject = (parcel) => {};

  return (
    <div className="p-5">
      <h1>Assigned Parcels</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SL</th>
            <th className="border border-gray-300 px-4 py-2">Parcel Name</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
            <th className="border border-gray-300 px-4 py-2">Other Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, i) => (
            <tr key={parcel._id}>
              <td>{i + 1}</td>
              <td>{parcel.parcelName}</td>
              <td>{parcel.senderDistrict}</td>
              <td>{parcel.deliveryStatus}</td>
              <td>
                {parcel.deliveryStatus === "assigned-rider" ? (
                  <>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "rider-arriving")
                      }
                      className="btn btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(parcel)}
                      className="btn btn-danger"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="bg-accent text-sm p-2 rounded-2xl">
                    Accepted
                  </span>
                )}
              </td>
              <td>
                <button
                  onClick={() =>
                    handleDeliveryStatusUpdate(parcel, "parcel-pick-up")
                  }
                  className="btn btn-danger"
                >
                  Mark As Picked Up
                </button>
                <button
                  onClick={() =>
                    handleDeliveryStatusUpdate(parcel, "parcel-delivered")
                  }
                  className="btn btn-danger"
                >
                  Mark As Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedParcels;
