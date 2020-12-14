window.onload = function(){
    /*Oculta los divs*/
    mostrarJuego.style.display ="none";
    estadisticas.style.display ="none";
    PreguntarMedida();  
}

window.onload = function PreguntarMedida(){ 
    let medida = prompt("Introduce la altura del tablero (entre 5 y 20)");
    InicioJuego(medida);
}


function InicioJuego(medida){
if (medida>=5 && medida<=20 && medida % 1 == 0){
    alert("La tabla creada es de " + medida + "x" + medida);
    partida.iniciar(medida);
}else{
    alert("El valor introducido es incorrecto");
    PreguntarMedida();  
}




        }