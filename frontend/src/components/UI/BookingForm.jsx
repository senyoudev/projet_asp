import React, { useState } from 'react';
import '../../assets/css/booking-form.css';
import { Button, Form, FormGroup, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReservation } from '../../Context/ReservationContext';
import { Navigate, useNavigate } from 'react-router';

const BookingForm = car => {
  const { postReservation } = useReservation('');
  const navigate = useNavigate('')

  const submitHandler = async e => {
    e.preventDefault();
    if(dateDebut > dateFin || !dateDebut || !dateFin) {
      toast.error("Invalid dates")
      return;
    }
    if(user == null) {
      toast.error("You are not logged In")
      return;
    } 
    const data = await postReservation(user.id, car.car.id, dateDebut,dateFin,car.car.prix);
    return navigate(`/payment/${data}`)
  };
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );

  return (
    <>
      <ToastContainer />
      <Form onSubmit={submitHandler}>
        <FormGroup className='booking__form d-inline-block me-4 mb-4'>
          <input type='text' placeholder='First Name' value={user.prenom} />
        </FormGroup>
        <FormGroup className='booking__form d-inline-block ms-1 mb-4'>
          <input type='text' placeholder='Last Name' value={user.nom} />
        </FormGroup>

        <FormGroup className='booking__form d-inline-block me-4 mb-4'>
          <input type='email' placeholder='Email' value={user.email} />
        </FormGroup>
        <FormGroup className='booking__form d-inline-block me-1 mb-4'>
          <input type='text' placeholder='car name' value={car.car['name']} />
        </FormGroup>

        <Row>
          <FormGroup className='booking__form d-inline-block me-4 mb-4'>
            <input
              type='date'
              placeholder='Date Debut'
              value={dateDebut}
              onChange={e => setDateDebut(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='booking__form d-inline-block me-4 mb-4'>
            <input
              type='date'
              placeholder='Date Remise'
              value={dateFin}
              onChange={e => setDateFin(e.target.value)}
            />
          </FormGroup>
        </Row>
        <Row>
          <Button
            style={{ color: '#fff', backgroundColor: '#00b0f0' }}
            type='submit'
          >
            Reserve Now
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default BookingForm;
