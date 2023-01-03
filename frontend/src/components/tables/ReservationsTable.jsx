import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-bootstrap components
import { Card, Table, Row, Col } from 'react-bootstrap';
import { useReservation } from '../../Context/ReservationContext';
import { confirmAlert } from 'react-confirm-alert';

function ReservationsTable({ data }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [reservations, setReservations] = useState(data);
  const { deleteReservation, getOwnerReservations, getReservations } =
    useReservation('');

  async function deleteBooking(id) {
    const data = await deleteReservation(id);
    if (data != null) {
      toast.success('reservation Deleted');
      const res = await getReservations();
      setReservations(res?.value);
    }
  }
  useEffect(() => {
    setReservations(data);
  }, [data]);
  return (
    <>
      <Row>
        <ToastContainer />
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Reservations</Card.Title>
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>Voiture</th>
                    <th className='border-0'>Prix Total</th>
                    <th className='border-0'>Tenant</th>
                    <th className='border-0'>Start Date</th>
                    <th className='border-0'>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations?.map((item, ind) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.voiture.name}</td>
                        <td>{item.prix}</td>
                        <td>
                          {item?.voiture?.locataire?.username ||
                            item?.user?.username}
                        </td>
                        <td>
                          {moment(item.datePriseEnCharge).format('DD-MM-YYYY')}
                        </td>
                        <td>{moment(item.dateRemise).format('DD-MM-YYYY')}</td>
                        <td>
                          <button
                            className='btn btn-fill btn-danger'
                            onClick={() => {
                              confirmAlert({
                                message: 'Are you sure to do this.',
                                buttons: [
                                  {
                                    label: 'Yes',
                                    onClick: async () => {
                                      await deleteBooking(item.id);
                                      const reservs =
                                        await getOwnerReservations(userInfo.id);
                                      setReservations(reservs.value);
                                    },
                                  },
                                  {
                                    label: 'No',
                                  },
                                ],
                              });
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ReservationsTable;
