import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BrandsTable from "../../components/tables/BrandsTable";
import OffersTable from "../../components/tables/OffersTable";
import { useBrand } from "../../Context/MarqueContext";

function Brands() {
    const navigate = useNavigate('');
    const { getBrands } = useBrand('');
    const [brands, setBrands] = useState([]);
    const [userInfo, setUserInfo] = useState(
      JSON.parse(localStorage.getItem('userInfo')),
    );
    const fetchData = async () => {
      const marques = await getBrands();
      setBrands(marques.value);
      console.log(marques.value);
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
      <Row className="mb-4">
        <Col md="12">
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search User"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <BrandsTable data={brands}/>
    </>
  );
}
export default Brands;
