import React, { useContext, useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import "../assets/css/Navbar.css";
import { CartContext } from "../pages/cate_product/CartContext";
// import InstagramLogin from "react-instagram-login";

const clientId =
  "464501845933-bdq50dpege11hh4976tkfl8j5oik4i3p.apps.googleusercontent.com";

const Navbar = () => {
  const { cartItemCount } = useContext(CartContext);
  const [loginPopup, setLoginPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ 1️⃣ Check Local Storage for User Data when Page Loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ 2️⃣ Google Login Success
  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    setLoginPopup(false); 

    // Save user in database
    await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      }),
    });

    setLoginPopup(false);
  };

  const handleLogout = async () => {
    if (user) {
      // Remove user from database
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      setProfilePopup(false);

      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // const handleInstagramSuccess = (response) => {
  //   console.log("Instagram Login Success:", response);
  //   setUser(response);
  //   localStorage.setItem("user", JSON.stringify(response));
  //   setUserLoginPopup(false);
  // };

  // const handleInstagramFailure = () => {
  //   console.log("Instagram Login Failed");
  // };

  return (
    <>
      <div className="navbar-container">
        <div className="header-panel">
          <div className="logo">
            <img src="/uploads/firdos-logo.jpg" alt="Logo" />
          </div>
          <div className="header-links">
            <span>Ideas Rewards</span>
            <span>Return & Exchanges</span>
            <span>Track Order</span>
            <span>Look Book</span>
          </div>
          <div className="custom-links">
            <i className="fa-solid fa-magnifying-glass"></i>

            {/* 🔥 If User is Logged in, Show Profile Picture */}
            {user ? (
              
              <img
                src={user.picture}
                alt="User Profile"
                className="user-profile-icon"
                onClick={() => setProfilePopup(true)}
              />
            ) : (
              <i
                className="fa-regular fa-user"
                onClick={() => setLoginPopup(true)}
              ></i>
            )}


            <NavLink to="/addedcart">
              <i className="fa-solid fa-bag-shopping"></i>
            </NavLink>

            <span className="badge">{cartItemCount}</span>

            <img
              src="/uploads/indian-flag.jpg"
              alt="India Flag"
              className="indian-flag-img"
            />
          </div>
        </div>

        <div className="header-main-menu">
          <ul>
            <li>
              <NavLink to="">
                <b>New Year Sale</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Limited Edition</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Winter 24</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Ideas Home</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Men</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Salt</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Women</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Shoes</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Kids</b>
              </NavLink>
            </li>
            <li>
              <NavLink to="">
                <b>Bags</b>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔥 Google Login Popup */}
        {/* ✅ Google Login Popup */}
        
        {loginPopup && (
  <div className="popup-overlay">
    <GoogleOAuthProvider clientId={clientId}>
      <div className="popup-box">
        <button onClick={() => setLoginPopup(false)} className="popup-close">×</button>
        <h3>Login</h3>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        
        <NavLink to="https://accounts.google.com/signin/recovery" target="_blank" rel="noopener noreferrer">
          <span>Forgot Your Password ?</span>
        </NavLink>

        <GoogleLogin onSuccess={handleSuccess} />

        <NavLink to="https://accounts.google.com/signup">
          <span>Create new Account</span>                           
        </NavLink>
      </div>
    </GoogleOAuthProvider>
  </div>
)}

{profilePopup && user && (
  <div className="popup-overlay">
    <div className="popup-box">
      <button onClick={() => setProfilePopup(false)} className="popup-close">×</button>
      <img src={user.picture} alt="User Profile" className="popup-profile" />
      <h3>Welcome, {user.name}!</h3>
      <p>Email: {user.email}</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
