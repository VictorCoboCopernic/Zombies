let partida = {
    zombie:[],
    estrella:[],
    tabla:[],
    vidas:3,
    puntos:0,
    medida:0,
    RecompensasObligatorias:0,
    nEstrellas:0,
    nZombies:0,
    medidaRecompensa:3,
    
    /*
    Esta función se ejecuta cuando cargamos la página o abandonamos. Oculta los menús, restablece las vidas y los puntos (y los muestra) y vacía la tabla, espera unos 250 milisegundos a que se cargue la página y entonces pregunta la medida del tablero
    */
    
    inicio:function(){
    estadisticas.style.display ="none";
    cambiarLetras.style.display ="none";
    this.tabla = []
    this.vidas=3;
    this.puntos=0;
    document.getElementById("showVidas").innerHTML = this.vidas;
    document.getElementById("showPuntos").innerHTML = this.puntos;
    setTimeout(PreguntarMedida, 250);
},

    /*
    Esta función se encarga de dibujar (o redibujar) la tabla que se muestra al usuario. Esta calca los valores que se encuentra en la consola a excepción de las casillas ocupadas por minúsculas, estas las deja en blanco, ya que deben estar ocultas
    */
    
    mostrarTabla:function(){
        let dibujarTabla = "<table>";
        for (let DibColumnas = 0; DibColumnas < this.medida; DibColumnas++){
            for (let DibFilas = 0; DibFilas < this.medida; DibFilas++){
                if (["g","z","e","d","m","v"].indexOf(this.tabla[DibColumnas][DibFilas]) > -1){
                    dibujarTabla += "<td> </td>";
                }else{
                    dibujarTabla += "<td> " + this.tabla[DibColumnas][DibFilas] + " </td>";
                }
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
    },		


    //Esta función ejecuta todas las funciones necesarias para crear la tabla
    
    inicializaMatriz:function(){
        this.creaTabla();
        this.rellenaRecompensa();
        this.rellenaEstrella();
        this.rellenaZombie();
        this.mostrarTabla();
        console.log(this.tabla);
    },
    
    //Crea la tabla con la medida establecida y rellena las casillas con g
    
    creaTabla:function(){
        for(let i =0;i < this.medida; i++){
            this.tabla[i] = [];
            for(let j = 0; j < this.medida;j++ ){
                this.tabla[i][j] = "g";
            }
        }
    },
    
    /*
    Esta función se encarga de crear las recompensas
    */
    
    rellenaRecompensa:function(){
        //totalRecompensa indica la cantidad total de casillas que deben estar ocupadas por recompensas
        let totalRecompensa = Math.floor((this.medida*this.medida)/4) ;
        //contadorRecompensa indica la cantidad de casillas que llevamos ocupadas por recompensas
        let contadorRecompensa = 0 ;
        while(contadorRecompensa<totalRecompensa){
            
            /*
            Al iniciar el proceso, la medida de la recompensa a colocar es 3 esta va bajando cada vez que se coloca una (para tener como mínimo  una de cada tipo) y cuando llega a cero, se activa RecompensasObligatorias conforme ya se han creado todos los tipos necesarios y la medida para a ser aleatoria
            */
            
            let randomMedidaRecompensa = (Math.floor(Math.random() * 3) + 1);
            if(this.RecompensasObligatorias==1){
                this.medidaRecompensa = randomMedidaRecompensa ;
            }
            
            /*
            La función va asignando una orientación y coordenadas obligatorias, se comprueba  si todas las casillas que quedarían  ocupadas por una recompensa de la medida establecida están  libres (no quedan fuera de los márgenes  de la tabla), si todas ellas están  disponibles, se imprime la recompensa sobre la tabla y se suman las casillas ocupadas al contador, también se resta uno a la medida de la recompensa para cuando se coloque la próxima. Si la medida recompensa queda en cero, se activa RecompensasObligatorias para que la medida pase a ser aleatoria a partir de ahora
            */
            
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            let Orien = Math.floor(Math.random() * 2);
            if((contadorRecompensa + this.medidaRecompensa) <=  totalRecompensa){
                if(this.tabla[randomY][randomX] == "g"){
                    let correcte = 0 ;
                    for(let i =0;i < this.medidaRecompensa; i++){
                        if(Orien==0){
                            if(this.tabla[randomY][(randomX)+i] == "g"){
                                correcte+=1;
                            }
                        }
                        if(Orien==1){
                            if(this.tabla[(randomY)+i][randomX] == "g"){
                                correcte+=1;
                            }
                        }
                        if(correcte==this.medidaRecompensa){
                            for(let i =0;i < this.medidaRecompensa; i++){
                                if(Orien==0){
                                    if(this.medidaRecompensa==1){
                                        this.tabla[randomY][randomX+i] = ("d");
                                    }
                                    if(this.medidaRecompensa==2){
                                        this.tabla[randomY][randomX+i] = ("m");
                                    }
                                    if(this.medidaRecompensa==3){
                                        this.tabla[randomY][randomX+i] = ("v");
                                    }
                                    contadorRecompensa+=1;
                                }
                                if(Orien==1){
                                    if(this.medidaRecompensa==1){
                                        this.tabla[randomY+i][randomX] = ("d");
                                    }
                                    if(this.medidaRecompensa==2){
                                        this.tabla[randomY+i][randomX] = ("m");
                                    }
                                    if(this.medidaRecompensa==3){
                                        this.tabla[randomY+i][randomX] = ("v");
                                    }
                                    contadorRecompensa+=1;
                                }
                            }
                            this.medidaRecompensa-=1;
                            if(this.medidaRecompensa==0){
                                this.RecompensasObligatorias = 1 ;
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
        let contadorEstrellas = 0;
        while(contadorEstrellas<this.medida){
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            if(this.tabla[randomY][randomX] == "g"){
                this.tabla[randomY][randomX] = "e";
                contadorEstrellas+=1;
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

    //Esta función se encarga de destapar la casilla que ha indicado el usuario
    
    destaparCasilla:function(){
        //Cogemos las coordenadas que hemos recibido del usuario y las convertimos en integer que podamos manipular fácilmente
        var PosX = parseInt(document.getElementById("posicionX").value, 10);
        var PosY = parseInt(document.getElementById("posicionY").value, 10);
        //Vaciamos las casillas donde se han introducido los valores
        document.getElementById('posicionX').value = '';
        document.getElementById('posicionY').value = '';
        
        /*
        Comprobamos si las coordenadas introducidas se encuentran dentro de la tabla (entre 0 y la medida de la tabla menos 1 sin contar decimales), si los datos son correctos, continua la ejecución, si no se da el caso, muestra un mensaje de error
        */
        if(PosX<0||PosY<0||PosX>(this.medida-1)||PosY>(this.medida-1)||PosX % 1 != 0||PosY % 1 != 0){
            alert("El valor introducido es incorrecto, comprueba que es un número entre 0 y " + (this.medida-1) + " y que no contiene decimales");
        }else{
            //Inicializamos un contador de las estrellas que nos quedan por destapar para saber cuanto nos queda hasta la victoria
            let contadorEstrella = this.medida;
            //Si la casilla que hemos introducido ya ha sido destapada, muestra un mensaje de error
            if (["G","Z","E","D","M","V"].indexOf(this.tabla[PosY][PosX]) > -1){
                alert("La casilla ya se ha destapado");
            }
            //Si hemos caído  en una g, destapa la casilla y suma 50 puntos
            if(this.tabla[PosY][PosX] == "g"){
                this.tabla[PosY][PosX] = "G";
                this.puntos+=50;
                document.getElementById("showPuntos").innerHTML = this.puntos;
                this.mostrarTabla();
                console.log(this.tabla);
            }
            
            /*
            Si hemos caido en una z, destapa la casilla y resta 100 puntos y 1 vida, si tienes menos de 100 puntos deja el marcador en cero y si te quedas sin vidas, muestra un mensaje de derrota, súmala al marcador y vuelve a iniciar una partida
            */
            
            if(this.tabla[PosY][PosX] == "z"){
                this.tabla[PosY][PosX] = "Z";
                this.nZombies-=1;
                this.vidas-=1;
                if(this.puntos<100){
                    this.puntos=0;
                }else{
                    this.puntos-=100;
                }
                document.getElementById("showVidas").innerHTML = this.vidas;
                document.getElementById("showPuntos").innerHTML = this.puntos;
                this.mostrarTabla();
                console.log(this.tabla);
                if(this.vidas==0){
                    alert("Has Muerto");
                    /*localStorage.setItem("d", (localStorage.getItem("d")+1));
                    document.getElementById("derrotas").innerHTML = localStorage.getItem("d");*/
                    this.inicio();
                }
            }
            
            /*
            Si hemos caído  en una e, destapa la casilla, suma 200 puntos y réstale  1 al contador de estrellas que quedan por destapar, si el contador llega a 0, muestra un mensaje de victoria, súmala al marcador y vuelve a iniciar una partida
            */
            
            if(this.tabla[PosY][PosX] == "e"){
                this.tabla[PosY][PosX] = "E";
                this.nEstrellas-=1;
                this.puntos+=200;
                document.getElementById("showPuntos").innerHTML = this.puntos;
                this.mostrarTabla();
                console.log(this.tabla);
                if(this.nEstrellas==0){
                    alert("Has Ganado");
                    /*localStorage.setItem("v", (localStorage.getItem("v")+1));
                    document.getElementById("victorias").innerHTML = localStorage.getItem("v");
                    if(this.puntos > localStorage.getItem("t" + this.medida)){
                        localStorage.setItem("t" + this.medida, this.puntos);
                        document.getElementById("record").innerHTML = localStorage.getItem("t" + this.medida);
                    }*/
                    this.inicio();
                }
            }
            
            /*
            Si hemos caído en una d significa que hemos activado la recompensa de duplicar la puntuación así que destapamos la casilla y ejecutamos la función
            */
            
            if(this.tabla[PosY][PosX] == "d"){
                this.tabla[PosY][PosX] = "D";
                DoblePuntuacio();
                this.mostrarTabla();
                console.log(this.tabla);
            }
            
            /*
            Si hemos caído en una m, destapa la casilla y comprueba si hay casillas adyacentes con M destapada, si se da el caso, significa que hemos activado la recompensa de eliminar la mitad de zombies ocultos así que ejecutamos la función
            */
            
            if(this.tabla[PosY][PosX] == "m"){
                this.tabla[PosY][PosX] = "M";
                
                if(this.tabla[PosY+1][PosX] == "M" ||
                   this.tabla[PosY-1][PosX] == "M" ||
                   this.tabla[PosY][PosX+1] == "M" ||
                   this.tabla[PosY][PosX-1] == "M"){
                    MeitatZombies();
                }
                this.mostrarTabla();
                console.log(this.tabla);
            }
            
            /*
            Si hemos caído en una v, destapa la casilla y comprueba si forma parte de una línea de tres V destapadas, si se da el caso, significa que hemos activado la recompensa de sumar una vida así que ejecutamos la función
            */
            
            if(this.tabla[PosY][PosX] == "v"){
                this.tabla[PosY][PosX] = "V";
                
                if((this.tabla[PosX+1][PosX] == "V" && this.tabla[PosY+2][PosX] == "V") ||
                   (this.tabla[PosY+1][PosX] == "V" && this.tabla[PosY-1][PosX] == "V") ||
                   (this.tabla[PosY-1][PosX] == "V" && this.tabla[PosY-2][PosX] == "V") ||
                   (this.tabla[PosY][PosX+1] == "V" && this.tabla[PosY][PosX+2] == "V") ||
                   (this.tabla[PosY][PosX+1] == "V" && this.tabla[PosY][PosX-1] == "V") ||
                   (this.tabla[PosY][PosX-1] == "V" && this.tabla[PosY][PosX-2] == "V")){
                    SumaVida();
                }
                this.mostrarTabla();
                console.log(this.tabla);
            }
        }
    }
}