import moment from "moment/moment";
import React from "react";

// react-bootstrap components
import { Card, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UsersTable({users}) {
  const navigate = useNavigate();
  function editProfile() {
    navigate("/admin/profile", {
      state: {
        userId: 1,
      },
    });
  }
  function deleteUser() {}
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Users</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Username</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Type</th>
                    <th className="border-0">Create Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 
                     {users?.map(user => (
                  <tr>
                         <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{moment(user.dateAdded).format("DD-MM-YYYY")}</td>
                    <td>
                      <button className="btn btn-fill btn-info me-2">
                        Favorite
                      </button>
                      <button className="btn btn-fill btn-success me-2">
                        Ban
                      </button>
                      <button
                        className="btn btn-fill btn-secondary me-2"
                        onClick={editProfile}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-fill btn-danger"
                        onClick={deleteUser}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                      ))}
                    
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UsersTable;
