import React, {Fragment,useEffect, useState} from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "react-bootstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/Data/carData";
import CarItem from "../components/UI/CarItem";
import Testimonial from "../components/UI/Testimonial";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import "../assets/css/home.css";
import { useAuth } from "../Context/AuthContext";
import { useOffre } from "../Context/OffreContext";
import CarItemOffre from "../components/Cards/CarItemOffre";
const Home = () => {
  const {getOffres} = useOffre('')  
  const [offres,setOffres] = useState([])

  const fetchData = async() => {
      const data = await getOffres();
      setOffres(data?.value);
      console.log(data?.value);
  }

  useEffect(() => {
   fetchData()
  },[])

  return (
    <Fragment>
      <Header />
      <div>
        <Helmet title='Home'>
          {/* ============= hero section =========== */}
          <section className='p-0 hero__slider-section' id='#'>
            <HeroSlider />

            <div className='hero__form'>
              <Container>
                <Row className='form__row'>
                  <Col lg='4' md='4'>
                    <div className='find__cars-left'>
                      <h2>Find your best car here</h2>
                    </div>
                  </Col>

                  <Col lg='8' md='8' sm='12'>
                    <FindCarForm />
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
          {/* =========== about section ================ */}
          <AboutSection id='about' />
          {/* ========== services section ============ */}
          <section>
            <Container>
              <Row>
                <Col lg='12' className='mb-5 text-center'>
                  <h6 className='section__subtitle'>See our</h6>
                  <h2 className='section__title'>Popular Services</h2>
                </Col>

                <ServicesList />
              </Row>
            </Container>
          </section>
          {/* =========== car offer section ============= */}
          <section id='cars'>
            <Container>
              <Row>
                <Col lg='12' className='text-center mb-5'>
                  <h6 className='section__subtitle'>Come with</h6>
                  <h2 className='section__title'>Hot Offers</h2>
                </Col>

                {offres
                  ?.filter(item => item.isAprouved === true)
                  .slice(0, Math.min(offres.length, 6))
                  .map(item => (
                    <CarItemOffre item={item} key={item.id} />
                  ))}
              </Row>
            </Container>
          </section>

          {/* =========== testimonial section =========== */}
          <section>
            <Container>
              <Row>
                <Col lg='12' className='mb-4 text-center'>
                  <h6 className='section__subtitle'>Our clients says</h6>
                  <h2 className='section__title'>Testimonials</h2>
                </Col>

                <Testimonial />
              </Row>
            </Container>
          </section>
        </Helmet>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;
