import React from "react";
import { Link } from "react-router-dom";
import "./CardPizza.css";
import { useCart } from "../contexts/CartContext";

const CardPizza = ({ id, name, price, img, ingredients, coupon, hasLink }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  
  // Buscar si el producto está en el carrito
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.count : 0;

  const imageElement = (
    <img src={img} className="card-img-top" alt={name} style={hasLink ? { cursor: 'pointer' } : {}} />
  );

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

  const handleIncrease = () => {
    increaseQuantity(id);
  };

  const handleDecrease = () => {
    decreaseQuantity(id);
  };

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      {hasLink ? (
        <Link to={`/pizza/${id}`}>
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}

      <div className="card-body">
        <h5 className="card-title text-capitalize">{name}</h5>

        {coupon && (
          <p className="text-success mb-2">
            <strong>Cupón:</strong> {coupon.code} — {coupon.discount}% off
          </p>
        )}

        <p><strong>Ingredientes:</strong></p>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <p className="mt-3 fw-bold">Precio: ${price.toLocaleString()}</p>

        {quantity > 0 ? (
          <div className="d-flex align-items-center justify-content-center gap-3 w-100">
            <button 
              className="btn btn-danger" 
              onClick={handleDecrease}
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="fw-bold" style={{ minWidth: '40px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button 
              className="btn btn-primary" 
              onClick={handleIncrease}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        ) : (
          <button className="btn btn-dark w-100" onClick={handleAddToCart}>
            Añadir 🛒
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPizza;
