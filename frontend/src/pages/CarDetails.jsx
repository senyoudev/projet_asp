import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

import { Container, Row, Col } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import {useCar } from "../Context/CarContext"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";



const CarDetails = () => {
  const location = useLocation();

  const url = location.pathname;

  const id=url.split('/')[2];
 
  console.log(id)
  
 
    const navigate = useNavigate('')
 const { getCar, loading, setLoading } = useCar('')
 const [car,setCar] = useState([])
 const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
 const fetchData = async () => {
  setLoading(true);
     const clients = await getCar(id)
     setLoading(false);
     console.log("clenit")
     console.log(clients)
     setCar(clients)
   }

 useEffect(()=> {
    
   if(userInfo != null) {
     fetchData()
     setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
   } else {
     return navigate('/login')
   }
 },[localStorage.getItem('userInfo')])
 console.log("hhhhhhhhhhh where is m car")
console.log(car);
const col=car.couleur;
const marque=car.marque;

  return (
    <Helmet title={car.name}>
      <Header />
     { !loading ?
              <section>
              <Container>
                <Row>
                  <Col lg="6">
                    <img src={car.photo} alt="" className="w-100" />
                  </Col>
      
                  <Col lg="6">
                    <div className="car__info">
                      <h2 className="section__title">{car.name}</h2>
                     
      
                      <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                        <h6 className="rent__price fw-bold fs-4">
                          ${car.prix}.00 / Day
                        </h6>
      
                        <span className=" d-flex align-items-center gap-2">
                          <span style={{ color: "#f9a826" }}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfAlt} />
                          </span>
                          {/* ({car.rating} ratings) */}
                        </span>
                      </div>
      
                      <p className="section__description">
                        {car.desc}
                      </p>
      
                      <div
                        className=" d-flex align-items-center mt-3"
                        style={{ columnGap: "4rem" }}
                      >
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <FontAwesomeIcon icon={faCarAlt}  /> {car.annee}
                        </span>
      
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <FontAwesomeIcon icon={faCog} />
                          <i
                            class="ri-settings-2-line"
                            style={{ color: "#f9a826" }}
                          ></i>{" "}
                         automatic
                        </span>
      
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <FontAwesomeIcon icon={faRoad} />
                          {car.km}km
                        </span>
                        <span className=" d-flex align-items-center gap-1 section__description" style={{color:col}}>
                           <FontAwesomeIcon icon={faCarAlt} />  {car.couleur}
                        
                        </span>
{/*       
                        <span className=" d-flex align-items-center gap-1 section__description" >
                           <FontAwesomeIcon icon={faCarAlt} /> {marque['libelle']}
                        
                        </span> */}
                        
      
                      </div>
                    
      
                      <div
                        className=" d-flex align-items-center mt-3"
                        style={{ columnGap: "2.8rem" }}
                      >
                        <span className=" d-flex align-items-center gap-1 section__description">
                          {/* <FontAwesomeIcon icon={faMapLocation} /> {singleCarItem.gps} */}
                        </span>
      
                        <span className=" d-flex align-items-center gap-1 section__description">
                          {/* <FontAwesomeIcon icon={faWheelchair} />{" "}
                          {singleCarItem.seatType} */}
                        </span>
      
                        
                      </div>
                    </div>
                  </Col>
      
                  <Col lg="7" className="mt-5">
                    <div className="booking-info mt-5">
                      <h5 className="mb-4 fw-bold ">Booking Information</h5>
                      <BookingForm car={car} />
                    </div>
                  </Col>
      
                  <Col lg="5" className="mt-5">
                    <div className="payment__info mt-5">
                      <h5 className="mb-4 fw-bold ">Payment Information</h5>
                      <PaymentMethod car={car}  />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            :  <Spinner animation="grow" />
     }
      <Footer/>
    </Helmet>
  );
};

export default CarDetails;
