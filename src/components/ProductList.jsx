import ProductCard from './ProductCard';

const ProductList = ({ productos, loading, error, carrito, agregarAlCarrito, restarCantidad }) => {
  // Renderizado Condicional: Feedback visual mientras se cargan los datos o si ocurre un error
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 fs-5 text-muted">Cargando catálogo de productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill fs-4 d-block mb-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="row g-4" id="productos-grid">
      {productos.map((producto) => {
        const itemEnCarrito = carrito.find(item => item.id === producto.id);
        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
        return (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            cantidadEnCarrito={cantidadEnCarrito}
            agregarAlCarrito={agregarAlCarrito} 
            restarCantidad={restarCantidad}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
