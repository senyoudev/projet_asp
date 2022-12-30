import { Container, Image, Nav, Navbar } from "react-bootstrap";
import theme from "../../constants/theme";
function CustomNavbar() {
  return (
    <Navbar
      style={{
        backgroundColor: theme.dark,
        color: theme.light,
        padding: "unset",
        height: "55px",
      }}
      expand="sm"
    >
      <Container fluid style={{ padding: "unset" }}>
        <Navbar.Brand href="/" style={{ padding: "unset" }}>
          <img src={require("../../assets/img/company.png")} class="logo" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/Signup">SERVICES</Nav.Link>
          <Nav.Link href="/Login">CARS</Nav.Link>
          <Nav.Link href="/Login">ABOUT US</Nav.Link>
          <Nav.Link href="/Login">CONTACT</Nav.Link>
          <Nav.Link href="/Login" style={{ backgroundColor: theme.red }}>
            GET STARTED
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
