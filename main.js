window.onload = function (){
    /*Oculta los divs*/
    mostrarJuego.style.display ="none";
    estadisticas.style.display ="none";

    var NumFila = prompt("Introduce el numero de filas ").split(" , ");   
    var NumColumna = prompt("Introduce el numero de columnas ").split(" , ");
    
    document.write("El numero de filas que has introducido es; " + NumFila + " El numero de columnas que has introducido es; " + NumColumna);
}