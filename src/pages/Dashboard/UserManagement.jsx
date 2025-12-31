import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { FaUserAlt, FaUserSlash, FaSearch, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Make Admin
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Make User
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} is a User Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;
  const riderCount = users.filter((u) => u.role === "rider").length;

  const getRoleBadge = (role) => {
    const roleMap = {
      admin: { label: "Admin", class: "badge-error" },
      user: { label: "User", class: "badge-primary" },
      rider: { label: "Rider", class: "badge-success" },
    };
    const roleInfo = roleMap[role] || {
      label: role,
      class: "badge-neutral",
    };
    return <span className={`badge ${roleInfo.class}`}>{roleInfo.label}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            User Management
          </h1>
          <p className="text-base-content/70">
            Manage user roles and permissions ({users.length} total users)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-error text-error-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Admins</p>
                <p className="text-3xl font-bold">{adminCount}</p>
              </div>
              <RiShieldUserLine className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Users</p>
                <p className="text-3xl font-bold">{userCount}</p>
              </div>
              <FaUserAlt className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-success text-success-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Riders</p>
                <p className="text-3xl font-bold">{riderCount}</p>
              </div>
              <FaUsers className="text-4xl opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="input input-bordered w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-square">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>No.</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Current Role</th>
                    <th>Role Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td className="font-semibold flex items-center gap-2">
                        <FaUserAlt className="text-primary" />
                        {user.displayName}
                      </td>
                      <td>{user.email}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td>
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleRemoveAdmin(user)}
                            className="btn btn-sm btn-error"
                            title="Remove Admin"
                          >
                            <FaUserSlash />
                            Remove Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="btn btn-sm btn-primary text-primary-content"
                            title="Make Admin"
                          >
                            <RiShieldUserLine />
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaUsers className="text-6xl text-base-content/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Users Found</h3>
              <p className="text-base-content/70">
                {searchText
                  ? "Try a different search term"
                  : "No users in the system"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
