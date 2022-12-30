import React from "react";

// react-bootstrap components
import { Button, Card, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CarsTable() {
  const navigate = useNavigate();
  function editCar() {
    navigate("/admin/carDetails", {
      state: {
        carId: 1,
      },
    });
  }
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Cars</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Owner</th>
                    <th className="border-0">brand</th>
                    <th className="border-0">prix</th>
                    <th className="border-0">Added Date</th>
                    <th className="border-0">Actions</th>
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
                      <button className="btn btn-fill btn-primary me-2">
                        Approve
                      </button>
                      <button
                        className="btn btn-fill btn-secondary"
                        onClick={editCar}
                      >
                        Edit
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
                      <button className="btn btn-fill btn-primary me-2">
                        Approve
                      </button>
                      <button
                        className="btn btn-fill btn-secondary"
                        onClick={editCar}
                      >
                        Edit
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

export default CarsTable;
