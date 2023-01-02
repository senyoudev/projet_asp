import React from "react";
import CarItem from "../components/Cards/CarItem";
import { Col,Row,Container, Form} from "react-bootstrap"
import carData from "../assets/Data/carData";
import {useCar } from "../Context/CarContext"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';



function CarsListing() {
const navigate = useNavigate('')
  const {getCars, loading, setLoading} = useCar('')
  const [cars,setCars] = useState([])
  
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const fetchData = async () => {
    setLoading(true)
     const car = await getCars()
     console.log(car.value)
     setCars(car.value)
     if(cars!=null){
      setLoading(false)
     }

   }
  
  useEffect(()=> {
    
   if(userInfo != null) {
     fetchData()
     setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
   } else {
     return navigate('/login')
   }
  },[localStorage.getItem('userInfo')])
  console.log("nnnn")
   console.log(cars)
  
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

           {
            !loading  ?
            cars.map((item) => (
             
              <CarItem item={item} key={item.id} />
            ))
            :
            <Spinner animation="grow"  />
          }
           
          </Row>
        </Container>
      </section>
  )
}


export default CarsListing;
