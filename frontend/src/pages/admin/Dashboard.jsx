import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarAlt,
  faCar,
  faChartArea,
  faClock,
  faRedo,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useCar } from "../../Context/CarContext";

import { useEffect,useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Rentals",
      data: [100, 14, 77, 13, 21, 55, 11],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function Dashboard() {

   const navigate = useNavigate('')
  const { getCarsCount} = useCar('')
  const {getUserCount } = useAuth('')
  const [carNumber,setCarNumber] = useState('')
  const [ownerNumber,setOwnerNumber] = useState('')
  const [clientNumber,setClientNumber] = useState('')
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

  const fetchCount = async () => {
      const carCount = await getCarsCount()
      const ownerCount = await getUserCount("proprietaire")
      const clientCount = await getUserCount("locataire")
      setCarNumber(carCount)
      setOwnerNumber(ownerCount)
      setClientNumber(clientCount)
    }

  useEffect(()=> {
     
    if(userInfo != null) {
      fetchCount()
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
    } else {
      return navigate('/login')
    }
  },[localStorage.getItem('userInfo')])



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
                        icon={faChartBar}
                        className="text-warning"
                      />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tenants</p>
                       {clientNumber && <Card.Title as="h4">{clientNumber}</Card.Title>} 
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
                      <p className="card-category">Owners</p>
                     {ownerNumber && <Card.Title as="h4">{ownerNumber}</Card.Title>} 
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
                      {carNumber && <Card.Title as="h4">{carNumber}</Card.Title>}
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
                      <p className="card-category">Rentals</p>
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
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
                <p className="card-category">Number of Reantals</p>
              </Card.Header>
              <Card.Body>
                <Line options={options} data={data} />
              </Card.Body>
              <Card.Footer>
                <div className="stats">
                  <FontAwesomeIcon icon={faClock} className="me-1" />
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
                <p className="card-category">Number of users</p>
              </Card.Header>
              <Card.Body>
                <Line options={options} data={data} />
              </Card.Body>
              <Card.Footer>
                <div className="stats">
                  <FontAwesomeIcon icon={faClock} className="me-1" />
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
  
}

export default Dashboard;
