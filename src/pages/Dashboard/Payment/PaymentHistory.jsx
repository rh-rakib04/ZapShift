import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaCalendarAlt,
  FaReceipt,
} from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Payment History
          </h1>
          <p className="text-base-content/70">
            View all your payment transactions ({payments.length} payments)
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Payments</p>
                <p className="text-3xl font-bold">{payments.length}</p>
              </div>
              <FaReceipt className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-success text-success-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Amount Paid</p>
                <p className="text-3xl font-bold">৳{totalPaid.toFixed(2)}</p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-info text-info-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Average Payment</p>
                <p className="text-3xl font-bold">
                  ৳
                  {payments.length > 0
                    ? (totalPaid / payments.length).toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <FaCheckCircle className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>No.</th>
                    <th>Parcel Name</th>
                    <th>Amount</th>
                    <th>Parcel ID</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment._id}>
                      <th>{index + 1}</th>
                      <td className="font-semibold">{payment.parcelName}</td>
                      <td className="font-bold text-success">
                        ৳{payment.amount}
                      </td>
                      <td className="font-mono text-sm">
                        {payment.parcelId?.slice(0, 8)}...
                      </td>
                      <td className="font-mono text-sm">
                        {payment.transactionId || "N/A"}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-primary" />
                          {new Date(payment.paidAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">
                          <FaCheckCircle />
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaMoneyBillWave className="text-6xl text-base-content/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Payment History</h3>
              <p className="text-base-content/70">
                You haven't made any payments yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
