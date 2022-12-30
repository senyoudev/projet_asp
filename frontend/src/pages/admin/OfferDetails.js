import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function OfferDetails() {
  const location = useLocation();
  const carId = location.state.carId;
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Offer</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Discount Rate</label>
                        <Form.Control
                          placeholder="Discount Rate"
                          defaultValue="0"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Car</label>
                        <Form.Select>
                          <option>DACIA Sandro</option>
                          <option>DACIA Logan</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Added date</label>
                        <Form.Control disabled type="date"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Expiration date</label>
                        <Form.Control type="date"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Owner</label>
                        <Form.Control
                          defaultValue="User"
                          placeholder="Owner"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Offer
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OfferDetails;
