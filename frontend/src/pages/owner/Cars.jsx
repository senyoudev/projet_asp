import { Col, Form, Row } from "react-bootstrap";
import CarsTable from "../../components/tables/CarsTable";
import { useEffect } from "react";
import { useCar } from "../../Context/CarContext";
import { useState } from "react";
function Cars() {
  const { getOwnerCars } = useCar();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [carsList,setCarsList] = useState([]);
  const fetchData = async () => {
    const data = await getOwnerCars();
    setCarsList(data);
  }
  useEffect(() => {
    if (userInfo != null && userInfo.role == "proprietaire") {
      fetchData();
    }
  }, [localStorage.getItem("userInfo")]);
  console.log(carsList)
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <Form.Select aria-label="Car Status">
            <option value="1" defaultChecked>
              All
            </option>
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
      <CarsTable type="owner" data={carsList} />
    </>
  );
}
export default Cars;
