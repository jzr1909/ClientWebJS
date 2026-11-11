async function nombreFuncion() {

    try {

        //Llamar
        const respuesta = await fetch('https://api.example.com/datos');

        const datos = await respuesta.json();
        console.log(datos);

    } catch (error) {

        console.error('Ocurrio un error', error);
    }

}

async function obtenerProducto() {
    console.log("Iniciando consulta de persona...");
    const codigo = document.getElementById("codigo").value;
    if (!codigo) {
        alert("Por favor, ingresa un documento válido.");
        return;
    }
    const url = `http://localhost:8080/productos/buscar/${codigo}`;
    console.log("URL solicitada:", url);
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            const mensajeError = await respuesta.text();
            throw new Error(`Error ${respuesta.status}: ${mensajeError}`);
        }
        const producto = await respuesta.json();
        document.getElementById("codigo").value = producto.codigo || "";
        document.getElementById("nombre").value = producto.nombre || "";
        document.getElementById("descripcion").value = producto.descripcion || "";
        document.getElementById("precio").value = producto.precio || "";


        console.log("Producto encontrado:", producto);
    } catch (error) {
        console.error("Error al obtener el Producto:", error);
        alert("Hubo un problema al buscar el Producto: " + error.message);
    }
}

async function obtenerListaProductos() {
    console.log("Iniciando consulta de lista de productos...");
    const url = `http://localhost:8080/productos`;
    console.log("URL solicitada:", url);
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            if (respuesta.status === 204) {
                alert("No hay personas disponibles en la lista.");
                console.log("La lista de personas está vacía.");
                return;
            }
            const mensajeError = await respuesta.text();
            throw new Error(`Error ${respuesta.status}: ${mensajeError}`);
        }
        const personas = await respuesta.json();
        console.log("Lista de personas obtenida:");
        // Iterar sobre la lista y mostrar cada persona en la consola
        personas.forEach((producto, index) => {
            console.log(`Producto: ${index + 1}`);
            console.log(`Codigo: ${producto.codigo}`);
            console.log(`Nombre: ${producto.nombre}`);
            console.log(`Descripcion: ${producto.descripcion}`);
            console.log(`Precio: ${producto.precio}`);
            console.log("-----------------------------");
            console.log("");
        });
    } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        alert("Hubo un problema al obtener la lista de productos: " + error.message);
    }
}


async function registrarProducto() {
    console.log("Iniciando registro de persona...");
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;

    if (!codigo || !nombre || !descripcion || !precio) {
        alert("Por favor, completa todos los campos antes de registrar.");
        return;
    }
    const persona = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),

    };
    console.log("Persona a registrar:", persona);
    const url = "http://localhost:8080/productos/guardar";
    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(persona),
        });
        if (!respuesta.ok) {
            const mensajeError = await respuesta.text();
            throw new Error(`Error ${respuesta.status}: ${mensajeError}`);
        }
        const resultado = await respuesta.json();
        console.log("Producto registrado con éxito:", resultado);
        alert("El Producto se registró con éxito.")

        limpiarFormulario();
    } catch (error) {
        console.error("Error al registrar el producto:", error);
        alert("Hubo un problema al registrar el producto: " + error.message);
    }
}


async function actualizarProducto() {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;

    if (!codigo || !nombre || !descripcion || !precio) {
        alert("Por favor, completa todos los campos antes de actualizar.");
        return;
    }
    const persona = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),
    };
    console.log("Persona a actualizar:", persona);
    const url = `http://localhost:8080/productos/actualizar/${codigo}`;
    try {
        const respuesta = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(persona),
        });
        if (!respuesta.ok) {
            const mensajeError = await respuesta.text();
            throw new Error(`Error ${respuesta.status}: ${mensajeError}`);
        }
        const resultado = await respuesta.json();
        console.log("Producto actualizado con éxito:", resultado);
        alert("El producto se actualizó con éxito.");
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("Hubo un problema al actualizar el producto: " + error.message);
    }
}


async function eliminarProducto() {
    console.log("Iniciando proceso para eliminar producto...");
    const codigo = document.getElementById("codigo").value;
    if (!codigo) {
        alert("Por favor, ingresa un codigo válido para eliminar.");
        return;
    }
    const url = `http://localhost:8080/productos/eliminar/${codigo}`;
    console.log("URL solicitada:", url);
    try {
        const respuesta = await fetch(url, {
            method: "DELETE",
        });
        if (respuesta.ok) {
            const mensaje = await respuesta.text();
            console.log("Respuesta del servidor:", mensaje);
            alert("Producto eliminado con éxito.");
        } else if (respuesta.status === 404) {
            const mensaje = await respuesta.text();
            console.warn("Error: producto no encontrado.");
            alert("Error: " + mensaje);
        } else {
            throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
        }
    } catch (error) {
        console.error("Ocurrió un error al eliminar el producto:", error);
        alert("Hubo un problema al eliminar el producto: " + error.message);
    }
}


function limpiarFormulario() {
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";

}

