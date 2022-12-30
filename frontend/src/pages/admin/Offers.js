import { Col, Form, Row } from "react-bootstrap";
import OffersTable from "../../components/tables/OffersTable";

function Offers() {
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <Form.Select aria-label="User Type">
            <option value="1" defaultChecked>All</option>
            <option value="2">Accepted Offers</option>
            <option value="3">Rejected Offers</option>
          </Form.Select>
        </Col>
        <Col md="6">
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search User"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <OffersTable />
    </>
  );
}
export default Offers;
