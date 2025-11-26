import React from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500">We’ll send you a reset link.</p>

        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <br />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
          />
        </div>

        <button className="btn btn-secondary w-full mt-5">
          Send Reset Link
        </button>

        <Link
          to="/login"
          className="mt-4 text-center text-primary cursor-pointer hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
