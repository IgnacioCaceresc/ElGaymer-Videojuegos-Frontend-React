import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  // ==========================================
  // ESTADOS PRINCIPALES DE LA APLICACIÓN
  // ==========================================
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para UI y Filtros
  const [showCart, setShowCart] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // ==========================================
  // EFECTOS Y CARGA ASÍNCRONA
  // ==========================================
  useEffect(() => {
    // Función para cargar los datos asíncronamente
    const cargarProductos = async () => {
      try {
        setLoading(true);
        // Simulando una pequeña demora para que se note el estado de carga
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = await fetch('/data/productos.json');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        setProductos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []); // Dependencias vacías: solo se ejecuta al montar el componente

  // Funciones para manejar el carrito
  const agregarAlCarrito = (producto, abrirCarrito = true) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });

    if (abrirCarrito) {
      setShowCart(true);
    }
  };

  const restarCantidad = (id) => {
    setCarrito(prevCarrito => {
      const item = prevCarrito.find(item => item.id === id);
      if (item.cantidad === 1) {
        return prevCarrito.filter(i => i.id !== id);
      }
      return prevCarrito.map(i =>
        i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
      );
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // El total de ítems ahora considera la cantidad de cada producto
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const productosFiltrados = productos.filter(p => {
    const pasaCategoria = filtroCategoria === 'todas' || p.categoria === filtroCategoria;
    const pasaBusqueda = p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
    return pasaCategoria && pasaBusqueda;
  });

  return (
    <>
      <Navbar
        totalItems={totalItems}
        onToggleCart={() => setShowCart(!showCart)}
        setFiltroCategoria={setFiltroCategoria}
        setTerminoBusqueda={setTerminoBusqueda}
      />

      {/* Header */}
      <header id="inicio" className="bg-primary text-white text-center py-5 mb-4">
        <div className="container">
          <h1 className="display-4 fw-bold">Tu portal del gaming clásico y moderno</h1>
          <p className="lead">Descubre nuestra selección de consolas y juegos al mejor precio.</p>
          <a href="#productos" className="btn btn-light btn-lg mt-3">Ver Catálogo</a>
        </div>
      </header>

      <main className="container flex-grow-1">
        <section id="productos" className="mb-5 py-4">
          <div className="text-center mb-4">
            <h2 className="display-6 fw-bold">Productos Destacados</h2>
            <hr className="w-25 mx-auto text-primary" />
          </div>

          <ProductList
            productos={productosFiltrados}
            loading={loading}
            error={error}
            carrito={carrito}
            agregarAlCarrito={agregarAlCarrito}
            restarCantidad={restarCantidad}
          />
        </section>

        {/* Sección Contacto */}
        <section id="contacto" className="mb-5 py-4 bg-white p-4 rounded shadow-sm">
          <div className="text-center mb-4">
            <h2 className="display-6 fw-bold">Atención al Cliente</h2>
            <p className="text-muted">Déjanos tu mensaje y te contactaremos a la brevedad.</p>
            <hr className="w-25 mx-auto text-primary" />
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <form action="#" method="POST" className="needs-validation">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre completo:</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico:</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="motivo" className="form-label">Motivo de consulta:</label>
                  <select className="form-select" id="motivo" name="motivo">
                    <option value="soporte">Soporte técnico</option>
                    <option value="ventas">Ventas y envíos</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                  <textarea className="form-control" id="mensaje" name="mensaje" rows="4" required></textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="reset" className="btn btn-secondary">Limpiar</button>
                  <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
        <div className="container">
          <div className="row text-center text-md-start align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <h5 className="fw-bold">El<span className="text-primary">Gaymer</span></h5>
              <p className="small text-muted mb-0">La mejor tienda para tu pasión.</p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0 text-center">
              <p className="mb-0">&copy; 2026 ElGaymer Videojuegos.</p>
            </div>
            <div className="col-md-4 text-md-end">
              <a href="#" className="text-white me-3 text-decoration-none"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-white me-3 text-decoration-none"><i className="bi bi-twitter-x fs-5"></i></a>
              <a href="#" className="text-white text-decoration-none"><i className="bi bi-instagram fs-5"></i></a>
            </div>
          </div>
        </div>
      </footer>

      <Cart
        showCart={showCart}
        onClose={() => setShowCart(false)}
        carrito={carrito}
        agregarAlCarrito={agregarAlCarrito}
        restarCantidad={restarCantidad}
        eliminarDelCarrito={eliminarDelCarrito}
        vaciarCarrito={vaciarCarrito}
        totalPrecio={totalPrecio}
      />
    </>
  );
}

export default App;
