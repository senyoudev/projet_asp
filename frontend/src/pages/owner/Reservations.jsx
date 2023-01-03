import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ReservationsTable from '../../components/tables/ReservationsTable';
import { useReservation } from '../../Context/ReservationContext';
function Reservations() {
  const { getOwnerReservations } = useReservation();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [reservationList, setReservationList] = useState([]);
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const data = await getOwnerReservations(userInfo.id);
    setReservationList(data.value);
    setFiltredData(data.value);
  };

  const getReservationsByDate = date => {
    if (date != '') {
      const data = reservationList.filter(item => {
        return (
          moment(item.datePriseEnCharge).format('DD-MM-YYYY') ==
          moment(date).format('DD-MM-YYYY')
        );
      });
      console.log(data);
      setFiltredData(data);
    } else {
      setFiltredData(reservationList);
    }
  };

  const search = searchKey => {
    const data = reservationList.filter(item => {
      return (
        item.voiture.name.toLowerCase().search(searchKey.toLowerCase()) != -1
      );
    });
    setFiltredData(data);
  };

  useEffect(() => {
    if (userInfo != null && userInfo.role == 'proprietaire') {
      fetchData();
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
            placeholder='Search Offer'
            aria-label='Search Reservation'
            aria-describedby='basic-addon2'
            onChange={e => search(e.target.value)}
          />
        </Col>
      </Row>
      <ReservationsTable type='owner' data={filtredData} />
    </>
  );
}
export default Reservations;
