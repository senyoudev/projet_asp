import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function CarDetails() {
  const location = useLocation();
  const carId = location.state.carId;
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Car</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Brand Name</label>
                        <Form.Select>
                            <option>Dacia</option>
                            <option>Toyota</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          defaultValue="500"
                          placeholder="Price"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Couleur</label>
                        <Form.Control
                          defaultValue="Red"
                          placeholder="Couleur"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Year</label>
                        <Form.Control
                          defaultValue="2018"
                          placeholder="Year"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Distance</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Distance(KM)"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Update Image</label>
                        <Form.Control type="file"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Car
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-user">
              <div className="card-image" style={{ height: "unset" }}>
                <img
                  alt="..."
                  src={require("../../assets/img/cars/car1.webp")}
                ></img>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarDetails;
