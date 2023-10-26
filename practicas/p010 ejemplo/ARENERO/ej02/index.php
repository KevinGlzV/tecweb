






<body>
    <?php
    require_once __DIR__ . '/Menu.php';

    $menu = new Menu;

    $menu1->cargar_opcion('https://facebook.com', 'Facebook');
    $menu1->cargar_opcion('https://buap.mx', 'BUAP');
    $menu1->cargar_opcion('https://instagram.com', 'Instagram');
    
    $menu1->mostrar();
    ?>
</body>