import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "../../assets/css/Home.css";

const Herosection = () => {
  const [slider, setSlider] = useState([]);

  const getSliderData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getslider");
      setSlider(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSliderData();
  }, []);

  const settings = {
    dots: true, // Enable navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 3000, // Animation speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay interval in milliseconds
    // arrows: true, // Enable next/previous arrows
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slider.map((item) => (
          <div key={item} className="slide">
            <img
              src={`/uploads/${item.image}`} // Adjust path if necessary
              alt={`Slide ${item + 1}`}
              style={{ width: "100%"}}
            />
           
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Herosection;
