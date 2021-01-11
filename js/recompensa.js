let Recompensa = function (X, Y){
    Element.apply(this, arguments);
}

Recompensa.prototype = Object.create(Element.prototype);
Recompensa.prototype.constructor = Recompensa;