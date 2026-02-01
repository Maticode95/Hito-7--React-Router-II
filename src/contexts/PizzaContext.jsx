import React, { createContext, useContext, useState, useEffect } from 'react';

const PizzaContext = createContext();

export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizza debe ser usado dentro de PizzaProvider');
  }
  return context;
};

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todas las pizzas
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/pizzas');
        if (!response.ok) {
          throw new Error('Error al cargar las pizzas');
        }
        const data = await response.json();
        setPizzas(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar pizzas:', err);
        // Si es un error de conexión, mostrar mensaje más amigable
        if (err.message.includes('fetch') || err.name === 'TypeError') {
          setError('No se pudo conectar con el servidor. Asegúrate de que la API esté corriendo en http://localhost:5000');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Obtener una pizza por ID (no modifica el estado global de loading)
  const getPizzaById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar la pizza');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error al cargar pizza:', err);
      // Si es un error de conexión, mostrar mensaje más amigable
      if (err.message.includes('fetch') || err.name === 'TypeError') {
        throw new Error('No se pudo conectar con el servidor. Asegúrate de que la API esté corriendo en http://localhost:5000');
      }
      throw err;
    }
  };

  const value = {
    pizzas,
    loading,
    error,
    getPizzaById,
  };

  return <PizzaContext.Provider value={value}>{children}</PizzaContext.Provider>;
};
