import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBiking, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

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
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderName: rider.riderName,
      riderEmail: rider.riderEmail,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Assign Riders
          </h1>
          <p className="text-base-content/70">
            Assign available riders to pending parcels ({parcels.length} pending)
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
                    <th>Date</th>
                    <th>Pickup Location</th>
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
                      <td className="font-semibold">{parcel.parcelName}</td>
                      <td>
                        {new Date(parcel.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary" />
                          {parcel.senderDistrict}
                        </div>
                      </td>
                      <td className="font-mono">{parcel.trackingId}</td>
                      <td>{parcel.parcelWeight} kg</td>
                      <td className="font-semibold">৳{parcel.cost}</td>
                      <td>
                        <button
                          onClick={() => assignRiderModalOpen(parcel)}
                          className="btn btn-primary btn-sm text-primary-content"
                        >
                          <FaBiking />
                          Assign Rider
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaBiking className="text-6xl text-base-content/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Pending Parcels</h3>
              <p className="text-base-content/70">
                All parcels have been assigned riders
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rider Assignment Modal */}
      <dialog ref={riderModalRef} className="modal">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-2xl mb-4">
            Available Riders ({riders.length})
          </h3>
          {selectedParcel && (
            <div className="alert alert-info mb-4">
              <FaMapMarkerAlt />
              <div>
                <h4 className="font-bold">Parcel: {selectedParcel.parcelName}</h4>
                <p className="text-sm">
                  Pickup Location: {selectedParcel.senderDistrict}
                </p>
              </div>
            </div>
          )}
          {riders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Rider Name</th>
                    <th>Email</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider) => (
                    <tr key={rider._id}>
                      <td className="font-semibold">{rider.riderName}</td>
                      <td>{rider.riderEmail}</td>
                      <td>{rider.riderDistrict}</td>
                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary btn-sm text-primary-content"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaSearch className="text-4xl text-base-content/20 mx-auto mb-4" />
              <p className="text-base-content/70">
                No available riders found for this district
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignRiders;
