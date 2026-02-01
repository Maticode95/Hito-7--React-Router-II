import React from "react";
import "./DetailPizza.css";
import { useCart } from "../contexts/CartContext";

const DetailPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  if (!pizza) {
    return <div className="container mt-4">Cargando...</div>;
  }

  const { id, name, price, img, ingredients, coupon, desc } = pizza;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      img,
      ingredients,
      coupon,
    });
  };

  return (
    <div className="detail-pizza-container">
      <div className="container">
        <div className="row">
          {/* Imagen de la pizza */}
          <div className="col-md-6 mb-4">
            <div className="detail-pizza-image-wrapper">
              <img
                src={img}
                alt={name}
                className="detail-pizza-image"
              />
            </div>
          </div>

          {/* Información de la pizza */}
          <div className="col-md-6">
            <div className="detail-pizza-info">
              <h1 className="detail-pizza-title">{name}</h1>

              {/* Descripción de la pizza */}
              {desc && (
                <p className="detail-pizza-desc">{desc}</p>
              )}

              {/* Cupón si existe */}
              {coupon && (
                <div className="detail-pizza-coupon">
                  <span className="badge bg-success">
                    Cupón: {coupon.code} — {coupon.discount}% descuento
                  </span>
                </div>
              )}

              {/* Ingredientes */}
              <div className="detail-pizza-description">
                <p className="detail-pizza-ingredients-label">
                  Ingredientes:
                </p>
                <ul className="detail-pizza-ingredients-list">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="text-capitalize">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precio */}
              <div className="detail-pizza-price">
                <span className="detail-pizza-price-label">Precio:</span>
                <span className="detail-pizza-price-value">
                  ${price.toLocaleString()}
                </span>
              </div>

              {/* Botón de añadir al carrito */}
              <div className="detail-pizza-actions">
                <button 
                  className="btn btn-dark btn-lg detail-pizza-add-btn"
                  onClick={handleAddToCart}
                >
                  Añadir al carrito 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPizza;

