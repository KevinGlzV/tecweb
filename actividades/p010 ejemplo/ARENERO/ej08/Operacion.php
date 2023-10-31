<?php
class Operacion {
    private $valor1;
    private $valor2;
    private $resultado;

    public function __construct(){
        $this->$valor1=0;
        $this->$valor2=0;
        $this->$resultado=0;
    }

    public function setValor1($val1){
        $this->$valor1=val1;
    }

    public function setValor2($val2){
        $this->$valor2=val2;
    }

    public function getResultado(){
        return $this->$resultado;
    }

    class Suma extends Operacion{
        public function operar(){
            $this->$resultado=$this->$valor1 + $this->$valor2;
        }
    }

    class Resta extends Operacion{
        public function operar(){
            $this->$resultado=$this->$valor1 - $this->$valor2;
        }
}
?>