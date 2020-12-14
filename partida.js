let partida = {
    medida_tabla = 5,
    medida_casillas_tabla = 25,
    tabla:[],
    zombies: [], /*25% de medida_casillas_tabla*/
    estrellas: [], /*= a medida_tabla*/

	/*Funciones*/
	
    inicializar_tabla: function() {
		for(let i = 0 ; i < medida_tabla; i ++)
			tabla [i] = [];	
		for(let j = 0; j < array.length;j++){
			const element = array[j]
		}			
	},
	
    iniciar: function (medida) {
        this.medida_tabla= medida;
        this.medida_casillas_tabla = medida * medida;
        this.inicializar_tabla();
    },
    pintar_tabla
}