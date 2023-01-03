import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/about-section.css';
import aboutImg from '../../assets/all-images/cars-img/bmw-offer.png';

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className='about__section'
      style={
        aboutClass === 'aboutPage'
          ? { marginTop: '0px' }
          : { marginTop: '280px' }
      }
      id='about'
    >
      <Container id='about'>
        <Row>
          <Col lg='6' md='6'>
            <div className='about__section-content'>
              <h4 className='section__subtitle'>About Us</h4>
              <h2 className='section__title'>Welcome to car rent service</h2>
              <p className='section__description'>
                Welcome to our rental car agency! Are you in need of a reliable
                and stylish vehicle for your upcoming trip or event? Look no
                further! We offer a wide selection of top-quality cars at
                competitive prices. Our team is dedicated to providing
                exceptional customer service and ensuring that your rental
                experience is hassle-free. Whether you need a spacious SUV for a
                family vacation or a sleek sports car for a special occasion, we
                have the perfect car for you. We also offer flexible rental
                periods and convenient pickup and drop-off locations. Don't miss
                out on the opportunity to make your travels even more enjoyable
                with one of our rental cars. Book with us today!
              </p>

              <div className='about__section-item d-flex align-items-center'>
                <p className='section__description d-flex align-items-center gap-2'>
                  <i class='ri-checkbox-circle-line'></i> Our team is dedicated
                  to providing top-notch
                </p>

                <p className='section__description d-flex align-items-center gap-2'>
                  <i class='ri-checkbox-circle-line'></i> Our team is dedicated
                  to providing top-notch
                </p>
              </div>

              <div className='about__section-item d-flex align-items-center'>
                <p className='section__description d-flex align-items-center gap-2'>
                  <i class='ri-checkbox-circle-line'></i> Our team is dedicated
                  to providing top-notch
                </p>

                <p className='section__description d-flex align-items-center gap-2'>
                  <i class='ri-checkbox-circle-line'></i> Our team is dedicated
                  to providing top-notch
                </p>
              </div>
            </div>
          </Col>

          <Col lg='6' md='6'>
            <div className='about__img'>
              <img src={aboutImg} alt='' className='w-100' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
