//llama la función reinicio cuando carga la página

window.onload = function(){
    partida.reinicio();
}
    
/*
Esta función se encarga de preguntarnos la medida del tablero y comprobar si el valor introducido se encuentra entre los valores aceptados (entre 5 y 20 sin contar decimales), si los datos son correctos, muestra los menús y ejecuta inicializaMatriz, si no se da el caso, muestra un mensaje de error y vuelve a preguntar la medida
*/

function preguntarMedida (){
    setTimeout(function(){
        let newMedida = prompt("Introduce la altura del tablero (entre 5 y 20)");
        if (newMedida>=5 && newMedida<=20 && newMedida % 1 == 0){
            alert("La tabla creada es de " + newMedida + "x" + newMedida);
            estadisticas.style.display ="block";
            cambiarLetras.style.display ="block";
            partida.iniciarPartida(newMedida);
        }else{
            alert("El valor introducido es incorrecto, comprueba que es un número entre 5 y 20 y que no contiene decimales");
            preguntarMedida();  
        }
    }.bind(partida), 250);
}
    






