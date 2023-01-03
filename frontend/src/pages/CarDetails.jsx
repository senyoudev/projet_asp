import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Container, Row, Col } from 'react-bootstrap';
import Helmet from '../components/Helmet/Helmet';
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faCheck,
  faCircleXmark,
  faCarAlt,
  faCog,
  faMapLocation,
  faRoad,
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStethoscope,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';
import { useCar } from '../Context/CarContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useOffre } from '../Context/OffreContext';

const CarDetails = () => {
  const location = useLocation();
  const { getOffreById } = useOffre(null);

  const url = location.pathname;
  const [offre, setOffre] = useState({});

  const id = url.split('/')[2];
  const offreId = new URLSearchParams(location.search).get('offre');
  const fetchOffer = async() => {
     if (offreId) {
       const data = await getOffreById(offreId);
       setOffre(data?.value);
       console.log(data)
     } 
  }

  const navigate = useNavigate('');
  const { getCar, loading, setLoading } = useCar('');
  const [car, setCar] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const fetchData = async () => {
    setLoading(true);
    const voiture = await getCar(id);
    setCar(voiture);
    setLoading(false);
  };

  useEffect(() => {
  fetchOffer();
    fetchData();
  }, [localStorage.getItem('userInfo')]);


  return (
    <Helmet title={car.name}>
      <Header />
      {!loading ? (
        <section>
          <Container>
            <Row>
              <Col lg='6'>
                <img src={car.photo} alt='' className='w-100' />
              </Col>

              <Col lg='6'>
                <div className='car__info'>
                  <h2 className='section__title'>{car.name}</h2>

                  <div className=' d-flex align-items-center gap-5 mb-4 mt-3'>
                    <h6 className='rent__price fw-bold fs-4'>
                      {car.prix}
                      {}.00 DHs/ Day {offre ? offre?.id : ''}
                    </h6>

                    <span className=' d-flex align-items-center gap-2'>
                      <span style={{ color: '#f9a826' }}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                      </span>
                      {/* ({car.rating} ratings) */}
                    </span>
                  </div>

                  <p className='section__description'>{car.desc}</p>

                  <div
                    className=' d-flex align-items-center mt-3'
                    style={{ columnGap: '4rem' }}
                  >
                    <span className=' d-flex align-items-center gap-1 section__description'>
                      <FontAwesomeIcon icon={faCarAlt} /> {car.annee}
                    </span>

                    <span className=' d-flex align-items-center gap-1 section__description'>
                      <FontAwesomeIcon icon={faCog} />
                      <i
                        class='ri-settings-2-line'
                        style={{ color: '#f9a826' }}
                      ></i>{' '}
                      automatic
                    </span>

                    <span className=' d-flex align-items-center gap-1 section__description'>
                      <FontAwesomeIcon icon={faRoad} />
                      {car.km}km
                    </span>
                    <span
                      className=' d-flex align-items-center gap-1 section__description'
                      style={{ color: car.couleur }}
                    >
                      <FontAwesomeIcon icon={faCarAlt} /> {car.couleur}
                    </span>
                    {/*       
                        <span className=" d-flex align-items-center gap-1 section__description" >
                           <FontAwesomeIcon icon={faCarAlt} /> {marque['libelle']}
                        
                        </span> */}
                  </div>

                  <div
                    className=' d-flex align-items-center mt-3'
                    style={{ columnGap: '2.8rem' }}
                  >
                    <span className=' d-flex align-items-center gap-1 section__description'>
                      {/* <FontAwesomeIcon icon={faMapLocation} /> {singleCarItem.gps} */}
                    </span>

                    <span className=' d-flex align-items-center gap-1 section__description'>
                      {/* <FontAwesomeIcon icon={faWheelchair} />{" "}
                          {singleCarItem.seatType} */}
                    </span>
                  </div>
                </div>
              </Col>

              {userInfo ? (
                <>
                  <Col lg='12' className='mt-5'>
                    <div className='booking-info mt-5'>
                      <h5 className='mb-4 fw-bold '>Booking Information</h5>
                      <BookingForm car={car}  />
                    </div>
                  </Col>

                  {/* <Col lg='5' className='mt-5'>
                    <div className='payment__info mt-5'>
                      <h5 className='mb-4 fw-bold '>Payment Information</h5>
                      <PaymentMethod car={car} />
                    </div>
                  </Col> */}
                </>
              ) : (
                <Row className='py-3 text-center'>
                  <Col>
                    Want to Rent it?{' '}
                    <Link
                      to={'/login'}
                      style={{ color: '#DC0000' }}
                      className='text-decoration-none'
                    >
                      Sign In First
                    </Link>
                  </Col>
                </Row>
              )}
            </Row>
          </Container>
        </section>
      ) : (
        <Spinner animation='grow' />
      )}
      <Footer />
    </Helmet>
  );
};

export default CarDetails;
