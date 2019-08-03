import React, { Component } from 'react';
import posed from 'react-pose';

import Carousel  from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const CustomLeftArrow = ({ onClick }) => (
  <button style={{zIndex:0, }} class="react-multiple-carousel__arrow react-multiple-carousel__arrow--left" onClick={() => onClick()}></button>
);
const CustomRightArrow = ({ onClick }) => (
  <button style={{zIndex:0, }} class="react-multiple-carousel__arrow react-multiple-carousel__arrow--right" onClick={() => onClick()}></button>
);
const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
  const { totalItems, currentSlide } = carouselState;
  return (
    <div className="custom-button-group">
      <div>Current slide is {currentSlide}</div>
      <button onClick={() => previous()}>Previous slide</button>
      <button onClick={() => next()}>Next slide</button>
      <button
        onClick={() => goToSlide(Math.floor(Math.random() * totalItems + 1))}
      >
        Go to a random slide
      </button>
    </div>
  );
};



export default class MoviesListDisplayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: this.props.numberCard,
          slidesToSlide: 1, // optional, default to 1.
          paritialVisibilityGutter: -30 // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
      };
    return(

        <div style={{ marginBottom:50, width:'70vw', minWidth:700}}>
          <Carousel
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            swipeable={false}
            draggable={false}
            showDots={false}
            focusOnSelect={false}
            partialVisbile={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={false}
            customTransition="transform 400ms ease-in-out"
            transitionDuration={10}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={"desktop"}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
          {this.props.renderMoviesCarousel}
          </Carousel>


        </div>
    )
  }



}
