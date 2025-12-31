import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { FaMoneyBillWave, FaBox, FaCheckCircle } from "react-icons/fa";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel = [] } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Payment
        </h1>
        <p className="text-base-content/70">
          Complete payment for your parcel delivery
        </p>
      </div>

      {/* Payment Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <FaBox className="text-4xl text-primary" />
            </div>
            <div>
              <h2 className="card-title text-2xl">{parcel.parcelName}</h2>
              <p className="text-sm text-base-content/70">
                Tracking ID: {parcel.trackingId}
              </p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Parcel Weight:</span>
              <span className="font-semibold">{parcel.parcelWeight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Delivery Type:</span>
              <span className="font-semibold">
                {parcel.deliveryType || "Standard"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Pickup Location:</span>
              <span className="font-semibold">{parcel.senderDistrict}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Delivery Location:</span>
              <span className="font-semibold">{parcel.receiverDistrict}</span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center text-2xl font-bold text-primary">
              <span>Total Amount:</span>
              <span>৳{parcel.cost}</span>
            </div>
          </div>

          <div className="card-actions mt-6">
            <button onClick={handlePayment} className="btn btn-primary btn-lg w-full text-primary-content">
              <FaMoneyBillWave />
              Pay ৳{parcel.cost}
            </button>
            <Link
              to="/dashboard/my-parcels"
              className="btn btn-outline btn-lg w-full"
            >
              Cancel
            </Link>
          </div>

          <div className="alert alert-info mt-4">
            <FaCheckCircle />
            <span className="text-sm">
              Secure payment processing. Your payment is protected.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
