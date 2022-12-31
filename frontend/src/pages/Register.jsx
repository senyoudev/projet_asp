import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';


function Register() {
    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
   
  }

  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

  return (
    <>
      <Container className='d-flex flex-column align-items-center justify-center'>
      <ToastContainer />
        <h1 className=' text-center' style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Sign Up</h1>
        <Form  onSubmit={submitHandler} style={{width:'80%'}}>
        <Form.Group controlId='name' >
            <Row>
                <Col>
                <Form.Label>First Name</Form.Label>

                        <Form.Control
                    type='text'
                    placeholder='Enter your firstname'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='my-2'
                    style={{ borderColor: '#1DC7EA' }}

                    ></Form.Control>
            </Col>

              <Col>
            <Form.Label>LastName</Form.Label>

              <Form.Control
              type='text'
              placeholder='Enter your lastname'
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className='my-2'
              style={{ borderColor: '#1DC7EA' }}

            ></Form.Control>
            </Col>

            </Row>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='my-2'
              style={{ borderColor: '#1DC7EA' }}

            ></Form.Control>
          </Form.Group>

           <Form.Group controlId='type'  >
            <Row className='d-flex align-items-center justify-center'>
                    <Col className='d-flex flex-column justify-content-center '>
                        <Form.Label>Username</Form.Label>

                        <Form.Control
                            type='text'
                            placeholder='Enter a username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='my-2'
                            style={{ borderColor: '#1DC7EA' }}

                        ></Form.Control>
                    </Col>

                <Col className='d-flex flex-column justify-content-center '>
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" value={selectedOption} onChange={handleChange} className='my-2'>
                                    <option value="locataire">Locataire</option>
                                    <option value="proprietaire">Propriétaire</option>
                        </Form.Control>
                </Col>

            </Row>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='my-2'
              style={{ borderColor: '#1DC7EA' }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='my-2'
              style={{ borderColor: '#1DC7EA' }}
            ></Form.Control>
          </Form.Group>

         <Row className='py-3 text-center' >
          <Col>
           <Button type='submit' className='mt-4 order-btn text-center' style={{ width: '30%',color:'#1DC7EA',borderColor:'#1DC7EA' }}>
            Sign UP
          </Button>
          </Col>
        </Row>

          
        </Form>

        <Row className='py-3 text-center' >
          <Col>
            Already have an account?{' '}
            <Link to={'/login'} style={{ color: '#1DC7EA' }} className='text-decoration-none'>
              Sign In
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register