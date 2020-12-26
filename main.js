window.onload = function(){
    /*Oculta los divs*/
    estadisticas.style.display ="none";
    setTimeout(PreguntarMedida, 250);
}

function PreguntarMedida(){ 
    let medida = prompt("Introduce la altura del tablero (entre 5 y 20)");
    InicioJuego(medida);
}

function InicioJuego(medida){
    if (medida>=5 && medida<=20 && medida % 1 == 0){
        alert("La tabla creada es de " + medida + "x" + medida);
        partida.mostrarTabla(medida);
        partida.inicializaMatriz(medida);
    }else{
        alert("El valor introducido es incorrecto, comprueba que es un número entre 5 y 20");
        PreguntarMedida();  
    }
}