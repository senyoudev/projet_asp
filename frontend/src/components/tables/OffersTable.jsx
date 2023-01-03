import moment from 'moment';
import React, { useEffect, useState } from 'react';

// react-bootstrap components
import { Card, Table, Row, Col, Form, Modal } from 'react-bootstrap';
import { useOffre } from '../../Context/OffreContext';
import { useCar } from '../../Context/CarContext';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

function OffersTable({ data, type }) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const navigate = useNavigate('');
  const { addOffer, editOffer, getOffres, deleteOffer } = useOffre('');
  const { getCars } = useCar();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    name: '',
    userId: userInfo.id,
    voitureId: '',
    tauxRemise: '',
    dateExpiration: '',
    isAprouved: false,
  });
  const [formType, setFormType] = useState();
  const [offers, setOffers] = useState(data);
  const [cars, setCars] = useState();

  const { approveOffre } = useOffre('');

  const handleImprovements = async id => {
    await approveOffre(id);
    const offers = await getOffres();
    setOffers(offers.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = async (formType, offer = null) => {
    setFormType(formType);

    const data = await getCars();
    setCars(data.value);

    if (formType === 'editOffer') {
      setForm({
        id: offer.id,
        name: offer.name,
        userId: userInfo.id,
        voitureId: offer.voiture.id,
        tauxRemise: offer.tauxRemise,
        dateExpiration: offer.dateExpiration,
        isAprouved: offer.isAprouved,
      });
    } else {
      setForm({
        id: 0,
        name: '',
        userId: userInfo.id,
        voitureId: '',
        tauxRemise: '',
        dateExpiration: '',
        isAprouved: form.isAprouved,
      });
    }
    setShow(true);
  };
  const exec = async (action, deleteId = null) => {
    if (action === 'addOffer') {
      if (userInfo != null) {
        try {
          await addOffer(form);
          const offers = await getOffres();
          setOffers(offers.value);
          handleClose();
        } catch (e) {
          toast.error('An error Occured');
        }
      } else {
        return navigate('/login');
      }
    }
    if (action === 'editOffer') {
      if (userInfo != null) {
        try {
          await editOffer(form.id, form);
          const offers = await getOffres();
          setOffers(offers.value);
          handleClose();
        } catch (e) {
          toast.error('An error Occured');
        }
      } else {
        return navigate('/login');
      }
    }
    if (action === 'deleteOffer') {
      if (userInfo != null) {
        confirmAlert({
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                await deleteOffer(deleteId);
                const offers = await getOffres();
                setOffers(offers.value);
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
    setOffers(data);
  }, [data]);
  return (
    <>
      <Row>
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Offers</Card.Title>
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    {type === 'admin' ? (
                      <th className='border-0'>Owner</th>
                    ) : null}
                    <th className='border-0'>Name</th>
                    <th className='border-0'>Discount Rate</th>
                    <th className='border-0'>Added Date</th>
                    <th className='border-0'>Expiration date</th>
                    <th className='border-0'>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers?.map(offre => (
                    <tr key={offre.id}>
                      <td>{offre.id}</td>
                      {type === 'admin' ? <td>{offre.user.username}</td> : null}
                      <td>{offre.name}</td>
                      <td>{offre.tauxRemise}</td>
                      <td>{moment(offre.dateAdded).format('DD-MM-YYYY')}</td>
                      <td>
                        {moment(offre.dateExpiration).format('DD-MM-YYYY')}
                      </td>
                      <td>
                        {offre.isAprouved ? 'Approuved' : 'Not Approuved'}
                      </td>
                      <td>
                        {type == 'admin' ? (
                          <button
                            className='btn btn-fill btn-primary me-2'
                            disabled={offre.isAprouved}
                            onClick={() => handleImprovements(offre.id)}
                          >
                            Approve
                          </button>
                        ) : null}

                        {type === 'owner' ? (
                          <button
                            className='btn btn-fill btn-success me-2'
                            onClick={() => handleShow('editOffer', offre)}
                          >
                            Edit
                          </button>
                        ) : null}
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => exec('deleteOffer', offre.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            {type === 'owner' ? (
              <Card.Footer style={{ textAlign: 'center' }}>
                <button
                  className='btn btn-fill btn-primary'
                  onClick={() => handleShow('addOffer')}
                >
                  Add Offer
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
              <Modal.Title style={{ margin: 'unset' }}>
                {formType === 'addOffer' ? 'Add Offer' : 'editOffer'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className='mb-3'>
                <Col className='pr-1' md='6'>
                  <Form.Group>
                    <label>Name</label>
                    <Form.Control
                      placeholder='Name'
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col className='pl-1' md='6'>
                  <Form.Group>
                    <label>Car</label>
                    <Form.Select
                      value={form.voitureId}
                      onChange={e =>
                        setForm({ ...form, voitureId: e.target.value })
                      }
                    >
                      <option>Select Car</option>
                      {cars?.map((item, ind) => {
                        return (
                          <option value={item.id} key={ind}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col className='pr-1' md='6'>
                  <Form.Group>
                    <label>Discount Rate</label>
                    <Form.Control
                      placeholder='Discount Rate'
                      value={form.tauxRemise}
                      onChange={e =>
                        setForm({ ...form, tauxRemise: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md='6'>
                  <Form.Group>
                    <label>Expiration date</label>
                    <Form.Control
                      type='date'
                      value={moment(form.dateExpiration).format('YYYY-MM-DD')}
                      onChange={e =>
                        setForm({ ...form, dateExpiration: e.target.value })
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
              {formType == 'addOffer' ? (
                <button
                  className='btn btn-fill btn-primary'
                  type='button'
                  onClick={() => exec('addOffer')}
                >
                  Add Offer
                </button>
              ) : (
                <button
                  className='btn btn-fill btn-primary'
                  type='button'
                  onClick={() => exec('editOffer')}
                >
                  Edit Offer
                </button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default OffersTable;
