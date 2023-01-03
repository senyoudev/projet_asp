import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  Accordion,
  Button,
  Col,
  Placeholder,
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useReservation } from '../../Context/ReservationContext';
import ReservationProfileTable from '../tables/ReservationProfileTable';



function ProfileAbout() {

   const navigate = useNavigate('');
   const { getUserReservations } = useReservation('');
   const [reservations, setReservations] = useState([]);
   const [userInfo, setUserInfo] = useState(
     JSON.parse(localStorage.getItem('userInfo')),
   );
   const fetchData = async () => {
     const bookings = await getUserReservations(userInfo.id);
     setReservations(bookings.value);
   };

   useEffect(() => {
     if (userInfo != null) {
       fetchData();
       setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
     } else {
       return navigate('/login');
     }
   }, [localStorage.getItem('userInfo'), reservations]);


    return (
     <>
                <Row style={{ margin: '0 auto' }} >
                    

                                <ReservationProfileTable data={reservations} />


                       
                </Row>
             
            
            </>
    )
}

export default ProfileAbout;
