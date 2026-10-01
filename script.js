// ========================================
// PRODUCTOS
// ========================================

const productos = [
    {
        id: 1,
        nombre: "Teclado Redragon",
        precio: 35000,
        imagen: "img/teclado.png",
        descripcion: "Teclado para computador ideal para trabajo y juegos."
    },

    {
        id: 2,
        nombre: "Audífonos Blik ANC",
        precio: 45000,
        imagen: "img/audifonos.png",
        descripcion: "Audífonos con sistema de cancelación de ruido."
    },

    {
        id: 3,
        nombre: "Parlante Blik",
        precio: 50000,
        imagen: "img/parlante.png",
        descripcion: "Parlante portátil para reproducir música."
    },

    {
        id: 4,
        nombre: "Mouse Gamer RGB",
        precio: 25000,
        imagen: "img/mouse.png",
        descripcion: "Mouse gamer con iluminación RGB."
    },

    {
        id: 5,
        nombre: "Webcam Full HD",
        precio: 30000,
        imagen: "img/webcam.png",
        descripcion: "Webcam Full HD ideal para videollamadas, clases y reuniones."
    },

    {
        id: 6,
        nombre: "Alfombrilla Gamer RGB",
        precio: 18000,
        imagen: "img/alfombrilla.png",
        descripcion: "Alfombrilla gamer con iluminación RGB y superficie amplia."
    }
];


// ========================================
// CARRITO
// ========================================

let carrito = [];


// Cargar carrito guardado
function cargarCarrito() {

    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}


// Guardar carrito
function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Agregar producto al carrito
function agregarAlCarrito(idProducto) {

    const producto = productos.find(function(producto) {
        return producto.id === idProducto;
    });

    if (producto) {

        carrito.push(producto);

        guardarCarrito();

        alert("Producto agregado al carrito.");
    }
}


// ========================================
// DETALLE DEL PRODUCTO
// ========================================

function mostrarDetalle() {

    const contenedor = document.getElementById("detalleProducto");

    if (!contenedor) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);

    const id = Number(parametros.get("id"));

    const producto = productos.find(function(producto) {
        return producto.id === id;
    });


    if (!producto) {

        contenedor.innerHTML = "<p>Producto no encontrado.</p>";

        return;
    }


    contenedor.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">

        <div>
            <h2>${producto.nombre}</h2>

            <p>${producto.descripcion}</p>

            <h3>$${producto.precio.toLocaleString("es-CL")}</h3>

            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>
        </div>
    `;
}


// ========================================
// MOSTRAR CARRITO
// ========================================

function mostrarCarrito() {

    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("totalCarrito");

    if (!lista || !total) {
        return;
    }


    lista.innerHTML = "";

    let totalCompra = 0;


    if (carrito.length === 0) {

        lista.innerHTML = "<p>El carrito está vacío.</p>";

        total.innerHTML = "$0";

        return;
    }


    carrito.forEach(function(producto, indice) {

        totalCompra = totalCompra + producto.precio;


        const elemento = document.createElement("div");

        elemento.className = "item-carrito";


        elemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>$${producto.precio.toLocaleString("es-CL")}</p>

            <button onclick="eliminarDelCarrito(${indice})">
                Eliminar
            </button>
        `;


        lista.appendChild(elemento);

    });


    total.innerHTML = "$" + totalCompra.toLocaleString("es-CL");
}


// Eliminar producto del carrito
function eliminarDelCarrito(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();

    mostrarCarrito();
}


// ========================================
// REGISTRO
// ========================================

const formularioRegistro = document.getElementById("formRegistro");


if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(event) {

        event.preventDefault();


        const nombre = document.getElementById("nombreRegistro").value;

        const rut = document.getElementById("rutRegistro").value;

        const email = document.getElementById("emailRegistro").value;

        const password = document.getElementById("passwordRegistro").value;

        const confirmar = document.getElementById("confirmarRegistro").value;

        const mensaje = document.getElementById("mensajeRegistro");


        if (
            nombre === "" ||
            rut === "" ||
            email === "" ||
            password === "" ||
            confirmar === ""
        ) {

            mensaje.innerHTML = "Debe completar todos los campos.";

            return;
        }


        if (password.length < 6) {

            mensaje.innerHTML = "La contraseña debe tener al menos 6 caracteres.";

            return;
        }


        if (password !== confirmar) {

            mensaje.innerHTML = "Las contraseñas no coinciden.";

            return;
        }


        const usuario = {

            nombre: nombre,
            rut: rut,
            email: email,
            password: password

        };


        localStorage.setItem("usuario", JSON.stringify(usuario));


        mensaje.innerHTML = "Registro realizado correctamente.";

    });

}


