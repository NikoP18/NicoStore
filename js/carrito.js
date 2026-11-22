const botonesAgregar = document.querySelectorAll(".btn-agregar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {
        const producto = {
            id: boton.dataset.id,
            nombre: boton.dataset.nombre,
            precio: Number(boton.dataset.precio),
            imagen: boton.dataset.imagen
        };
            const productoExistente = carrito.find(item => item.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad++;

            } else {
                producto.cantidad = 1;
                carrito.push(producto);

            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarNotificacion(producto.nombre);

            console.log(carrito);
        console.log(producto);

    });

});
function mostrarCarrito() {

    const contenedor = document.getElementById("contenedor-carrito");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    carrito.forEach(function(producto) {

        contenedor.innerHTML += `
            <div class="producto-carrito">

                <div class="producto-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>

                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p>Producto</p>
                    <h4>${producto.precio.toLocaleString("es-MX", {
                        style: "currency",
                        currency: "MXN"
                    })}</h4>
                </div>

                <div class="producto-cantidad">
                    <label>Cantidad</label>
                    <span>${producto.cantidad}</span>

                    <button class="btn btn-danger btn-eliminar"
                            onclick="eliminarProducto('${producto.id}')">
                        <i class="bi bi-trash"></i>
                        Eliminar
                    </button>
                </div>

            </div>
        `;

    });
    calcularTotal();
}
mostrarCarrito();

function eliminarProducto(id) {
    carrito = carrito.filter(function(producto) {
        return producto.id !== id;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();

}
function calcularTotal() {
    const totalProductos = document.getElementById("total-productos");
    const subtotalElemento = document.getElementById("subtotal");
    const totalElemento = document.getElementById("total");
    if (!totalProductos || !subtotalElemento || !totalElemento) return;
    const cantidad = carrito.reduce(function(total, producto) {
        return total + producto.cantidad;
    }, 0);
    const subtotal = carrito.reduce(function(total, producto) {
        return total + (producto.precio * producto.cantidad);
    }, 0);
    const formatoMoneda = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    });
    totalProductos.textContent = cantidad;
    subtotalElemento.textContent = formatoMoneda.format(subtotal);
    totalElemento.textContent = formatoMoneda.format(subtotal);

}
function mostrarNotificacion(nombre) {

    const notificacion = document.getElementById("notificacion-carrito");
    if (!notificacion) return;
    notificacion.textContent = nombre + " se agregó al carrito correctamente.";
    notificacion.classList.add("show");
    setTimeout(function() {
        notificacion.classList.remove("show");
    }, 3000);

}
function seleccionarProducto() {
    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get("id");
    if (!idProducto) return;
    const carrusel = document.getElementById("carruselProductos");

    if (!carrusel) return;
    const productos = carrusel.querySelectorAll(".carousel-item");

    productos.forEach(function(producto, indice) {

        if (producto.dataset.id === idProducto) {
            const instancia = bootstrap.Carousel.getOrCreateInstance(carrusel, {
                interval: false,
                ride: false
            });

            instancia.to(indice);

        }

    });

}
seleccionarProducto();
function buscarProducto(evento) {
    evento.preventDefault();
    const busqueda = document.getElementById("campo-busqueda").value
        .trim()
        .toLowerCase();
    const productos = [
        { id: 1, nombre: "gta 6" },
        { id: 2, nombre: "Charizard PSA 10" },
        { id: 3, nombre: "Vinilo de MOSCA" },
        { id: 4, nombre: "Xbox 720" },
        {id: 5, nombre: "galipote"},
        {id:6, nombre:"omnitrix"},
        {id:7, nombre:"Tamaulipas"},
        {id:8, nombre:"Iphone 6"},
        {id:9, nombre:"Lechon"},
        {id:10, nombre:"Casa en la playa"}
    ];
    const resultado = productos.find(function(producto) {
        return producto.nombre.toLowerCase().includes(busqueda);
    });
    if (resultado) {

        window.location.href = "Catalogo.html?id=" + resultado.id;

    } else {

        alert("No encontramos ese producto en NicoStore.");

    }

}
const formularioBusqueda = document.getElementById("formulario-busqueda");

if (formularioBusqueda) {

    formularioBusqueda.addEventListener("submit", buscarProducto);

}