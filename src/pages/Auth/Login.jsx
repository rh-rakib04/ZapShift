import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { signIn, signInGoogle } = useAuth();
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
  const handelLogin = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // google signIn
  const handelGoogleSignIn = () => {
    signInGoogle()
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
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Login with ZapShift</p>

        <form onSubmit={handleSubmit(handelLogin)}>
          {/* Email */}
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <br />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, minLength: 5 })}
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
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password must be required</p>
            )}
          </div>

          <Link
            to="/forgotPassword"
            className="text-sm mt-1 cursor-pointer text-primary hover:underline"
          >
            Forgot Password?
          </Link>

          <button type="submit" className="btn btn-secondary w-full mt-5">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="divider">Or</div>

        <button onClick={handelGoogleSignIn} className="btn w-full bg-base-200">
          <FcGoogle size={22} /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
