let numero1 = document.getElementById("InicioJuego");numero1.addEventListener("click", InicioJuego);
let numero2 = document.getElementById("InicioJuego");numero2.addEventListener("click", InicioJuego);

window.onload = function (){
    /*Oculta los divs*/
    mostrarJuego.style.display ="none";
    estadisticas.style.display ="none";  
}


function InicioJuego(){
    let num1 = document.getElementById("numero1").value;
    let num2 = document.getElementById("numero2").value;
if (num1>=5 && num1<=20 && num2>=5 && num2<=20 && num1 % 1 == 0 && num2 % 1 == 0){
    alert("val1 = " + num1 + " val2 = " + num2);
}else{
    alert("ERROR");
}




        }