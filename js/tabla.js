// 1. Recibe el tbody y un arreglo de personas, y dibuja todas las filas
export function renderizarTabla(tbody, personas) {

  // 2. Limpia las filas anteriores para no duplicar datos
  tbody.innerHTML = "";

  // 3. Itera cada persona del arreglo
  personas.forEach((persona) => {

    // 4. Crea una fila <tr> dentro del tbody
    const fila = tbody.insertRow();

    // 5. Crea celdas <td> en la fila con insertCell()
    //    y le asigna el texto de cada propiedad
    fila.insertCell().textContent = persona.id;
    fila.insertCell().textContent = persona.nombre;
    fila.insertCell().textContent = persona.apellido;
    fila.insertCell().textContent = persona.licenciatura;
    fila.insertCell().textContent = String(persona.edad);
  });
}
