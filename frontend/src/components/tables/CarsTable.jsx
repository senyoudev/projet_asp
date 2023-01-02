import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// react-bootstrap components
import { Card, Table, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../API';
import { useCar } from '../../Context/CarContext';
import { useBrand } from '../../Context/MarqueContext';

function CarsTable({ data, type }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [show, setShow] = useState(false);
  const { approveCar } = useCar('');
  function editCar(id) {
    navigate(`/${type}/carDetails`, {
      state: {
        carId: id,
      },
    });
  }
  const [form, setForm] = useState({
    name: '',
    couleur: '',
    photo: '',
    anne: '',
    km: '',
    userId: userInfo.id,
    marqueId: '',
    prix: '',
    isAprouved: false,
    isDisponible: true,
  });
  const { getBrands } = useBrand('');
  const [brands, setBrands] = useState();

<<<<<<< HEAD
  const approveVoiture = async(id) => {
    await approveCar(id)
  }

 
  function deleteCar() {}
  const [show, setShow] = useState(false);
=======
  const [cars, setCars] = useState(data);
>>>>>>> origin/main

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const marques = await getBrands();
    setBrands(marques.value);
    setShow(true);
  };
  const { addCar, deleteCar, getOwnerCars } = useCar('');
  const exec = async (action, deleteId = null) => {
    if (action === 'addCar') {
      if (userInfo != null) {
        //setUploading(true);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        const uploadPath = getUrl('upload');
        const { data } = await axios.post(
          `${uploadPath}/UploadSingle`,
          { imageFile: photo },
          config,
        );
        console.log(data);
        //setUploading(false);
        setForm({ ...form, photo: data.imageUrl });
        const res = await addCar(form);
        console.log(res);
        const cars = await getOwnerCars(userInfo.id);
        setCars(cars.value);
        //handleClose();
      } else {
        return navigate('/login');
      }
    }
    if (action === 'deleteCar') {
      if (userInfo != null) {
        confirmAlert({
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                const res = await deleteCar(deleteId);
                const marques = await getOwnerCars(userInfo.id);
                setCars(marques.value);
              },
            },
            {
              label: 'No',
            },
          ],
        });
      } else {
        return navigate('/login');
      }
    }
  };
  var photo;
  const uploadImage = async e => {
    photo = e.target.files[0];
  };
  useEffect(() => {
    setCars(data);
  }, [data]);

  return (
    <>
      <Row>
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Cars</Card.Title>
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    {type === 'admin' ? (
                      <th className='border-0'>Owner</th>
                    ) : null}
                    <th className='border-0'>brand</th>
                    <th className='border-0'>prix</th>
                    <th className='border-0'>Added Date</th>
                    <th className='border-0'>Status</th>
                    <th className='border-0'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars?.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.id}</td>
                        {type === 'admin' ? (
                          <td>{item.user.username}</td>
                        ) : null}
                        <td>{item?.marque.libelle}</td>
                        <td>{item?.prix + ' DH'}</td>
                        <td>{moment(item.dateAdded).format('DD-MM-YYYY')}</td>
                        <td>
                          {item?.isAprouved ? 'Approuved' : 'Not Approuved'}
                        </td>
                        <td>
<<<<<<< HEAD
                          {type === "admin" ? (
                            <button className="btn btn-fill btn-primary me-2" onClick={() => approveVoiture(item.id)}>
=======
                          {type === 'admin' ? (
                            <button className='btn btn-fill btn-primary me-2'>
>>>>>>> origin/main
                              Approve
                            </button>
                          ) : null}
                          <button
                            className='btn btn-fill btn-secondary me-2'
                            onClick={() => editCar(item.id)}
                          >
                            Edit
                          </button>
                          {type === 'owner' ? (
                            <button className='btn btn-fill btn-danger'>
                              Delete
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
            {type === 'owner' ? (
              <Card.Footer style={{ textAlign: 'center' }}>
                <button
                  className='btn btn-fill btn-primary'
                  onClick={handleShow}
                >
                  Add Car
                </button>
              </Card.Footer>
            ) : null}
          </Card>
        </Col>
      </Row>
      {type === 'owner' ? (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Form>
            <Modal.Header>
              <Modal.Title style={{ margin: 'unset' }}>Add Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className='pb-3'>
                <Col className='pl-1' md='6'>
                  <Form.Group>
                    <Form.Control
                      placeholder='Name'
                      type='text'
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className='pr-1'>
                  <Form.Group>
                    <Form.Control
                      placeholder='Price (DH)'
                      type='text'
                      value={form.prix}
                      onChange={e => setForm({ ...form, prix: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='pb-3'>
                <Col className='pr-1' md='6'>
                  <Form.Group>
                    <Form.Select
                      value={form.couleur}
                      onChange={e =>
                        setForm({ ...form, couleur: e.target.value })
                      }
                    >
                      <option>Select Couleur</option>
                      <option value={'red'}>Red</option>
                      <option value={'gray'}>Gray</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className='pr-1' md='6'>
                  <Form.Group>
                    <Form.Select
                      value={form.marqueId}
                      onChange={e =>
                        setForm({ ...form, marqueId: e.target.value })
                      }
                    >
                      <option>Select Brand</option>
                      {brands?.map((item, ind) => {
                        return (
                          <option value={item.id} key={ind}>
                            {item.libelle}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='pb-3'>
                <Col md='6'>
                  <Form.Group>
                    <Form.Control
                      value={form.km}
                      onChange={e => setForm({ ...form, km: e.target.value })}
                      placeholder='Distance(KM)'
                      type='text'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className='pl-1' md='6'>
                  <Form.Group>
                    <Form.Control
                      placeholder='Year (ex: 2018)'
                      type='text'
                      value={form.anne}
                      onChange={e => setForm({ ...form, anne: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='pb-2'>
                <Col md='12'>
                  <Form.Group>
                    <Form.Control
                      type='file'
                      accept='image/*'
                      onChange={uploadImage}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button
                className='btn btn-fill btn-secondary'
                onClick={handleClose}
                type='reset'
              >
                Close
              </button>
              <button
                className='btn btn-fill btn-primary'
                type='button'
                onClick={() => exec('addCar')}
              >
                Add Car
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default CarsTable;
