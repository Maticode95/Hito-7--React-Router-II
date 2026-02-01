import React from "react";
import CardPizza from "../components/CardPizza";
import { usePizza } from "../contexts/PizzaContext";

const Home = () => {
  const { pizzas, loading, error } = usePizza();

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
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">⚠️ Error de conexión</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            <strong>Nota:</strong> Asegúrate de que el servidor de la API esté corriendo en <code>http://localhost:5000</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mt-4">
        {pizzas && pizzas.length > 0 ? (
          <div className="row">
            {pizzas.map((pizza) => (
              <div key={pizza.id} className="col-md-4 d-flex justify-content-center">
                <CardPizza
                  id={pizza.id}
                  name={pizza.name}
                  price={pizza.price}
                  img={pizza.img}
                  ingredients={pizza.ingredients}
                  coupon={pizza.coupon}
                  hasLink={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No hay pizzas disponibles en este momento.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
