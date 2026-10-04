import DivisasWidget from './DivisasWidget';

const Navbar = ({ totalItems, onToggleCart, setFiltroCategoria, setTerminoBusqueda }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          El<span className="text-primary">Gaymer</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#productos" onClick={() => setFiltroCategoria('todas')}>Productos</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><button className="dropdown-item" onClick={() => setFiltroCategoria('todas')}>Todas</button></li>
                <li><button className="dropdown-item" onClick={() => setFiltroCategoria('consolas')}>Consolas</button></li>
                <li><button className="dropdown-item" onClick={() => setFiltroCategoria('juegos')}>Juegos</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={() => setFiltroCategoria('accesorios')}>Accesorios</button></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>
          </ul>

          <form className="d-flex me-3 mb-2 mb-lg-0" id="form-busqueda" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Buscar producto..." 
              aria-label="Buscar" 
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit"><i className="bi bi-search"></i></button>
          </form>

          <DivisasWidget />

          {/* Botón Carrito */}
          <button className="btn btn-primary position-relative" type="button" onClick={onToggleCart}>
            <i className="bi bi-cart"></i> Carrito
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalItems}
              <span className="visually-hidden">productos en carrito</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
