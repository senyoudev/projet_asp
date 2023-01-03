import {
  faCalendarAlt,
  faCar,
  faChartArea,
  faClock,
  faMoneyBill,
  faRedo,
  faShop,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
// react-bootstrap components
import { Card, Container, Row, Col, Table } from 'react-bootstrap';

import { useCar } from '../../Context/CarContext';
import { useOffre } from '../../Context/OffreContext';
import { useReservation } from '../../Context/ReservationContext';

function Dashboard() {
  const { getOwnerCarsNumber } = useCar();
  const { getOwnerReservations } = useReservation();
  const { getOffres } = useOffre();

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [offerCount, setOfferCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [lastOffers, setLastOffers] = useState([]);
  const [lastReservations, setLastReservations] = useState([]);
  const [revenu, setRevenu] = useState(0);

  const fetchData = async () => {
    const data = await getOwnerCarsNumber(userInfo.id);
    setCarCount(data);

    const offers = await getOffres();
    setOfferCount(offers.value.length);
    setLastOffers(offers.value.splice(0, 3));

    const reservations = await getOwnerReservations(userInfo.id);
    let sum = 0;
    reservations.value.forEach(item => {
      sum +=
        item.prix *
        (moment(item.dateRemise).format('DD') -
          moment(item.datePriseEnCharge).format('DD'));
    });
    setRevenu(sum);
    setReservationCount(reservations.value.length);
    setLastReservations(reservations.value.splice(0, 3));
  };
  useEffect(() => {
    if (userInfo != null && userInfo.role == 'proprietaire') {
      fetchData();
    }
  }, [localStorage.getItem('userInfo')]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className='text-warning'
                      />
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>Total Revenu</p>
                      <Card.Title as='h4'>{revenu}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <FontAwesomeIcon icon={faShop} className='text-info' />
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>Offers</p>
                      <Card.Title as='h4'>{offerCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <FontAwesomeIcon icon={faCar} className='text-danger' />
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>Cars</p>
                      <Card.Title as='h4'>{carCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <FontAwesomeIcon
                        icon={faChartArea}
                        className='text-secondary'
                      />
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>Reservations</p>
                      <Card.Title as='h4'>{reservationCount}</Card.Title>
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
          <Col md='6'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>Last Reservations</Card.Title>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
                <Table className='table-hover table-striped'>
                  <thead>
                    <tr>
                      <th className='border-0'>ID</th>
                      <th className='border-0'>Voiture</th>
                      <th className='border-0'>Prix</th>
                      <th className='border-0'>Tenant</th>
                      <th className='border-0'>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastReservations?.map((item, ind) => {
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.voiture.name}</td>
                          <td>{item.prix}</td>
                          <td>
                            {item?.voiture?.locataire?.username ||
                              item?.user?.username}
                          </td>
                          <td>
                            {moment(item.dateRemise).format('DD-MM-YYYY')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md='6'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>Last offers</Card.Title>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
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
