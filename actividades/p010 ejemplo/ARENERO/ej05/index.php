<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
require_once __DIR__ . '/Pagina.php';

$pag1=new Pagina('El rincon del programador',
'El sotano del programador');

for ($i=0; $i<15; $i++){
    $pag1->insertar_cuerpo('Taylor Swift tu patrona, linea: ' .
    $i . '. Y hoy sale 1989 (Taylor´s Verion), así que soporta YE, soporten todos');
}

$pag1->graficar();

?>
</body>
</html>