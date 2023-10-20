<?php
include_once __DIR__.'/database.php';

// SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
$producto = file_get_contents('php://input');
if (!empty($producto)) {
    // SE TRANSFORMA EL STRING DEL JSON A OBJETO
    $jsonOBJ = json_decode($producto);

    // Validar si el producto ya existe
    $nombre = $jsonOBJ->nombre;
    $query = "SELECT * FROM productos WHERE nombre = '$nombre' AND eliminado = 0";

    if ($result = $conexion->query($query)) {
        if ($result->num_rows > 0) {
            // El producto ya existe, no se puede insertar
            echo 'Error: El producto ya existe en la base de datos.';
        } else {
            // El producto no existe, se puede insertar
            // Realiza la inserción en la base de datos
            $precio = $jsonOBJ->precio;
            $unidades = $jsonOBJ->unidades;
            $modelo = $jsonOBJ->modelo;
            $marca = $jsonOBJ->marca;
            $detalles = $jsonOBJ->detalles;

            $insertQuery = "INSERT INTO productos (nombre, precio, unidades, modelo, marca, detalles, eliminado) VALUES ('$nombre', $precio, $unidades, '$modelo', '$marca', '$detalles', 0)";
            if ($conexion->query($insertQuery)) {
                echo 'Éxito: Producto insertado correctamente en la base de datos.';
            } else {
                echo 'Error: No se pudo insertar el producto en la base de datos.';
            }
        }
    } else {
        echo 'Error: No se pudo realizar la verificación de duplicados.';
    }
} else {
    echo 'Error: No se recibieron datos del producto.';
}
?>
