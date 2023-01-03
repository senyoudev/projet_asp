import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OffersTable from '../../components/tables/OffersTable';
import { useOffre } from '../../Context/OffreContext';

function Offers() {
  const navigate = useNavigate('');
  const { getOffres } = useOffre('');
  const [offres, setOffres] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const offers = await getOffres();
    setOffres(offers.value);
    setFiltredData(offers.value);
  };

  const updateTable = (v = null, searchKey = null) => {
    if (searchKey == null && v != null) {
      switch (v) {
        case 'true':
          const data = offres.filter(item => {
            return item.isAprouved;
          });
          setFiltredData(data);
          break;
        case 'false':
          setFiltredData(
            offres.filter(item => {
              return item.isAprouved == false;
            }),
          );
          break;
        case 'all':
          setFiltredData(offres);
          break;
        default:
          break;
      }
    }
    if (searchKey != null && v == null) {
      const data = offres.filter(item => {
        return item.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
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
          <Form.Select onChange={e => updateTable(e.target.value)}>
            <option value={'all'}>All</option>
            <option value={true}>Approuved</option>
            <option value={false}>Not Approuved</option>
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search Offer'
            aria-label='Search User'
            aria-describedby='basic-addon2'
            onChange={e => updateTable(null, e.target.value)}
          />
        </Col>
      </Row>
      <OffersTable type='admin' data={filtredData} />
    </>
  );
}
export default Offers;
