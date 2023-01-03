import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../assets/css/home.css";
import "../assets/css/contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Contact = () => {
  return (
    <Helmet title='Contact'>
      <CommonSection title='Contact' />
      <section>
        <Container>
          <Row>
            <Col lg='7' md='7'>
              <h6 className='fw-bold mb-4'>Get In Touch</h6>
              <Form>
                <Form.Group className='contact__form'>
                  <Form.Control
                    placeholder='Your Name'
                    type='text'
                    className='mb-3'
                  />
                </Form.Group>
                <Form.Group className='contact__form'>
                  <Form.Control
                    placeholder='Email'
                    type='email'
                    className='mb-3'
                  />
                </Form.Group>
                <Form.Group className='contact__form mb-3'>
                  <textarea
                    rows='5'
                    placeholder='Message'
                    className='textarea'
                  ></textarea>
                </Form.Group>

                <button className=' contact__btn' type='submit'>
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg='5' md='5'>
              <div className='contact__info'>
                <h6>Contact Information</h6>
                <p className='section__description mb-1'>
                  123 Imouzzer Route Fes,Morocco
                </p>
                <div className=' d-flex align-items-center mb-1'>
                  <h6 className='fs-6 mb-0'>Phone:</h6>
                  <p className='section__description mb-0'>+212554579699</p>
                </div>

                <div className=' d-flex align-items-center'>
                  <h6 className='mb-0 fs-6'>Email:</h6>
                  <p className='section__description mb-0'>groupe12@gmail.com</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
