const ProductCard = ({ producto, cantidadEnCarrito, agregarAlCarrito, restarCantidad }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm producto-card">
        <img 
          src={`${import.meta.env.BASE_URL}assets/img/${producto.imagen}`} 
          alt={producto.nombre} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }} 
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold mb-0">{producto.nombre}</h5>
            <span className="badge bg-primary rounded-pill">{producto.categoria}</span>
          </div>
          <p className="card-text text-muted small flex-grow-1">{producto.descripcion}</p>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <span className="fs-5 fw-bold text-success">${producto.precio.toLocaleString('es-CL')}</span>
            
            {/* Renderizado Condicional: Muestra controles de cantidad si el producto ya está en el carrito */}
            {cantidadEnCarrito > 0 ? (
              <div className="btn-group" role="group">
                <button className="btn btn-outline-danger" onClick={() => restarCantidad(producto.id)} title="Quitar uno">
                  <i className="bi bi-dash"></i>
                </button>
                <button className="btn btn-success" onClick={() => agregarAlCarrito(producto, true)}>
                  {cantidadEnCarrito} en Carrito
                </button>
                <button className="btn btn-outline-success" onClick={() => agregarAlCarrito(producto, false)} title="Agregar otro sin abrir carrito">
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            ) : (
              <div className="btn-group" role="group">
                <button className="btn btn-primary btn-agregar" onClick={() => agregarAlCarrito(producto, true)}>
                  <i className="bi bi-cart-plus"></i> Agregar
                </button>
                <button className="btn btn-outline-primary" onClick={() => agregarAlCarrito(producto, false)} title="Agregar sin abrir carrito">
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
