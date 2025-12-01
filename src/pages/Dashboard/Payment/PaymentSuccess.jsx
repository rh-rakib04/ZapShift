import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({
    transactionId: "",
    trackingId: "",
    amount: "",
  });

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
            amount: res.data.amount,
          });
        })
        .catch((err) => {
          console.error("Payment success fetch failed:", err);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">
        
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-600" size={80} />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been received and your parcel is confirmed.
        </p>

        <div className="bg-gray-100 p-5 rounded-xl mb-8 text-left">
          <p className="font-semibold text-gray-700 mb-1">
            Transaction Details
          </p>
          <hr className="mb-3" />

          <p className="text-sm">
            <span className="font-semibold">Tracking ID:</span>{" "}
            {paymentInfo.trackingId || "Loading..."}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {paymentInfo.transactionId || "Loading..."}
          </p>

          <p className="text-sm mt-1">
            <span className="font-semibold">Amount Paid:</span>{" "}
            {paymentInfo.amount ? `৳${paymentInfo.amount}` : "Loading..."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/track" className="btn btn-secondary w-full">
            Track Parcel
          </Link>

          <Link to="/" className="btn btn-outline w-full">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
