import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import navLinks from "../assets/Data/navLinks";
import Navbar from "../components/Navbars/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValidEmail, isValidUsername } from "../utils/validation";
import { useAuth } from "../Context/AuthContext";

function Settings() {
 const navigate = useNavigate();
  const [lastname, setLastName] = useState();
  const [firstname, setFirstName] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();

    const {loading} = useAuth('')

 const [userInfo, setUserInfo] = useState(
   JSON.parse(localStorage.getItem('userInfo')),
 );

 useEffect(() => {
   if (userInfo != null) {
     setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
   } else {
     return navigate('/login');
   }
 }, [localStorage.getItem('userInfo')]);

 const submitHandler = async(e) => {
    e.preventDefault()
      if (!firstname) {
        toast.error('Please enter your first name');
        return;
      }
      if (!lastname) {
        toast.error('Please enter your last name');
        return;
      }
      if (!isValidEmail(email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      if (!isValidUsername(username)) {
        toast.error(
          'Username can only contain letters, numbers, and underscores',
        );
        return;
      }

 }


  return (
    <>
      <Navbar navLinks={navLinks} />
      <Container style={{ marginTop: '2rem' }}>
        <ToastContainer />
        <h1
          className='text-center'
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
          }}
        >
          User Setin<span style={{ color: '#DC0000' }}>gs</span>
        </h1>
        <Form onSubmit={submitHandler} style={{marginTop:'2rem'}}>
          <Row className='d-flex align-items-center'>
            <Col md={6}>
              <Form.Group controlId='title'>
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your firstName'
                  className='my-2'
                  value={firstname}
                  onChange={e => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='title'>
                <Form.Label>lastName</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your Last'
                  className='my-2'
                  value={lastname}
                  onChange={e => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId='email'>
                <Form.Label>User Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  className='my-2'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId='email'>
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  className='my-2'
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row
            className='d-flex justify-content-center mt-4 align-items-center'
            style={{ marginBottom: '20px' }}
          >
            <Button
              type='submit'
              style={{
                width: '20%',
                marginRight: '10px',
                Color:'#fff',
                backgroundColor: '#DC0000',
              }}
            >
              Update
            </Button>
            {loading && (
              <Spinner
                animation='border'
                role='status'
                style={{ color: '#DC0000' }}
              >
                <span className='visually-hidden'>Updating...</span>
              </Spinner>
            )}
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default Settings;
