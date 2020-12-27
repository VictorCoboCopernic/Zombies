/*
	Funcion
		-Lo que hace esta funcion una vez que hemos abierto el archivo html, una vez cargada la pagina que se nos muestra en blanco; 
			- El div llamado estadisticas que no se muestre.
			- Que nos muestre al cabo de 250 milisegundos el recuadro donde le hacemos la pregunta al usuario.
*/
window.onload = function(){
    /*Oculta los divs*/
    estadisticas.style.display ="none";
    setTimeout(PreguntarMedida, 250);
}

/*
	Funcion
		- Pregunta al usuario cual es la medida del tablero que quiere introducir , si esta medida esta dentro del 5 y el 20, entonces pasa a la siguiente funcion llamada 'InicioJuego'
*/

function PreguntarMedida(){ 
    let medida = prompt("Introduce la altura del tablero (entre 5 y 20)");
    InicioJuego(medida);
}

/*
	Funcion
		- En esta funcion lo que hace es recoger el valor que el usuario a introducirlo y compararlo con los valores minimo y maximo. 
		Si esta dentro de esos dos valores entonces se cargara la siguiente funcion que es mostrar la tabla y inicializar la matriz.
		En el caso de que el valor introducido no este entre los valores minimo y maximo, saldra un aviso comunicando al usuario que compruebe el valor introducido y volvera a realizar la pregunta , asi hasta que el usuario introduzca algun valor que este entre el minimo y el maximo.
*/
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