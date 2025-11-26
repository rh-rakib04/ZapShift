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
]);

export default router;
