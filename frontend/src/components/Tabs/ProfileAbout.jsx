import React, { useState } from 'react';
import {
  Row,
  Card,
  Accordion,
  Button,
  Col,
  Placeholder,
} from 'react-bootstrap';



function ProfileAbout({ loading }) {



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = lang => {
    setShow(true);
  };


    return (
     <>
                <Row style={{ margin: '0 auto' }} >
                    <Card >
                        <Card.Header className='d-flex justify-content-between' style={{ backgroundColor: 'transparent' }}>
                            <Card.Title style={{ color: '#000' }}>Description</Card.Title>
                            <Button className='back-btn' >
                                Edit description
                            </Button>

                        </Card.Header>
                        <Card.Body>

                            <Card.Text className='d-flex justify-content-between align-items-center' as={'p'} style={{ margin: '5px 0' }}>
                                {(<span>Please provide some informations about you</span>)}

                            </Card.Text>

                        </Card.Body>

                    </Card>
                </Row>
             
            
            </>
    )
}

export default ProfileAbout;
