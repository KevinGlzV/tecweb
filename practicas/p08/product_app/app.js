// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
  };

// FUNCIÓN CALLBACK DE BOTÓN "Buscar"
    /**
     * Revisar la siguiente información para entender porqué usar event.preventDefault();
     * http://qbit.com.mx/blog/2013/01/07/la-diferencia-entre-return-false-preventdefault-y-stoppropagation-en-jquery/#:~:text=PreventDefault()%20se%20utiliza%20para,escuche%20a%20trav%C3%A9s%20del%20DOM
     * https://www.geeksforgeeks.org/when-to-use-preventdefault-vs-return-false-in-javascript/
     */
    // FUNCIÓN CALLBACK DE BOTÓN "Buscar"

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
};

// FUNCIÓN CALLBACK DE BOTÓN "Buscar"
function buscarProductos(e) {
    e.preventDefault();

    // SE OBTIENE el texto de búsqueda
    var search = document.getElementById('search').value;
    console.log('Search: ' + search);
    // SE CREA EL OBJETO DE CONEXIÓN ASÍCRONA AL SERVIDOR
    var client = getXMLHttpRequest();
    client.open('POST', './backend/read.php', true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.onreadystatechange = function () {
        console.log('Status http request: ' + client.status);
        if (client.readyState == 4 && client.status == 200) {
            console.log('[CLIENTE]\n' + client.responseText);
            // SE OBTIENE EL ARRAY DE PRODUCTOS A PARTIR DEL JSON
            let productos = JSON.parse(client.responseText);
            // SE VERIFICA SI HAY RESULTADOS
            if (productos.length > 0) {
                // SE CREA UNA TABLA HTML PARA MOSTRAR LOS PRODUCTOS
                let tablaProductos = '<table border="1">';
                tablaProductos += '<tr><th>Nombre</th><th>Marca</th><th>Detalles</th></tr>';
                productos.forEach(function (producto) {
                    tablaProductos += '<tr>';
                    tablaProductos += '<td>' + producto.nombre + '</td>';
                    tablaProductos += '<td>' + producto.marca + '</td>';
                    tablaProductos += '<td>' + producto.detalles + '</td>';
                    tablaProductos += '</tr>';
                });
                tablaProductos += '</table>';

                // SE INSERTA LA TABLA EN EL ELEMENTO CON ID "productos"
                document.getElementById("productos").innerHTML = tablaProductos;
            }
        }
    };
    // Envía el parámetro 'search' en lugar de 'id'
    client.send("search=" + search);
}

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
function agregarProducto(e) {
    e.preventDefault();

    // SE OBTIENE DESDE EL FORMULARIO EL JSON A ENVIAR
    var productoJsonString = document.getElementById('description').value;

    // Validar el JSON antes de enviarlo al servidor
    try {
        // Corregir el JSON escapando las comillas dobles en los valores
        productoJsonString = productoJsonString.replace(/"/g, '\\"');

        var finalJSON = JSON.parse(productoJsonString);

        // Realizar las mismas validaciones que en la práctica anterior
        if (
            finalJSON.nombre &&
            finalJSON.marca &&
            finalJSON.detalles &&
            finalJSON.precio &&
            finalJSON.unidades &&
            finalJSON.modelo
        ) {
            // SE AGREGA AL JSON EL NOMBRE DEL PRODUCTO
            finalJSON['nombre'] = document.getElementById('name').value;
            // SE OBTIENE EL STRING DEL JSON FINAL
            productoJsonString = JSON.stringify(finalJSON, null, 2);

            // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
            var client = getXMLHttpRequest();
            client.open('POST', './backend/create.php', true);
            client.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
            client.onreadystatechange = function () {
                // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
                if (client.readyState == 4 && client.status == 200) {
                    console.log(client.responseText);

                    if (client.responseText.startsWith('Éxito')) {
                        alert("Producto agregado con éxito.");
                    } else {
                        alert("Error al agregar el producto: " + client.responseText);
                    }
                }
            };
            client.send(productoJsonString);
        } else {
            alert("Por favor, complete todos los campos del producto.");
        }
    } catch (error) {
        alert("El JSON del producto no es válido.");
    }
}

// SE CREA EL OBJETO DE CONEXIÓN COMPATIBLE CON EL NAVEGADOR
function getXMLHttpRequest() {
    var objetoAjax;

    try {
        objetoAjax = new XMLHttpRequest();
    } catch (err1) {
        /**
         * NOTA: Las siguientes formas de crear el objeto ya son obsoletas
         *       pero se comparten por motivos historico-académicos.
         */
        try {
            // IE7 y IE8
            objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (err2) {
            try {
                // IE5 y IE6
                objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (err3) {
                objetoAjax = false;
            }
        }
    }
    return objetoAjax;
}

function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     * ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
     */
    var JsonString = JSON.stringify(baseJSON, null, 2);
    document.getElementById("description").value = JsonString;
}

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
function agregarProducto(e) {
    e.preventDefault();

    // SE OBTIENE DESDE EL FORMULARIO EL JSON A ENVIAR
    var productoJsonString = document.getElementById('description').value;
    // SE CONVIERTE EL JSON DE STRING A OBJETO
    var finalJSON = JSON.parse(productoJsonString);
    // SE AGREGA AL JSON EL NOMBRE DEL PRODUCTO
    finalJSON['nombre'] = document.getElementById('name').value;
    // SE OBTIENE EL STRING DEL JSON FINAL
    productoJsonString = JSON.stringify(finalJSON,null,2);

    // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
    var client = getXMLHttpRequest();
    client.open('POST', './backend/create.php', true);
    client.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    client.onreadystatechange = function () {
        // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
        if (client.readyState == 4 && client.status == 200) {
            alert(client.responseText);
        }
    };
    client.send(productoJsonString);
}

// SE CREA EL OBJETO DE CONEXIÓN COMPATIBLE CON EL NAVEGADOR
function getXMLHttpRequest() {
    var objetoAjax;

    try{
        objetoAjax = new XMLHttpRequest();
    }catch(err1){
        /**
         * NOTA: Las siguientes formas de crear el objeto ya son obsoletas
         *       pero se comparten por motivos historico-académicos.
         */
        try{
            // IE7 y IE8
            objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err2){
            try{
                // IE5 y IE6
                objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(err3){
                objetoAjax = false;
            }
        }
    }
    return objetoAjax;
}

function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     * ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
     */
    var JsonString = JSON.stringify(baseJSON,null,2);
    document.getElementById("description").value = JsonString;
}