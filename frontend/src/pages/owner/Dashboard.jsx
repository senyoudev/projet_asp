import {
  faCalendarAlt,
  faCar,
  faChartArea,
  faClock,
  faMoneyBill,
  faRedo,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
// react-bootstrap components
import { Card, Container, Row, Col, Table } from "react-bootstrap";

import { useCar } from "../../Context/CarContext";
import { useOffre } from "../../Context/OffreContext";

function Dashboard() {

  const { getOwnerCarsNumber } = useCar();
  const {getOffres} = useOffre();
  
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [carCount,setCarCount] = useState("");
  const [lastOffers,setLastOffers] = useState([]);
  const fetchData = async () => {
    const data = await getOwnerCarsNumber(userInfo.id);
    setCarCount(data);
    const offers = await getOffres();
    console.log(offers.value)
    setLastOffers(offers.value.splice(0,3))
  }
  useEffect(() => {
    if (userInfo != null && userInfo.role == "proprietaire") {
      fetchData();
    }
  }, [localStorage.getItem("userInfo")]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="text-warning"
                      />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Month Revenu</p>
                      <Card.Title as="h4">4000 DH</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon icon={faUsers} className="text-info" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Rentals</p>
                      <Card.Title as="h4">10</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon icon={faCar} className="text-danger" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Cars</p>
                      <Card.Title as="h4">{carCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon
                        icon={faChartArea}
                        className="text-secondary"
                      />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Weekly rentals</p>
                      <Card.Title as="h4">20</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Last Reservations</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Voiture</th>
                      <th className="border-0">Reservation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Last offers</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>Discount Rate</th>
                    <th className='border-0'>Added Date</th>
                    <th className='border-0'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lastOffers?.map(offre => (
                    <tr key={offre.id}>
                      <td>{offre.id}</td>

                      <td>{offre.tauxRemise}</td>
                      <td>{moment(offre.dateAdded).format('DD-MM-YYYY')}</td>
                      <td>
                        {offre.isAprouved ? 'Approuved' : 'Not Approuved'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
