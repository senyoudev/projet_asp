import { Col, Form, Row } from "react-bootstrap";
import BrandsTable from "../../components/tables/BrandsTable";
import OffersTable from "../../components/tables/OffersTable";

function Brands() {
  return (
    <>
      <Row className="mb-4">
        <Col md="12">
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search User"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <BrandsTable data={[]}/>
    </>
  );
}
export default Brands;
