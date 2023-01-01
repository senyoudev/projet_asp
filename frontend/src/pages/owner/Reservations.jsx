import { Col, Form, Row } from "react-bootstrap";
import ReservationsTable from "../../components/tables/ReservationsTable";

function Reservations() {
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
        <label className="mb-1">Find Reservation By Date</label>
          <Form.Control
            type="date"
          />
        </Col>
        <Col md="6">
        <label className="mb-1">Search Reservation</label>
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search Reservation"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <ReservationsTable />
    </>
  );
}
export default Reservations;
