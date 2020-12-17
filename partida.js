let partida = {
    zombie:[],
    estrella:[],
	mostrarTabla:function(medida){
        let IdentificadorCasilla = 0 ;
        let dibujarTabla = "<table>";
        for (let DibColumnas = 0; DibColumnas < medida; DibColumnas++){
            dibujarTabla += "<tr id=" + IdentificadorCasilla + " >";
            for (let DibFilas = 0; DibFilas < medida; DibFilas++){
                dibujarTabla += "<td> g </td>";
                IdentificadorCasilla+=1;
                console.log(IdentificadorCasilla);
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
    },		
}