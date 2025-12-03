import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?workStatus=available&district=${selectedParcel?.senderDistrict}&status=approved`
      );
      return res.data;
    },
  });
  const assignRiderModalOpen = (parcel) => {
    setSelectedParcel(parcel);
    console.log(parcel.senderDistrict);
    riderModalRef.current.showModal();
  };
  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          parcelsRefetch();
          riderModalRef.current.close();
          Swal.fire({
            icon: "success",
            title: `Rider assigned successfully`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  return (
    <div>
      <h1>Assign Riders :{parcels.length} </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Parcel Name</th>
              <th>Date</th>
              <th>Pickup Location</th>
              <th>Delivery Status</th>
              <th>Tracking ID</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.deliveryStatus}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.parcelWeight} kg</td>
                <td>{parcel.cost}Tk</td>
                <td>
                  {" "}
                  <button
                    onClick={() => assignRiderModalOpen(parcel)}
                    className="btn btn-secondary"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders :{riders.length}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Rider Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider) => (
                  <tr key={rider._id}>
                    <td>{rider.riderName}</td>
                    <td>{rider.riderEmail}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-primary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
