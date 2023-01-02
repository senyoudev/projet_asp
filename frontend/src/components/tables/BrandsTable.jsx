import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';

// react-bootstrap components
import { Card, Table, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../../Context/MarqueContext';
import { confirmAlert } from 'react-confirm-alert';

function BrandsTable({ data }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    id: '',
    libelle: '',
    dateAdded: '',
  });
  const [formType, setFormType] = useState();
  const [brands, setBrands] = useState(data);

  const handleClose = () => setShow(false);
  const handleShow = (formType, brand = null) => {
    setFormType(formType);
    if (formType === 'editForm') {
      setForm({
        id: brand.id,
        libelle: brand.libelle,
        dateAdded: moment(brand.dateAdded).format('YYYY-DD-MM'),
      });
    } else {
      setForm({ id: '', libelle: '', dateAdded: '' });
    }
    setShow(true);
  };
  const navigate = useNavigate('');
  const { addBrand, editBrand, getBrands, deleteBrand } = useBrand('');
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const exec = async (action, deleteId = null) => {
    if (action === 'addBrand') {
      if (userInfo != null) {
        const res = await addBrand({
          libelle: form.libelle,
          dateAdded: form.dateAdded,
        });
        const marques = await getBrands();
        setBrands(marques.value);
        handleClose();
      } else {
        return navigate('/login');
      }
    }
    if (action === 'editBrand') {
      if (userInfo != null) {
        const res = await editBrand(form.id, form);
        const marques = await getBrands();
        setBrands(marques.value);
        handleClose();
      } else {
        return navigate('/login');
      }
    }
    if (action === 'deleteBrand') {
      if (userInfo != null) {
        confirmAlert({
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                const res = await deleteBrand(deleteId);
                const marques = await getBrands();
                setBrands(marques.value);
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
  useEffect(() => {
    setBrands(data);
  }, [data]);
  return (
    <>
      <Row>
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Brand</Card.Title>
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>Name</th>
                    <th className='border-0'>Added Date</th>
                  </tr>
                </thead>
                <tbody>
                  {brands?.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.id}</td>
                        <td>{item.libelle}</td>
                        <td>{moment(item.dateAdded).format('DD-MM-YYYY')}</td>
                        <td>
                          <button
                            className='btn btn-fill btn-secondary me-2'
                            onClick={() => handleShow('editForm', item)}
                          >
                            Edit
                          </button>
                          <button
                            className='btn btn-fill btn-danger'
                            onClick={() => exec('deleteBrand', item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'center' }}>
              <button
                className='btn btn-fill btn-primary'
                onClick={() => handleShow('addBrand')}
              >
                Add Brand
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Form>
          <Modal.Header>
            <Modal.Title style={{ margin: 'unset' }}>Add Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='pb-3'>
              <Col md='12'>
                <Form.Group>
                  <Form.Control
                    placeholder='Name'
                    type='text'
                    value={form.libelle}
                    onChange={e =>
                      setForm({
                        ...form,
                        libelle: e.target.value,
                      })
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className='pb-2'>
              <Col md='12'>
                <Form.Group>
                  <Form.Control
                    type='date'
                    value={form.dateAdded}
                    onChange={e =>
                      setForm({
                        ...form,
                        dateAdded: e.target.value,
                      })
                    }
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
            {formType == 'addBrand' ? (
              <button
                className='btn btn-fill btn-primary'
                type='button'
                onClick={() => exec('addBrand')}
              >
                Add Brand
              </button>
            ) : (
              <button
                className='btn btn-fill btn-primary'
                type='button'
                onClick={() => exec('editBrand')}
              >
                Edit Brand
              </button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BrandsTable;
