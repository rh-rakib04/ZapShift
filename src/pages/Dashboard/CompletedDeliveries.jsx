import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "assigned-rider"],
    enabled: !!user?.email, // IMPORTANT
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      console.log("Fetched parcels:", res.data);
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
  return (
    <div className="p-5">
      <h1>Completed Task : {parcels.length}</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SL</th>
            <th className="border border-gray-300 px-4 py-2">Parcel Name</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Cost</th>
            <th className="border border-gray-300 px-4 py-2">Payment</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, i) => (
            <tr key={parcel._id}>
              <td>{i + 1}</td>
              <td>{parcel.parcelName}</td>
              <td>{parcel.receiverDistrict}</td>
              <td>{parcel.cost}</td>
              <td>{calculatePayout(parcel)}</td>
              <td>{parcel.deliveryStatus}</td>
              <td>
                <button className="btn btn-secondary">CashOut</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedDeliveries;
