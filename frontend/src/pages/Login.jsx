import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


function Login() {
 const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitHandler = () => {

  }

  return (
    <Container className='d-flex flex-column align-items-center justify-center'>
        <ToastContainer />
        <h1 className=' text-center' style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Sign In</h1>
        <Form onSubmit={submitHandler} style={{width:'80%'}}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='my-3'
              style={{ borderColor: '#1DC7EA' }}

            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='my-3'
              style={{ borderColor: '#1DC7EA' }}
            ></Form.Control>
          </Form.Group>

             <Row className='py-3 text-center' >
          <Col>
           <Button type='submit' className='mt-4 order-btn text-center' style={{ width: '30%',color:'#1DC7EA',borderColor:'#1DC7EA' }}>
            Sign In
          </Button>
          </Col>
        </Row>
        </Form>

        <Row className='py-3 text-center' >
          <Col>
            Don't have an account?{' '}
            <Link to={'/register'} style={{ color: '#1D7EA' }} className='text-decoration-none'>
              Sign Up
            </Link>
          </Col>
        </Row>
      </Container>
  );
}

export default Login;
