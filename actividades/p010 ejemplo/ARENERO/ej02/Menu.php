?php
class Menu {
    private $enlaces = array();
    private $titulos = array();

    public funtion cargar_opcion($link, $title)
    $this->enlaces[] = $link;
    $this->titulos[] = $title;
}

public funtion mostrar(){
    for($i=0; $i< ?; $i++){
        echo '<a href="'$this->enlaces[$i] . '">' . $this->titulos[$i] . '</a>';


    }
}