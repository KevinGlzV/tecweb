<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Práctica 3</title>
</head>
<body>
    <h2>Practica 3: Manejo de variables con PHP</h2>
    <h2>Ejercicio 1</h2>
    <p>Determina cuál de las siguientes variables son válidas y explica por qué:</p>
    <p>$_myvar,  $_7var,  myvar,  $myvar,  $var7,  $_element1, $house*5</p>
    <?php
        //AQUI VA MI CÓDIGO PHP
        $_myvar;
        $_7var;
        //myvar;       // Inválida
        $myvar;
        $var7;
        $_element1;
        //$house*5;     // Invalida

        echo '<ul>';
        echo '<li>$_myvar es válida porque inicia con guión bajo.</li>';
        echo '<li>$_7var es válida porque inicia con guión bajo.</li>';
        echo '<li>$myvar es válida porque inicia con una letra.</li>';
        echo '<li>$var7 es válida porque inicia con una letra.</li>';
        echo '<li>$_element1 es válida porque inicia con guión bajo.</li>';
        echo '</ul>';

    ?>
    <h2>Ejercicio 2</h2>
    <p>Proporcionar los valores de $a, $b, $c como sigue:
        $a = "ManejadorSQL";
        $b = 'MySQL';
        $c = &$a;</p>
    <?php
    $a = "ManejadorSQL";
    $b = 'MySQL';
    
    $c = &$a;

    echo '<ul>';
    echo '<li>Variable a: ' . $a . '</li>';
    echo '<li>Variable b: ' . $b . '</li>';
    echo '<li>Variable c: ' . $c . '</li>';
    echo '</ul>';
    
    echo 'Ahora agrega las siguientes lineas y muestra el contenido: ';
    echo '$a = “PHP server”;';
    echo '$b = &$a;';

    $a = "PHP server";
    $b = &$a;

    echo '<ul>';
    echo '<li>Variable a: ' . $a . '</li>';
    echo '<li>Variable b: ' . $b . '</li>';
    echo 'Lo que paso en el segundo bloque, es que la variable b esta haciendo referencia a la variable a, por lo que tendran el mismo valor';
    echo '</ul>'
    
?>

</body>
</html>