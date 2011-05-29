/// <reference path="../ExstoEngine.js" />

(function (window) {

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
    ex.Class = function (base, proto) {
        var _base = {};
        if (base != null) {
            _base = base.prototype.clone();
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
            NewClass.prototype = base.prototype.clone();

            //--Mix in the supplied prototype
            NewClass.prototype.mixInto(proto);

            //--Add super() for onstructor and base properties
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
    };

})(window);