// ========================================
// LOGIN
// ========================================

const formularioLogin = document.getElementById("formLogin");


if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(event) {

        event.preventDefault();


        const email = document.getElementById("emailLogin").value;

        const password = document.getElementById("passwordLogin").value;

        const mensaje = document.getElementById("mensajeLogin");


        const usuarioGuardado = localStorage.getItem("usuario");


        if (!usuarioGuardado) {

            mensaje.innerHTML = "No existe un usuario registrado.";

            return;
        }


        const usuario = JSON.parse(usuarioGuardado);


        if (
            email === usuario.email &&
            password === usuario.password
        ) {

            mensaje.innerHTML = "Inicio de sesión correcto.";

        } else {

            mensaje.innerHTML = "Correo o contraseña incorrectos.";

        }

    });

}


// ========================================
// CONTACTO
// ========================================

const formularioContacto = document.getElementById("formContacto");


if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(event) {

        event.preventDefault();


        const nombre = document.getElementById("nombreContacto").value;

        const email = document.getElementById("emailContacto").value;

        const mensajeTexto = document.getElementById("mensajeContacto").value;

        const resultado = document.getElementById("mensajeContactoResultado");


        if (
            nombre === "" ||
            email === "" ||
            mensajeTexto === ""
        ) {

            resultado.innerHTML = "Debe completar todos los campos.";

            return;
        }


        resultado.innerHTML = "Mensaje enviado correctamente.";

    });

}


// ========================================
// ADMINISTRACIÓN DE PRODUCTOS
// ========================================

function mostrarProductosAdmin() {

    const tabla = document.getElementById("tablaProductos");


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    productos.forEach(function(producto) {

        const fila = document.createElement("tr");


        fila.innerHTML = `
            <td>${producto.id}</td>

            <td>${producto.nombre}</td>

            <td>$${producto.precio.toLocaleString("es-CL")}</td>
        `;


        tabla.appendChild(fila);

    });

}


// Agregar producto desde administración
function agregarProductoAdmin() {

    const nombre = document.getElementById("nombreProducto").value;

    const precio = Number(
        document.getElementById("precioProducto").value
    );


    if (nombre === "" || precio <= 0) {

        alert("Complete correctamente los datos del producto.");

        return;
    }


    const nuevoProducto = {

        id: productos.length + 1,

        nombre: nombre,

        precio: precio,

        imagen: "img/teclado.png",

        descripcion: "Producto agregado desde la administración."

    };


    productos.push(nuevoProducto);


    mostrarProductosAdmin();


    document.getElementById("formProducto").reset();


    alert("Producto agregado correctamente.");

}


// ========================================
// ADMINISTRACIÓN DE USUARIOS
// ========================================

function mostrarUsuariosAdmin() {

    const tabla = document.getElementById("tablaUsuarios");


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    const usuarioGuardado = localStorage.getItem("usuario");


    if (!usuarioGuardado) {

        tabla.innerHTML = `
            <tr>
                <td colspan="2">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }


    const usuario = JSON.parse(usuarioGuardado);


    const fila = document.createElement("tr");


    fila.innerHTML = `
        <td>${usuario.nombre}</td>

        <td>${usuario.email}</td>
    `;


    tabla.appendChild(fila);

}


// Agregar usuario desde administración
function agregarUsuarioAdmin() {

    const nombre = document.getElementById("nombreUsuario").value;

    const email = document.getElementById("emailUsuario").value;


    if (nombre === "" || email === "") {

        alert("Complete todos los campos.");

        return;
    }


    const usuario = {

        nombre: nombre,

        email: email,

        password: "123456"

    };


    localStorage.setItem("usuario", JSON.stringify(usuario));


    mostrarUsuariosAdmin();


    document.getElementById("formUsuario").reset();


    alert("Usuario agregado correctamente.");

}


// ========================================
// INICIO
// ========================================

cargarCarrito();

mostrarDetalle();

mostrarCarrito();

mostrarProductosAdmin();

mostrarUsuariosAdmin();