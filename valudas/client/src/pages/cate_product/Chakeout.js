import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import { useLocation, useParams } from "react-router-dom";
import "../../assets/css/Chakeout.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";

const Chakeout = () => {
  const location = useLocation();

  // Local storage se fetch karein agar location.state me value nahi hai
  const savedProduct =
    JSON.parse(localStorage.getItem("checkoutProduct")) || {};

  const [product, setProduct] = useState({
    id: location.state?.id || savedProduct.id,
    price: location.state?.price || savedProduct.price,
  });

  useEffect(() => {
    // Agar state me valid data hai, to usko localStorage me save karein
    if (product.id && product.price) {
      localStorage.setItem("checkoutProduct", JSON.stringify(product));
    }
  }, [product]);

  console.log("Product ID:", product.id);
  console.log("Product Price:", product.price);

  // const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({
    email: "",
    country: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    code: "",
    number: "",
    paymentMethod: "",
  });
  const {
    cart = [],
    removeFromCart,
    incrementItem,
    decrementItem,
    totalPrice = 0,
  } = useContext(CartContext);

  useEffect(() => {
    // Fetch cart items from localStorage or API
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      userDetails.email &&
      userDetails.country &&
      userDetails.firstname &&
      userDetails.lastname &&
      userDetails.address &&
      userDetails.city &&
      userDetails.state &&
      userDetails.code &&
      userDetails.number &&
      userDetails.paymentMethod
    );
  };

 
  
  
  // const handlePayment = async (product) => {
  //   if (!product || !product.id || !product.price) {
  //     alert("Invalid product details!");
  //     return;
  //   }

  //   try {
  //     console.log("Sending request with data:", {
  //       product_id: product.id,
  //       user_id: 1,
  //       amount: parseInt(product.price),
  //     });

  //     const response = await fetch("http://localhost:3000/create-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         product_id: product.id,
  //         user_id: 1,
  //         amount: parseInt(product.price),
  //       }),
  //     });

  //     // window.alert("Response status:", response.status);

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("Server error response:", errorText);
  //       throw new Error(`Server responded with status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     if (!data.success || !data.order) {
  //       throw new Error("Invalid order response from server");
  //     }

  //     const { order } = data;

  //     const options = {
  //       key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: "INR",
  //       name: "Your Shop",
  //       description: "Test Transaction",
  //       order_id: order.id,
  //       handler: function (response) {
  //         alert("Payment Successful! Your order is placed.");
  //       },
  //       prefill: {
  //         name: "John Doe",
  //         email: "john@example.com",
  //         contact: "9999999999",
  //       },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     alert("Failed to initiate payment. Please check console logs.");
  //   }
  // };

  const handlePayment = async (product) => {
    if (!product || !product.id || !product.price) {
      alert("Invalid product details!");
      return;
    }
  
    try {
      console.log("Sending request with data:", {
        product_id: product.id,
        user_id: 1,
        amount: parseInt(product.price),
      });
  
      const response = await fetch("http://localhost:3000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          user_id: 1,
          amount: parseInt(product.price),
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      if (!data.success || !data.order) {
        throw new Error("Invalid order response from server");
      }
  
      const { order } = data;
  
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Your Shop",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment Successful! Your order is placed.");
          console.log("Payment Success Response:", response);
  
          // ✅ Payment ID ko Backend me save karne ka API call
          await fetch("http://localhost:3000/save-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: order.id,
              payment_id: response.razorpay_payment_id, // ✅ Save payment ID
            }),
          });
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to initiate payment. Please check console logs.");
    }
  };
  




  return (
    <>
      <Navbar />
      <div className="chakeout-container">
        {/* left side box (user address) */}
        <form>
          <div className="checkout-left">
            <div>
              <h2 className="contact">Contact</h2>
              <span>Login</span>
            </div>

            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full p-2 border mb-4"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className="Delivery-box">
              <h2>Delivery</h2>

              <span htmlFor="country">Country</span>
              <select
                id="country"
                name="country"
                onChange={handleChange}
                value={userDetails.country}
              >
                <option value="">Country/Region</option>
                <option value="IN">India</option>
                <option value="US">America</option>
                <option value="UK">Pakistan</option>
                <option value="CA">UK</option>
                <option value="AU">Saudia</option>
              </select>
            </div>

            <div>
              <div className="name-input">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={userDetails.firstname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={userDetails.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="address">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={handleChange}
                />
              </div>
              <div className="address">
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, Suite, etc. (optional)"
                />
              </div>

              <div className="city">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={userDetails.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={userDetails.state}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="code"
                  placeholder="Zip code"
                  value={userDetails.code}
                  onChange={handleChange}
                />
              </div>

              <div className="phone">
                <input
                  type="number"
                  name="number"
                  placeholder="Phone"
                  value={userDetails.number}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox-main">
                <span className="checkbox">
                  <input type="checkbox" name="checkbox" id="checkbox-input" />
                </span>
                <span>Save this information for next time</span>
              </div>
            </div>

            <select
              name="paymentMethod"
              className="w-full p-2 border mb-4"
              value={userDetails.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="phonepay">Phone Pay</option>
              <option value="razorpay">Razorpay</option>
              <option value="cod">Cash on Delivery</option>
            </select>

            <button
              type="button"
              className="btn-payment"
              onClick={() =>
                isFormValid() &&
                handlePayment(product)
              }
              disabled={!isFormValid()}
            >
              Proceed to Payment
            </button>
          </div>
        </form>

        {/* Right Side - Cart Summary */}
        <div className="addedcart-main">
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={`/uploads/${item.image}`}
                    alt={item.product}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p>{item.title}</p>
                    <p>Price : {item.price}</p>
                    <div className="quantity-controls">
                      <button
                        className="decrement-btn"
                        onClick={() => decrementItem(item.id)}
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="increment-btn"
                        onClick={() => incrementItem(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-from-cart"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <h3 style={{ color: "black" }}>
                  Total Price : $ {totalPrice}{" "}
                </h3>
              </div>
            </div>
          ) : (
            <>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "red",
                }}
              >
                You Have Not Added Any Items to the Cart...
              </h1>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "red",
                }}
              >
                Please Add Items to Proceed...
              </h1>
                  
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chakeout;
