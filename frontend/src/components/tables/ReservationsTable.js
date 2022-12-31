import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Row, Col } from "react-bootstrap";

function ReservationsTable() {
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Offers</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    {" "}
                    <th className="border-0">Voiture</th>
                    <th className="border-0">Prix Total</th>
                    <th className="border-0">Tenant</th>
                    <th className="border-0">Start Date</th>
                    <th className="border-0">End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dacia Logan</td>
                    <td>2000DH</td>
                    <td>Yassine Chraa</td>
                    <td>28/12/2022</td>
                    <td>31/12/2022</td>
                    <td>
                      <button className="btn btn-fill btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Toyoto xxx</td>
                    <td>1500DH</td>
                    <td>Younes Meskafe</td>
                    <td>28/12/2022</td>
                    <td>31/12/2022</td>
                    <td>
                      <button className="btn btn-fill btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
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
