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
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
    },		


    //crea la tablas con la medida establecida y ejecuta las varias funciones que la rellenan
    
    inicializaMatriz:function(medida){
        partida.creaTabla(medida);
        partida.rellenaRecompensa(medida);
        partida.rellenaEstrella(medida);
        partida.rellenaZombie(medida);
        partida.rellenaGespa(medida);
        console.log(this.tabla);
    },
    
    //crea la tablas con la medida establecida y rellena las casillas con espacios en blanco para que sea más fácil trabajar con ellas después
    
    creaTabla:function(medida){
        for(let i =0;i < medida; i++){
            this.tabla[i] = [];
            for(let j = 0; j < medida;j++ ){
                this.tabla[i][j] = " ";
            }
        }
    },
    
    rellenaRecompensa:function(medida){
        let totalRecompensa = Math.floor((medida*medida)/4) ;
        let contadorRecompensa = 0 ;
        let medidaRecompensa = 3 ;
        let BarcosObligatorios = 0 ;
        while(contadorRecompensa<totalRecompensa){
            let randomMedidaRecompensa = (Math.floor(Math.random() * 3) + 1);
            if(BarcosObligatorios==1){
                let medidaRecompensa = randomMedidaRecompensa ;
            }
            let randomX = Math.floor(Math.random() * medida);
            let randomY = Math.floor(Math.random() * medida);
            let Orien = Math.floor(Math.random() * 2);
            if((contadorRecompensa + medidaRecompensa) <=  totalRecompensa){
                if(this.tabla[randomY][randomX] == " "){
                    let correcte = 0 ;
                    for(let i =0;i < medidaRecompensa; i++){
                        if(Orien==0){
                            if(this.tabla[randomY][randomX+i] == " "){
                                correcte+=1;
                            }
                        }
                        if(Orien==1){
                            if(this.tabla[randomY+i][randomX] == " "){
                                correcte+=1;
                            }
                        }
                        if(correcte==medidaRecompensa){
                            for(let i =0;i < medidaRecompensa; i++){
                                if(Orien==0){
                                    this.tabla[randomY][randomX+i] = ("r" + medidaRecompensa);
                                    contadorRecompensa+=1;
                                }
                                if(Orien==1){
                                    this.tabla[randomY+i][randomX] = ("r" + medidaRecompensa);
                                    contadorRecompensa+=1;
                                }
                            }
                            medidaRecompensa-=1;
                            if(medidaRecompensa==0){
                                let BarcosObligatorios = 1 ;
                            }
                        }
                    }
                }
            }
        }
    },
    
    /*
    La función rellenaEstrella va saltando entre casillas aleatorias de la tabla y coloca una estrella si esta tiene un espacio en blanco, repite el proceso hasta que ha colocado todas las estrellas necesarias (tantas como columnas tenga la tabla)
    */    
    rellenaEstrella:function(medida){
        let contadorEstrellas = 0 ;
        while(contadorEstrellas<medida){
            let randomX = Math.floor(Math.random() * medida);
            let randomY = Math.floor(Math.random() * medida);
            if(this.tabla[randomY][randomX] == " "){
                this.tabla[randomY][randomX] = "e";
                contadorEstrellas+=1;
            }
        }
            console.log(contadorEstrellas);
    },
    
    /*
    La función rellenaZombie va saltando entre casillas aleatorias de la tabla y coloca un zombie si esta tiene un espacio en blanco, repite el proceso hasta que ha rellenado una cuarta parte de la tabla (Math.floor((medida*medida)/4))
    */ 
    rellenaZombie:function(medida){
        let contadorZombies = 0 ;
        let totalZombies = Math.floor((medida*medida)/4);
        while(contadorZombies<totalZombies){
            let randomX = Math.floor(Math.random() * medida);
            let randomY = Math.floor(Math.random() * medida);
            if(this.tabla[randomY][randomX] == " "){
                this.tabla[randomY][randomX] = "z";
                contadorZombies+=1 ;
            }
        }
    },

    //Por último, recorre todas las casillas de la tabla y rellena con g todas aquellas que ahún conservan el espacio en blanco
    
    rellenaGespa:function(medida){
        for(let i =0;i < medida; i++){
            for(let j = 0; j < medida;j++ ){
                if(this.tabla[i][j] == " "){
                    this.tabla[i][j] = "g";
                }
            }
        }
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