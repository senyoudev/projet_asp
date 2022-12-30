import { Form, Row } from "react-bootstrap";
import UsersTable from "../../components/tables/UsersTable";

function Users() {
  return (
    <>
      <Row>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </Row>
      <UsersTable />
    </>
  );
}
export default Users;
