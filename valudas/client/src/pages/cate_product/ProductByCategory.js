import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/Productbycategory.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import PriceFilter from "./Pricefilter";

const ProductByCategory = () => {
  const [pricePopup, setPricePopup] = useState(false);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/getproductbycate/${id}`
        );
        setProducts(res.data);
        setFilteredProducts(res.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="products-container">
        <div className="video-slider">
          <video
            src="https://cdn.shopify.com/videos/c/o/v/55a7c201450e4adeb5f01a700c0571f8.mp4"
            autoPlay
            loop
            muted
            controls
            className="video-player"
          ></video>
             <div>
          <p style={{ cursor: "pointer",color:"green",marginTop:"55px",fontSize:"18px" }} onClick={() => setPricePopup(true)}>
          <i class="fa-solid fa-filter"></i>    Filter      </p>

          {/* ✅ Price Filter Component */}
          <PriceFilter
            isOpen={pricePopup}
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        </div>

        {/* ✅ Filter Button */}
     

        {/* ✅ Display Filtered Products */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={product.id || index} className="product-card">
              <img
                onClick={() => {
                  navigate(`/productdetails/${product.id}`);
                }}
                src={`/uploads/${product.image}`}
                alt="product-image"
              />
              <h3>{product.title}</h3>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found.</p> // ✅ Safe fallback
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductByCategory;
