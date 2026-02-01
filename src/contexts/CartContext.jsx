import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    }
  }, []);

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pizza.id);

      if (existingItem) {
        // Si ya existe, aumentar la cantidad
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con count: 1
        return [...prevCart, { ...pizza, count: 1 }];
      }
    });
  };

  // Remover producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Aumentar cantidad de un producto
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Disminuir cantidad de un producto
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  // Calcular el total del carrito
  const getTotal = () => {
    return cart.reduce((acc, item) => {
      // Si hay un cupón, aplicar el descuento
      let itemPrice = item.price;
      if (item.coupon) {
        itemPrice = itemPrice * (1 - item.coupon.discount / 100);
      }
      return acc + itemPrice * item.count;
    }, 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.count, 0);
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal,
    getTotalItems,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
