import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { FaUserAlt, FaUserSlash } from "react-icons/fa";
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
        console.log(res.data);
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
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} is an User Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold p-5">
        User Management Page - Total Users: {users.length}
      </h1>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        placeholder="Search User"
        className="input input-bordered mb-4 w-full max-w-xs"
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Role Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-400"
                    >
                      <FaUserSlash />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-primary"
                    >
                      <RiShieldUserLine />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
