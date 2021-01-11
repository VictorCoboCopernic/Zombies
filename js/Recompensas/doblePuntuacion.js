let DoblePuntuacion = function (X, Y){
    Recompensa.apply(this, arguments);
}

DoblePuntuacion.prototype = Object.create(Recompensa.prototype);
DoblePuntuacion.prototype.constructor = DoblePuntuacion;