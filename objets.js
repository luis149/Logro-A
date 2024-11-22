function guardar() {
    const Nombre = document.getElementById("Nombre").value;
    const Telefono = document.getElementById("Telefono").value;
    const Email = document.getElementById("Email").value;
    const Etiqueta = document.getElementById("opciones").value;

    if (!Nombre || !Telefono || !Email || !Etiqueta) {
        alert("Los campos se encuentran vacíos :D");
        return;
    }

    const Datos = { id: Date.now(), Nombre, Telefono, Email, Etiqueta };
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(Datos);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    document.getElementById("Nombre").value = '';
    document.getElementById("Telefono").value = '';
    document.getElementById("Email").value = '';
    document.getElementById("opciones").value = '';

    alert("Los datos han sido perfectamente guardados y los campos fueron limpiados.");
    AgregarFila(Datos);
}

function AgregarFila(Datos) {
    const tabla = document.getElementById("tablaDatos").querySelector("tbody");
    const fila = tabla.insertRow();

    fila.insertCell().textContent = Datos.Nombre;
    fila.insertCell().textContent = Datos.Telefono;
    fila.insertCell().textContent = Datos.Email;
    fila.insertCell().textContent = Datos.Etiqueta;

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar ';
    botonEditar.onclick = function () {
        editar(Datos);
    };
    botonEditar.style.borderRadius = "10px";  
    botonEditar.style.width = "100px";
    botonEditar.style.cursor = "pointer"
    fila.insertCell().appendChild(botonEditar);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar ';
    botonEliminar.onclick = function () {
        eliminar(fila, Datos);
    };
    botonEliminar.style.borderRadius = "10px";  
    botonEliminar.style.width = "120px";
    botonEliminar.style.cursor = "pointer"
    fila.insertCell().appendChild(botonEliminar);
}

function editar(Datos) {
    
    localStorage.setItem("editId", Datos.id);
    localStorage.setItem("editNombre", Datos.Nombre);
    localStorage.setItem("editTelefono", Datos.Telefono);
    localStorage.setItem("editEmail", Datos.Email);
    localStorage.setItem("editEtiqueta", Datos.Etiqueta);

    window.location.href = "editar.html";
}


function guardarCambios() {
    const nuevoNombre = document.getElementById("editNombre").value;
    const nuevoTelefono = document.getElementById("editTelefono").value;
    const nuevoEmail = document.getElementById("editEmail").value;
    const nuevaEtiqueta = document.getElementById("editEtiqueta").value;

    if (!nuevoNombre || !nuevoTelefono || !nuevoEmail || !nuevaEtiqueta) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    let contactoEditado = contactos.find(contacto => contacto.id === parseInt(localStorage.getItem("editId")));

    if (contactoEditado) {
        contactoEditado.Nombre = nuevoNombre;
        contactoEditado.Telefono = nuevoTelefono;
        contactoEditado.Email = nuevoEmail;
        contactoEditado.Etiqueta = nuevaEtiqueta;

        localStorage.setItem("contactos", JSON.stringify(contactos));
        alert("La información se ha actualizado correctamente.");
        window.location.href = "index.html";
    } else {
        alert("No se encontró el contacto para editar.");
    }
}

function eliminar(fila, Datos) {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos = contactos.filter(contacto => contacto.id !== Datos.id);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    fila.remove();

    alert("El contacto ha sido eliminado.");
}

window.onload = function () {

    if (document.getElementById("tablaDatos")) {
        const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.forEach(contacto => AgregarFila(contacto));
    }

    if (document.getElementById("editNombre")) {
        document.getElementById("editNombre").value = localStorage.getItem("editNombre") || "";
        document.getElementById("editTelefono").value = localStorage.getItem("editTelefono") || "";
        document.getElementById("editEmail").value = localStorage.getItem("editEmail") || "";
        document.getElementById("editEtiqueta").value = localStorage.getItem("editEtiqueta") || "";
    }
};

