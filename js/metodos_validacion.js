// Objetos y variables

import {objeto_formulario, boton_guardar_cambios, boton_agregar, formulario} from "./selectores-variables.js";

// Funciones

export const mensaje_exito_enviar=(e)=>{
    e.preventDefault()
    // creamos un mensaje de éxito en el almacen
    const mensaje_ok = document.createElement('p')
    mensaje_ok.classList.add('ok','bg-green-500', 'text-white', 'text-center', 'rounded-lg', 'mt-10', 'text-sm')
    mensaje_ok.textContent='Enviado con exito'
    formulario.appendChild(mensaje_ok)
    setTimeout(()=>{
        mensaje_ok.remove()
    }, 3000)
}

export const validar = (e) =>{
    if (e.target.value.trim()===''){
        mostrar_error(`Campo ${e.target.id} es obligatorio`, e.target.parentElement)
        objeto_formulario[e.target.id] = ''
        return
    }
    else if (e.target.value.trim().length<2 &&
        (e.target.id ==='nombre' || e.target.id ==='empresa' )){
        mostrar_error(`Campo ${e.target.id} tiene que tener 2 caracteres mínimo`, e.target.parentElement)
        objeto_formulario[e.target.id] = ''
        return
    }
    else if (e.target.id==='email' && !validar_email(e.target.value)) {
        mostrar_error('Email no válido', e.target.parentElement)
        objeto_formulario[e.target.id] = ''
        return
    }
    else if (e.target.id==='telefono' && !validar_telefono(e.target.value)){
        mostrar_error('Teléfono no válido', e.target.parentElement)
        objeto_formulario[e.target.id] = ''
        return
    }
    limpiar_alerta(e.target.parentElement)
    objeto_formulario[e.target.id] = e.target.value.trim().toLowerCase()
    comprobar_objeto()
}

export const comprobar_objeto=() =>{
    const values = Object.values(objeto_formulario)
    console.log(objeto_formulario)
    if (values.includes('')){
        if (window.location.pathname.includes('editar-cliente.html')){
            boton_guardar_cambios.classList.add('opacity-50')
            boton_guardar_cambios.disabled= true
        }
        else if (window.location.pathname.includes('nuevo-cliente.html')){
            boton_agregar.classList.add('opacity-50')
            boton_agregar.disabled= true
        }
    }
    else {
        if (window.location.pathname.includes('editar-cliente.html')){
            boton_guardar_cambios.classList.remove('opacity-50')
            boton_guardar_cambios.disabled= false
        }
        else if (window.location.pathname.includes('nuevo-cliente.html')){
            boton_agregar.classList.remove('opacity-50')
            boton_agregar.disabled= false
        }
    }
}

export const limpiar_alerta = (referencia) => {
    const alerta = referencia.querySelector('.alerta')
    if (alerta) {
        alerta.remove()
    }
}
export const mostrar_error=(error, referencia)=>{
    limpiar_alerta(referencia)
    const parrafo_error = document.createElement('p')
    parrafo_error.textContent = error
    parrafo_error.classList.add('alerta','bg-red-600', 'text-center', 'text-white', 'p-2')
    referencia.appendChild(parrafo_error)
}

export const validar_email = (email) =>{
    /*
    Esta expresión regular verifica si una cadena dada sigue el patrón de una dirección de email electrónico,
    donde hay un nombre de usuario, seguido de "@" y un nombre de dominio. El nombre de usuario y el nombre de dominio
    pueden contener letras, dígitos, guiones bajos y, opcionalmente, puntos o guiones, pero deben cumplir con las reglas
    de formato comunes para direcciones de email electrónico
     */
    const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return email.match(regex_email)
}

export const validar_telefono = (telefono) =>{
    /*
    Esta regex permite varios formatos válidos para números de teléfono en España, incluyendo:
    -Números de 9 dígitos sin el prefijo internacional (34) y sin espacios.
    -Números de 9 dígitos sin el prefijo internacional (34) con espacios.
    -Números de 9 dígitos con el prefijo internacional (34) opcional sin espacios.
    -Números de 9 dígitos con el prefijo internacional (34) opcional con espacios.
     */
    const regex_telefono = /^(?:(?:\+|00)?34)?\s?(\d\s?){9}$/
    return telefono.match(regex_telefono)
}

export const resetear_objeto_formulario = () =>{
    objeto_formulario.nombre=''
    objeto_formulario.email=''
    objeto_formulario.telefono=''
    objeto_formulario.empresa=''
}

