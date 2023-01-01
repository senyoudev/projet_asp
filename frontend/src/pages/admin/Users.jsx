import { Col, Form, Row } from "react-bootstrap";
import UsersTable from "../../components/tables/UsersTable";

function Users() {
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <Form.Select aria-label="User Type">
            <option value="1" defaultChecked>All</option>
            <option value="2">Favorite Users</option>
            <option value="3">Baned Users</option>
          </Form.Select>
        </Col>
        <Col md="6">
          <Form.Control
            placeholder="Search User"
            aria-label="Search User"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <UsersTable />
    </>
  );
}
export default Users;
