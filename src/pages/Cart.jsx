import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

const API_URL = "http://localhost:5000";

const Cart = () => {
  const { token } = useContext(UserContext);
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const total = getTotal();

  const handleCheckout = async () => {
    if (!token) {
      setError("Debes iniciar sesión para realizar la compra");
      return;
    }

    if (cart.length === 0) {
      setError("Tu carrito está vacío");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Sesión expirada. Por favor, inicia sesión nuevamente");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al procesar la compra");
      }

      // Compra exitosa
      setSuccess(true);
      clearCart();
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error en checkout:", error);
      setError(error.message || "Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) {
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

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>¡Compra realizada con éxito!</strong> Tu pedido ha sido procesado correctamente.
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccess(false)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      {cart.length > 0 && (
        <>
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
                      disabled={loading}
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
                      disabled={loading}
                    >
                      +
                    </button>
                    <button 
                      className="btn btn-outline-danger ms-2" 
                      onClick={() => removeFromCart(pizza.id)}
                      aria-label="Eliminar del carrito"
                      title="Eliminar del carrito"
                      disabled={loading}
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
            <button 
              className="btn btn-dark mt-3" 
              onClick={handleCheckout}
              disabled={!token || loading || cart.length === 0}
            >
              {loading ? "Procesando..." : "Pagar"}
            </button>
            {!token && <p className="text-danger mt-2">Debes iniciar sesión para realizar la compra</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
