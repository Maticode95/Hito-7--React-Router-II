import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailPizza from "../components/DetailPizza";
import { usePizza } from "../contexts/PizzaContext";

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPizzaById } = usePizza();

  useEffect(() => {
    const loadPizza = async () => {
      try {
        setLoading(true);
        setError(null);
        const pizzaData = await getPizzaById(id);
        setPizza(pizzaData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPizza();
  }, [id, getPizzaById]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error al cargar la pizza: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <DetailPizza pizza={pizza} />
    </div>
  );
};

export default Pizza;
