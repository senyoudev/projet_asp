import {
  faCar,
  faClock,
  faEarth,
  faPhone,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/header.css";
import navLinks from "../../assets/Data/navLinks";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../Navbars/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { logout } = useAuth("");
  const [userInfo, setUserInfo] = useState(null);
  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
<<<<<<< HEAD
    if( localStorage.getItem('userInfo')) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
    }
  
  },[localStorage.getItem('userInfo')])

=======
    const userInfo = localStorage.getItem("userInfo")
      ? setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
      : null;
  }, [localStorage.getItem("userInfo")]);
>>>>>>> origin/main

  const UserMenu = (
    <Image
      src={userInfo?.photo || process.env.REACT_APP_USER_IMAGE}
      alt="UserName profile image"
      roundedCircle={true}
      style={{ width: "30px", height: "30px", border: "1px solid #3b8ac3" }}
    />
  );

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
<<<<<<< HEAD
                {
                  userInfo ? (
                  
                    <NavDropdown title={UserMenu} id='username'>
                            {userInfo.role == 'locataire' && (
                                <LinkContainer to='/profile'>
                                  <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                            )}

                             {userInfo.role == 'proprietaire' && (
                                <LinkContainer to='/owner'>
                                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                            )}

                             {userInfo.role == 'Administrator' && (
                                <LinkContainer to='/admin'>
                                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                            )}
                               
                             
                                <LinkContainer to='/settings'>
                                  <NavDropdown.Item>Settings</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                  Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ): (
                              <>
                          <Link to="/login" className=" d-flex align-items-center gap-1">
                        <i class="ri-login-circle-line"></i> Login
                      </Link>


                      <Link
                        to="/register"
                        className=" d-flex align-items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faUser} /> Register
                      </Link>
                    </>
                        )
                }
=======
                {userInfo ? (
                  <NavDropdown title={UserMenu} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                      <NavDropdown.Item>Settings</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className=" d-flex align-items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faSignIn} /> Login
                    </Link>

                    <Link
                      to="/register"
                      className=" d-flex align-items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faUser} /> Register
                    </Link>
                  </>
                )}
>>>>>>> origin/main
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <Navbar navLinks={navLinks} />
    </header>
  );
};

export default Header;
