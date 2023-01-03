import masterCard from '../../assets/all-images/master-card.jpg';
import paypal from '../../assets/all-images/paypal.jpg';
import '../../assets/css/payment-method.css';
import { useReservation } from '../../Context/ReservationContext';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbars/Navbar';
import navLinks from '../../assets/Data/navLinks';
import { Button, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useParams } from 'react-router';

const PaymentMethod = () => {
  const navigate = useNavigate('');
  const {addPayment} = useReservation('')
  const params = useParams()
  const location = useLocation();


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

  const [method, setMethod] = useState('');

  const handleSubmit =async () => {
    // send payment method to API
    if(method == '') {
      toast.error('Choose a method')
      return
    }
   const data =  await addPayment(params.id,method)
   if(data != null) {
    return navigate('/profile')
   }
  };

  return (
    <>
      <Navbar navLinks={navLinks} />
      <ToastContainer />
      <Form
        className='d-flex flex-row align-items-center justify-content-center'
        style={{ width: '100%', height: '80vh' }}
      >
        <Row>
          <Form.Group controlId='paymentMethod'>
            <Form.Label style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              Payment Method
            </Form.Label>
            <Form.Check
              type='radio'
              label='Direct Bank Transfer'
              name='pay'
              value='Direct Bank Transfer'
              onChange={e => setMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Cheque Payment'
              name='pay'
              value='Cheque Payment'
              onChange={e => setMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Master Card'
              name='pay'
              value='Master Card'
              onChange={e => setMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Paypal'
              name='pay'
              value='Paypal'
              onChange={e => setMethod(e.target.value)}
            />
          </Form.Group>
        </Row>
      </Form>
      <Row className='d-flex justify-content-center'>
        <Button
          variant='primary'
          style={{
            fontSize: '18px',
            borderRadius: '5px',
            backgroundColor: '#3472F7',
            color: '#fff',
            width: '20%',
          }}
          onClick={handleSubmit}
        >
          Proceed to Payment
        </Button>
      </Row>
    </>
  );
};

export default PaymentMethod;
