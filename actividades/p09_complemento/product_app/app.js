// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
};

let JsonString; // Declaración global

$(document).ready(function(){
    let edit = false;

    JsonString = JSON.stringify(baseJSON,null,2); // Asignación a la variable global
    $('#description').val(JsonString);
    $('#product-result').hide();
    listarProductos();

    function listarProductos() {
        $.ajax({
            url: './backend/product-list.php',
            type: 'GET',
            success: function(response) {
                // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                const productos = JSON.parse(response);
            
                // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                if(Object.keys(productos).length > 0) {
                    // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                    let template = '';

                    productos.forEach(producto => {
                        // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                        let descripcion = '';
                        descripcion += '<li>precio: '+producto.precio+'</li>';
                        descripcion += '<li>unidades: '+producto.unidades+'</li>';
                        descripcion += '<li>modelo: '+producto.modelo+'</li>';
                        descripcion += '<li>marca: '+producto.marca+'</li>';
                        descripcion += '<li>detalles: '+producto.detalles+'</li>';
                    
                        template += `
                            <tr productId="${producto.id}">
                                <td>${producto.id}</td>
                                <td><a href="#" class="product-item">${producto.nombre}</a></td>
                                <td><ul>${descripcion}</ul></td>
                                <td>
                                    <button class="product-delete btn btn-danger" onclick="eliminarProducto()">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                    $('#products').html(template);
                }
            }
        });
    }

    $('#search').keyup(function() {
        if($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: './backend/product-search.php?search='+$('#search').val(),
                data: {search},
                type: 'GET',
                success: function (response) {
                    if(!response.error) {
                        // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                        const productos = JSON.parse(response);
                        
                        // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                        if(Object.keys(productos).length > 0) {
                            // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                            let template = '';
                            let template_bar = '';

                            productos.forEach(producto => {
                                // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                                let descripcion = '';
                                descripcion += '<li>precio: '+producto.precio+'</li>';
                                descripcion += '<li>unidades: '+producto.unidades+'</li>';
                                descripcion += '<li>modelo: '+producto.modelo+'</li>';
                                descripcion += '<li>marca: '+producto.marca+'</li>';
                                descripcion += '<li>detalles: '+producto.detalles+'</li>';
                            
                                template += `
                                    <tr productId="${producto.id}">
                                        <td>${producto.id}</td>
                                        <td><a href="#" class="product-item">${producto.nombre}</a></td>
                                        <td><ul>${descripcion}</ul></td>
                                        <td>
                                            <button class="product-delete btn btn-danger">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                `;

                                template_bar += `
                                    <li>${producto.nombre}</il>
                                `;
                            });
                            // SE HACE VISIBLE LA BARRA DE ESTADO
                            $('#product-result').show();
                            // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
                            $('#container').html(template_bar);
                            // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                            $('#products').html(template);    
                        }
                    }
                }
            });
        }
        else {
            $('#product-result').hide();
        }
    });

    const validationRules = {
        name: {
            required: true,
            maxLength: 100
        },
        brand: {
            required: true,
            options: ['Brand A', 'Brand B', 'Brand C'] // Ejemplo de marcas permitidas
        },
        model: {
            required: true,
            pattern: /^[A-Za-z0-9\s]+$/,
            maxLength: 25
        },
        price: {
            required: true,
            min: 99.99
        },
        details: {
            optional: true,
            maxLength: 250
        },
        units: {
            required: true,
            min: 0
        }
        // No es necesario validar la imagen, ya que es opcional
    };

    // Manejar la validación al cambiar de campo
    $('#name, #brand, #model, #price, #details, #units').on('blur', function() {
        const fieldName = $(this).attr('id');
        const value = $(this).val();

        const validation = validationRules[fieldName];
        if (validation) {
            if (validation.required && value === '') {
                // Mensaje de campo requerido
                // Puedes mostrar un mensaje o realizar una acción específica
                console.log(`El campo ${fieldName} es requerido.`);
            } else if (validation.maxLength && value.length > validation.maxLength) {
                // Mensaje de exceder la longitud máxima
                console.log(`El campo ${fieldName} excede el límite de caracteres.`);
            } else if (validation.min && parseFloat(value) < validation.min) {
                // Mensaje de valor mínimo no alcanzado
                console.log(`El valor de ${fieldName} es menor al mínimo permitido.`);
            } else if (validation.pattern && !validation.pattern.test(value)) {
                // Mensaje de formato incorrecto (para el campo de modelo, por ejemplo)
                console.log(`El campo ${fieldName} tiene un formato inválido.`);
            }
        }
    });

    // Modificar el evento de submit para realizar la validación final antes de agregar el producto a la BD
    $('#product-form').submit(e => {
        e.preventDefault();
    
        const name = $('#name').val().trim();
        const price = parseFloat($('#price').val());
        const units = parseInt($('#units').val());
    
        if (!name || isNaN(price) || isNaN(units) || price < 99.99 || units < 0) {
            let errorMessage = '';
    
            if (!name) {
                errorMessage += 'Por favor, ingresa un nombre para el producto.<br>';
            }
    
            if (isNaN(price) || price < 99.99) {
                errorMessage += 'El precio debe ser un número válido y mayor o igual a 99.99.<br>';
            }
    
            if (isNaN(units) || units < 0) {
                errorMessage += 'Las unidades deben ser un número válido y mayor o igual a 0.<br>';
            }
    
            $('#error-message').html(errorMessage);
            $('#error-message').show();
            return;
        } else {
            $('#error-message').hide();
        }
    
        let postData = {
            "precio": price,
            "unidades": units,
            "modelo": $('#model').val(),
            "marca": $('#brand').val(),
            "detalles": $('#details').val(),
            "imagen": "img/default.png"
        };
    
        postData['nombre'] = $('#name').val();
        postData['id'] = $('#productId').val();
    
        const url = edit === false ? './backend/product-add.php' : './backend/product-edit.php';
    
        $.post(url, postData, (response) => {
            let respuesta = JSON.parse(response);
            let template_bar = `
                <li style="list-style: none;">status: ${respuesta.status}</li>
                <li style="list-style: none;">message: ${respuesta.message}</li>
            `;
            $('#name').val('');
            $('#description').val(JsonString);
            $('#product-result').show();
            $('#container').html(template_bar);
            listarProductos();
            edit = false;
        });
    });  

    $(document).on('click', '.product-delete', (e) => {
        if(confirm('¿Realmente deseas eliminar el producto?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr('productId');
            $.post('./backend/product-delete.php', {id}, (response) => {
                $('#product-result').hide();
                listarProductos();
            });
        }
    });

    $(document).on('click', '.product-item', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('productId');
        $.post('./backend/product-single.php', {id}, (response) => {
            // SE CONVIERTE A OBJETO EL JSON OBTENIDO
            let product = JSON.parse(response);
            // SE INSERTAN LOS DATOS ESPECIALES EN LOS CAMPOS CORRESPONDIENTES
            $('#name').val(product.nombre);
            // EL ID SE INSERTA EN UN CAMPO OCULTO PARA USARLO DESPUÉS PARA LA ACTUALIZACIÓN
            $('#productId').val(product.id);
            // SE ELIMINA nombre, eliminado E id PARA PODER MOSTRAR EL JSON EN EL <textarea>
            delete(product.nombre);
            delete(product.eliminado);
            delete(product.id);
            // SE ACTUALIZA EL VALOR DE LA VARIABLE GLOBAL EN LUGAR DE REDEFINIRLA LOCALMENTE
            JsonString = JSON.stringify(product,null,2);
            // SE MUESTRA STRING EN EL <textarea>
            $('#description').val(JsonString);
            
            // SE PONE LA BANDERA DE EDICIÓN EN true
            edit = true;
        });
        e.preventDefault();
    });    
});
