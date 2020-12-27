/*

*/
let partida = {
    zombie:[],
    estrella:[],
    tabla:[],
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
        let contadorEstrellas = 0 ;
        let IdentificadorCasilla = 0 ;
        for(let i =0;i < medida; i++){
            this.tabla[i] = [];
            for(let j = 0; j < medida;j++ ){
                let estrellaAleatori = Math.floor(Math.random() * (medida-1));  
                if (contadorEstrellas == medida){
                    this.tabla[i][j] = " ";
                }else if(((medida*medida)-IdentificadorCasilla)==(medida-contadorEstrellas)){
                    this.tabla[i][j] = "e";
                    contadorEstrellas+=1;
                }else if (estrellaAleatori==0){
                    this.tabla[i][j] = "e";
                    contadorEstrellas+=1;
                }else{
                    this.tabla[i][j] = " ";
                }
                IdentificadorCasilla+=1;
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