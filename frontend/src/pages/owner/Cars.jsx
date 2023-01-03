import { Col, Form, Row } from 'react-bootstrap';
import CarsTable from '../../components/tables/CarsTable';
import { useEffect } from 'react';
import { useCar } from '../../Context/CarContext';
import { useState } from 'react';
function Cars() {
  const { getOwnerCars } = useCar();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [carsList, setCarsList] = useState([]);
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const data = await getOwnerCars(userInfo.id);
    setCarsList(data.value);
    setFiltredData(data.value);
  };

  const updateTable = (v=null,searchKey=null) => {
    if (searchKey == null && v != null) {
      switch (v) {
        case 'true':
          const data = carsList.filter(item => {
            return item.isAprouved;
          });
          console.log(data);
          setFiltredData(data);
          break;
        case 'false':
          setFiltredData(
            carsList.filter(item => {
              return item.isAprouved == false;
            }),
          );
          break;
        case 'all':
          setFiltredData(carsList);
          break;
        default:
          break;
      }
    }

    if (searchKey != null && v == null) {
      const data = carsList.filter(item => {
        return item.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
      });
      console.log(data);
      setFiltredData(data);
    }
  };

  useEffect(() => {
    if (userInfo != null && userInfo.role == 'proprietaire') {
      fetchData();
    }
  }, [localStorage.getItem('userInfo')]);
  return (
    <>
      <Row className='mb-4'>
        <Col md='6'>
          <Form.Select onChange={e => updateTable(e.target.value)}>
            <option value={'all'}>All</option>
            <option value={true}>Approuved</option>
            <option value={false}>Not Approuved</option>
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search Car'
            aria-label='Search Car'
            aria-describedby='basic-addon2'
            onChange={(e)=>updateTable(null,e.target.value)}
          />
        </Col>
      </Row>
      <CarsTable type='owner' data={filtredData} />
    </>
  );
}
export default Cars;
