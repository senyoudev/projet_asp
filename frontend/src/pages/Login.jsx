import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Spinner } from 'react-bootstrap'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';


function Login() {
 const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {login,loading,setLoading} = useAuth('')

  const submitHandler = async(e) => {
    e.preventDefault()
    if (!isValidUsername(username)) {
      toast.error('Invalid username,it Must contain at least one letter and one number and have more than 8 characters');
      return;
    }

    if (!isValidPassword(password)) {
      toast.error('Invalid password,it Must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }
    const data = await login(username,password)
    setLoading(false)
    if(data != null) return navigate('/')
  }

  const isValidUsername = (username) => {
  // Minimum length of 8 characters
  if (username.length < 8) {
    return false;
  }

  // Must contain at least one letter and one number
  if (!/[a-zA-Z]/.test(username) || !/[0-9]/.test(username)) {
    return false;
  }

  return true;
}

const isValidPassword = (password) => {
  // Minimum length of 8 characters
  if (password.length < 8) {
    return false;
  }

  // Must contain at least one uppercase letter, one lowercase letter, one number, and one special character
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }

  return true;
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
            {loading && ((<Spinner    as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                 ))}
        
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
