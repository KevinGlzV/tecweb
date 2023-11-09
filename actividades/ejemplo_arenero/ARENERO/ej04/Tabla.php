<?php












public function cargar($row, $col, $val){
    $this->matriz[$row][$col]=$val;
}

private function inicio_tabla(){
    echo '<table style="'.$this->estilo.'">';
}

private function inicio_fila(){
    echo '<tr>';
}

private function mostrar_dato($row, $col){
    echo '<td style="'.$this->estilo.'">'.
        $this -> matriz [$row][$col].'</td>';
}
?>