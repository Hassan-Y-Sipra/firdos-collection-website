import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import { NavLink, useParams } from "react-router";
import "../../assets/css/ProductDetail.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);

  const { addToCart } = useContext(CartContext);

  const getProductDetail = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/getproductdetails/${id}`
      );
      setProductDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    getProductDetail();
  }, [id]);

  // const handlePayment = async (amount) => {
  //   if (!amount) {
  //     alert("Invalid product amount!");
  //     return;
  //   }

  //   const product_id = id; // Product ID from useParams

  //   const response = await fetch("http://localhost:3000/create-order", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ product_id, user_id: 1, amount }), // Send actual product amount
  //   });

  //   const { order } = await response.json();

  //   const options = {
  //     key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //     amount: order.amount, // Amount in paise (already multiplied by 100 in backend)
  //     currency: "INR",
  //     name: "Your Shop",
  //     description: "Test Transaction",
  //     order_id: order.id,
  //     handler: function (response) {
  //       alert("Payment Successful! Your order is placed.");
  //     },
  //     prefill: {
  //       name: "John Doe",
  //       email: "john@example.com",
  //       contact: "9999999999",
  //     },
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  return (
    <>
      <Navbar />
      {productDetail.map((product) => (
        <div className="product-details-container">
          <div className="product-details-image">
            <img src={`/uploads/${product.image}`} alt={product.title} />
          </div>
          <div className="product-detail-text">
            <h3>{product.title}</h3>
            <h4>Price: ${product.price}</h4>
            <p>
              Availability:{" "}
              <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <div className="ratings">
              <span>&#9733; &#9733; &#9733; &#9733; &#9734; (4.0)</span>
            </div>
            <h5>Color: {product.color}</h5>
            <div className="color-options">
              <span
                style={{ backgroundColor: "red" }}
                className="color-circle"
              ></span>
              <span
                style={{ backgroundColor: "blue" }}
                className="color-circle"
              ></span>
              <span
                style={{ backgroundColor: "green" }}
                className="color-circle"
              ></span>
            </div>
            <h5>Select Size:</h5>
            <div className="size-options">
              <button className="size-button">Small</button>
              <button className="size-button">Medium</button>
              <button className="size-button">Large</button>
              <button className="size-button">XL</button>
              <button className="size-button">XXL</button>
            </div>
            <div className="delivery-options">
              <h5>Delivery Options:</h5>
              <p>&#x1F69A; Free delivery within 3-5 business days</p>
              <p>&#x1F4B3; Cash on Delivery available</p>
            </div>
            <NavLink
              to="/checkout"
              state={{ id: product.id, price: product.price }}
              onClick={() => {
                localStorage.setItem(
                  "checkoutProduct",
                  JSON.stringify({ id: product.id, price: product.price })
                );
              }}
            >
              <button className="buy-now" onClick={() => addToCart(product)}>
                Buy Now
              </button>
            </NavLink>

            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <p>{product.desc}</p>
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
};

export default ProductDetails;
