import { useState, useEffect } from 'react';
import CartItem from './CartItem';

const Cart = ({ showCart, onClose, carrito, eliminarDelCarrito, vaciarCarrito, totalPrecio, agregarAlCarrito, restarCantidad }) => {
  // Detectar si estamos en un dispositivo móvil para cambiar la dirección del carrito
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const offcanvasClass = isMobile ? 'offcanvas-bottom' : 'offcanvas-end';

  return (
    <>
      {/* Overlay oscuro cuando el carrito está abierto */}
      {showCart && <div className="offcanvas-backdrop fade show" onClick={onClose}></div>}
      
      {/* Offcanvas del carrito */}
      <div className={`offcanvas ${offcanvasClass} ${showCart ? 'show' : ''}`} style={{ visibility: showCart ? 'visible' : 'hidden' }} tabIndex="-1">
        <div className="offcanvas-header bg-light">
          <h5 className="offcanvas-title"><i className="bi bi-cart"></i> Tu Carrito</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          {/* Renderizado Condicional: Muestra el mensaje si el carrito está vacío o la lista de productos */}
          <ul className="list-group mb-3 flex-grow-1 overflow-auto">
            {carrito.length === 0 ? (
              <li className="list-group-item text-center text-muted border-0 py-5">
                <i className="bi bi-cart-x fs-1 d-block mb-3 text-secondary"></i>
                Tu carrito está vacío.<br/>¡Explora nuestro catálogo para agregar productos!
              </li>
            ) : (
              carrito.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  eliminarDelCarrito={eliminarDelCarrito} 
                  agregarAlCarrito={agregarAlCarrito}
                  restarCantidad={restarCantidad}
                />
              ))
            )}
          </ul>

          {/* Resumen y total */}
          {carrito.length > 0 && (
            <div className="mt-auto border-top pt-3 bg-white">
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total</span>
                <span>${totalPrecio.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-success btn-lg">Proceder al pago</button>
                <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
                  <i className="bi bi-trash3"></i> Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
