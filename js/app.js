import {boton_guardar_cambios, boton_agregar, campo_telefono, campo_empresa, campo_nombre, campo_email} from "./selectores-variables.js";
import {iniciar_bd, recuperar_datos, editar, guardar_cliente} from "./funciones_principales.js";
import {comprobar_objeto, mensaje_exito_enviar, resetear_objeto_formulario, validar} from "./metodos_validacion.js";

// Para más información sobre el funcionamiento del código y de IndexedDB
// consultar la documentación del proyecto (README.md)

document.addEventListener('DOMContentLoaded', (e)=>{
    iniciar_bd()
    if (window.location.pathname.includes('editar-cliente.html')){
        recuperar_datos()

        // Validación
        comprobar_objeto()
        campo_nombre.addEventListener('blur', validar)
        campo_email.addEventListener('blur', validar)
        campo_telefono.addEventListener('blur', validar)
        campo_empresa.addEventListener('blur', validar)

        // Funcionalidades
        boton_guardar_cambios.addEventListener('click', (e)=>{
            mensaje_exito_enviar(e)
        })
        boton_guardar_cambios.addEventListener('click', (e) => {
            e.preventDefault()
            editar()
        })
    }

    else if (window.location.pathname.includes('nuevo-cliente.html')){
        // Validación
        resetear_objeto_formulario()
        comprobar_objeto()
        campo_nombre.addEventListener('blur', validar)
        campo_email.addEventListener('blur', validar)
        campo_telefono.addEventListener('blur', validar)
        campo_empresa.addEventListener('blur', validar)
        boton_agregar.addEventListener('click', (e)=>{
            mensaje_exito_enviar(e)
            resetear_objeto_formulario()
            comprobar_objeto()
        })
        // Funcionalidades
        boton_agregar.addEventListener('click', (e) => {
            e.preventDefault()
            guardar_cliente()
        })
    }
})

