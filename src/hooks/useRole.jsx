import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const re = await axiosSecure.get(`/users/${user?.email}/role`);
      return re.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
