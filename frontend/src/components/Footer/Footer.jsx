import { faCar, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/css/footer.css';

const quickLinks = [
  {
    path: '#',
    display: 'Home',
  },
  {
    path: '#about',
    display: 'About',
  },
  {
    path: '/cars',
    display: 'Cars',
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className='footer' id='contact'>
      <Container>
        <Row>
          <Col lg='4' md='4' sm='12'>
            <div className='logo footer__logo'>
              <h1>
                <Link to='/' className=' d-flex align-items-center gap-2'>
                  <FontAwesomeIcon icon={faCar} />
                  <span>
                    Rent Car <br /> Service
                  </span>
                </Link>
              </h1>
            </div>
            <p className='footer__logo-content'>
              Welcome to our rental car agency! Are you in need of a reliable
              and stylish vehicle for your upcoming trip or event? Look no
              further! We offer a wide selection of top-quality cars at
              competitive prices. Our team is dedicated to providing exceptional
              customer service and ensuring that your rental experience is
              hassle-free. Whether you need a spacious SUV for a family vacation
              or a sleek sports car for a special occasion, we have the perfect
              car for you
            </p>
          </Col>

          <Col lg='2' md='4' sm='6'>
            <div className='mb-4'>
              <h5 className='footer__link-title'>Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className='p-0 mt-3 quick__link'>
                    <a href={item.path}>{item.display}</a>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg='3' md='4' sm='6'>
            <div className='mb-4'>
              <h5 className='footer__link-title mb-4'>Head Office</h5>
              <p className='office__info'>123 Imouzzer Route Fes,Morocco</p>
              <p className='office__info'>Phone: +212554579699</p>

              <p className='office__info'>Email: groupe12@gmail.com</p>

              <p className='office__info'>Office Time: 10am - 7pm</p>
            </div>
          </Col>

          <Col lg='3' md='4' sm='12'>
            <div className='mb-4'>
              <h5 className='footer__link-title'>Newsletter</h5>
              <p className='section__description'>Subscribe our newsletter</p>
              <div className='newsletter'>
                <input type='email' placeholder='Email' />
              </div>
            </div>
          </Col>

          <Col lg='12'>
            <div className='footer__bottom'>
              <p className='section__description d-flex align-items-center justify-content-center gap-1 pt-4'>
                <FontAwesomeIcon icon={faCopyright} />
                Copyright {year}, Developed by Group12_dev. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
