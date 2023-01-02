import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { isValidEmail, isValidUsername } from '../../utils/validation';

function Profile() {
  const navigate = useNavigate('')
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const location = useLocation();
  const { getUserById, loading, updateUserByAdmin } = useAuth('');
  

  useEffect(() => {
    const fetchData = async () => {
      const userId = location.state.userId
      console.log(userId);
      const user = await getUserById(userId);
      setFirstName(user.prenom)
      setLastName(user.nom)
      setEmail(user.email)
      setRole(user.role)
      setUsername(user.username);
      setImage(user.photo)
    };
      fetchData()

  },[location.state.userId]);

  function handleChange(event) {
    setRole(event.target.value);
  }

  const handleSubmit = async(e) => {
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
       if (role !== 'locataire' && role !== 'proprietaire' && role !== 'Administrator') {
         toast.error('Please select a valid option');
         return;
       }

       const data = await updateUserByAdmin(
         location.state.userId,
         email,
         username,
         lastname,
         firstname,
         image,
         role,
       );
       if (data != null) return navigate('/admin/users');
     
  }


    return (
      <>
        <Container fluid>
          <ToastContainer />
          <Row>
            <Col md='8'>
              <Card>
                <Card.Header>
                  <Card.Title as='h4'>Edit Profile</Card.Title>
                </Card.Header>
                {loading ? (
                  <Spinner animation='grow' />
                ) : (
                  <>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col className='pr-1' md='6'>
                            <Form.Group>
                              <label>First Name</label>
                              <Form.Control
                                placeholder='First name'
                                type='text'
                                value={firstname}
                                onChange={e => setFirstName(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='pl-1' md='6'>
                            <Form.Group>
                              <label>Last Name</label>
                              <Form.Control
                                placeholder='Last Name'
                                type='text'
                                value={lastname}
                                onChange={e => setLastName(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col className='pr-1' md='6'>
                            <Form.Group>
                              <label>Email</label>
                              <Form.Control
                                placeholder='Email'
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='px-1' md='6'>
                            <Form.Group>
                              <label>Role</label>
                              <Form.Control
                                as='select'
                                value={role}
                                onChange={handleChange}
                              >
                                <option value='' selected={false}>
                                  Choose a value
                                </option>
                                <option value='locataire' selected={true}>
                                  Client
                                </option>
                                <option value='proprietaire' selected={false}>
                                  Owner
                                </option>
                                <option value='Administrator' selected={true}>
                                  Admin
                                </option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md='12'>
                            <Form.Group>
                              <label>Username</label>
                              <Form.Control
                                type='text'
                                placeholder='Enter a username'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className='my-2'
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button
                          className='btn-fill pull-right mt-2'
                          type='submit'
                          variant='info'
                          onClick={e => handleSubmit(e)}
                        >
                          Update Profile
                        </Button>
                        <div className='clearfix'></div>
                      </Form>
                    </Card.Body>
                  </>
                )}
              </Card>
            </Col>
            {loading ? (
              <Spinner animation='grow' />
            ) : (
              <Col md='4'>
                <Card className='card-user'>
                  <div className='card-image'>
                    <img alt='...' src={image}></img>
                  </div>
                  <Card.Body>
                    <div className='author'>
                      <a href='#pablo' onClick={e => e.preventDefault()}>
                        <img
                          alt='...'
                          className='avatar border-gray'
                          src={image}
                        ></img>
                        <h5 className='title'>
                          {firstname} {lastname}
                        </h5>
                      </a>
                      <p className='description'>{username}</p>
                    </div>
                    <p className='description text-center'>
                      "Lamborghini Mercy <br></br>
                      Your chick she so thirsty <br></br>
                      I'm in that two seat Lambo"
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </>
    );
  }


export default Profile;
