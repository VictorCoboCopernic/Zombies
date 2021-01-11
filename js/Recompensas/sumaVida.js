let SumaVida = function (X, Y, X2, Y2, X3, Y3){
    
    Recompensa.apply(this, arguments);
    
    this.X2 = X2;
    this.Y2 = Y2;
    this.X3 = X3;
    this.Y3 = Y3;
}

SumaVida.prototype = Object.create(Recompensa.prototype);
SumaVida.prototype.constructor = SumaVida;