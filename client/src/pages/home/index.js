import React from "react";
import Navbar from "../../layout/Navbar";
import Herosection from "./Herosection";
import Category from "./Category";
import Service from "./Service";
import Aboutus from "./Aboutus";
import Footer from "../../layout/Footer";
import { CartProvider } from "../cate_product/CartContext";  // ✅ Import CartProvider

const Index = () => {
  return (
    <CartProvider>  {/* ✅ Wrap everything inside CartProvider */}
      <Navbar />
      <Herosection />
      <Category />
      <Service />
      <Aboutus />
      <Footer />
    </CartProvider>
  );
};

export default Index;
