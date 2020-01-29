import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import carouselimg1 from '../../assets/carouselslide1.png'
import carouselimg2 from '../../assets/carouselslide2.png'
import carouselimg3 from '../../assets/carouselslide3.png'

import './carousel.scss'

const ControlledCarousel = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };
  
    return (
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carouselimg1}
            alt="First slide"
          />
                    <div className="carousel-text-container"> 
          <h1> Could you be our next winner? </h1>
          <p> Thousands of dollars in prizes to be won daily </p> 
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={carouselimg2}
            alt="First slide"
          />
                    <div className="carousel-text-container"> 
          <h1> Could you be our next winner? </h1>
          <p> Thousands of dollars in prizes to be won daily </p> 
          </div>
        </Carousel.Item>
        <Carousel.Item >
        <img
            className="d-block w-100"
            src={carouselimg3}
            alt="First slide"
          />
          <div className="carousel-text-container"> 
          <h1> Could you be our next winner? </h1>
          <p> Thousands of dollars in prizes to be won daily </p> 
          </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  export default ControlledCarousel