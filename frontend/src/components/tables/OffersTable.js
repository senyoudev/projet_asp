import React from "react";

// react-bootstrap components
import { Card, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OffersTable() {
  const navigate = useNavigate();
  function editOffer() {
    navigate("/admin/offerDetails", {
      state: {
        userId: 1,
      },
    });
  }
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Promotions</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Owner</th>
                    <th className="border-0">Discount Rate</th>
                    <th className="border-0">Added Date</th>
                    <th className="border-0">Expiration date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dakota Rice</td>
                    <td>$36,738</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>
                      <button className="btn btn-fill btn-primary me-2">Approve</button>
                      <button
                        className="btn btn-fill btn-secondary me-2"
                        onClick={editOffer}
                      >
                        Edit
                      </button>
                      <button className="btn btn-fill btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>$23,789</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                    <td>
                      <button className="btn btn-fill btn-primary me-2">Approve</button>
                      <button
                        className="btn btn-fill btn-secondary me-2"
                        onClick={editOffer}
                      >
                        Edit
                      </button>
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

export default OffersTable;
