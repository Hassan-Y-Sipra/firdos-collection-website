import React, { useState } from "react";
import "../../assets/css/Pricefilter.css"

const PriceFilter = ({ isOpen, products, setFilteredProducts }) => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  

  if (!isOpen) return null;

  // ✅ Filter Function
  const handlePriceChange = () => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="price-filter">
      <h3>Filter by Price</h3>

      <label>Min Price: </label>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />

      <label>Max Price: </label>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />

      <button onClick={handlePriceChange}> Filter</button>
    </div>
  );
};

export default PriceFilter;
