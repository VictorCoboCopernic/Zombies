/*

*/
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
/*

*/
	inicializaMatriz:function(medida){
        for(let i =0;i < medida; i++){
            this.tabla[i] = [];
            for(let j = 0; j < medida;j++ ){
                this.tabla[i][j] = "g";
            }
        }
        console.log(this.tabla)
    },
	
	
/*
	cambiarLetras:function(posicionX, posicionY){
	let boton = document.getElementById("cambiarLetras");
    boton.addEventListener("click" , destaparCasilla);			
		this.posicionX = posicionX;
		this.posicionY = posicionY; 
		for(
		
		
	},
	*/
}