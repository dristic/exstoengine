Object.prototype.clone = function () {
    function Constructor() { }
    Constructor.prototype = this;
    return new Constructor();
};
    
Object.prototype.mixInto = function (mixIn) {
    this.forEachIn(mixIn, function (name, value) {
        this[name] = value;
    });
};

    //--Calls a function on each value of an array
Object.prototype.forEachIn = function (action) {
    for (var property in this) {
        if (Object.prototype.propertyIsEnumerable.call(this, property)) {
            action(property, this[property]);
        }
    }
};