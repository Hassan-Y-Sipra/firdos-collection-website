import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/Sidebar.css";

const Sidebar = () => {
  const navigate=useNavigate()

const logout=()=>{
  localStorage.removeItem("isLogin")
  navigate("/admin")
  
}

  return (
    <>
      <div className="valudas-dashboard-sidebar">
        <ul>
          <li>
            <NavLink to="/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to="#">
              <i className="fas fa-users"></i> User
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/category">
              <i className="fas fa-box"></i> Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/productbycategory">
            <i className="fas fa-box"></i> Product
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <i className="fas fa-user-tie"></i> Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <i className="fas fa-book"></i> Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <i className="fas fa-folder"></i> Files
            </NavLink>
          </li>
        </ul>
        <button onClick={logout}> Log out
        <i class="fa-solid fa-right-to-bracket" style={{marginLeft:"5px"}}></i>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
