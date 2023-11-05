
// Variables y selectores necesarios

const campo_nombre = document.querySelector('#nombre')
const campo_correo = document.querySelector('#email')
const campo_telefono =  document.querySelector('#telefono')
const campo_empresa = document.querySelector('#empresa')
const tabla = document.querySelector('#listado-clientes')
const boton_agregar = document.querySelector('input[value="Agregar Cliente"]')
const boton_guardar_cambios = document.querySelector('input[value="Guardar Cambios"]')
let db // almacenará el objeto de la base de datos
let boton_editar = document.querySelector(".editar")
let boton_eliminar = document.querySelector(".eliminar")

// Funciones

const iniciar_bd = () =>{
    let solicitud = indexedDB.open('clientesDB', 1)
    solicitud.addEventListener('error', mostrar_error)
    solicitud.addEventListener('success', recuperar_bd)
    // upgradeneeded crea la BBDD si no encuentra una creada
    solicitud.addEventListener('upgradeneeded', crear_bd)

}

const mostrar_error = (e) => {
    console.log(`Error: ${e.code} ${e.message}`)
}

const recuperar_bd = (e) =>{
    db = e.target.result
    // Si nos encontramos en la página index.html entonces mostraré en la tabla los clientes almacenados
    if ((window.location.pathname).includes('index')){
        mostrar_clientes()
    }
}

const crear_bd = (e) =>{
    db = e.target.result
    // La clave de la BBDD va a ser el campo id, el cuál se generará por autoincremento automático
    db.createObjectStore('Clientes', { keyPath: 'id', autoIncrement: true });
}

const guardar_cliente = () =>{
    const peticion = indexedDB.open('ClientesDB', 1)
    peticion.onsuccess=()=> {
        // Si la petición tiene éxito, creamos un objeto con la info de los campos del formulario
        const cliente = {
            nombre: campo_nombre.value,
            correo: campo_correo.value,
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

const limpiar_html_formulario = () =>{
    campo_nombre.value=''
    campo_correo.value=''
    campo_telefono.value=''
    campo_empresa.value=''
}

const mostrar_clientes = () =>{
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
                        <button class="editar" id="${vista.value.id}">Edit </a>
                    </td> 
                    </td> 
                        <button class="eliminar" id="${vista.value.id}">X</button>
                    </td>                   
                `
            tabla.appendChild(fila)
            // La vista devuelve los registros de 1 en 1, por tanto, vamos avanzando al siguiente con continue()
            vista.continue()
            boton_editar = fila.querySelector(".editar")
            boton_eliminar = fila.querySelector(".eliminar")
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


const cambiar_pagina_edicion = (c) =>{
    sessionStorage.setItem('id', `${c.target.id}`)
    window.location="editar-cliente.html"
}

const editar = ()=> {
    // Recuperamos la id de la sessionStorage para saber que registro vamos a modificar
    const id = parseInt(sessionStorage.getItem('id'))
    const cliente ={
        id:id,
        nombre:campo_nombre.value,
        correo:campo_correo.value,
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
const recuperar_datos=() =>{
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
                    campo_nombre.value = vista.value.nombre
                    campo_correo.value = vista.value.correo
                    campo_telefono.value = vista.value.telefono
                    campo_empresa.value = vista.value.empresa
                    return
                }
                vista.continue()
            }
        })
    }
}

const eliminar_cliente=(b)=>{
    const id = parseInt(b.target.id)
    let transaccion = db.transaction(['Clientes'], 'readwrite')
    let almacen = transaccion.objectStore('Clientes')
    almacen.delete(id)
    limpiar_html_tabla()
    mostrar_clientes()
}

const limpiar_html_tabla=()=>{
    while (tabla.firstElementChild){
        tabla.firstElementChild.remove()
    }
}

// Eventos

document.addEventListener('DOMContentLoaded', (e)=>{
    iniciar_bd()
    if (window.location.pathname.includes('editar-cliente.html')){
        console.log('todo bien')
        recuperar_datos()
        boton_guardar_cambios.addEventListener('click', (e) => {
            e.preventDefault()
            editar()
        })
    }
    if (window.location.pathname.includes('nuevo-cliente.html')){
        console.log('todo bien2')
        boton_agregar.addEventListener('click', (e) => {
            e.preventDefault()
            guardar_cliente()
        })
    }
})

// Para más información sobre el funcionamiento del código y de IndexedDB consultar la documentación del proyecto (Guía_IndexedDB.md)








