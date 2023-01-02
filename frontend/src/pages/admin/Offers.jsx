import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OffersTable from "../../components/tables/OffersTable";
import { useOffre } from "../../Context/OffreContext";

function Offers() {
  const navigate = useNavigate('')
  const { getOffres } = useOffre('')
  const [offres,setOffres] = useState([])
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const fetchData = async () => {
      const offers = await getOffres()
      setOffres(offers.value)
      console.log(offers.value)
    }

  useEffect(() => {
    if (userInfo != null) {
      fetchData();
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    } else {
      return navigate('/login');
    }
  }, [localStorage.getItem('userInfo'), offres]);
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <Form.Select aria-label="User Type">
            <option value="1" defaultChecked>All</option>
            <option value="2">Accepted Offers</option>
            <option value="3">Rejected Offers</option>
          </Form.Select>
        </Col>
        <Col md="6">
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search User"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <OffersTable type="admin" data={offres}/>
      


    </>
  );
}
export default Offers;
