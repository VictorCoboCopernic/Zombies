let fila = document.getElementById("InicioJuego");fila.addEventListener("click", InicioJuego);
let columna = document.getElementById("InicioJuego");columna.addEventListener("click", InicioJuego);

window.onload = function (){
    /*Oculta los divs*/
    mostrarJuego.style.display ="none";
    estadisticas.style.display ="none";  
}


function InicioJuego(){
    let Datofila = document.getElementById("fila").value;
    let Datocolumna = document.getElementById("columna").value;
if (Datofila>=5 && Datofila<=20 && Datocolumna>=5 && Datocolumna<=20 && Datofila % 1 == 0 && Datocolumna % 1 == 0){
    alert("El numero introducido de Filas es; = " + Datofila + " El numero introducido de columnas es; = " + Datocolumna);
}else{
    alert("Porfavor verifica los valores que has introducidos y vuelvelos a poner");
}




        }