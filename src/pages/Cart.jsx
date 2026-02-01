import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { token } = useContext(UserContext);
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal } = useCart();
  const total = getTotal();

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <h3>Detalles del pedido:</h3>
        <div className="alert alert-info" role="alert">
          Tu carrito está vacío. ¡Agrega algunas pizzas deliciosas!
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Detalles del pedido:</h3>

      <ul className="list-group">
        {cart.map((pizza) => {
          // Calcular el precio con descuento si hay cupón
          let itemPrice = pizza.price;
          if (pizza.coupon) {
            itemPrice = itemPrice * (1 - pizza.coupon.discount / 100);
          }
          const subtotal = itemPrice * pizza.count;

          return (
            <li key={pizza.id} className="list-group-item d-flex justify-content-between align-items-center">
              
              <div className="d-flex align-items-center">
                <img src={pizza.img} width="80" className="me-3" alt={pizza.name} />
                <div>
                  <h5 className="text-capitalize">{pizza.name}</h5>
                  <p>${pizza.price.toLocaleString()} c/u</p>
                  {pizza.coupon && (
                    <p className="text-success mb-0">
                      <small>Cupon: {pizza.coupon.code} — {pizza.coupon.discount}%</small>
                    </p>
                  )}
                  <p className="fw-bold mt-2">Subtotal: ${subtotal.toLocaleString()}</p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn btn-danger" 
                  onClick={() => decreaseQuantity(pizza.id)}
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <span className="fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                  {pizza.count}
                </span>
                <button 
                  className="btn btn-primary" 
                  onClick={() => increaseQuantity(pizza.id)}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
                <button 
                  className="btn btn-outline-danger ms-2" 
                  onClick={() => removeFromCart(pizza.id)}
                  aria-label="Eliminar del carrito"
                  title="Eliminar del carrito"
                >
                  🗑️
                </button>
              </div>

            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <h4 className="fw-bold">Total: ${total.toLocaleString()}</h4>
        <button className="btn btn-dark mt-3" disabled={!token}>
          Pagar
        </button>
        {!token && <p className="text-danger mt-2">Debes iniciar sesión</p>}
      </div>
    </div>
  );
};

export default Cart;
