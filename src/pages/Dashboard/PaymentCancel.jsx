import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className=" shadow-xl rounded-2xl p-10 max-w-lg text-center">
        
        {/* Cancel icon */}
        <div className="flex justify-center mb-6">
          <XCircle className="text-red-600" size={80} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed.  
          You can try again or return to home.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/send-parcel" className="btn btn-secondary w-full">
            Try Payment Again
          </Link>

          <Link to="/" className="btn btn-outline w-full">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
