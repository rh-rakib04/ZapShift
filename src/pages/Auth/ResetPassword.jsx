import React from "react";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500">Enter your new password.</p>

        {/* New Password */}
        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered"
          />
        </div>

        {/* Confirm Password */}
        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered"
          />
        </div>

        <button className="btn btn-secondary w-full mt-5">
          Reset Password
        </button>

        <p className="mt-4 text-center text-primary cursor-pointer hover:underline">
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
