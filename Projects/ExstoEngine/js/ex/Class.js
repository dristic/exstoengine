(function (window) {

    /**
    * The base class definition for all classes in ExstoEngine.
    * This function chains for proper use of instanceof and also
    * supplies a _super method for accessing base classes.
    * 
    * @param proto: The prototype for the new class
    * @param base: The base class type to extend from
    */
    ex.Class = function (base, proto) {
    	if(proto == null) {
    		return createNewClass(base);
    	} else {
    		return extendBaseClass(base, proto);
    	}
    };
    
    function createNewClass(proto) {
    	function NewClass() {
			
        };

        //--If a constructor is supplied call it
        if (typeof proto.constructor == "function" && proto.constructor != Object) {
            NewClass = proto.constructor;
        }
    	
        NewClass.prototype = proto;
        
        return NewClass;
    };
    
    function extendBaseClass(base, proto) {
    	// Check for passing in null base class
    	if(base == null) {
    		throw new Error("The base class has not been defined: " + proto.constructor);
    	}
    	
    	var _base = base.prototype.clone();
        
        function NewClass() {
        	
        };
        
        if (typeof proto.constructor == "function" && proto.constructor != Object) {
        	NewClass = proto.constructor;
        } else if (typeof _base.constructor == "function") {
            newClass.constructor = _base.constructor;
        }
        
        //--Chain the base prototype
        NewClass.prototype = base.prototype.clone();

        //--Mix in the supplied prototype
        NewClass.prototype.mixInto(proto);

        //--Add super() for constructor and base properties
        NewClass.prototype._super = function (func, args) {
            _base[func].apply(this, args);
        };
        
        return NewClass;
    };

})(window);