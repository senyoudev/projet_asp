import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Row, Col, Modal, Button, Form } from "react-bootstrap";

function BrandsTable({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Brand</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Added Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.id}</td>
                        <td>{item.libelle}</td>
                        <td>{item.dateAdded.substr(0, 10)}</td>
                        <td>
                          <button className="btn btn-fill btn-secondary me-2">
                            Edit
                          </button>
                          <button className="btn btn-fill btn-danger">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <button className="btn btn-fill btn-primary" onClick={handleShow}>
                Add Brand
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header>
            <Modal.Title style={{ margin: "unset" }}>Add Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="pb-3">
              <Col md="12">
                <Form.Group>
                  <Form.Control placeholder="Name" type="text"></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="pb-2">
              <Col md="12">
                <Form.Group>
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
              Add Brand
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BrandsTable;
