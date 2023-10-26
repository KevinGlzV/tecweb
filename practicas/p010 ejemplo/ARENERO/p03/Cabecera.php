<?php
/*
Ejemplo para coprobar uso de constructor
+
Ejemplo para comprobar uso de namespaces
*/
class Cabecera{
    private $titulo;
    private $ubicacion;

    public function_construct($title, $location) {
        this->titulo = $title;
        this->ubicacion[] = $location;
    }

}

public function graficar(){
    $estilo= 'front-size: 40px; text-aling: '.$this->ubicacion;
    echo '<div style= "' . $estilo . '">';
    echo '<h4>' . $this->titulo. '</h4>';
    echo '</div>';
}
?>