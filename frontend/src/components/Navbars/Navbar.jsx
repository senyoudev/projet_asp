import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";

function Navbar({ navLinks }) {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  return (
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
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
