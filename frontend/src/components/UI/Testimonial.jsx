import React from 'react';
import Slider from 'react-slick';

import '../../assets/css/testimonial.css';

import ava01 from '../../assets/all-images/ava-1.jpg';
import ava02 from '../../assets/all-images/ava-2.jpg';
import ava03 from '../../assets/all-images/ava-3.jpg';
import ava04 from '../../assets/all-images/ava-4.jpg';

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className='testimonial py-4 px-3'>
        <p className='section__description'>
          "I recently rented a car from this agency for my vacation and it was
          the best decision I could have made. The process was smooth and
          efficient, and the staff was incredibly helpful and friendly. The car
          itself was in great condition and made my trip even more enjoyable. I
          highly recommend this rental car agency to anyone 
        </p>

        <div className='mt-3 d-flex align-items-center gap-4'>
          <img src={ava01} alt='' className='w-25 h-25 rounded-2' />

          <div>
            <h6 className='mb-0 mt-3'>Jhon Doe</h6>
            <p className='section__description'>Customer</p>
          </div>
        </div>
      </div>

      <div className='testimonial py-4 px-3'>
        <p className='section__description'>
          "I have used this rental car agency multiple times for business trips
          and have always had a fantastic experience. The cars are always clean
          and well-maintained, and the booking process is quick and easy. The
          customer service is top-notch and I have never had any issues with my
          rentals. I highly recommend this agency for all of your car rental
          needs."
        </p>

        <div className='mt-3 d-flex align-items-center gap-4'>
          <img src={ava02} alt='' className='w-25 h-25 rounded-2' />

          <div>
            <h6 className='mb-0 mt-3'>Jhon Doe</h6>
            <p className='section__description'>Customer</p>
          </div>
        </div>
      </div>

      <div className='testimonial py-4 px-3'>
        <p className='section__description'>
          "As someone who travels frequently for work, I have used a lot of
          different rental car agencies. This one is by far the best. The prices
          are reasonable, the cars are always in excellent condition, and the
          staff is incredibly helpful and friendly. I have never had any issues
          with my rentals and will continue to use this agency for all of my car
          rental needs."
        </p>

        <div className='mt-3 d-flex align-items-center gap-4'>
          <img src={ava03} alt='' className='w-25 h-25 rounded-2' />

          <div>
            <h6 className='mb-0 mt-3'>Jhon Doe</h6>
            <p className='section__description'>Customer</p>
          </div>
        </div>
      </div>

      <div className='testimonial py-4 px-3'>
        <p className='section__description'>
          "I recently rented a car from this agency for a road trip with my
          family. The process was seamless and the staff was very helpful in
          finding the right car for our needs. The car itself was in great
          condition and made our trip so much more enjoyable. I highly recommend
          this rental car agency to anyone in need of a reliable and comfortable
          vehicle for their travels."
        </p>

        <div className='mt-3 d-flex align-items-center gap-4'>
          <img src={ava04} alt='' className='w-25 h-25 rounded-2' />

          <div>
            <h6 className='mb-0 mt-3'>Jhon Doe</h6>
            <p className='section__description'>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
