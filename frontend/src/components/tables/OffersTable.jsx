import moment from "moment";
import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Row, Col, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OffersTable({data,type}) {
  const navigate = useNavigate();
  function editOffer() {
    navigate(`/${type}/offerDetails`, {
      state: {
        userId: 1,
      },
    });
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                    <th className="border-0">ID</th>
                    {type === "admin" ? (
                      <th className="border-0">Owner</th>
                    ) : null}
                    <th className="border-0">Discount Rate</th>
                    <th className="border-0">Added Date</th>
                    <th className="border-0">Expiration date</th>
                    <th className="border-0">Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {data?.map(offre => (
                   <tr key={offre.id}>
                    <td>{offre.id}</td>
                    {type === "admin" ? <td>Dakota Rice</td> : null}

                    <td>{offre.tauxRemise}</td>
                    <td>{moment(offre.dateAdded).format("DD-MM-YYYY")}</td>
                    <td>{moment(offre.dateExpiration).format("DD-MM-YYYY")}</td>
                    <td>{offre.isAprouved ? 'Approuved' : 'Not Approuved'}</td>
                    <td>
                      {type === "admin" ? (
                        <button className="btn btn-fill btn-primary me-2">
                          Approve
                        </button>
                      ) : null}
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
                 ))}
                 
                </tbody>
              </Table>
            </Card.Body>
            {type === "owner" ? (
              <Card.Footer style={{ textAlign: "center" }}>
                <button
                  className="btn btn-fill btn-primary"
                  onClick={handleShow}
                >
                  Add Offer
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
              <Row className="mb-3">
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label>Discount Rate</label>
                    <Form.Control
                      placeholder="Discount Rate"
                    />
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <label>Car</label>
                    <Form.Select>
                      <option>Select Car</option>
                      <option>Dacia Logan xxx</option>
                      <option>Toyota eee</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="12">
                  <Form.Group>
                    <label>Expiration date</label>
                    <Form.Control type="date"></Form.Control>
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
                Add Offer
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default OffersTable;
