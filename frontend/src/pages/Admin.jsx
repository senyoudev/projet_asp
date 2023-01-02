import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import dashboardRoutes from "../dashboardRoutes";

import sidebarImage from "../assets/img/sidebar-2.jpg";
import Dashboard from "./admin/Dashboard";
import Clients from "./admin/Users";
import Cars from "./admin/Cars";
import Profile from "./admin/Profile";
import Offers from "./admin/Offers";
import CarDetails from "./admin/CarDetails";
import OfferDetails from "./admin/OfferDetails";
import "../assets/css/admin.css";
import { useAuth } from "../Context/AuthContext";
import Reservations from "./admin/Reservations";
import Brands from "./admin/Brands";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();

  const mainPanel = React.useRef(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const getRoutes = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return <Dashboard />;
        break;
      case "/admin/users":
        return <Clients />;
        break;
      case "/admin/cars":
        return <Cars />;
        break;
      case "/admin/offers":
        return <Offers />;
        break;
      case "/admin/reservations":
        return <Reservations />;
        break;
      case "/admin/brands":
        return <Brands />;
        break;
      case "/admin/profile":
        return <Profile />;
        break;
      case "/admin/carDetails":
        return <CarDetails type="admin" />;
        break;
      case "/admin/offerDetails":
        return <OfferDetails />;
        break;
      default:
        return <Dashboard />;
        break;
    }
  };
  React.useEffect(() => {
    if (userInfo != null && userInfo.role == "Administrator") {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
      if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
      ) {
        document.documentElement.classList.toggle("nav-open");
        var element = document.getElementById("bodyClick");
        element.parentNode.removeChild(element);
      }
    } else {
      return navigate("/");
    }
  }, [location, localStorage.getItem("userInfo"), mainPanel]);
  if (userInfo != null && userInfo.role == "Administrator") {
    return (
      <div id="admin">
        <div className="wrapper">
          <Sidebar
            color={color}
            image={hasImage ? image : ""}
            routes={dashboardRoutes}
          />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="content">{getRoutes()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
