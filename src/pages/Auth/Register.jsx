import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, signInGoogle, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form function
  const handelSignIn = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const Img_Api_Url = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_img_api_key
        }`;
        axios.post(Img_Api_Url, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user in mongodb
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User created in database");
            }
          });

          //update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then((result) => {
              //create user in mongodb
              const userInfo = {
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
              };
              axiosSecure.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  console.log("User created in database");
                }
                navigate(location?.state || "/");
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // google signIn
  const handelGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500">Register with ZapShift</p>
        <form onSubmit={handleSubmit(handelSignIn)}>
          {/* User Image Upload */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <br />
            <input
              type="file"
              {...register("photo", { required: true })}
              placeholder="Photo Url"
              className="file-input"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo must be required</p>
            )}
          </div>

          {/* Name */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">UserName</span>
            </label>
            <br />
            <input
              type="text"
              {...register("name", { required: true, minLength: 5 })}
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">UserName must be required</p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-500">
                UserName must be at least 5 character
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <br />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email must be required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <br />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password must be required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 character
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-secondary w-full mt-5">
            Register
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="divider">Or</div>

        <button onClick={handelGoogleSignIn} className="btn w-full bg-base-200">
          <FcGoogle size={22} /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
