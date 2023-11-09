<?php
    require_once 'API/Productos.php';

    $actualizar = new Productos('marketzone');
    $actualizar->edit(json_decode(json_encode($_POST)));
    echo $actualizar->getResponse();

?>