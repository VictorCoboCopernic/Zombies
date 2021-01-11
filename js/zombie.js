let Zombie = function (X, Y){
    Element.apply(this, arguments);
}

Zombie.prototype = Object.create(Element.prototype);
Zombie.prototype.constructor = Zombie;