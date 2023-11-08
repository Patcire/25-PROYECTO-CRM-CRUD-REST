import {
    campo_nombre, campo_email, campo_telefono, campo_empresa,
    tabla, objeto_formulario,
} from "./selectores-variables.js";

// Variable BBDD

let db // almacenará el objeto de la base de datos

// Funciones

// funciones de BBDD

export const iniciar_bd = () =>{
    let solicitud = indexedDB.open('clientesDB', 1)
    solicitud.addEventListener('error', mostrar_error)
    solicitud.addEventListener('success', recuperar_bd)
    // upgradeneeded crea la BBDD si no encuentra una creada
    solicitud.addEventListener('upgradeneeded', crear_bd)

}

export const mostrar_error = (e) => {
    console.log(`Error: ${e.code} ${e.message}`)
}

export const recuperar_bd = (e) =>{
    db = e.target.result
    // Si nos encontramos en la página index.html entonces mostraré en la tabla los clientes almacenados
    if ((window.location.pathname).includes('index')){
        mostrar_clientes()
    }
}

export const crear_bd = (e) =>{
    db = e.target.result
    // La clave de la BBDD va a ser el campo id, el cuál se generará por autoincremento automático
    db.createObjectStore('Clientes', { keyPath: 'id', autoIncrement: true });
}


// funciones de Cliente

export const guardar_cliente = () =>{
    const peticion = indexedDB.open('ClientesDB', 1)
    peticion.onsuccess=()=> {
        // Si la petición tiene éxito, creamos un objeto con la info de los campos del formulario
        const cliente = {
            nombre: campo_nombre.value,
            email: campo_email.value,
            telefono: campo_telefono.value,
            empresa: campo_empresa.value
        }
        // Y mediante una transacción añadimos ese objeto al almacén
        let transaccion = db.transaction(['Clientes'], 'readwrite')
        let almacen = transaccion.objectStore('Clientes')
        almacen.add(cliente)
        limpiar_html_formulario()
    }
}

export const mostrar_clientes = () =>{
    const transaccion = db.transaction(['Clientes'], 'readwrite')
    const almacen = transaccion.objectStore('Clientes')
    const puntero = almacen.openCursor()
    puntero.addEventListener('success', (e)=>{
        // El puntero nos permite crear una vista con la información solicitada
        const vista = e.target.result
        if(vista) {
            const fila = document.createElement('tr')
            fila.innerHTML = `
                    <td>${vista.value.nombre}</td>
                    <td>${vista.value.telefono}</td>
                    <td>${vista.value.empresa}</td>
                    <td>   
                        <div class="botones-acciones">            
                            <button class="editar" id="${vista.value.id}">Edit </a>
                            <button class="eliminar" id="${vista.value.id}">X</button>
                        </div> 
                    </td>                   
                `
            tabla.appendChild(fila)
            // La vista devuelve los registros de 1 en 1, por tanto, vamos avanzando al siguiente con continue()
            vista.continue()
            const boton_editar = fila.querySelector(".editar")
            const boton_eliminar = fila.querySelector(".eliminar")
            // Los eventos de los nuevos botones creados se deben generar en el momento de su creación
            boton_editar.onclick = (c) =>{
                //pasamos el evento para posteriormente pasar recuperar la id almacenada en el botón
                cambiar_pagina_edicion(c)
            }
            boton_eliminar.onclick = (b)=>{
                eliminar_cliente(b)
            }
        }
    })
}

export const editar = ()=> {
    // Recuperamos la id de la sessionStorage para saber que registro vamos a modificar
    const id = parseInt(sessionStorage.getItem('id'))
    const cliente ={
        id:id,
        nombre:campo_nombre.value,
        email:campo_email.value,
        telefono:campo_telefono.value,
        empresa:campo_empresa.value
    }
    let transaccion = db.transaction(['Clientes'], 'readwrite')
    let almacen = transaccion.objectStore('Clientes')
    almacen.put(cliente)
    // Limpiamos los campos
    limpiar_html_formulario()
}

// La función recuperar_datos se utilizará cuando pasamos a la página de edición
// para así mostrar los datos del registro que queremos modificar
export const recuperar_datos=() =>{
    const id = parseInt(sessionStorage.getItem('id'))
    const peticion = indexedDB.open('ClientesDB', 1)
    peticion.onsuccess=()=>{
        const transaccion = db.transaction('Clientes', 'readwrite')
        const almacen = transaccion.objectStore('Clientes')
        const puntero = almacen.openCursor()
        puntero.addEventListener('success', (e)=>{
            const vista = e.target.result
            if (vista){
                if (vista.value.id === id){
                    // Los campos muestran la información de la IndexedDB
                    campo_nombre.value = vista.value.nombre
                    campo_email.value = vista.value.email
                    campo_telefono.value = vista.value.telefono
                    campo_empresa.value = vista.value.empresa
                    // También rellenamos el objeto_formulario que utilizamos en las validaciones y que hemos importado
                    objeto_formulario.nombre=vista.value.nombre
                    objeto_formulario.email=vista.value.email
                    objeto_formulario.telefono=vista.value.telefono
                    objeto_formulario.empresa=vista.value.empresa
                    return
                }
                vista.continue()
            }
        })
    }
}

export const eliminar_cliente=(b)=>{
    const id = parseInt(b.target.id)
    let transaccion = db.transaction(['Clientes'], 'readwrite')
    let almacen = transaccion.objectStore('Clientes')
    almacen.delete(id)
    limpiar_html_tabla()
    mostrar_clientes()
}

// funciones HTML

export const limpiar_html_tabla=()=>{
    while (tabla.firstElementChild){
        tabla.firstElementChild.remove()
    }
}

export const limpiar_html_formulario = () =>{
    campo_nombre.value=''
    campo_email.value=''
    campo_telefono.value=''
    campo_empresa.value=''
}

// funciones Navegación

export const cambiar_pagina_edicion = (c) =>{
    sessionStorage.setItem('id', `${c.target.id}`)
    window.location="editar-cliente.html"
}


