import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs, Tab, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import ProfileUser from '../components/Cards/ProfileUser';
import ProfileAbout from '../components/Tabs/ProfileAbout';
import Navbar from '../components/Navbars/Navbar';
import navLinks from '../assets/Data/navLinks';

function Profile() {
  const navigate = useNavigate();
const [loading,setLoading] = useState(false)
  

  return (
    <>
      <Navbar navLinks={navLinks} />
      <ToastContainer />
      <Row style={{ margin: '40px' }}>
        <Col md={4} xs={12} style={{ marginBottom: '20px' }} className='fixed'>
          <ProfileUser loading={loading} />
        </Col>
        <Col md={8}>
          <Tabs
            defaultActiveKey='About'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab eventKey='About' title='About'>
              <ProfileAbout loading={loading} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
