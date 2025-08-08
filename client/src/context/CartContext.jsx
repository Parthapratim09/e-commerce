import { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const refreshCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCount(0);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        const totalItems = data.items ? data.items.length : 0;
        setCount(totalItems);
      } else {
        setCount(0);
      }
    } catch (error) {
        console.error("Failed to fetch cart:", error);
        setCount(0); 
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const value = {
    count,
    setCount,
    refreshCart, 
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
