import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../../components/tables/UsersTable';
import { useAuth } from '../../Context/AuthContext';

function Users() {
  const navigate = useNavigate('');
  const { getUsers } = useAuth('');
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const clients = await getUsers();
    setUsers(clients?.value);
    setFiltredData(clients?.value);
  };

  const updateTable = (v = null, searchKey = null) => {
    if (v != null && searchKey == null) {
      switch (v) {
        case 'favorite':
          const data = users.filter(item => {
            return item.favoriteList != null;
          });
          console.log(data);
          setFiltredData(data);
          break;
        case 'baned':
          setFiltredData(
            users.filter(item => {
              return item.blacklist != null;
            }),
          );
          break;
        case 'all':
          setFiltredData(users);
          break;
        default:
          break;
      }
    }
    if(searchKey != null && v == null){
      const data = users.filter(item => {
        return item.username.toLowerCase().search(searchKey.toLowerCase()) != -1;
      });
      console.log(data);
      setFiltredData(data);
    }
  };

  useEffect(() => {
    if (userInfo != null) {
      fetchData();
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    } else {
      return navigate('/login');
    }
  }, [localStorage.getItem('userInfo')]);
  return (
    <>
      <Row className='mb-4'>
        <Col md='6'>
          <Form.Select
            aria-label='User Type'
            onChange={e => updateTable(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='favorite'>Favorite Users</option>
            <option value='baned'>Baned Users</option>
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search User'
            aria-label='Search User'
            aria-describedby='basic-addon2'
            onChange={(e)=>updateTable(null,e.target.value)}
          />
        </Col>
      </Row>
      <UsersTable users={filtredData} setUsers={setUsers} />
    </>
  );
}
export default Users;
