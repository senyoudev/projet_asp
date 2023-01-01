import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";


import sidebarImage from "../assets/img/sidebar-2.jpg";
import Dashboard from "./owner/Dashboard";
import Cars from "./owner/Cars";
import Offers from "./owner/Offers";
import Reservations from "./owner/Reservations";
import CarDetails from "./admin/CarDetails";
import OfferDetails from "./admin/OfferDetails";
import "../assets/css/admin.css";
import { dashboardOwnerRoutes } from "../dashboardRoutes";
function AdminOwner() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

   const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userInfo'))

  const getRoutes = () => {
    switch (location.pathname) {
      case "/owner/dashboard":
        return <Dashboard />;
        break;
      case "/owner/cars":
        return <Cars />;
        break;
      case "/owner/offers":
        return <Offers />;
        break;
      case "/owner/reservations":
        return <Reservations />;
        break;
      case "/owner/carDetails":
        return <CarDetails />;
        break;
      case "/owner/offerDetails":
        return <OfferDetails type="owner" />;
        break;
      default:
        return <Dashboard />;
        break;
    }
  };
  React.useEffect(() => {
    if(userInfo != null) {
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
    return navigate('/login')
  }
  }, [location,localStorage.getItem('userInfo'),mainPanel]);
   if(userInfo != null) {
  return (
    <div id="owner">
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={dashboardOwnerRoutes}
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

export default AdminOwner;
