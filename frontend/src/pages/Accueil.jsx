import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Accueil() {
  return (
    <>
      <Navbar style={{ backgroundColor: "#343434" }} variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <FontAwesomeIcon icon={faHome} />
          </Navbar.Brand>
          <Nav className="ms-auto" style={{ fontWeight: 600 }}>
            <Nav.Link href="/Signup" style={{ color: "#fff" }}>
              S'inscrire
            </Nav.Link>
            <Nav.Link href="/Login" style={{ color: "#fff" }}>
              Se connecter
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        <div className="background">
          <div className="header">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontWeight: "bold", fontSize: 18, marginBottom: 0 }}>
                ONLY FROM <span style={{ color: "red" }}>500DH</span> / Day
              </p>
              <h3 style={{ fontSize: 48, fontWeight: "bold" }}>
                BMW Luxury 2018
              </h3>
            </div>
            <Image
              src={require("../utils/images/slide1.png")}
              className="header-voiture"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a className="btn link">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Accueil;
