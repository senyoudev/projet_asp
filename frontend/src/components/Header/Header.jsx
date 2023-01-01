import {
  faCar,
  faClock,
  faEarth,
  faPhone,
  faSign,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/header.css";

const navLinks = [
  {
    path: "#",
    display: "Home",
  },
  {
    path: "#about",
    display: "About",
  },
  {
    path: "#cars",
    display: "Cars",
  },
  {
    path: "#contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);


  

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <FontAwesomeIcon icon={faPhone} /> +1-202-555-0149
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/login" className=" d-flex align-items-center gap-1">
<<<<<<< HEAD
                  <i class="ri-login-circle-line"></i> Login
                </Link>

                <Link to="/register" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
=======
                  <FontAwesomeIcon icon={faSignIn} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className=" d-flex align-items-center gap-1"
                >
                  <FontAwesomeIcon icon={faUser} /> Register
>>>>>>> origin/main
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/" className=" d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faCar} />
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <FontAwesomeIcon icon={faEarth} />
                </span>
                <div className="header__location-content">
                  <h4>Bangladesh</h4>
                  <h6>Sylhet City, Bangladesh</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <a to="#contact" style={{color: "#fff"}}>
                <FontAwesomeIcon icon={faPhone} />
                  <i class="ri-phone-line"></i> Request a call
                </a>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <a
                    href={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </a>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
