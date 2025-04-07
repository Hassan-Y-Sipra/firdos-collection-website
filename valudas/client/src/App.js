import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loginform from "./admin/Loginform";
import Dashboard from "./admin/Dashboard";
import Header from "./admin/Header";
import Sidebar from "./admin/Sidebar";
import Product from "./admin/Product";
import Conform from "./admin/Conform";
import HomeRoute from "./routes/HomeRoute";
import Cate_productRoute from "./routes/Cate_productRoute";
import ProductByCate from "./admin/ProductByCate";
import ContactRoute from "./routes/ContactRoute";
import AboutusRoute from "./routes/AboutusRoute";

const App = () => {
  return (
    <>
      <Routes>
        {/* ********admin ******************* */}
        <Route path="/admin" element={<Loginform />} />
        <Route path="/header" element={<Header />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/category"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route path="/confirm" element={<Conform />} />

        {/* *****product by category admin panel */}
        <Route
          path="/dashboard/productbycategory"
          element={
            <PrivateRoute>
              <ProductByCate />
            </PrivateRoute>
          }
        />
      </Routes>

      {/***************store front ***************/}
      <HomeRoute />
      <Cate_productRoute />
      <ContactRoute/>
      <AboutusRoute/>
    </>
  );
};

function PrivateRoute({ children }) {
  const isLoddedIn = localStorage.getItem("isLogin");
  return isLoddedIn ? children : <Navigate to="/admin" />;
}

export default App;
