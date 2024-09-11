import React from "react";
import Slider from "react-slick";
import sliderImage1 from "../../assets/images/slider-image-1.jpeg"
import sliderImage2 from "../../assets/images/slider-image-2.jpeg"
import sliderImage3 from "../../assets/images/slider-image-3.jpeg"
import sliderImage4 from "../../assets/images/grocery-banner-2.jpeg"
import sliderImage5 from "../../assets/images/blog-img-2.jpeg"
import sliderImage6 from "../../assets/images/slider-2.jpeg"
export default function HomeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows:false,
  };

  const images = [
    { src: sliderImage1, alt: "Pictures of fresh fruit" },
    { src: sliderImage2, alt: "Nescafe cans" },
    { src: sliderImage3, alt: "Chocolate boxes" },
    { src: sliderImage4, alt: "Delicious baked goods" },
    { src: sliderImage5, alt: "Delicious foods" },
    { src: sliderImage6, alt: "Fresh vegetables" },
  ];


  return (
    <Slider {...settings}>
    {images.map((image, index) => (
      <div key={index} >
        <img
          className="w-full h-72 "src={image.src} alt={image.alt}/>
      </div>
    ))}
  </Slider>
  );
};


