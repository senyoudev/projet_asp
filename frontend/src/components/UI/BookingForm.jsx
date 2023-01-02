import React from "react";
import "../../assets/css/booking-form.css";
import { Form, FormGroup } from "react-bootstrap";
import { json } from "react-router-dom";

const BookingForm = (car) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const stockdate =(date)=>{
    localStorage.setItem('dateRemise',date)
  }
  const user=JSON.parse(localStorage.getItem('userInfo'));
 
  console.log(user)
  console.log(user.nom)
  console.log(car.car['id'])
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="First Name" value={user.prenom} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Last Name"  value={user.nom} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email" value={user.email}/>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-1 mb-4">
        <input type="text" placeholder="car name"  value={car.car['name']}/>
      </FormGroup>

      

  <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="Date remise" onChange={()=>stockdate((e)=>e.target.value)}/>
      </FormGroup>
     

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
