
# Guía IndexedDB
##### *Por Patricio Cifredo Reyes*

![navegador](/recursos/mediamodifier-8pc4Z3XEBO8-unsplash%20(1).jpg)
*Figura 1. Foto de Jeremy Bishop en Unsplash (Licencia Unsplash, uso libre). Extraída de https://unsplash.com/es/fotos/texto-8pc4Z3XEBO8*
* ****
Introducción
=

IndexedDB es una API de bajo nivel que permite almacenar de forma persistente
en el navegador grandes cantidades de datos estructurados. *Webdev(2016)*. Es decir, se trata de una base de 
datos que tienen la mayoría de navegadores y que permite trabajar con datos
en el lado del cliente.

>Sus principales características son:
>* Es una base de datos *NOSQL* transaccional y orientada a objetos
>* Es *asíncrona*: puede trabajar con muchas peticiones simultáneamente
>* Las operaciones se realizan con *transacciones*
>* Se usa el DOM para notificar el resultado de la petición: Los eventos de
 petición con éxito no se propagan (no burbujean) y los de error abortan por defecto
toda transacción
>* Cada Base de datos creada tiene asginado un origen (puerto y dominio), por tanto
no se puede acceder a las Bases de datos desde orígenes diferentes
>* Puede trabajar con mayores volumenes de datos que *LocalStorage*


Conceptos claves
=
Al trabajar con IndexedDB reconocemos los siguientes elementos:

* **IDBDatabase**: Es el objeto que representa la BBDD
* **IDBObjectStore**: El objeto que representa al *almacen*. 
"Sería similar a una tabla dentro de una base de datos relacional." *(Introducción a IndexedDB, 2023)* En el se almacenan
los datos o registros, los cuáles tienen una clave asociada.
* **IDBIndex:** "Interfaz de la API IndexedDB que proporciona acceso asincrónico a un índice en una base 
de datos" *(IDBINDEX - Web APIs | MDN, 2023)*.
* **IDBTransaction**: Objeto que nos permiten el acceso a la lectura y escritura de datos contenidos en la IDBD.
* **IDBRequest**: Permiten realizar las peticiones y consultas. Deben usarse con un evento *onsuccess*
* **IDBCursor**: Objeto que nos permite trabajar con consultas que arrojan multiples resultados.

Funcionamiento
=

###### 1. Iniciar la BBDD
> Aquí podemos observar como necesitamos abrir una petición de acceso a la IDB, dándole un nombre y una versión.
>Para la solicitud marcamos 3 eventos: 
> * **error**: por si hubiese algún fallo
> * **success**: para cuando se logre llevar a cabo
> * **upgradeneeded: para que cree la BBDD la primera vez que se accede a la web**

![ejemplo propio1](recursos/1.JPG)

###### 1. Crear el almacen
> Con **.createObjectStore** generamos el almacen llamado Clientes, cuya clave será *id* que senerará de forma automática
> por autoincremento


![ejemplo propio1](recursos/2.JPG)


Referencias
=

* Working with IndexedDB. (2016, 1 enero). web.dev. https://web.dev/articles/indexeddb?hl=en
* Introducción a IndexedDB. (2023, 1 noviembre). Manual Web. https://www.manualweb.net/html5/introduccion-indexedDB/
* https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API#browser_compatibility
* IDBINDEX - Web APIs | MDN. (2023, 28 febrero). https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex
* https://desarrolloweb.com/articulos/indexeddb.html
* https://es.javascript.info/indexeddb




