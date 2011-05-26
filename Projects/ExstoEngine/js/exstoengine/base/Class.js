/// <reference path="../ExstoEngine.js" />

(function () {

    /**
    * The base class definition for all classes in ExstoEngine.
    * This function chains for proper use of instanceof and also
    * supplies a _super method for accessing base classes.
    * 
    * @param proto: The prototype for the new class
    * @param base: The base class type to extend from
    * 
    * TODO: Extending from multiple base classes
    */
    window.ExstoEngine.Base.Class = function (base, proto) {
        var _base = {};
        if (base != null) {
            _base = clone(base.prototype);
        }

        function NewClass() {

        };

        //--If a constructor is supplied call it
        if (typeof proto.constructor == "function" && proto.constructor != Object) {
            NewClass = proto.constructor;
        } else if (typeof _base.constructor == "function") {
            NewClass = _base.constructor;
        }

        if (base != null) {
            //--Chain the base prototype
            NewClass.prototype = clone(base.prototype);

            //--Mix in the supplied prototype
            mixInto(NewClass.prototype, proto);

            //--Add super() for constructor and base properties
            NewClass.prototype._super = function (func, args) {
                _base[func].apply(this, args);
            };
        } else {
            //--Just create the new class
            NewClass.prototype = proto;
        }

        //--Make sure the constructor is set properly
        NewClass.constructor = NewClass;

        return NewClass;
    }

    function clone(object) {
        function Constructor() { }
        Constructor.prototype = object;
        return new Constructor();
    };

    function mixInto(object, mixIn) {
        forEachIn(mixIn, function (name, value) {
            object[name] = value;
        });
    };

    //--Calls a function on each value of an array
    function forEachIn(object, action) {
        for (var property in object) {
            if (Object.prototype.propertyIsEnumerable.call(object, property)) {
                action(property, object[property]);
            }
        }
    }

    /* How the Eloquent Java Script book does it
    Object.prototype.inherit = function(base) {
    this.prototype = clone(base.prototype);
    this.prototype.constructor = this;
    };
    Object.prototype.method = function(name, func) {
    this.prototype[name] = func;
    };
    Object.prototype.create = function() {
    var object = clone(this);
    if(object.construct != undefined)
    object.construct.apply(object, arguments);
    return object;
    };
    Object.prototype.extend = function(properties) {
    var result = clone(this);
    forEachIn(properties, function(name, value) {
    result[name] = value;
    });
    return result;
    };
    Object.prototype.isA = function(prototype) {
    function Constructor() {}
    Constructor.prototype = prototype;
    return this instanceof Constructor;
    };
    */

    //--Globalize class
    //ExstoEngine.Base.Class = Class;

})();



