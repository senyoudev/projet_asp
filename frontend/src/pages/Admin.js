import React from "react";
import { useLocation } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes.js";

import sidebarImage from "../assets/img/sidebar-2.jpg";
import Dashboard from "../pages/admin/Dashboard";
import Clients from "./admin/Users";
import Cars from "./admin/Cars";
import Profile from "./admin/Profile";
import Offers from "./admin/Offers";
import CarDetails from "./admin/CarDetails";
import OfferDetails from "./admin/OfferDetails";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return <Dashboard />;
        break;
      case "/admin/users":
        return <Clients />;
        break;
      case "/admin/cars":
        return <Cars/>;
        break;
      case "/admin/offers":
        return <Offers />;
        break;
      case "/admin/profile":
        return <Profile />;
        break;
      case "/admin/carDetails":
        return <CarDetails  type="admin" />;
        break;
      case "/admin/offerDetails":
        return <OfferDetails/>;
        break;
      default:
        return <Dashboard/>;
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
    <div id="admin">
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">{getRoutes(routes)}</div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
