import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../../assets/css/Home.css";

const Category = () => {
  const [category, setCategory] = useState([]);
  

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:1500/getdata");
      setCategory(res.data);
      console.log(res.data ,"ssaca")
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="category-container">
      <h1>Shop by Category</h1>
      <div className="category-images">
        {category.map((item) => (
                      <NavLink to={`/productbycategory/${item.id}`}>

          <div key={item.id} className="category-card">
              <img src={`/uploads/${item.image}`} alt={item.title} />
            <h3 className="category-title" >{item.title}</h3>
            <button className="viewmore-btn">View More <i class="fa-solid fa-arrow-right"></i></button>
          </div>
                      </NavLink>

        ))}
      </div>
      <div className="video-slider">
  <video 
    src="https://cdn.shopify.com/videos/c/o/v/55a7c201450e4adeb5f01a700c0571f8.mp4"
    autoPlay
    loop
    // muted
    controls
    className="video-player"
  ></video>
</div>
    </div>
  );
};

export default Category;
