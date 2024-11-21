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
    AgregarFila(Datos)
}

function AgregarFila(Datos) {
    const tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];
    const fila = tabla.insertRow();

    fila.insertCell().textContent = Datos.Nombre;
    fila.insertCell().textContent = Datos.Telefono;
    fila.insertCell().textContent = Datos.Email;
    fila.insertCell().textContent = Datos.Etiqueta;
}
