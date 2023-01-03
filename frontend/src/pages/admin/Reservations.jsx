import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReservationsTable from '../../components/tables/ReservationsTable';
import { useReservation } from '../../Context/ReservationContext';

function Reservations() {
  const navigate = useNavigate('');
  const { getReservations } = useReservation('');
  const [reservations, setReservations] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const bookings = await getReservations();
    setReservations(bookings.value);
    setFiltredData(bookings.value);
  };

  const getReservationsByDate = date => {
    if (date != '') {
      const data = reservations.filter(item => {
        return (
          moment(item.datePriseEnCharge).format('DD-MM-YYYY') ==
          moment(date).format('DD-MM-YYYY')
        );
      });
      console.log(data);
      setFiltredData(data);
    } else {
      setFiltredData(reservations);
    }
  };
  const search = searchKey=>{
    const data = reservations.filter(item => {
      return item.voiture.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
    });
    setFiltredData(data);
  }

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
      <Row className='mb-4'>
        <Col md='6'>
          <label className='mb-1'>Find Reservation By Date</label>
          <Form.Control
            type='date'
            onChange={e => getReservationsByDate(e.target.value)}
          />
        </Col>
        <Col md='6'>
          <label className='mb-1'>Search Reservation</label>
          <Form.Control
            placeholder='Search Reservation'
            aria-label='Search Reservation'
            aria-describedby='basic-addon2'
            onChange={e => search(e.target.value)}
          />
        </Col>
      </Row>
      <ReservationsTable
        data={filtredData}
        type='admin'
        setReservations={setReservations}
      />
    </>
  );
}
export default Reservations;
