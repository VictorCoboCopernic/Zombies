//llama la funcion inicio cuando carga la página

window.onload = function(){
    //ComprovarLocal()
    partida.inicio();
}

/*
Pregunta al usuario cual es la medida del tablero que quiere introducir y asigna valor a las variable medida, nEstrellas (número de estrellas) y nZombies (número de zombies) del objeto partida teniendo en cuenta el tamaño del tablero, finalmente ejecuta InicioJuego
*/

function PreguntarMedida(){ 
    let medida = prompt("Introduce la altura del tablero (entre 5 y 20)");
    partida.medida = medida;
    partida.nEstrellas = medida;
    partida.nZombies = Math.floor((medida*medida)/4);
    InicioJuego(medida);
}

/*
Esta función se encarga de comprovar si el valor introducido en medida se encuentra entre los valores aceptados (entre 5 y 20 sin contar decimales), si los datos son correctos, muestra los menús y ejecuta inicializaMatriz, si no se da el caso, muestra un mensaje de error y vuelve a preguntar la medida
*/

function InicioJuego(medida){
    if (medida>=5 && medida<=20 && medida % 1 == 0){
        alert("La tabla creada es de " + medida + "x" + medida);
		estadisticas.style.display ="block";
        cambiarLetras.style.display ="block";
        partida.inicializaMatriz(medida);
    }else{
        alert("El valor introducido es incorrecto, comprueba que es un número entre 5 y 20 y que no contiene decimales");
        PreguntarMedida();  
    }
}

/*
Cuando esta función se ejecuta, se aplican los efectos de Doblar Puntuación: Cogemos la variable Puntos de partida y duplicamos su valor, también actualizamos el valor mostrado en pantalla
*/

function DoblePuntuacio(){
    partida.puntos=(partida.puntos*2);
    document.getElementById("showPuntos").innerHTML = partida.puntos;
}

/*
Cuando esta función se ejecuta, se aplican los efectos de Sumar Vida: Cogemos la variable Vidas de partida y le sumamos 1 al valor, también actualizamos el valor mostrado en pantalla
*/

function SumaVida(){
    partida.vidas+=1;
    document.getElementById("showVidas").innerHTML = partida.vidas;
}

/*
Cuando esta función se ejecuta, se aplican los efectos de Mitad Zombies: Cogemos el contador de zombies sin descubrir en partida y lo dividimos entre 2 (truncandolo) para saber el número de zombies que hemos de destapar, la función se encarga entonces de ir saltando entre posiciones aleatorias destapando zombies que encuentre tapados hasta que alcance el número definido
*/

function MeitatZombies(){
    let contadorZombies = Math.floor(partida.nZombies/2);
    while(contadorZombies>0){
        let randomX = Math.floor(Math.random() * partida.medida);
        let randomY = Math.floor(Math.random() * partida.medida);
        if(partida.tabla[randomY][randomX] == "z"){
            partida.tabla[randomY][randomX] = "Z";
            contadorZombies-=1 ;
            partida.nZombies-=1 ;
        }
    }
    partida.mostrarTabla();
}

function ComprovarLocal(){
    for(let i =5;i < 21; i++){
        console.log("taula" + i); 
        if(document.getElementById("taula" + i)==null){
            localStorage.setItem("t"+i, 0);
            document.getElementById("taula" + i).innerHTML = localStorage.getItem("t"+i);
        }
    }
}