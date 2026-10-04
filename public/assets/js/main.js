/**
 * main.js - Lógica principal para ElGaymer Videojuegos
 * Maneja la carga de productos, el carrito de compras y la búsqueda.
 */

// --- Estado de la Aplicación ---
let productosGlobal = [];
let carrito = [];

// --- Elementos del DOM ---
const contenedorProductos = document.getElementById('productos-grid');
const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('input-busqueda');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const badgeCarrito = document.getElementById('badge-carrito');

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    configurarEventos();
});

/**
 * Carga los productos desde el archivo JSON utilizando Fetch API.
 */
async function cargarProductos() {
    try {
        const respuesta = await fetch('./productos.json');

        // Verificamos si la respuesta es exitosa
        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }

        const productos = await respuesta.json();
        productosGlobal = productos;
        renderizarProductos(productosGlobal);

    } catch (error) {
        console.error("Hubo un problema al cargar los productos:", error);
        mostrarErrorCarga();
    }
}

/**
 * Muestra un mensaje de error en el DOM si falla la carga.
 */
function mostrarErrorCarga() {
    contenedorProductos.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center" role="alert">
                <h4 class="alert-heading">¡Ups! Algo salió mal.</h4>
                <p>No pudimos cargar la lista de productos. Por favor, intenta actualizar la página más tarde.</p>
                <hr>
                <p class="mb-0 text-muted">Detalles: Archivo de productos no encontrado o error de servidor.</p>
            </div>
        </div>
    `;
}

/**
 * Renderiza una lista de productos en el DOM.
 * @param {Array} productos - Arreglo de objetos de producto.
 */
function renderizarProductos(productos) {
    contenedorProductos.innerHTML = ''; // Limpiar contenedor

    if (productos.length === 0) {
        contenedorProductos.innerHTML = `
            <div class="col-12 text-center my-5">
                <p class="lead">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
        `;
        return;
    }

    productos.forEach(producto => {
        // Crear columna
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4 d-flex align-items-stretch';

        // Estructura de la tarjeta de Bootstrap
        col.innerHTML = `
            <div class="card shadow-sm w-100">
                <!-- Usamos una imagen de placeholder si no se encuentra la imagen real -->
                <img src="./assets/img/${producto.imagen}" class="card-img-top object-fit-contain" alt="${producto.nombre}" style="height: 200px; padding: 10px;" onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(producto.nombre)}'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-muted flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fs-5 fw-bold text-success">$${producto.precio.toLocaleString('es-CL')}</span>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary btn-agregar-silencioso" data-id="${producto.id}" title="Agregar al carrito">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                            <button class="btn btn-primary btn-comprar" data-id="${producto.id}">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(col);
    });

    // Añadir eventos a los botones de agregar silencioso
    const botonesAgregarSilencioso = document.querySelectorAll('.btn-agregar-silencioso');
    botonesAgregarSilencioso.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = parseInt(e.currentTarget.getAttribute('data-id'));
            agregarAlCarrito(idProducto, false);
        });
    });

    // Añadir eventos a los botones de comprar
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = parseInt(e.currentTarget.getAttribute('data-id'));
            agregarAlCarrito(idProducto, true);
        });
    });
}

/**
 * Configura los eventos estáticos.
 */
function configurarEventos() {
    formBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();
        const termino = inputBusqueda.value.toLowerCase().trim();

        // Filtrar productos
        const filtrados = productosGlobal.filter(p =>
            p.nombre.toLowerCase().includes(termino) ||
            p.descripcion.toLowerCase().includes(termino)
        );

        // Renderizar los productos filtrados
        renderizarProductos(filtrados);

        // Hacer scroll a la sección de productos suavemente
        document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
    });

    // Filtros de categoría
    const enlacesCategoria = document.querySelectorAll('.filtro-categoria');
    enlacesCategoria.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = e.currentTarget.getAttribute('data-categoria');
            
            // Limpiar el buscador si había texto
            inputBusqueda.value = '';

            // Filtrar productos
            const filtrados = productosGlobal.filter(p => p.categoria === categoria);

            // Renderizar
            renderizarProductos(filtrados);

            // Hacer scroll a la sección de productos
            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Botón para vaciar todo el carrito
    const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener('click', () => {
            if (carrito.length > 0) {
                carrito = []; // Reiniciar arreglo
                actualizarDOMCarrito(); // Actualizar vista
            }
        });
    }
}

/**
 * Agrega un producto al carrito de compras.
 * @param {number} id - ID del producto a agregar.
 * @param {boolean} abrirCarrito - Determina si se debe abrir la ventana lateral del carrito.
 */
function agregarAlCarrito(id, abrirCarrito = true) {
    const producto = productosGlobal.find(p => p.id === id);
    if (!producto) return;

    const itemEnCarrito = carrito.find(item => item.id === id);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarDOMCarrito();

    // Abrir el offcanvas del carrito si abrirCarrito es true
    if (abrirCarrito) {
        const offcanvasElement = document.getElementById('offcanvasCarrito');
        let offcanvasCarrito = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (!offcanvasCarrito) {
            offcanvasCarrito = new bootstrap.Offcanvas(offcanvasElement);
        }
        offcanvasCarrito.show();
    }
}

/**
 * Actualiza la vista del carrito en el DOM.
 */
function actualizarDOMCarrito() {
    listaCarrito.innerHTML = ''; // Limpiar lista
    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="list-group-item text-center text-muted">Tu carrito está vacío.</li>';
    } else {
        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            cantidadTotal += item.cantidad;

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center lh-sm';
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="./assets/img/${item.imagen}" class="rounded me-3 object-fit-contain" style="width: 50px; height: 50px;" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/50x50?text='">
                    <div>
                        <h6 class="my-0">${item.nombre}</h6>
                        <small class="text-muted">Cant: ${item.cantidad} x $${item.precio.toLocaleString('es-CL')}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="text-muted me-3">$${subtotal.toLocaleString('es-CL')}</span>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            listaCarrito.appendChild(li);
        });

        // Eventos para eliminar del carrito
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                eliminarDelCarrito(index);
            });
        });
    }

    // Actualizar totales y badge
    totalCarrito.textContent = `$${total.toLocaleString('es-CL')}`;
    badgeCarrito.textContent = cantidadTotal;
}

/**
 * Elimina un ítem del carrito.
 * @param {number} index - Índice del ítem en el arreglo del carrito.
 */
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarDOMCarrito();
}
