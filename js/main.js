// 1. Importa las funciones de cada módulo
import { abrirDB, guardarPersona, obtenerPersonas } from "./db.js";
import { leerPersonaDesdeForm, esPersonaValida } from "./persona.js";
import { renderizarTabla } from "./tabla.js";

// 2. Selecciona los elementos del HTML que vamos a usar
const form = document.querySelector("#form-persona");
const tbody = document.querySelector("#tbody");

// 3. Función que carga y muestra todos los registros en la tabla
async function cargarTabla() {
  const personas = await obtenerPersonas(); // espera a que IndexedDB responda
  renderizarTabla(tbody, personas);         // dibuja las filas
}




// 4. async/await permite esperar la apertura de la BD antes de continuar
async function iniciar() {

  // 5. Abre (o crea) la BD; si falla muestra el error en consola
  try {
    await abrirDB();
  } catch (err) {
    console.error("Error al abrir la base de datos:", err);
    return;
  }

  // 6. Carga los datos existentes al iniciar la app
  await cargarTabla();

  // 7. Escucha el evento submit del formulario
  form.addEventListener("submit", async (e) => {

    // 8. Evita que el formulario recargue la página
    e.preventDefault();

    // 9. Lee y valida los datos del formulario
    const persona = leerPersonaDesdeForm(form);

    if (!esPersonaValida(persona)) {
      alert("Por favor, completa todos los campos correctamente.");
      return; // detiene la ejecución si hay error
    }

    // 10. Guarda la persona en IndexedDB (espera confirmación)
    try {
      await guardarPersona(persona);
    } catch (err) {
      console.error("Error al guardar:", err);
      return;
    }

    // 11. Limpia el formulario después de guardar
    form.reset();

    // 12. Recarga la tabla para mostrar el nuevo registro
    await cargarTabla();
  });
}

// 13. Llama a iniciar() en cuanto carga el módulo
iniciar();
