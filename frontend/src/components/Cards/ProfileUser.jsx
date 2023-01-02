import React, { useState } from 'react';
import {
  Button,
  Card,
  Row,
  Placeholder,
  Form,
  FormLabel,
} from 'react-bootstrap';
import {
  FaFlag,
  FaMapMarkerAlt,
  FaUserAlt,
  FaRegCalendar,
  FaEdit,
} from 'react-icons/fa';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Rating from '../UI/Rating';

function ProfileUser({  loading }) {
  

    
    return (
      <>
        <Card
          style={{
            width: '25rem',
            position: 'sticky',
            top: '50px',
            transition: 'all .3s ease-in-out',
            fontFamily: 'rubik,Sans-serif',
          }}
        >
          <ToastContainer />
          <Form className='text-center'>
            <FormLabel for='slider1'>
              <Card.Img
                variant='top'
                src={ 
                  'https://res.cloudinary.com/senyou/image/upload/v1659841285/image_ycbkjy.jpg'
                }
                thumbnail={true}
                className='rounded-circle'
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  margin: '60px auto 0',
                  cursor: 'pointer',
                }}
              />
              <Form.Control
                type='file'
                id='slider1'
                name='slider1'
                style={{ display: 'none' }}
                accept='image/*'
              />
            </FormLabel>
          </Form>
          <Card.Header
            className='text-center'
            style={{ backgroundColor: 'transparent' }}
          >
            <Card.Title style={{ color: '#262322' }}>younes meskafe</Card.Title>
            <Rating
              value={'5'}
              text={`20 services)`}
            />
            <div style={{ margin: '8px 0' }}>
              <FaFlag style={{ marginRight: '5px' }} /> Report
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text
              className='d-flex justify-content-between align-items-center'
              as={'div'}
              style={{ margin: '5px 0' }}
            >
              <h5 style={{ color: '#262322', fontSize: '16px' }}>
                <FaMapMarkerAlt style={{ marginRight: '0.3rem' }} />
                From
              </h5>
              <span
                className='d-flex align-items-center'
                style={{ fontWeight: '400' }}
              >
                <span style={{ marginRight: '5px' }}>
                  {' '}
                  { 'Not mentionned'}
                </span>
          
                
              </span>
            </Card.Text>
            <Card.Text
              className='d-flex justify-content-between align-items-center'
              as={'div'}
            >
              <h5 style={{ color: '#262322', fontSize: '16px' }}>
                <FaUserAlt style={{ marginRight: '0.3rem' }} />
                Member since
              </h5>
              <span style={{ fontWeight: '400' }}>
                2030-34-342
              </span>
            </Card.Text>
          </Card.Body>
          <Card.Footer
            className='text-center'
            style={{ backgroundColor: 'transparent' }}
          >
            <Row
              className='d-flex justify-content-between'
              style={{ margin: '5px 0' }}
            >
              <Card.Text
                className='d-flex justify-content-between align-items-center'
                as={'div'}
              >
                <h5 style={{ color: '#262322', fontSize: '16px' }}>
                  <FaRegCalendar style={{ marginRight: '0.3rem' }} />
                  Available
                </h5>
                <span style={{ fontWeight: '400' }}>
                  { 'Yes' }
                </span>
              </Card.Text>
            </Row>
            <Button
              className='back-btn'
              style={{ margin: '5px auto' }}
            >
              Toggle availability
            </Button>
          </Card.Footer>
        </Card>
      </>
    );
  }

export default ProfileUser;
