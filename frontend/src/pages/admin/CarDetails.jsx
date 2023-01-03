import axios from 'axios';
import React, { useEffect, useState } from 'react';

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUrl } from '../../API';
import { useCar } from '../../Context/CarContext';
import { useBrand } from '../../Context/MarqueContext';

const couleurs = ['red', 'gray', 'dark', 'white'];
function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate('');

  const carId = location.state.carId;
  const type = location.state.type;
  const [carInfo, setCarInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );

  const [form, setForm] = useState({
    id: 0,
    name: '',
    desc: '',
    couleur: '',
    photo: '',
    annee: '',
    km: '',
    userId: userInfo.id,
    marqueId: '',
    prix: '',
    isAprouved: false,
    isDisponible: true,
  });
  const { getCar, editCar } = useCar('');

  const { getBrands } = useBrand('');
  const [brands, setBrands] = useState();

  const fetchData = async () => {
    const data = await getCar(carId);
    const {
      id,
      name,
      desc,
      couleur,
      photo,
      annee,
      km,
      userId,
      marqueId,
      prix,
      isAprouved,
      isDisponible,
    } = data;
    setForm({
      id,
      name,
      desc,
      couleur,
      photo,
      annee,
      km,
      userId,
      marqueId,
      prix,
      isAprouved,
      isDisponible,
    });
    const brandsList = await getBrands();
    setBrands(brandsList.value);
  };

  const EditCar = async () => {
    await editCar(form.id, form);
    navigate(`/${type}/cars`);
  };

  var photo;
  const uploadImage = async e => {
    photo = e.target.files[0];
    const formData = new FormData();
    formData.append('imageFile', photo);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const uploadPath = getUrl('upload');
    const { data } = await axios.post(
      `${uploadPath}/UploadSingle`,
      formData,
      config,
    );
    console.log(data);
    setForm({ ...form, photo: data.imageUrl });
  };

  useEffect(() => {
    if (
      userInfo != null &&
      (userInfo.role == 'Administrator' || userInfo.role == 'proprietaire')
    ) {
      fetchData();
    }
  }, [localStorage.getItem('userInfo')]);
  console.log(form);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='6'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Edit Car</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className='pr-1' md='6'>
                      <Form.Group>
                        <label>Brand Name</label>
                        <Form.Select
                          value={form.marqueId}
                          onChange={e =>
                            setForm({ ...form, marqueId: e.target.value })
                          }
                        >
                          {brands?.map((item, ind) => {
                            return (
                              <option value={item.id}>{item.libelle}</option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className='pl-1' md='6'>
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          value={form.prix}
                          onChange={e =>
                            setForm({ ...form, prix: e.target.value })
                          }
                          placeholder='Price'
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='pr-1' md='6'>
                      <Form.Group>
                        <label>Couleur</label>
                        <Form.Select
                          value={form.couleur}
                          onChange={e =>
                            setForm({ ...form, couleur: e.target.value })
                          }
                        >
                          {couleurs?.map((item, ind) => {
                            return (
                              <option value={item} key={ind}>
                                {item}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className='px-1' md='6'>
                      <Form.Group>
                        <label>Year</label>
                        <Form.Control
                          value={form.annee}
                          onChange={e =>
                            setForm({ ...form, annee: e.target.value })
                          }
                          placeholder='Year'
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='12'>
                      <Form.Group>
                        <label>Distance</label>
                        <Form.Control
                          value={form.km}
                          onChange={e =>
                            setForm({ ...form, km: e.target.value })
                          }
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='12'>
                      <Form.Group>
                        <label>Update Image</label>
                        <Form.Control
                          type='file'
                          accept='image/*'
                          onChange={uploadImage}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className='btn-fill pull-right mt-2'
                    variant='info'
                    onClick={EditCar}
                  >
                    Update Car
                  </Button>
                  <div className='clearfix'></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md='6'>
            <Card className='card-user'>
              <div className='card-image' style={{ height: 'unset' }}>
                <img alt='Car image' src={form.photo}></img>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarDetails;
