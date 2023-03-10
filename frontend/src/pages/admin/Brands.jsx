import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BrandsTable from '../../components/tables/BrandsTable';
import { useBrand } from '../../Context/MarqueContext';

function Brands() {
  const navigate = useNavigate('');
  const { getBrands } = useBrand('');
  const [brands, setBrands] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const marques = await getBrands();
    setBrands(marques.value);
    setFiltredData(marques.value)
  };

  const search = searchKey => {
    const data = brands.filter(item => {
      return item.libelle.toLowerCase().search(searchKey.toLowerCase()) != -1;
    });
    setFiltredData(data);
    
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
        <Col md='12'>
          <Form.Control
            placeholder='Search Brand'
            aria-label='Search User'
            aria-describedby='basic-addon2'
            onChange={e => search(e.target.value)}
          />
        </Col>
      </Row>
      <BrandsTable data={filtredData} />
    </>
  );
}
export default Brands;
