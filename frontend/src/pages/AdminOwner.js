import React from "react";
import { useLocation } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";

import routes, { dashboardOwnerRoutes } from "../routes.js";

import sidebarImage from "../assets/img/sidebar-2.jpg";
import Dashboard from "./owner/Dashboard";
import Cars from "./owner/Cars";
import Offers from "./owner/Offers";
import Reservations from "./owner/Reservations";
import CarDetails from "./admin/CarDetails";
import OfferDetails from "./admin/OfferDetails";

function AdminOwner() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
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
        return null;
        break;
    }
  };
  React.useEffect(() => {
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
  }, [location]);
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
          <div className="content">{getRoutes(routes)}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminOwner;
