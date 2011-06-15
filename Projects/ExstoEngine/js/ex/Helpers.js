(function () {
	Object.prototype.clone = function () {
	    function Constructor() { }
	    Constructor.prototype = this;
	    return new Constructor();
	};
	    
	Object.prototype.mixInto = function (mixIn) {
	    mixIn.forEachIn(ex.bind(_assign, this));
	};
	
	function _assign(name, value) {
	    this[name] = value;
	};
	
    //--Calls a function on each value of an array or object
	Object.prototype.forEachIn = function (action) {
	    for (var property in this) {
	        if (Object.prototype.propertyIsEnumerable.call(this, property)) {
	            action(property, this[property]);
	        }
	    }
	};
	
	Object.prototype.extend = function (other) {
		for(var prop in other) {
			this[prop] = other[prop];
		}
	};
})();