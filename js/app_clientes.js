
// Variables y selectores necesarios

const campo_nombre = document.querySelector('#nombre')
const campo_correo = document.querySelector('#email')
const campo_telefono =  document.querySelector('#telefono')
const campo_empresa = document.querySelector('#empresa')
const tabla = document.querySelector('#listado-clientes')
const boton_agregar = document.querySelector('input[value="Agregar Cliente"]')
const boton_guardar_cambios = document.querySelector('input[value="Guardar Cambios"]')
let db // en ella almacenaremos la base de datos
//let id_autoincremento = sessionStorage.getItem('id') || 0
let boton_editar = document.querySelector(".editar")
let boton_eliminar = document.querySelector(".eliminar")


// Funciones

const iniciar_bd = () =>{
    console.log('se inicia bbdd')
    let solicitud = indexedDB.open('clientesDB', 1)
    solicitud.addEventListener('error', mostrar_error)
    solicitud.addEventListener('success', recuperar_bd)
    // Este evento crea la BBDD si no encuentra una creada
    solicitud.addEventListener('upgradeneeded', crear_bd)

}

const mostrar_error = (e) => {
    console.log(`Error: ${e.code} ${e.message}`)
}

const recuperar_bd = (e) =>{
    db = e.target.result
    if ((window.location.pathname).includes('index')){
        mostrar_clientes()
    }

}

const crear_bd = (e) =>{
    console.log('creando')
    db = e.target.result
    db.createObjectStore('Clientes', { keyPath: 'id', autoIncrement: true });
   // almacen.createIndex('indice', 'id', {unique:true})
}


const guardar_cliente = () =>{
    console.log('entran en la función guardar')
    const peticion = indexedDB.open('ClientesDB', 1)
    peticion.onsuccess=()=> {
        const cliente = {
            //id: `${(id_autoincremento + 1)}`,
            nombre: campo_nombre.value,
            correo: campo_correo.value,
            telefono: campo_telefono.value,
            empresa: campo_empresa.value
        }
        //id_autoincremento++
        let transaccion = db.transaction(['Clientes'], 'readwrite')
        let almacen = transaccion.objectStore('Clientes')
        //console.log(cliente.id)
        almacen.add(cliente)
        console.log(cliente) //LOOOOG
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
            vista.continue()
            boton_editar = fila.querySelector(".editar")
            boton_eliminar = fila.querySelector(".eliminar")

            // Los eventos de esos botones se deben generar cuando se crean
            boton_editar.onclick = (c) =>{
                cambiar_pagina_edicion(c)
            }
            boton_eliminar.onclick = (b)=>{
                eliminar_cliente(b)
            }
           // sessionStorage.setItem('id', `${vista.value.id}`)
        }
    })
}



const cambiar_pagina_edicion = (c) =>{
    sessionStorage.setItem('id', `${c.target.id}`)
    window.location="editar-cliente.html"
}


const editar = ()=> {
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
    limpiar_html_formulario()
}


const recuperar_datos=() =>{
    const id = parseInt(sessionStorage.getItem('id'))
    const peticion = indexedDB.open('ClientesDB', 1)
    peticion.onsuccess=()=>{
        const transaccion = db.transaction('Clientes', 'readwrite')
        const almacen = transaccion.objectStore('Clientes')
        const puntero = almacen.openCursor()
        //función mostrar
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
    console.log('entra en funcion eliminar')
    const id = parseInt(b.target.id)
    console.log(typeof id)
    let transaccion = db.transaction(['Clientes'], 'readwrite')
    let almacen = transaccion.objectStore('Clientes')
    almacen.delete(id)
    limpiar_html_tabla(id)
    mostrar_clientes()

}

const limpiar_html_tabla=(id_fila)=>{
    console.log('entra en limpiar tabla')
    while (tabla.firstElementChild){
        console.log('y entra en el bucle')
        tabla.firstElementChild.remove()
    }

}

// Eventos

document.addEventListener('DOMContentLoaded', (e)=>{
    iniciar_bd()
    if (window.location.pathname.includes('editar-cliente.html')){
        console.log('estamos en editar')
        recuperar_datos()
        if (boton_guardar_cambios!==null) {
            boton_guardar_cambios.addEventListener('click', (e) => {
                console.log('se ha almacenado el cliente')
                e.preventDefault()
                editar()
            })
        }

    }

})

if (boton_agregar!==null) {
    boton_agregar.addEventListener('click', (e) => {
        console.log('se ha almacenado el cliente')
        e.preventDefault()
        guardar_cliente()
    })
}










