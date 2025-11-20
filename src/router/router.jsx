import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Services from "../pages/Services";
import AboutUs from "../pages/AboutUs";
import Pricing from "../pages/Pricing";
import BeRider from "../pages/BeRider";
import Coverage from "../pages/Coverage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Services />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/be-a-rider",
        element: <BeRider />,
      },
    ],
  },
]);
export default router;
