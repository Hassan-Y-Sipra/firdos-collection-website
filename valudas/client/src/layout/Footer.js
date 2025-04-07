import React from "react";
import "../assets/css/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* ********************shop-heading ********** */}
      <div className="footer-heading-text">
        <p> Shop Firdos </p>
        <h4>
          Inspire and let yourself be inspired, from one unique fashion to
          another.
        </h4>
      </div>

      {/* ************************footer-section************************************* */}
      <div className="footer-section-container">
        <div className="contact-text">
          <img src="/uploads/firdos-logo.jpg" alt="" />
          <p>
            <a href="mailto:firdos99@gmail.com">Email: firdos99@gmail.com</a>
          </p>
          <p>
            <a href="tel:+919099524991">Phone: +91 9099524991</a>
          </p>
          <p>
            <a>Get direction</a>
          </p>
          <p>
            <a
              href="https://www.google.com/maps/place/Chhapi,+Gujarat+385210/@24.05002,72.1766692,11.39z/data=!4m15!1m8!3m7!1s0x395cf26aafc0e7c9:0x970ebc89fdac2103!2sChhapi,+Gujarat+385210!3b1!8m2!3d24.0271252!4d72.3850227!16s%2Fm%2F0cc6ztc!3m5!1s0x395cf26aafc0e7c9:0x970ebc89fdac2103!8m2!3d24.0271252!4d72.3850227!16s%2Fm%2F0cc6ztc!5m1!1e4?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
              target="_chhapi"
              id="link"
            >
              {" "}
              <i class="fa-solid fa-location-dot"></i>
            </a>
            <a id="link">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a id="link">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a id="link">
              <i class="fa-brands fa-youtube"></i>
            </a>
          </p>
        </div>

        <div className="information-text">
          <h6>Information</h6>
          <ul>
            <li>Blogs</li>
            <NavLink to="/about-us">

            <li>About Us</li>
            </NavLink>
            <NavLink to="/contact">

            <li>Contact Us</li>
            </NavLink>
            <li>Our Location</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div className="Categories-text">
          <h6>Categories</h6>
          <ul>
            <li>
              <a>Clothing</a>
            </li>
            <li>
              <a>Footwear</a>
            </li>
            <li>
              <a>Suits</a>
            </li>
            <li>Imitation</li>
          </ul>
        </div>

        <div className="links-text">
          <h6>Quick Links</h6>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Shipping and Handling</li>
            <li>Returns and Exchange</li>
          </ul>
        </div>
        <div className="footer-row">
          <p>right 2024 All Rights Reserved.</p>
          <img src="/uploads/indian-flag.jpg" alt="" />
          <span>INR</span>
          <i class="fa-solid fa-down-long"></i>

          <div className="whatsapp-icon">
            <a href="https://wa.me/9099524991">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
