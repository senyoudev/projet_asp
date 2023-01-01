import React from "react";
import CarItem from "../components/Cards/CarItem";
import { Col,Row,Container, Form} from "react-bootstrap"
import carData from "../assets/Data/carData";

function CarsListing() {
  return (
     <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> <h6>Sort By</h6>
                   <Form.Control as="select" className='my-2'>
                                    <option value="">Choose a value</option>
                                    <option value="marque">marque</option>
                                    <option value="proprietaire">Owner</option>
                </Form.Control>
                </span>

                
               
              </div>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
  )
}

export default CarsListing;
