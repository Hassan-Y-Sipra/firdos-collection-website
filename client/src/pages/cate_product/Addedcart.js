import React ,{useContext}from 'react'
import { CartContext } from './CartContext'
import"../../assets/css/Addedcart.css"
import Navbar from "../../layout/Navbar"
import Footer from "../../layout/Footer"

const Addedcart = () => {
    const { cart = [], removeFromCart, incrementItem, decrementItem, totalPrice = 0 } =
    useContext(CartContext);
    console.log(totalPrice)

  return (

    <>
    <Navbar/>
      <div className='addedcart-main'>
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
              <h3 style={{ color: "black" }}>Total Price : $ {totalPrice} </h3>
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
      <Footer/>

    </>
  )
}

export default Addedcart



// import React, { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// const clientId = "464501845933-bdq50dpege11hh4976tkfl8j5oik4i3p.apps.googleusercontent.com"; // अपनी Google OAuth Client ID डालें

// const Addedcart = () => {
//   const [user, setUser] = useState(null);

//   const handleSuccess = (credentialResponse) => {
//     const decoded = jwtDecode(credentialResponse.credential); // JWT से User Info डिकोड करें
//     setUser(decoded);
//     console.log("User Info:", decoded);
//   };

//   const handleError = () => {
//     console.log("Login Failed");
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>Google OAuth Login</h2>
        
//         {user ? (
//           <div>
//             <h3>Welcome, {user.name}!</h3>
//             <p>Email: {user.email}</p>
//             <img src={user.picture} alt="User Profile" style={{ borderRadius: "50%" }} />
//           </div>
//         ) : (
//           <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
//         )}
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default  Addedcart;
