import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CarsTable({data,type}) {
  const navigate = useNavigate();
  function editCar() {
    navigate(`/${type}/carDetails`, {
      state: {
        carId: 1,
      },
    });
  }
  function deleteCar() {}
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                    {type === "admin" ? (
                      <th className="border-0">Owner</th>
                    ) : null}
                    <th className="border-0">brand</th>
                    <th className="border-0">prix</th>
                    <th className="border-0">Added Date</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        {type === "admin" ? <td>Dakota Rice</td> : null}
                        <td>{item.marque}</td>
                        <td>{item.prix+ " DH"}</td>
                        <td>{item.dateAdded.substr(0,10)}</td>
                        <td>{item.isDisponible?"Available": "Reserved"}</td>
                        <td>
                          {type === "admin" ? (
                            <button className="btn btn-fill btn-primary me-2">
                              Approve
                            </button>
                          ) : null}
                          <button
                            className="btn btn-fill btn-secondary me-2"
                            onClick={editCar}
                          >
                            Edit
                          </button>
                          {type === "owner" ? (
                            <button className="btn btn-fill btn-danger">
                              Delete
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
            {type === "owner" ? (
              <Card.Footer style={{ textAlign: "center" }}>
                <button
                  className="btn btn-fill btn-primary"
                  onClick={handleShow}
                >
                  Add Car
                </button>
              </Card.Footer>
            ) : null}
          </Card>
        </Col>
      </Row>
      {type === "owner" ? (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Form>
            <Modal.Header>
              <Modal.Title style={{ margin: "unset" }}>Add Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="pb-3">
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <Form.Control placeholder="Name" type="text"></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1">
                  <Form.Group>
                    <Form.Control
                      placeholder="Price (DH)"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="pb-3">
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <Form.Select>
                      <option>Select Couleur</option>
                      <option>Red</option>
                      <option>Blue</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <Form.Select>
                      <option>Select Brand</option>
                      <option>Dacia</option>
                      <option>Toyota</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="pb-3">
                <Col md="6">
                  <Form.Group>
                    <Form.Control
                      placeholder="Distance(KM)"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <Form.Control
                      placeholder="Year (ex: 2018)"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="pb-2">
                <Col md="12">
                  <Form.Group>
                    <Form.Control type="file"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-fill btn-secondary"
                onClick={handleClose}
                type="reset"
              >
                Close
              </button>
              <button className="btn btn-fill btn-primary" type="button">
                Add Car
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default CarsTable;
