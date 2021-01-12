let partida = {
    zombies:[],
    estrelles:[],
    tabla:[],
    doblePuntuaciones:[],
    mitadZombies:[],
    sumaVidas:[],
    vidas:3,
    puntos:0,
    medida:0,
    recompensasObligatorias:false,
    contadorEstrellas:0,
    totalZombies:0,
    zombiesRestantes:0,
    medidaRecompensa:3,
    primerDestape:false,
    
/*
Cuando el usuario abandona se suma un punto al marcador de abandonos y reinicia la partida
*/

abandono: function (){
    let abandonos = parseInt(localStorage.getItem("abandonos"));
    localStorage.setItem("abandonos", (abandonos+1));
    document.getElementById("showAbandonos").innerHTML = localStorage.getItem("abandonos");
    setTimeout(function(){
    this.reinicio();
    }.bind(this), 250);
},

/*
Esta función se ejecuta cuando cargamos la página o después de abandonar. Oculta los menús, restablece las vidas y los puntos,
crea los localStorage si no existen (y los muestra) y vacía la tabla, espera unos 250 milisegundos a que se cargue la página y
entonces pregunta la medida del tablero
*/
    
    reinicio: function (){
    this.tabla = [];
    this.vidas=3;
    this.puntos=0;
    document.getElementById("showVidas").innerHTML = this.vidas;
    document.getElementById("showPuntos").innerHTML = this.puntos;
    
    if (localStorage.getItem("victorias") === null) {
      localStorage.setItem("victorias", 0);
    }
        
    document.getElementById("showVictorias").innerHTML = localStorage.getItem("victorias");
    
    if (localStorage.getItem("derrotas") === null) {
        localStorage.setItem("derrotas", 0);
    }
    
    document.getElementById("showDerrotas").innerHTML = localStorage.getItem("derrotas");
    
    if (localStorage.getItem("abandonos") === null) {
        localStorage.setItem("abandonos", 0);
    }
    document.getElementById("showAbandonos").innerHTML = localStorage.getItem("abandonos");
    
    estadisticas.style.display ="none";
    cambiarLetras.style.display ="none";
    preguntarMedida();
},


/*
Esta función inicia una nueva partida, se encarga de crear la tabla y rellenarla y de resetear todas las variables y arrays. También
muestra el record de puntuación de la tabla que hemos creado
*/
    
iniciarPartida: function (newMedida){
    if (localStorage.getItem("t" + newMedida) === null) {
        localStorage.setItem("t" + newMedida, 0);
    }
    document.getElementById("showRecord").innerHTML = localStorage.getItem("t" + newMedida);
    this.medida = newMedida
    this.totalZombies = Math.floor((newMedida*newMedida)/4);
    this.zombiesRestantes = Math.floor((newMedida*newMedida)/4);
    this.zombies = [];
    this.estrelles = [];
    this.doblePuntuaciones = [];
    this.mitadZombies = [];
    this.sumaVidas = [];
    this.contadorEstrellas=0;
    this.medidaRecompensa=3;
    this.primerDestape=false;
    this.creaTabla();
    this.rellenaRecompensa();
    this.rellenaEstrella();
    this.rellenaZombie();
    this.mostrarTabla();
    console.log(this.tabla);
},

    /*
    Esta función se encarga de dibujar (o redibujar) la tabla que se muestra al usuario. Esta calca los valores que se encuentra
    en la consola a excepción de las casillas ocupadas por minúsculas, estas las deja en blanco, ya que deben estar ocultas
    */
    
    mostrarTabla:function(){
        let dibujarTabla = "<table>";
        for (let DibColumnas = 0; DibColumnas < this.medida; DibColumnas++){
            for (let DibFilas = 0; DibFilas < this.medida; DibFilas++){
                if (["g","z","e","d","m","v"].indexOf(this.tabla[DibColumnas][DibFilas]) > -1){
                    dibujarTabla += "<td> <img src='Visuals/misterio.png' style='width:50px;height:50px;'></td>";
                }else{
                    if(this.tabla[DibColumnas][DibFilas]=="G"){
                        dibujarTabla += "<td> <img src='Visuals/grass.jpg' style='width:50px;height:50px;'></td>";
                    }
                    if(this.tabla[DibColumnas][DibFilas]=="Z"){
                        dibujarTabla += "<td> <img src='Visuals/zombie.png' style='width:50px;height:50px;'></td>";
                    }
                    if(this.tabla[DibColumnas][DibFilas]=="E"){
                        dibujarTabla += "<td> <img src='Visuals/estrella.png' style='width:50px;height:50px;'></td>";
                    }
                    if(this.tabla[DibColumnas][DibFilas]=="D"){
                        dibujarTabla += "<td> <img src='Visuals/x2.png' style='width:50px;height:50px;'></td>";
                    }
                    if(this.tabla[DibColumnas][DibFilas]=="M"){
                        dibujarTabla += "<td> <img src='Visuals/deadzombie.png' style='width:50px;height:50px;'></td>";
                    }
                    if(this.tabla[DibColumnas][DibFilas]=="V"){
                        dibujarTabla += "<td> <img src='Visuals/1up.png' style='width:50px;height:50px;'></td>";
                    }
                }
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
    },
    
    /*
    Esta función es una variación de mostrarTabla que solo se ejecuta durante 300 milisegundos si la primera casilla destapada es
    una estrella. Muestra todos los elementos de las casillas independientemente de si están ocultos o no
    */
    
    mostrarTablaCompleta:function(){
        let dibujarTabla = "<table>";
        for (let DibColumnas = 0; DibColumnas < this.medida; DibColumnas++){
            for (let DibFilas = 0; DibFilas < this.medida; DibFilas++){
                if(this.tabla[DibColumnas][DibFilas]=="g" || this.tabla[DibColumnas][DibFilas]=="G"){
                    dibujarTabla += "<td> <img src='Visuals/grass.jpg' style='width:50px;height:50px;'></td>";
                }
                if(this.tabla[DibColumnas][DibFilas]=="z" || this.tabla[DibColumnas][DibFilas]=="Z"){
                    dibujarTabla += "<td> <img src='Visuals/zombie.png' style='width:50px;height:50px;'></td>";
                }
                if(this.tabla[DibColumnas][DibFilas]=="e" || this.tabla[DibColumnas][DibFilas]=="E"){
                    dibujarTabla += "<td> <img src='Visuals/estrella.png' style='width:50px;height:50px;'></td>";
                }
                if(this.tabla[DibColumnas][DibFilas]=="d" || this.tabla[DibColumnas][DibFilas]=="D"){
                    dibujarTabla += "<td> <img src='Visuals/x2.png' style='width:50px;height:50px;'></td>";
                }
                if(this.tabla[DibColumnas][DibFilas]=="m" || this.tabla[DibColumnas][DibFilas]=="M"){
                    dibujarTabla += "<td> <img src='Visuals/deadzombie.png' style='width:50px;height:50px;'></td>";
                }
                if(this.tabla[DibColumnas][DibFilas]=="v" || this.tabla[DibColumnas][DibFilas]=="V"){
                    dibujarTabla += "<td> <img src='Visuals/1up.png' style='width:50px;height:50px;'></td>";
                }
            }
            dibujarTabla += "</tr>";
        }
        dibujarTabla += "</table>";
        document.getElementById("mostrarJuego").innerHTML = dibujarTabla;
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
            Al iniciar el proceso, la medida de la recompensa a colocar es 3 esta va bajando cada vez que se coloca una
            (para tener como mínimo  una de cada tipo) y cuando llega a cero, se activa Recompensasobligatorias conforme
            ya se han creado todos los tipos necesarios y la medida para a ser aleatoria
            */
            
            let randomMedidaRecompensa = (Math.floor(Math.random() * 3) + 1);
            if(this.Recompensasobligatorias==true){
                this.medidaRecompensa = randomMedidaRecompensa ;
            }
            
            /*
            La función va asignando una orientación y coordenadas obligatorias, se comprueba  si todas las casillas que
            quedarían  ocupadas por una recompensa de la medida establecida están  libres (no quedan fuera de los márgenes
            de la tabla), si todas ellas están  disponibles, se imprime la recompensa sobre la tabla y se suman las casillas
            ocupadas al contador, también se resta uno a la medida de la recompensa para cuando se coloque la próxima. Si la
            medida recompensa queda en cero, se activa Recompensasobligatorias para que la medida pase a ser aleatoria a partir
            de ahora
            */
            
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            let Orien = Math.floor(Math.random() * 2);
            if((contadorRecompensa + this.medidaRecompensa) <=  totalRecompensa){
                if(this.tabla[randomY][randomX] == "g"){
                    let correcte = 0 ;
                    for(let i =0;i < this.medidaRecompensa; i++){
                        if(Orien==0){
                            if(this.tabla[randomY][randomX+i] == "g"){
                                correcte+=1;
                            }
                        }
                        try{
                            if(Orien==1){
                                if(this.tabla[randomY+i][randomX] == "g"){
                                    correcte+=1;
                                }
                            }
                        }catch(err){}
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
                            
                            /*
                            Esto se encarga de crear el objeto recompensa con los valores que hemos introducido en el tablero.
                            Comprueba el tipo de recompensa que hemos creado y vuelve a recorrer las casillas de antes asignando
                            sus coordenadas a las propiedades del objeto
                            */
                            
                            if(this.medidaRecompensa==1){
                                let doblePuntuacion = new DoblePuntuacion(randomX, randomY);
                                this.doblePuntuaciones.push(doblePuntuacion);
                            }
                            if(Orien==0){
                                if(this.medidaRecompensa==2){
                                    let mitadZombie = new MitadZombie(randomX, randomY, (randomX+1), randomY);
                                    this.mitadZombies.push(mitadZombie);
                                }
                                if(this.medidaRecompensa==3){
                                    let sumaVida = new SumaVida(randomX, randomY, (randomX+1), randomY, (randomX+2), randomY);
                                    this.sumaVidas.push(sumaVida);
                                }
                            }
                            if(Orien==1){
                                if(this.medidaRecompensa==2){
                                    let mitadZombie = new MitadZombie(randomX, randomY, randomX, (randomY+1));
                                    this.mitadZombies.push(mitadZombie);
                                }
                                if(this.medidaRecompensa==3){
                                    let sumaVida = new SumaVida(randomX, randomY, randomX, (randomY+1), randomX, (randomY+2));
                                    this.sumaVidas.push(sumaVida);
                                }
                            }
                            this.medidaRecompensa-=1;
                            if(this.medidaRecompensa==0){
                                this.Recompensasobligatorias = true ;
                            }
                        }
                    }
                }
            }
        }
        this.Recompensasobligatorias=false;
    },
    
    /*
    La función rellenaEstrella va saltando entre casillas aleatorias de la tabla, si esta tiene una g, coloca una e
    en esa casilla y crea un objeto estrella con las coordenadas establecidas y lo añade al array, repite el proceso
    hasta que ha colocado todas las estrellas necesarias (tantas como columnas tenga la tabla)
    */    
    rellenaEstrella:function(){
        this.contadorEstrellas = 0;
        while(this.contadorEstrellas<this.medida){
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            if(this.tabla[randomY][randomX] == "g"){
                this.tabla[randomY][randomX] = "e";
                let estrella = new Estrella(randomX, randomY);
                this.estrelles.push(estrella);
                this.contadorEstrellas++;
            }
        }
    },
    
    /*
    La función rellenaZombie va saltando entre casillas aleatorias de la tabla, si esta tiene una g, coloca una z en esa
    casilla y crea un objeto zombie con las coordenadas establecidas y lo añade al array, repite el proceso hasta que ha
    rellenado una cuarta parte de la tabla (Math.floor((medida*medida)/4))
    */ 
    rellenaZombie:function(){
        let contadorZombies = 0 ;
        while(contadorZombies<this.totalZombies){
            let randomX = Math.floor(Math.random() * this.medida);
            let randomY = Math.floor(Math.random() * this.medida);
            if(this.tabla[randomY][randomX] == "g"){
                this.tabla[randomY][randomX] = "z";
                let zombie = new Zombie(randomX, randomY);
                this.zombies.push(zombie);
                contadorZombies++;
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
        Comprobamos si las coordenadas introducidas se encuentran dentro de la tabla (entre 0 y la medida de la tabla menos 1
        sin contar decimales), si los datos son correctos, continua la ejecución, si no se da el caso, muestra un mensaje de error
        */
        if(PosX<0||PosY<0||PosX>(this.medida-1)||PosY>(this.medida-1)||PosX % 1 != 0||PosY % 1 != 0){
            alert("El valor introducido es incorrecto, comprueba que es un número entre 0 y " + (this.medida-1) + " y que no contiene decimales");
        }else{
            //Inicializamos un contador de las estrellas que nos quedan por destapar para saber cuanto nos queda hasta la victoria
            let contadorEstrella = this.medida;
            //Si la casilla que hemos introducido ya ha sido destapada, muestra un mensaje de error
            if (["G","Z","E","D","M","V"].indexOf(this.tabla[PosY][PosX]) > -1){
                alert("La casilla ya se ha destapado");
            }else{
                //Si hemos caído  en una g, destapa la casilla y suma 50 puntos
                if(this.tabla[PosY][PosX] == "g"){
                    this.tabla[PosY][PosX] = "G";
                    this.puntos+=50;
                    document.getElementById("showPuntos").innerHTML = this.puntos;
                    this.mostrarTabla();
                    console.log(this.tabla);
                    this.primerDestape=true;
                }

                /*
                Comprueba si las coordenadas introducidas coinciden con la posición de un zombie, si es así destapa la casilla y
                resta 100 puntos y 1 vida, si tienes menos de 100 puntos deja el marcador en cero y si te quedas sin vidas, muestra
                un mensaje de derrota, súmala al marcador y vuelve a iniciar una partida
                */

                for(let i =0;i < this.totalZombies; i++){
                    if(PosX == this.zombies[i].X && PosY == this.zombies[i].Y && this.zombies[i].activado==false){
                        this.tabla[PosY][PosX] = "Z";
                        this.zombies[i].activado=true;
                        this.zombiesRestantes--;
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
                        this.primerDestape=true;
                        if(this.vidas==0){
                            setTimeout(function(){
                                alert("Has Muerto");
                                let derrotas = parseInt(localStorage.getItem("derrotas"));
                                localStorage.setItem("derrotas", (derrotas+1));
                                this.reinicio();
                            }.bind(this), 250);
                        }
                    }
                }

                /*
                Comprueba si las coordenadas introducidas coinciden con la posición de una estrella, si es así destapa la casilla,
                suma 200 puntos y réstale 1 al contador de estrellas que quedan por destapar, si el contador llega a 0, muestra un
                mensaje de victoria, súmala al marcador y vuelve a iniciar una partida. Si has batido el record de puntuación en esta
                tabla, sustituye el valor de record en esta
                */

                for(let i =0;i < this.medida; i++){
                    if(PosX == this.estrelles[i].X && PosY == this.estrelles[i].Y && this.estrelles[i].activado==false){
                        this.tabla[PosY][PosX] = "E";
                        this.estrelles[i].activado=true
                        this.contadorEstrellas--;
                        this.puntos+=200;
                        document.getElementById("showPuntos").innerHTML = this.puntos;
                        this.mostrarTabla();
                        console.log(this.tabla);
                        
                        /*
                        Comprueba si esta estrella ha sido el primer destape del tablero, si se da el caso, ejecutamos mostrarTablaCompleta
                        antes de sustituirlo 300 milisegundos después
                        */
                        
                        if(this.primerDestape==false){
                            this.mostrarTablaCompleta();
                            setTimeout(function(){
                                this.mostrarTabla();
                            }.bind(this), 300);
                            this.primerDestape=true;
                        }
                        if(this.contadorEstrellas==0){
                            setTimeout(function(){
                                alert("Has Ganado");
                                let victorias = parseInt(localStorage.getItem("victorias"));
                                localStorage.setItem("victorias", (victorias+1));
                                if(this.puntos > localStorage.getItem("t" + this.medida)){
                                    localStorage.setItem("t" + this.medida, this.puntos);
                                }
                                this.reinicio();
                            }.bind(this), 250);
                        }
                    }
                }

                /*
                Comprueba si las coordenadas introducidas coinciden con la posición de una recompensa doblePuntuacion desactivada,
                si es así destapamos la casilla, la declaramos como activada y ejecutamos su función
                */

                for(let i =0;i < this.doblePuntuaciones.length; i++){
                    if(PosX == this.doblePuntuaciones[i].X && PosY == this.doblePuntuaciones[i].Y && this.doblePuntuaciones[i].activado==false){
                        this.tabla[PosY][PosX] = "D";
                        this.doblePuntuaciones[i].activado=true;
                        this.DoblePuntuacio();
                        this.mostrarTabla();
                        console.log(this.tabla);
                        this.primerDestape=true;
                    }
                }

                /*
                Comprueba si las coordenadas introducidas coinciden con la posición de una recompensa mitadZombie desactivada, si
                es así destapamos la casilla, si todas las casillas de premio han sido destapadas la declaramos como activada y
                ejecutamos su función
                */

                for(let i =0;i < this.mitadZombies.length; i++){
                    if((PosX == this.mitadZombies[i].X && PosY == this.mitadZombies[i].Y) ||
                       (PosX == this.mitadZombies[i].X2 && PosY == this.mitadZombies[i].Y2) && this.mitadZombies[i].activado==false){

                        this.tabla[PosY][PosX] = "M";

                        if((this.tabla[this.mitadZombies[i].Y][this.mitadZombies[i].X] == "M")&&
                           (this.tabla[this.mitadZombies[i].Y2][this.mitadZombies[i].X2] == "M")){
                            this.MeitatZombies();
                            this.mitadZombies[i].activado=true;
                        }
                        this.mostrarTabla();
                        console.log(this.tabla);
                        this.primerDestape=true;
                    }
                }

                /*
                Comprueba si las coordenadas introducidas coinciden con la posición de una recompensa sumaVida desactivada, si es así
                destapamos la casilla, si todas las casillas de premio han sido destapadas la declaramos como activada y ejecutamos
                su función
                */

                for(let i =0;i < this.sumaVidas.length; i++){
                    if((PosX == this.sumaVidas[i].X && PosY == this.sumaVidas[i].Y) ||
                       (PosX == this.sumaVidas[i].X2 && PosY == this.sumaVidas[i].Y2)||
                        (PosX == this.sumaVidas[i].X3 && PosY == this.sumaVidas[i].Y3) && this.sumaVidas[i].activado==false){


                        this.tabla[PosY][PosX] = "V";

                        if((this.tabla[this.sumaVidas[i].Y][this.sumaVidas[i].X] == "V")&&
                           (this.tabla[this.sumaVidas[i].Y2][this.sumaVidas[i].X2] == "V")&&
                           (this.tabla[this.sumaVidas[i].Y3][this.sumaVidas[i].X3] == "V")){

                            this.sumaVidas[i].activado=true;
                            this.MesVida();
                        }
                        this.mostrarTabla();
                        console.log(this.tabla);
                        this.primerDestape=true;
                    }
                }
            }
        }
    },
    
    /*
    Cuando esta función se ejecuta, se aplican los efectos de Doblar Puntuación: Cogemos la variable Puntos de partida y duplicamos
    su valor, también actualizamos el valor mostrado en pantalla
    */

    DoblePuntuacio:function(){
        partida.puntos=(partida.puntos*2);
        document.getElementById("showPuntos").innerHTML = partida.puntos;
    },

    /*
    Cuando esta función se ejecuta, se aplican los efectos de Sumar Vida: Cogemos la variable Vidas de partida y le sumamos 1 al valor,
    también actualizamos el valor mostrado en pantalla
    */

    MesVida:function(){
        partida.vidas+=1;
        document.getElementById("showVidas").innerHTML = partida.vidas;
    },

    /*
    Cuando esta función se ejecuta, se aplican los efectos de Mitad Zombies: Cogemos el contador de zombies sin descubrir en partida y
    lo dividimos entre 2 (truncándolo) para saber el número de zombies que hemos de destapar, la función se encarga entonces de ir
    saltando entre posiciones aleatorias destapando zombies que encuentre tapados hasta que alcance el número definido
    */

    MeitatZombies:function(){
        let contadorZombies = Math.floor(partida.zombiesRestantes/2);
        while(contadorZombies>0){
            let randomX = Math.floor(Math.random() * partida.medida);
            let randomY = Math.floor(Math.random() * partida.medida);
            if(partida.tabla[randomY][randomX] == "z"){
                partida.tabla[randomY][randomX] = "Z";
                contadorZombies-=1 ;
                partida.zombiesRestantes-=1 ;
            }
        }
        partida.mostrarTabla();
    }
}