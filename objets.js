function guardar() {
    const Nombre = document.getElementById("Nombre").value;
    const Telefono = document.getElementById("Telefono").value;
    const Email = document.getElementById("Email").value;
    const Etiqueta = document.getElementById("opciones").value;

    if (!Nombre || !Telefono || !Email || !Etiqueta) {
        alert("Los campos se encuentran vacíos :D");
        return;
    }

    const Datos = { Nombre, Telefono, Email, Etiqueta };
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(Datos);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    document.getElementById("Nombre").value = '';
    document.getElementById("Telefono").value = '';
    document.getElementById("Email").value = '';
    document.getElementById("opciones").value = ''; 

    alert("Los datos han sido perfectamente guardados y los campos fueron limpiados ");
    AgregarFila(Datos);
}

function AgregarFila(Datos) {
    const tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];
    const fila = tabla.insertRow();

    fila.insertCell().textContent = Datos.Nombre;
    fila.insertCell().textContent = Datos.Telefono;
    fila.insertCell().textContent = Datos.Email;
    fila.insertCell().textContent = Datos.Etiqueta;

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar Info';
    botonEditar.onclick = function() {
        editar(fila);
    };
    const celdaEditar = fila.insertCell();
    celdaEditar.appendChild(botonEditar);
}

function editar(fila) {

    const nombre = fila.cells[0].textContent;
    const telefono = fila.cells[1].textContent;
    const email = fila.cells[2].textContent;
    const etiqueta = fila.cells[3].textContent;

    localStorage.setItem("editNombre", nombre);
    localStorage.setItem("editTelefono", telefono);
    localStorage.setItem("editEmail", email);
    localStorage.setItem("editEtiqueta", etiqueta);

    window.location.href = "editar.html";
}

window.onload = function () {

    if (document.getElementById("editNombre")) {
        document.getElementById("editNombre").value = localStorage.getItem("editNombre") || "";
        document.getElementById("editTelefono").value = localStorage.getItem("editTelefono") || "";
        document.getElementById("editEmail").value = localStorage.getItem("editEmail") || "";
        document.getElementById("editEtiqueta").value = localStorage.getItem("editEtiqueta") || "";
    }

    if (document.getElementById("tablaDatos")) {
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.forEach(contacto => AgregarFila(contacto));
    }
};

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

    let contactoEditado = contactos.find(contacto => contacto.Nombre === localStorage.getItem("editNombre"));

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
