let MitadZombie = function (X, Y, X2, Y2){
    
    Recompensa.apply(this, arguments);
    
    this.X2 = X2;
    this.Y2 = Y2;
}

MitadZombie.prototype = Object.create(Recompensa.prototype);
MitadZombie.prototype.constructor = MitadZombie;