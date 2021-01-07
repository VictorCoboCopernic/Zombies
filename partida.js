let partida = {
    zombie:[],
    estrella:[],
    tabla:[],
    vidas:3,
    puntos:0,
    contadorEstrellas:0,
    medida:0,
    
    inicio:function(){
    /*Oculta los divs*/
    estadisticas.style.display ="none";
    this.vidas=3;
    this.puntos=0;
    document.getElementById("showVidas").innerHTML = this.vidas;
    document.getElementById("showPuntos").innerHTML = this.puntos;
    setTimeout(PreguntarMedida, 250);
},

    
    mostrarTabla:function(){
        let dibujarTabla = "<table>";
        for (let DibColumnas = 0; DibColumnas < this.medida; DibColumnas++){
            for (let DibFilas = 0; DibFilas < this.medida; DibFilas++){
                if (["g","z","e","r1","r2","r3"].indexOf(partida.tabla[DibColumnas][DibFilas]) > -1){
                    dibujarTabla += "<td> </td>";
                }else{
                    dibujarTabla += "<td> " + partida.tabla[DibColumnas][DibFilas] + " </td>";
                }
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
    },		


    //crea la tablas con la medida establecida y ejecuta las varias funciones que la rellenan
    
    inicializaMatriz:function(){
        partida.creaTabla();
        partida.rellenaRecompensa();
        partida.rellenaEstrella();
        partida.rellenaZombie();
        partida.mostrarTabla();
        console.log(this.tabla);
    },
    
    //crea la tablas con la medida establecida y rellena las casillas con g
    
    creaTabla:function(){
        for(let i =0;i < this.medida; i++){
            this.tabla[i] = [];
            for(let j = 0; j < this.medida;j++ ){
                this.tabla[i][j] = "g";
            }
        }
    },
    
    rellenaRecompensa:function(){
        let totalRecompensa = Math.floor((this.medida*this.medida)/4) ;
        let contadorRecompensa = 0 ;
        let medidaRecompensa = 3 ;
        let BarcosObligatorios = 0 ;
        while(contadorRecompensa<totalRecompensa){
            let randomMedidaRecompensa = (Math.floor(Math.random() * 3) + 1);
            if(BarcosObligatorios==1){
                let medidaRecompensa = randomMedidaRecompensa ;
            }
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            let Orien = Math.floor(Math.random() * 2);
            if((contadorRecompensa + medidaRecompensa) <=  totalRecompensa){
                if(this.tabla[randomY][randomX] == "g"){
                    let correcte = 0 ;
                    for(let i =0;i < medidaRecompensa; i++){
                        if(Orien==0){
                            if(this.tabla[randomY][randomX+i] == "g"){
                                correcte+=1;
                            }
                        }
                        if(Orien==1){
                            if(this.tabla[randomY+i][randomX] == "g"){
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
    La función rellenaEstrella va saltando entre casillas aleatorias de la tabla y coloca una estrella si esta tiene una g, repite el proceso hasta que ha colocado todas las estrellas necesarias (tantas como columnas tenga la tabla)
    */    
    rellenaEstrella:function(){
        while(this.contadorEstrellas<this.medida){
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            if(this.tabla[randomY][randomX] == "g"){
                this.tabla[randomY][randomX] = "e";
                this.contadorEstrellas+=1;
            }
        }
    },
    
    /*
    La función rellenaZombie va saltando entre casillas aleatorias de la tabla y coloca un zombie si esta tiene una g, repite el proceso hasta que ha rellenado una cuarta parte de la tabla (Math.floor((medida*medida)/4))
    */ 
    rellenaZombie:function(){
        let contadorZombies = 0 ;
        let totalZombies = Math.floor((this.medida*this.medida)/4);
        while(contadorZombies<totalZombies){
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            if(this.tabla[randomY][randomX] == "g"){
                this.tabla[randomY][randomX] = "z";
                contadorZombies+=1 ;
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


    destaparCasilla:function(){
        console.log(this.medida);
        var PosX = document.getElementById("posicionX").value;
        var PosY = document.getElementById("posicionY").value;
        document.getElementById('posicionX').value = '';
        document.getElementById('posicionY').value = '';
        if (["G","Z","E","R1","R2","R3"].indexOf(partida.tabla[PosY][PosX]) > -1){
            alert("La casilla ya se ha destapado");
        }
        if(partida.tabla[PosY][PosX] == ""){
            alert("La casilla no existe");
        }
        if(partida.tabla[PosY][PosX] == "g"){
            partida.tabla[PosY][PosX] = "G";
            this.puntos+=50;
            document.getElementById("showPuntos").innerHTML = this.puntos;
            partida.mostrarTabla();
            console.log(partida.tabla);
        }
        if(partida.tabla[PosY][PosX] == "z"){
            partida.tabla[PosY][PosX] = "Z";
            this.vidas-=1;
            if(this.puntos<100){
                this.puntos=0;
            }else{
                this.puntos-=100;
            }
            document.getElementById("showVidas").innerHTML = this.vidas;
            document.getElementById("showPuntos").innerHTML = this.puntos;
            partida.mostrarTabla();
            console.log(partida.tabla);
            if(this.vidas==0){
                alert("Has Muerto");
                partida.inicio();
            }
        }
        if(partida.tabla[PosY][PosX] == "e"){
            partida.tabla[PosY][PosX] = "E";
            this.contadorEstrellas-=1;
            this.puntos+=200;
            document.getElementById("showPuntos").innerHTML = this.puntos;
            partida.mostrarTabla();
            console.log(partida.tabla);
            if(this.contadorEstrellas==0){
                alert("Has Ganado");
                partida.inicio();
            }
        }
    }
}