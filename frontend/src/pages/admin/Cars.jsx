import { Col, Form, Row } from "react-bootstrap";
import CarsTable from "../../components/tables/CarsTable";

function Cars() {
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <Form.Select aria-label="Car Status">
            <option value="1" defaultChecked>All</option>
            <option value="2">Available Cars</option>
            <option value="3">Reserved Cars</option>
          </Form.Select>
        </Col>
        <Col md="6">
          <Form.Control
            placeholder="Search Car"
            aria-label="Search Car"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <CarsTable type="admin"/>
    </>
  );
}
export default Cars;
