import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Row,
  Placeholder,
  Form,
  FormLabel,
} from 'react-bootstrap';
import { FaUserAlt, FaRegCalendar, FaMailchimp,FaFlag } from 'react-icons/fa';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Rating from '../UI/Rating';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';

function ProfileUser() {
  const navigate = useNavigate('');
  const { getLoggedInUser, loading } = useAuth('');
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [loggedInUser, setLoggedInUse] = useState({});

  const fetchData = async () => {
    const data = await getLoggedInUser();
    setLoggedInUse(data);
    console.log(data)
  };

  useEffect(() => {
    if (userInfo != null) {
      fetchData();
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    } else {
      return navigate('/login');
    }
  }, [localStorage.getItem('userInfo')]);

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
                loggedInUser?.photo ||
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
          <Card.Title style={{ color: '#262322' }}>
            {loggedInUser.username}
          </Card.Title>
          <Rating value={'5'} text={`2 reservations`} />
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
              <FaUserAlt style={{ marginRight: '0.3rem' }} />
              Name
            </h5>
            <span
              className='d-flex align-items-center'
              style={{ fontWeight: '400' }}
            >
              <span style={{ marginRight: '5px' }}>
                {' '}
                {loggedInUser.nom} {loggedInUser.prenom}
              </span>
            </span>
          </Card.Text>
          <Card.Text
            className='d-flex justify-content-between align-items-center'
            as={'div'}
            style={{ margin: '5px 0' }}
          >
            <h5 style={{ color: '#262322', fontSize: '16px' }}>
              <FaMailchimp style={{ marginRight: '0.3rem' }} />
              Email
            </h5>
            <span
              className='d-flex align-items-center'
              style={{ fontWeight: '400' }}
            >
              <span style={{ marginRight: '5px' }}> {loggedInUser.email}</span>
            </span>
          </Card.Text>
          <Card.Text
            className='d-flex justify-content-between align-items-center'
            as={'div'}
          >
            <h5 style={{ color: '#262322', fontSize: '16px' }}>
              <FaRegCalendar style={{ marginRight: '0.3rem' }} />
              Member since
            </h5>
            <span style={{ fontWeight: '400' }}>
              {moment(loggedInUser.dateAdded).format('DD-MM-YYYY')}
            </span>
          </Card.Text>
          <Card.Text
            className='d-flex justify-content-between align-items-center'
            as={'div'}
            style={{ margin: '5px 0' }}
          >
            <h5 style={{ color: '#262322', fontSize: '16px' }}>
              <FaUserAlt style={{ marginRight: '0.3rem' }} />
              Status
            </h5>
            <span
              className='d-flex align-items-center'
              style={{ fontWeight: '400' }}
            >
              <span style={{ marginRight: '5px' }}>
                {' '}
                {loggedInUser.role} 
              </span>
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileUser;
