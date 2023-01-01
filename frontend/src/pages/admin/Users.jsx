import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../components/tables/UsersTable";
import { useAuth } from "../../Context/AuthContext";

function Users() {
     const navigate = useNavigate('')
  const {getUsers } = useAuth('')
  const [users,setUsers] = useState([])
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const fetchData = async () => {
      const clients = await getUsers()
      setUsers(clients.value)
      console.log(clients.value)
    }

  useEffect(()=> {
     
    if(userInfo != null) {
      fetchData()
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
    } else {
      return navigate('/login')
    }
  },[localStorage.getItem('userInfo')])
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
      <UsersTable users={users}/>

      
    </>
  );
}
export default Users;
