import React, { createContext, useState, useEffect } from "react";

// Create the Cart Context
export const CartContext = createContext();

// Create a Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Calculate total number of items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Increment item quantity
  const incrementItem = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement item quantity (removes if quantity is 1)
  const decrementItem = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // ✅ Remove item if quantity is 0
    );
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const numericPrice = typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^\d.]/g, "")) // Remove non-numeric characters
      : item.price;
    return total + numericPrice * item.quantity;
  }, 0);

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        addToCart,
        incrementItem,
        decrementItem,
        totalPrice,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
