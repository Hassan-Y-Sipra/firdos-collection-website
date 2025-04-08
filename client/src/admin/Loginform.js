import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Loginform.css";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const admin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/adminlogin", {
        username: username,
        password: password,
      })
      .then((res) => {
          localStorage.setItem("isLogin", "true");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <div className="loginform-container">
        <h1>VALUDAS</h1>
        <p>Please enter your username and password</p>
        <form>
          <p>
            <label>username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={username}
            />
          </p>

          <p>
            <label>password</label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </p>
          <button onClick={admin}> Login</button>
        </form>
      </div>
    </>
  );
};

export default Loginform;
