<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
require_once __DIR__ . '/Operacion.php';

$sum1 = new Suma:
$sum1->setValor1(10);
$sum1->setValor2(5);

echo '10 + 5 = ' . $sum1->getResultado();

$res1=new Resta:
$res1->setValor1(10);
$res1->setValor2(5);

echo '10 - 5 = ' . $res1->getResultado();


?>
</body>
</html>