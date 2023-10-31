<?php
    require_once 'API/Productos.php';

    $agregar = new Productos('marketzone');
    $agregar->add(json_decode(json_encode($_POST)));
    echo $agregar->getResponse();
?>