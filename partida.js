let partida = {
    zombie: [],
    estrella:[],
	mostrarTabla: function(medida){
        let IdentificadorCasilla = 0 ;
        let dibujarTabla = "<table>";
        for (let i = 0; i < medida; i++){
            dibujarTabla += "<tr>";
            for (let j = 0; j < medida; j++){
                dibujarTabla += "<td id=" + IdentificadorCasilla + "> g </td>";
                IdentificadorCasilla+=1;
                console.log(IdentificadorCasilla);
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
    },		
}