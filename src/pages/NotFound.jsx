import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Página no encontrada</h2>
          <p className="lead mb-4">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
