import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faPaperPlane,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CustomNavbar from "../components/Navbars/CustomNavbar";
function Home() {
  return (
    <div id="home">
      <CustomNavbar />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="home-background">
          <div className="title">
            <h1>
              Find a <span>Car</span>
            </h1>
            <p>
              From as low as 500DH per day with limited time offer discounts
            </p>
          </div>
        </div>
        <Container>
          <div className="services">
            <Row>
              <Col sm="4" className="service">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h3>Customer Satisfaction</h3>
              </Col>
              <Col sm="4" className="service">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
                <h3>Faster Booking</h3>
              </Col>
              <Col sm="4" className="service">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faLocation} />
                </div>
                <h3>Any Pickup Location</h3>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default Home;
