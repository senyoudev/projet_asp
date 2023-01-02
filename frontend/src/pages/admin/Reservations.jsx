import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReservationsTable from "../../components/tables/ReservationsTable";
import { useReservation } from "../../Context/ReservationContext";

function Reservations() {
   const navigate = useNavigate('');
   const { getReservations } = useReservation('');
   const [reservations, setReservations] = useState([]);
   const [userInfo, setUserInfo] = useState(
     JSON.parse(localStorage.getItem('userInfo')),
   );
   const fetchData = async () => {
     const bookings = await getReservations();
     setReservations(bookings.value);
     console.log(bookings.value);
   };

   useEffect(() => {
     if (userInfo != null) {
       fetchData();
       setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
     } else {
       return navigate('/login');
     }
   }, [localStorage.getItem('userInfo')]);
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <label className="mb-1">Find Reservation By Date</label>
          <Form.Control type="date" />
        </Col>
        <Col md="6">
          <label className="mb-1">Search Reservation</label>
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search Reservation"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <ReservationsTable data={reservations} />
    </>
  );
}
export default Reservations;
