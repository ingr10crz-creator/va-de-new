
/* 1. nombre de la base de datos y version*/
const DB_nombre = "personasDB";
const DB_version = 1;

/*2.  variable guardara la conexion a la base de datos */
let db = null;

/*3. funcion para abrir la base de datos */
/* esta funcion devuelve una promesa que se resuelve con la conexion a la base de datos o se rechaza con un error */
export function abrirDB() {

    return new Promise((resolve, reject) => {
       /*4. solicitud abrir la base de datos con el nombre y version especificados */
        const solicitud = indexedDB.open(DB_nombre, DB_version);

        /*5. evento onupgradeneeded se dispara cuando la base de datos se crea por primera vez o se actualiza a una version superior */
        solicitud.onupgradeneeded = (evento) => {
            const dbTemporal = evento.target.result; // evento.target.result es la conexion temporal a la base de datos durante la actualizacion o creacion

            /*6.se crea un almacen (tabla) llamdo "persona"*/
            // auto increment: true,genra un ID solo (1,2,3..)

            if (!dbTemporal.objectStoreNames.contains("personas")) {
                dbTemporal.createObjectStore("personas", 
                    { keyPath: "id", autoIncrement: true 
                });
            }
        };

        /*7. evento onsuccess se dispara cuando la conexion a la base de datos se establece correctamente */

        solicitud.onsuccess = (evento) => {
            db = evento.target.result;
            resolve(db);
        };
        /*8. evento onerror se dispara cuando ocurre un error al abrir la base de datos */
        solicitud.onerror = (evento) => {
            reject(evento.target.error);
        };
    });

}


// 9 funcion para guardar una persona en la base de datos
export function guardarPersona(persona) {
    return new Promise((resolve, reject) => {

        //10. crear una conatatente para la transaccion, de escritura
        const transaccion = db.transaction("personas", "readwrite");

        //11. obtener el almacen de objetos "personas"
        const almacen = transaccion.objectStore("personas");

        //12. agregar la persona al almacen de objetos
        const solicitud = almacen.add(persona);

        //13. si la solicitud se completa con exito, se resuelve la promesa con el ID generado para la persona
        solicitud.onsuccess = (evento) => resolve(evento.target.result);
    
        //14. si ocurre un error al agregar la persona, se rechaza la promesa con el error
        solicitud.onerror = (evento) => reject(evento.target.error);
        
    });
}


// 15. funcion para obtener todas las personas de la base de datos
export function obtenerPersonas() {
    return new Promise((resolve, reject) =>{

        //16. crear una transaccion de lectura
        const transaccion = db.transaction("personas", "readonly"); 

        //17. obtener el almacen de objetos "personas"
        const almacen = transaccion.objectStore("personas");

        //18. solicitar todos los registros del almacen de objetos
        const solicitud = almacen.getAll();

        //19. si la solicitud se completa con exito, se resuelve la promesa con el array de personas obtenidas

        solicitud.onsuccess = (evento) => resolve(evento.target.result);
        //20. si ocurre un error al obtener las personas, se rechaza la promesa con el error
        solicitud.onerror = (evento) => reject(evento.target.error);
    });
}
