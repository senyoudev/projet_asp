import moment from "moment/moment";
import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-bootstrap components
import { Card, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth,loading } from "../../Context/AuthContext";
import { useFav } from "../../Context/FavListContext";
import { useBlack } from "../../Context/BlackListContext";

function UsersTable({users}) {
  const navigate = useNavigate();
  const { deleteUserByAdmin,loading} = useAuth('');
  const { addUserToFavoriteList } = useFav('');
  const { addUserToBlackList } = useBlack('');
  function editProfile(id) {
    return navigate("/admin/profile", {
      state: {
        userId: id,
      },
    });
  }
  async function deleteUser(id) {
    const data = await deleteUserByAdmin(id)
    if(data!=null) {
      toast.success('User Deleted')
    }
  }
  async function handleBlackList(id) {
     const data = await addUserToBlackList(id);
     if (data != null) {
       toast.success('user Added to blackList');
       console.log(users);
     }
  }

  async function handleFavoriteList (id)  {
    const data = await addUserToFavoriteList(id)
    if(data!=null) {
      toast.success('user Added to favlist')  
      console.log(users)
    }
  }
  return (
    <>
      <Row>
        <ToastContainer />
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Users</Card.Title>
              {loading && <Spinner animation='grow' />}
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>Username</th>
                    <th className='border-0'>Email</th>
                    <th className='border-0'>Type</th>
                    <th className='border-0'>Create Date</th>
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
                      <td>{moment(user.dateAdded).format('DD-MM-YYYY')}</td>
                      <td>
                        <button
                          className='btn btn-fill btn-info me-2'
                          onClick={() => handleFavoriteList(user.id)}
                        >
                          {user.favoriteList != null
                            ? 'Remove from Favorites'
                            : 'Add To Favorites'}
                        </button>
                        <button
                          className='btn btn-fill btn-success me-2'
                          onClick={() => handleBlackList(user.id)}
                        >
                          {user.blacklist != null ? (
                            'Remove from BlackList'
                          ) : (
                            'Add To BlackList'
                          )}
                        </button>
                        <button
                          className='btn btn-fill btn-secondary me-2'
                          onClick={() => editProfile(user.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => deleteUser(user.id)}
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
