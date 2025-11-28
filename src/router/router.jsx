import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Services from "../pages/Services";
import AboutUs from "../pages/AboutUs";
import Pricing from "../pages/Pricing";
import BeRider from "../pages/BeRider";
import Coverage from "../pages/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Services />,
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeRider />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels />,
      },
    ],
  },
]);

export default router;
