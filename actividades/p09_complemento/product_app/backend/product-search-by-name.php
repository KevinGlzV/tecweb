<?php
// Simulación de una base de datos o fuente de datos
$products = [
    ["id" => 1, "name" => "Producto 1"],
    ["id" => 2, "name" => "Producto 2"],
    ["id" => 3, "name" => "Producto 3"],
    // Agrega más productos aquí...
];

$searchQuery = $_GET['search']; // Obtén el término de búsqueda

$matchingProducts = [];

// Realiza una búsqueda simulada en la fuente de datos
foreach ($products as $product) {
    if (stripos($product['name'], $searchQuery) !== false) {
        $matchingProducts[] = $product;
    }
}

// Devuelve los resultados como JSON
echo json_encode($matchingProducts);
?>
