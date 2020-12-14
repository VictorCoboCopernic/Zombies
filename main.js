window.onload = function PreguntarMedida(){
    /*Oculta los divs*/
    mostrarJuego.style.display ="none";
    estadisticas.style.display ="none";  
    let medida = prompt("Introduce la altura del tablero (entre 5 y 20)");
    InicioJuego(medida);
}


function InicioJuego(medida){
if (medida>=5 && medida<=20 && medida % 1 == 0){
    alert("La tabla creada es de " + medida + "x" + medida);
}else{
    alert("El valor introducido es incorrecto");
    let medida = prompt("Introduce la altura del tablero (entre 5 y 20)");
    InicioJuego(medida);
}




        }