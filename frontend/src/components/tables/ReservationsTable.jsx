import moment from "moment";
import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Row, Col } from "react-bootstrap";

function ReservationsTable({data}) {
  return (
    <>
      <Row>
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
                  {data?.map((item, ind) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.voiture.name}</td>
                        <td>{item.prix}</td>
                        <td>{item.user.username}</td>
                        <td>
                          {moment(item.datePriseEnCharge).format('DD-MM-YYYY')}
                        </td>
                        <td>
                          {moment(item.dateExpiration).format('DD-MM-YYYY')}
                        </td>
                        <td>
                          <button className='btn btn-fill btn-danger'>
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
