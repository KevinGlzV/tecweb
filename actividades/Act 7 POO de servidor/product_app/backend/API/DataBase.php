<?php

abstract class DataBase{
    protected $conexion;

    public function __construct($database){
        $this->conexion = @mysqli_connect('localhost','root','11223344',$database);

        if(!$this->conexion) {
            die('¡La base de datos no esta conectada!');
        }
    }

    public function desconectar(){
        mysqli_close($this->conexion);
    }

}
?>