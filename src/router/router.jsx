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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import RiderApproval from "../pages/Dashboard/RiderApproval";
import UserManagement from "../pages/Dashboard/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders";
import AssignedParcels from "../pages/Dashboard/AssignedParcels";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack";
import DashboardHome from "../pages/Dashboard/HomeDashboard/DashboardHome";

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
        path: "parcel-track/:trackingId",
        element: <ParcelTrack />,
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
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
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
        path:'dashboard-home',
        element: <DashboardHome />,
      },
      {
        path: "my-parcels",
        element: <MyParcels />,
      },
      {
        path: "rider-approval",
        element: (
          <AdminRoute>
            <RiderApproval />
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },
      // Rider Routes
      {
        path: "assigned-parcels",
        element: (
          <RiderRoute>
            <AssignedParcels />
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },
      // Admin Routes
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
