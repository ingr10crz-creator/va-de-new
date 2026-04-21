// 1. Exporta la función que lee los valores del formulario
export function leerPersonaDesdeForm(form) {

  // 2. FormData permite acceder a los campos del form por su 'name'
  const fd = new FormData(form);

  // 3. Construye y devuelve un objeto persona con los datos del form
  return {
    // fd.get("nombre") regresa un string; .trim() elimina espacios extras
    nombre: String(fd.get("nombre") ?? "").trim(),
    apellido: String(fd.get("apellido") ?? "").trim(),
    licenciatura: String(fd.get("licenciatura") ?? "").trim(),
    // Number() convierte el string del input a número
    edad: Number(fd.get("edad")),
  };
}

// 4. Valida que el objeto persona tenga datos correctos
export function esPersonaValida(persona) {
  return (
    persona.nombre !== "" &&          // nombre no vacío
    persona.apellido !== "" &&        // apellido no vacío
    persona.licenciatura !== "" &&    // licenciatura no vacía
    !Number.isNaN(persona.edad) &&    // edad es un número real
    persona.edad > 0                  // edad mayor que cero
  );
}
