/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  faCar,
  faDashboard,
  faSackDollar,
  faShop,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: faDashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: faUsers,
    layout: "/admin",
  },
  {
    path: "/cars",
    name: "Cars",
    icon: faCar,
    layout: "/admin",
  },
  {
    path: "/offers",
    name: "Offers",
    icon: faShop,
    layout: "/admin",
  },
];
export const dashboardOwnerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: faDashboard,
    layout: "/owner",
  },
  {
    path: "/cars",
    name: "Cars",
    icon: faCar,
    layout: "/owner",
  },
  {
    path: "/offers",
    name: "Offers",
    icon: faShop,
    layout: "/owner",
  },
  {
    path: "/reservations",
    name: "Reservations",
    icon: faSackDollar,
    layout: "/owner",
  },
];

export default dashboardRoutes;
