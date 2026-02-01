import React, { useState } from "react";
import { pizzaCart } from "../pizzas";

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const increase = (id) => {
    setCart(cart.map((p) =>
      p.id === id ? { ...p, count: p.count + 1 } : p
    ));
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((p) =>
          p.id === id ? { ...p, count: p.count - 1 } : p
        )
        .filter((p) => p.count > 0)
    );
  };

  const total = cart.reduce((acc, p) => acc + p.price * p.count, 0);

  return (
    <div className="container mt-4">
      <h3>Detalles del pedido:</h3>

      <ul className="list-group">
        {cart.map((pizza) => (
          <li key={pizza.id} className="list-group-item d-flex justify-content-between align-items-center">
            
            <div className="d-flex align-items-center">
              <img src={pizza.img} width="80" className="me-3" />
              <div>
                <h5 className="text-capitalize">{pizza.name}</h5>
                <p>${pizza.price.toLocaleString()}</p>
                {pizza.coupon && (
                  <p className="text-success mb-0"><small>Cupon: {pizza.coupon.code} — {pizza.coupon.discount}%</small></p>
                )}
              </div>
            </div>

            <div>
              <button className="btn btn-danger me-2" onClick={() => decrease(pizza.id)}>-</button>
              <span className="fw-bold">{pizza.count}</span>
              <button className="btn btn-primary ms-2" onClick={() => increase(pizza.id)}>+</button>
            </div>

          </li>
        ))}
      </ul>

      <h4 className="mt-3">Total: ${total.toLocaleString()}</h4>

      <button className="btn btn-dark mt-3">Pagar</button>
    </div>
  );
};

export default Cart;
