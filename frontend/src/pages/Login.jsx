import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../components/Navbars/Navbar";
import navLinks from "../assets/Data/navLinks";
import { isValidPassword, isValidUsername } from "../utils/validation";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading, setLoading } = useAuth("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isValidUsername(username)) {
      toast.error(
        "Invalid username,it Must contain at least one letter and one number and have more than 8 characters"
      );
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Invalid password,it Must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    const data = await login(username, password);
  };

  return (
    <>
      <Navbar navLinks={navLinks} />
      <Container
        className='d-flex flex-column align-items-center justify-center'
        style={{ marginTop: '50px' }}
      >
        <ToastContainer />
        <h1
          className=' text-center'
          style={{
            marginTop: '2.5rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
          }}
        >
          Sign <span style={{ color: '#DC0000' }}>In</span>
        </h1>
        <Form
          onSubmit={submitHandler}
          style={{ width: '80%', marginTop: '50px' }}
        >
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Your username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='my-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='my-3'
            ></Form.Control>
          </Form.Group>

          <Row className='py-3 text-center'>
            <Col>
              <Button
                type='submit'
                className='mt-4 order-btn text-center'
                style={{
                  width: '30%',
                  color: '#fff',
                  backgroundColor: '#1A120B',
                }}
                disabled={loading}
              >
                Sign In
                {loading && <Spinner animation='grow' />}
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className='py-3 text-center'>
          <Col>
            Don't have an account?{' '}
            <Link
              to={'/register'}
              style={{ color: '#DC0000' }}
              className='text-decoration-none'
            >
              Sign Up
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
