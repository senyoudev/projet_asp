import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/car-item.css";

const CarItem = ({ item }) => {

  console.log(item);
  console.log("fuuuck")

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">

        {console.log(item)}
        {/* <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div> */}

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{item.name}</h4>
          <h6 className="rent__price text-center mt-">
            ${item.prix}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            {/* <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {marque}
            </span> */}
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> automatic
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${item.name}`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/carsDetails/1`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
