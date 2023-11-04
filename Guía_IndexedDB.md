

IndexedDB es una API de bajo nivel que permite almacenar de forma persistente
en el navegador
grandes cantidades de datos estructurados.
Para ello usa pares clave-valor ('keys'). Es útil añadir que no necesita
conectividad continua con internet para recuperar los datos.
Sus principales características son:

* Es una base de datos transaccional y orientada a objetos (NoSQL)
* Es asíncrona: puede trabajar con muchas peticiones simultáneamente
* Se usa el DOM para notificar el resultado de la petición: Los eventos de
 petición con éxito no se propagan (no burbujean) y los de error abortan por defecto
toda transacción
* Cada Base de datos creada tiene asginado un origen (puerto y dominio), por tanto
no se puede acceder a las Bases de datos desde orígenes diferentes



Bibliografía utilizada:

* https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API#browser_compatibility
* https://desarrolloweb.com/articulos/indexeddb.html
* https://es.javascript.info/indexeddb




