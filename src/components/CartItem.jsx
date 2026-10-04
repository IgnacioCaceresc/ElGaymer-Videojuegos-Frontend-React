const CartItem = ({ item, eliminarDelCarrito, agregarAlCarrito, restarCantidad }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded">
      <div className="d-flex align-items-center flex-grow-1">
        <img 
          src={`/assets/img/${item.imagen}`} 
          alt={item.nombre} 
          className="rounded me-3" 
          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
        />
        <div className="d-flex flex-column w-100 pe-3">
          <h6 className="my-0 fw-bold">{item.nombre}</h6>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <small className="text-success fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</small>
            <div className="input-group input-group-sm" style={{ width: '90px' }}>
              <button className="btn btn-outline-secondary" type="button" onClick={() => restarCantidad(item.id)}>-</button>
              <span className="input-group-text bg-white px-2 text-center" style={{ minWidth: '35px' }}>{item.cantidad}</span>
              <button className="btn btn-outline-secondary" type="button" onClick={() => agregarAlCarrito(item, false)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <button 
        className="btn btn-sm btn-outline-danger ms-2" 
        onClick={() => eliminarDelCarrito(item.id)}
        title="Eliminar producto"
      >
        <i className="bi bi-trash"></i>
      </button>
    </li>
  );
};

export default CartItem;
