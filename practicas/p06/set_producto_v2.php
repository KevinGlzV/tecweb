<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "11223344";
$dbname = "marketzone";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Validar que se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = mysqli_real_escape_string($conn, $_POST["nombre"]);
    $marca = mysqli_real_escape_string($conn, $_POST["marca"]);
    $modelo = mysqli_real_escape_string($conn, $_POST["modelo"]);
    $precio = $_POST["precio"];
    $detalles = mysqli_real_escape_string($conn, $_POST["detalles"]);
    $unidades = $_POST["unidades"];

    // Validar que ningún dato esté vacío
    if (empty($nombre) || empty($marca) || empty($modelo) || empty($precio) || empty($detalles) || empty($unidades)) {
        echo "Error: Todos los campos son obligatorios.";
    } else {
        // Validar el formato del precio como un número con punto decimal
        if (!is_numeric($precio) || !preg_match("/^\d+(\.\d{1,2})?$/", $precio)) {
            echo "Error: El precio debe ser un número con hasta dos decimales.";
        } else {
            // Procesar la imagen
            $imagen = $_FILES["imagen"]["name"];
            $imagen_temp = $_FILES["imagen"]["tmp_name"];
            $imagen_path = "C:/xampp/htdocs/tecweb/practicas/p05/img/" . $imagen;

            if (move_uploaded_file($imagen_temp, $imagen_path)) {
                // Insertar datos en la base de datos
                $sql = "INSERT INTO productos (nombre, marca, modelo, precio, detalles, unidades, imagen, eliminado)
                        VALUES ('$nombre', '$marca', '$modelo', '$precio', '$detalles', '$unidades', '$imagen_path', 0)";

                if ($conn->query($sql) === TRUE) {
                    echo "Registro de producto exitoso. Los datos son:";
                    echo "<p>Nombre: $nombre</p>";
                    echo "<p>Marca: $marca</p>";
                    echo "<p>Modelo: $modelo</p>";
                    echo "<p>Precio: $precio</p>";
                    echo "<p>Detalles: $detalles</p>";
                    echo "<p>Unidades: $unidades</p>";
                    echo "<img src='$imagen_path' alt='Imagen del producto'>";
                } else {
                    echo "Error al insertar en la base de datos: " . $conn->error;
                }
            } else {
                echo "Error al subir la imagen.";
            }
        }
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
