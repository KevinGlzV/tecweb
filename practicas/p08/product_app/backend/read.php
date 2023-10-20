<?php
include_once __DIR__.'/database.php';

// SE CREA EL ARREGLO QUE SE VA A DEVOLVER EN FORMA DE JSON
$data = array();

if (isset($_POST['search'])) {
    $search = $_POST['search'];

    // SE REALIZA LA QUERY DE BÚSQUEDA UTILIZANDO LIKE PARA BUSCAR EN NOMBRE, MARCA Y DETALLES
    $query = "SELECT * FROM productos WHERE nombre LIKE '%$search%' OR marca LIKE '%$search%' OR detalles LIKE '%$search%'";
    
    if (isset($_POST['search'])) {
        $search = $_POST['search'];
    
        // SE REALIZA LA QUERY DE BÚSQUEDA UTILIZANDO LIKE PARA BUSCAR EN NOMBRE, MARCA Y DETALLES
        $query = "SELECT * FROM productos WHERE nombre LIKE '%$search%' OR marca LIKE '%$search%' OR detalles LIKE '%$search%'";
    
        if ($result = $conexion->query($query)) {
            // SE OBTIENEN LOS RESULTADOS
            while ($row = $result->fetch_assoc()) {
                // SE CODIFICAN A UTF-8 LOS DATOS Y SE AGREGAN AL ARREGLO DE RESPUESTA
                $row['nombre'] = ($row['nombre']);
                $row['marca'] = ($row['marca']);
                $row['detalles'] = ($row['detalles']);
                $data[] = $row;
            }
            $result->free();
        } else {
            die('Query Error: ' . mysqli_error($conexion));
        }
        $conexion->close();
    }
}

// SE HACE LA CONVERSIÓN DE ARRAY A JSON
echo json_encode($data, JSON_PRETTY_PRINT);
?>


