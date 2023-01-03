import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CarsTable from "../../components/tables/CarsTable";
import { useCar } from "../../Context/CarContext";

function Cars() {
  const navigate = useNavigate('')
  const {getCars } = useCar('')
  const [cars,setCars] = useState([])
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const fetchData = async () => {
      const voitures = await getCars()
      setCars(voitures.value)
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
          <Form.Select aria-label="Car Status">
            <option value="1" defaultChecked>All</option>
            <option value="2">Available Cars</option>
            <option value="3">Reserved Cars</option>
          </Form.Select>
        </Col>
        <Col md="6">
          <Form.Control
            placeholder="Search Car"
            aria-label="Search Car"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <CarsTable type="admin" data={cars} setVoitures={setCars}/>
    </>
  );
}
export default Cars;
