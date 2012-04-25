// Exsto Engine
//====================
// This is the core Exsto Engine library file. This file sets up polyfills,
// creates helper functions, and defines the Loader and class system.
var ex = ex || {};

// Array indexOf fix for IE because IE is lame
// Source: http://soledadpenades.com/2007/05/17/arrayindexof-in-internet-explorer/
if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    };
}

(function () {
	"use strict";
	
	// Used for the ex.clone function.
	function Clone() {};
	
	// Used for unique id numbers.
	ex.UID_PROPERTY = '__uniqueId';
	ex.uidCounter = 0;
	
	/**
	 * Copies the values from one object to another object.
	 * 
	 * @function
	 * @name extend
	 * @memberOf ex
	 * 
	 * @param {Object} object The object to copy values to
	 * @param {Object} other The object to copy values from
	 * @param {Bool} deep Copy the object recursively through object properties.
	 * 
	 * @return {Object} Returns the new object for chaining
	 */
	ex.extend = function (object, other, deep) {
		for(var prop in other) {
		  // Only copy defined values.
		  if(other[prop] !== undefined) {
		    // Prevent never ending loop.
		    if(object === other[prop]) {
		      continue;
		    }
		    
		    // If we are deep copying, recursively copy objects and arrays.
		    if((typeof src == "Object" || typeof src == "Array") && deep) {
	        object[prop] = ex.extend({}, other[prop], deep);
	      } else {
	        object[prop] = other[prop];
	      }
		  }
		}
		
		return object;
	};
	
	ex.extend(ex, {
		/**
		 * Calls the function using apply which sets the 'this' when running
		 * that function to the object specified.
		 * 
		 * @function
		 * @name bind
		 * @memberOf ex
		 * 
		 * @param {Object} object Object to be bound
		 * @param {Function} func Function to receive object
		 * 
		 * @returns {Function} Function with object bound
		 */
		bind: function (object, func) {
			return function() {
				return func.apply(object, arguments);
			};
		},
		
		/**
		 * Makes a copy of an object by placing it in a new 
		 * object's constructor.
		 * 
		 * @function
		 * @name clone
		 * @memberOf ex
		 * 
		 * @param object {Object} object to be cloned
		 * 
		 * @returns {Object} cloned object constructor
		 */
		clone: function (object) {
		  Clone.prototype = object;
		  return new Clone();
		},
		
		copy: function (object) {
		  var newObject;
		  
		  if(ex.isObject(object)) {
        newObject = newObject || {};
        ex.extend(newObject, object, true);
      } else if (ex.isArray(object)) {
        newObject = newObject || [];
        ex.extend(newObject, object, true);
      } else {
        // This should never be reached in clean code, 
        // but fail gracefully if a string, int, etc is passed in.
        newObject = object;
      }
      
      return newObject;
		},
		
		/**
		 * Copies the prototype of the base class to a new object to keep
		 * instanceof calls working but not create a pointer to the old prototype.
		 * Reference: http://simonsarris.com/blog/291-javascript-copy-function
		 */
		derive: function (baseclass, subclass) {
		  function subproto() {};
		  subproto.prototype = baseclass.prototype;
		  subclass.prototype = new subproto();
		  subclass.prototype.constructor = subclass;
		},
		
		/**
		 * Equivalent to a foreach loop in other languages, 
		 * iterates through object and runs func on each property.
		 * 
		 * @function
		 * @name each
		 * @memberOf ex
		 * 
		 * @param {Object}object  the array or object being passed in
		 * @param func {Function} function to run on each property of object
		 */
		each: function (object, func) {
		  for (var property in object) {
        if (Object.prototype.propertyIsEnumerable.call(object, property)) {
          action(property, object[property]);
        }
	    }
		},
		
		/**
		 * Converts a Number to an integer value by terminating at
		 * the decimal place.
		 * 
		 * e.g.: ex.toInt(123.456) returns 123
		 * 
		 * @function
		 * @name toInt
		 * @memberOf ex
		 * 
		 * @param {Number} number
		 * 
		 * @returns {Number} input terminated at decimal (integer value)
		 */
		toInt: function (number) {
			return number | 0;
		},
		
		isObject: function (object) {
		  return typeof object == "object";
		},
		
		isArray: function (array) {
		  return Object.prototype.toString.call(array) == '[object Array]';
		},
		
		isFunction: function (func) {
		  return typeof func == 'function';
		},
		
		isNull: function (object) {
		  return typeof object == 'undefined';
		},
		
		uid: function (object) {
		  return object[ex.UID_PROPERTY] || (object[ex.UID_PROPERTY] = ++ex.uidCounter);
		}
	});
	
	/**
	 * ex Array class with static Array helper functions
	 * @class ex.Array
	 */
	ex.Array = {
		contains: function (array, item) {
			var i = 0;
			for(; i < array.length; i++) {
				if(array[i] == item) {
					return true;
				}
			}
			
			return false;
		},
		
		remove: function(array, object) {
		  if(array.indexOf(object) != -1) {
		    array.splice(array.indexOf(object), 1);
		  }
		},
		
		each: function (array, func) {
		  var i = 0,
		      ln = array.length,
		      result = true;
		  for(; i != ln; i++) {
		    result = func(array[i], i);
		    if(result == false) return;
		  }
		},
		
		find: function (array, func) {
		  var i = 0,
		      ln = array.length,
		      result;
		  for(; i < ln; i++) {
		    result = func(array[i]);
		    if(result) return array[i];
		  }
		},
		
		average: function(array) {
			var ret = 0;
			
			var i = array.length;
			while(i--) {
				ret += array[i];
			}
			
			ret = ret / array.length;
			
			return ret;
		},
		
		to2D: function (cols, rows, array) {
		  var x = 0,
          y = 0,
          index = 0;
      var output = new Array(rows);
      for(y = 0; y < rows; y++) {
        output[y] = new Array(cols);
        for(x = 0; x < cols; x++, index++) {
          output[y][x] = array[index];
        }
      }
      return output;
		}
	};
	
	/**
	 * The main namespace for all engine classes and global functions.
	 * 
	 */
	ex.extend(ex, {
		_namespaces: {},		// registered namespace -> class relations
		_classes: {},			// registered class -> namespace relations
		_defined: [],
		
		config: {
			baseUrl: ""
		},
		
		/**
		 * prepares all dependencies for loading then starts
		 * the loader queue
		 * 
		 * @function
		 * @name using
		 * @memberOf ex
		 * 
		 * @param {String} namespaces dependencies to be loaded
		 * @param {Function} func the class being defined
		 */
		using: function (namespaces, func) {
			var loaded = true,
				i = 0,
				namespace;
			
			// If the class has no dependencies, load it and return
			if(typeof namespaces == 'undefined') {
				func();
				return;
			}
			
			for(; i < namespaces.length; i++) {
				namespace = namespaces[i];
				if(ex.Array.contains(this._defined, namespace) == false) {
					loaded = false;
					this.addRelationship(namespace, func);
					this.require(namespace);
				} else {
					//console.log('Exists: ' + namespace);
				}
			}
			
			ex.Loader.startQueue();
			
			if(loaded == true) {
				func();
				return;
			}
		},
		
		/**
		 * Loads a namespace for use.
		 * 
		 * @function
		 * @name require
		 * @memberOf ex
		 * 
		 * @param {String} namespace
		 */
		require: function(namespace) {
			ex.Loader.asyncFile(this.namespaceToUrl(namespace));
		},
		
		/**
		 * Create relationship between the namespace and class
		 * for forward and reverse lookup. Saves forward lookup in
		 * _namespaces and reverse in _classes.
		 * 
		 * 
		 * @param {String or String[]} namespace namespace in relationship
		 * @param {Function} func class in relationship
		 */
		addRelationship: function (namespace, func){
			if(!this._namespaces[namespace])		// Add Namespace -> Class relation
				this._namespaces[namespace] = [];
			this._namespaces[namespace].push(func);
			
			if(!this._classes[func])				// Add Class -> Namespace relation
				this._classes[func] = [];
			this._classes[func].push(namespace);
		},
		
		/**
		 * Generates the url for the namespace and adds it
		 * with the class to the loader queue
		 * @param namespace {String} used to parse file URL
		 * @param func {Function} the class definition
		 */
		namespaceToUrl: function(namespace) {
			// Break up namespace by '.'
			var parts = namespace.split(".");
			
			// Build file url
			var fileUrl = "";
			if(typeof window != "undefined") {
				fileUrl = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
			}
			
			// If we are loading ex classes, build from ex path
			if(parts[0] == 'ex') {
				fileUrl = ex.config.baseUrl;
			}
			
			var i = -1;
			while(++i < parts.length) {
				// If we are loading ex files, they are located in a src folder so don't include the 'ex'
				if(parts[i] != 'ex') {
					fileUrl += "/" + parts[i];
				}
			}
			fileUrl += '.js';
			
			return fileUrl;
		}
	});
	
	/**
	 * Loader class for async loading javascript files.
	 * 
	 * @class
	 * @name ex.Loader
	 */
	ex.Loader = {
		_urls: {},
		_callbacks: {},
		_queue: [],
		_date: new Date(),
		
		/**
		 * Dynamically adds a script tag for the url and runs the callback
		 * once loading is complete.
		 * 
		 * @function
		 * @name asyncFile
		 * @memberOf ex.Loader
		 * 
		 * @param {String} url
		 * @param {Function} callback
		 */
		asyncFile: function (url, callback) {
			if(typeof this._urls[url] != 'undefined') {
				return;
			}
			
			// Add url to list
			this._urls[url] = false;
			
			// Add callback to the list
			if(typeof callback != "undefined") {
				this._callbacks[url] = callback;
			}
			
			this._queue.push(url);
			//this._queue.push(url + "? ex=" + this._date.getTime());
		},
		
		startQueue: function () {
			for(var i = 0; i < this._queue.length; i++) {
				var url = this._queue[i];
				
				// Add script tag with on load parameter
				this.addScriptTag(url, function () {
					ex.Loader.onScriptLoad(url);
					this.onload = null;
				});
			}
			
			this._queue = [];
		},
		
		onScriptLoad: function (url) {
			// Set url loaded to true
			this._urls[url] = true;
			
			// Call and delete callback
			if(url in this._callbacks) {
				this._callbacks[url]();
				delete this._callbacks[url];
			}
		},
		
		/**
		 * Creates script DOM object and appends to DOM head
		 * @param {String} url src value for script tag
		 * @returns {Function} onLoad event to run after script is loaded
		 */
		addScriptTag: function(url, onLoad) {
			// Create a script tag and add it to the html
			var head = document.getElementsByTagName("head").item(0);
			var script = document.createElement("script");
			script.language = "javascript";
			script.type = "text/javascript";
			script.defer = false;
			script.src = url;
			script.onload = onLoad;
			head.appendChild(script);
			
			return script;
		},
		
		ajax: function (url, data, callback) {
      var xmlHttp;
      if(window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
      } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
      }
      
      xmlHttp.open('GET', url, true);
      xmlHttp.send();
      
      xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          callback(xmlHttp.responseText);
        }
      }
    }
	};
	
	/**
	 * Element helper for creating and getting DOM elements.
	 * @class
	 * @name ex.Element
	 */
	ex.Element = {
		defaults: {
			SCRIPT: {
				language: 'javascript',
				type: 'text/javascript'
			}
		},
			
		createTag: function (tag, params) {
			var tag = document.createElement(tag);
			tag = ex.extend(tag, params);
			return tag;
		},
		
		getByTagName: function (name) {
			return document.getElementsByTagName(name)[0];
		},
		
		getById: function (id) {
		  var el = document.getElementById(id);
		  if(!el) {
		    ex.Debug.log('ex.Element.getById: Could not find element with id ' + id, 'WARNING');
		  }
		  return el;
		}
	};
	
	/**
	 * Helper math functions
	 * @class
	 * @name ex.Math
	 */
	ex.Math = {
		/**
		 * Returns the average of an array of numbers.
		 * 
		 * @function
		 * @name average
		 * @memberOf ex.Math
		 * 
		 * @param {Array} array An array of numbers.
		 * @return {Number} The result of the average.
		 */
		average: function (array) {
			var ret = 0;
			
			var i = array.length;
			while(i--) {
				ret += array[i];
			}
			
			ret = ret / array.length;
			
			return ret;
		},
		
		/**
		 * Floors a number using bitwise operators (faster).
		 * 
		 * @function
		 * @name floor
		 * @memberOf ex.Math
		 * @param {Number} num The number to floor.
		 * @return {Int} The resulting integer value.
		 */
		floor: function (num) {
			return num >> 0;
		},
		
		abs: function (num) {
		  return num < 0 ? -num : num;
		},
		
		/**
		 * Returns a random integer between min and max
		 * Using Math.round() will give you a non-uniform distribution!
		 * 
		 * @function
		 * @name getRandomInt
		 * @memberOf ex.Math
		 * @param {Int} min The minimum random number.
		 * @param {Int} max The maximum random number.
		 * @return {Int} The resulting random number.
		 */
		getRandomInt: function(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};
	
	var exports = exports || null;
	
	if(exports == null) {
		var head = document.getElementsByTagName('head')[0];
		var scripts = head.getElementsByTagName('script');
		var pattern = new RegExp(/ExstoEngine\.js/);
		var i = scripts.length;
		while(i--){
			var script = scripts[i];
			if(pattern.test(script.src) == true){
				ex.config.baseUrl = script.src.split("/ExstoEngine.js", 1)[0];
			}
		}
	}
	
})();

// ex.Class implementation
(function() {

	/**
	 * The base class definition for all classes in ExstoEngine. This function
	 * chains for proper use of instanceof and also supplies a _super method for
	 * accessing base classes.
	 * 
	 * ::Example
	 * ex.define('my.namespace.NewClass', ex.ExtendedClass, {
	 *   constructor: function (param1, param2) {
	 *     this.param1 = param1;
	 *     this.param2 = param2;
	 *   }
	 * });
	 * 
	 * ::Compiler Commands
	 * --__statics: Provide properties that get added to the namespace not the prototype.
	 * --__alias: Alias the class to make it easier to access. Ex: 'ex.util.AssetManager'
	 * is aliased to 'ex.Assets'
	 * 
	 * @function
	 * @name ex.define
	 * @memberOf ex
	 * 
	 * @param {String} namespace The namespace of the new class
	 * @param {Object} base The base class type to extend from or the class definition if not extending
	 * @param {Object} extension The new class that will be extending base
	 * @returns {ex.Class} new class
	 */
	ex.define = function(namespace, base, extension) {
		if (typeof namespace != 'string') {
			throw new Error(
					"Cannot create class, namespace must be of type String.\n"
							+ base.constructor);
			return null;
		}
		if (extension == null) {
			createNewClass(namespace, base);
		} else {
			extendBaseClass(namespace, base, extension);
		}
		
		this._defined.push(namespace);
		
		// Load all classes that require this class
		if(typeof this._namespaces[namespace] != 'undefined') {
			var functions = this._namespaces[namespace];
			var i = functions.length;
			while(i--) {
				var func = functions[i];
				ex.Array.remove(this._classes[func], namespace);
				if(this._classes[func].length == 0) {
					func();
					delete this._classes[func];
				}
				
				ex.Array.remove(this._namespaces[namespace], func);
				if(this._namespaces[namespace].length == 0) {
					delete this._namespaces[namespace];
				}
			}
		}
	};

	/**
	 * creates a new class with no inheritance
	 * @param namespace {string} namespace of new class
	 * @param base {Object} class prototype
	 */
	function createNewClass(namespace, base) {
	  preCompile(namespace, null, base);
	  
		function NewClass() {
			// empty function to hold new class
		};
		// --If a constructor is supplied call it
		if (typeof base.constructor == "function" && base.constructor != Object) {
			NewClass = base.constructor;
		}
		NewClass.prototype = base;
		
		setNamespace(namespace, NewClass);
		
		postCompile(namespace, null, base, NewClass);
	};
	
	/**
	 * creates a new class with inheritance
	 * @param namespace {string} namespace of new class
	 * @param base {Object} base class
	 * @param extension {Object} base class extension (new class)
	 */
	function extendBaseClass(namespace, base, extension) {
	  preCompile(namespace, base, extension);
	  
		if (base == null) {
			throw new Error("The base class has not been defined for " + namespace);
		}
		
		function NewClass() {
			// empty function to hold new class
			base.apply(this);
		};

		// Set the new constructor if one was provided.
		if (ex.isFunction(extension.constructor) && extension.constructor != Object) {
			NewClass = extension.constructor;
		}
		
		// Extend the new class from the base class.
    ex.derive(base, NewClass);

		// Mix-in, set _super call, and add to namespace
		ex.extend(NewClass.prototype, extension);
		NewClass.prototype._super = function(func, args) {
			// Change this._super so that any _super calls in the 
			// super class function works properly
			this._super = base.prototype._super;
			base.prototype[func].apply(this, args);
			// Reset _super to everything works properly again
			this._super = this._superTemp;
		};
		NewClass.prototype._superTemp = NewClass.prototype._super;
		
		setNamespace(namespace, NewClass);
		
		postCompile(namespace, base, extension, NewClass);
	};
	
	function preCompile(namespace, base, extension) {
	  // No precompiler commands yet.
	};
	
	function postCompile(namespace, base, extension, newClass) {
	  // Add static methods to the namespace
	  if('__statics' in newClass.prototype) {
      setNamespace(namespace, newClass.prototype.__statics, true);
    }
	  
	  // Alias the class if needed
	  if('__alias' in newClass.prototype) {
	    var alias = newClass.prototype.__alias;
	    if(alias != namespace) {
	      setNamespace(alias, newClass);
	      postCompile(alias, base, extension, newClass);
	    }
	  }
	};
	
	function setNamespace(namespace, object, extend) {
	  var context = window,
	      parts = namespace.split('.'),
	      i = 0,
	      ln = parts.length;
	  
	  for(; i < ln; i++) {
	    var part = parts[i];
	    
	    context[part] = context[part] || {};
	    if(i == ln - 1) {
	      if(extend) {
	        ex.extend(context[part], object);
	      } else {
	        context[part] = object;
	      }
	    }
	    
	    context = context[part];
	  }
	  
	  return context;
	};

})();

var exports = exports || null;
if(exports) {
	ex.extend(exports, ex);
}

// ## ex.ready
// This will add a function to be called when the engine is
// completely loaded and ready to go.
//
// This is similar to how jQuery handles the ready state.
(function () {
  var readyList = [],
      ready = false;
  
  function doReady() {
    ex.Array.each(readyList, function (func) {
      func();
    });
    
    readyList = [];
    ready = true;
  };
  
  function DOMContentLoaded() {
    if(document.addEventListener) {
      document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
      doReady();
    } else if(document.attachEvent) {
      document.detachEvent('onreadystatechange', DOMContentLoaded, false);
      doReady();
    }
  };
  
  ex.extend(ex, {
    ready: function (func) {
      readyList.push(func);
      
      // If the document is ready call the function immediately under
      // a new thread.
      if(document.readyState === 'complete' || ready == true) {
        return setTimeout(doReady, 1);
      }
      
      // Listen for dom content loaded on Mozilla, Opera, and webkit
      if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
        
        window.addEventListener('load', doReady, false);
      } else if(document.attachEvent) {
        document.attachEvent('onreadystatechange', DOMContentLoaded);
        
        window.attachEvent('onload', doReady);
      }
    }
  });
})();ex.using([

], function() {
  ex.define("ex.ai.Action", {
    constructor: function(mask, blocking) {
      this.mask = mask || 0;
      this.blocking = blocking || false;
    },
    
    // Default update, completes instantly
    update: function(dt) {
      return true;
    },
    
    destroy: function() {
      
    }
  });
});ex.using([
  'ex.ai.Action'
], function() {
  ex.define("ex.ai.ActionList", {
    constructor: function() {
      this.masks = {
          animation: (1 << 0),
          movement: (1 << 1),
          behavior: (1 << 2)
      };
      
      this.actionList = [];
    },
    
    push: function(action) {
      this.actionList.push(action);
    },
    
    remove: function(action) {
      action.destroy();
      ex.Array.remove(this.actionList, action);
    },
    
    update: function(dt) {
      var blockMask = 0,
          index = this.actionList.length,
          action = null;
      
      
      while(index--) {
        action = this.actionList[index];
        
        // If channel is already blocked, skip to next action
        if(action.mask & blockMask) {
          continue;
        }
        
        // Action complete if it returns true
        var complete = action.update(dt);
        
        // If complete, remove action
        if(complete) {
          this.remove(this.actionList[index]);
        }
        
        // Update blocked channels
        if(action.blocking) {
          blockMask = blockMask | action.mask;
        }
      }
    }
  });
});/**
 * This action does nothing.
 */

ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Idle', ex.ai.Action, {
    constructor: function(entity) {
      this.name = "idle";
      this.entity = entity;
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      return false;
    }
  });
});
ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Shoot', ex.ai.Action, {
    constructor: function(weapon) {
      this.name = "shoot";
      this.weapon = weapon;
      
      this._super("constructor", [1, false]);
    },
    
    update: function(dt) {
      this.weapon.shoot();
      return true;
    }
  });
});
ex.using([
  'ex.ai.Action',
  'ex.ai.actions.Shoot'
], function(){
  ex.define('ex.ai.actions.Chase', ex.ai.Action, {
    constructor: function(entity, target, maxRange, speedModifier) {
      this.name = "chase";
      this.entity = entity;
      this.target = target;
      this.maxRange = maxRange;
      
      this.speedModifier = speedModifier || 1;
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      var distX = Math.abs(this.entity.physical.position.x - this.target.physical.position.x),
      minY = this.entity.physical.position.y - this.target.physical.height,
      maxY = this.entity.physical.position.y + this.entity.physical.height;
  
      if(distX < this.maxRange &&
          this.target.physical.position.y > minY &&
          this.target.physical.position.y < maxY) {
        this.moveTowardTarget(dt);
        if(this.entity.weapon) {
          this.attackTarget(dt);
        }
        return false;
      } else {
        return true;
      }
    },
    
    attackTarget: function(dt) {
      this.entity.cooldown += Math.random() * dt;
      if(this.entity.weapon.cooldown <= 0) {
        this.entity.ai.push(new ex.ai.actions.Shoot(this.entity.weapon));
      }
    },
    
    moveTowardTarget: function(dt) {
      var speed = this.entity.speed * this.speedModifier;
      if(this.target.physical.position.x < this.entity.physical.position.x) {
        this.entity.facing = 'left';
        this.entity.physical.applyImpulse(-speed * dt, 0);
        this.entity.moving = true;
      } else {
        this.entity.facing = 'right';
        this.entity.physical.applyImpulse(speed * dt, 0);
        this.entity.moving = true;
      }
      if(this.entity.weapon) {
        this.entity.weapon.facing = this.entity.facing;
      }
    }
  });
});/**
 * This action is a simple collision-based wandering routine. When the entity
 * runs into an obstruction (a tile), it turns around and goes back the other
 * way.
 */

ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Wander', ex.ai.Action, {
    constructor: function(entity) {
      this.name = "wander";
      this.entity = entity;
      
      this._super("constructor", [1, false]);
    },
    
    update: function (dt) {
      if(this.isObstructed()) {
        this.turnAround(dt);
      }
      
      if(this.entity.facing == 'left') {
        this.entity.physical.applyImpulse(-this.entity.speed * dt, 0);
        this.entity.moving = true;
      } else {
        this.entity.physical.applyImpulse(this.entity.speed * dt, 0);
        this.entity.moving = true;
      }
      return false;
    },
    
    isObstructed: function () {
      if(!this.entity.collisionData || !this.entity.collisionData.tiles) {
        return false;
      }
      
      var tiles = this.entity.collisionData.tiles;
      var minY = this.entity.physical.position.y - tiles[0].height,
          maxY = this.entity.physical.position.y + this.entity.physical.height;
      
      var index = tiles.length,
          tile;
      while(index--) {
        tile = tiles[index];
        if(tile.position.y >= minY && tile.position.y <= maxY) {
          if(this.entity.facing == 'left' && tile.position.x <= this.entity.physical.position.x){
            return true;
          } else if (this.entity.facing == 'right' && tile.position.x >= this.entity.physical.position.x) {
            return true;
          }
        }
      }
      return false;
    },
    
    turnAround: function (dt) {
      if(this.entity.facing == 'left') {
        this.entity.facing = 'right';
      } else {
        this.entity.facing = 'left';
      }
      if(this.entity.weapon) {
        this.entity.weapon.facing = this.entity.facing;
      }
      this.entity.physical.velocity.x = 0;
    }
  });
});
ex.using([
  'ex.ai.Action',
  'ex.ai.actions.Wander',
  'ex.ai.actions.Chase'
], function(){
  ex.define("ex.ai.actions.Search", ex.ai.Action, {
    constructor: function(entity, target, sightRange) {
      this.name = "search";
      this.entity = entity;
      this.target = target;
      this.sightRange = sightRange;
      
      // Setup sub-actions
      this.actions = {
          chase: new ex.ai.actions.Chase(this.entity, this.target, this.sightRange)
      };
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      var distX = Math.abs(this.entity.physical.position.x - this.target.physical.position.x),
          minY = this.entity.physical.position.y - this.target.physical.height,
          maxY = this.entity.physical.position.y + this.entity.physical.height;
      
      if(distX < this.sightRange &&
          this.target.physical.position.y > minY &&
          this.target.physical.position.y < maxY) {
        this.entity.ai.push(new ex.ai.actions.Chase(this.entity, this.target, 200));
      }
    }
  });
});(function () {
	ex.define("ex.base.Point", {
		/**
		 * @name ex.base.Point
		 * @param {Number} x magnitude on x axis
		 * @param {Number} y magnitude on y axis
		 *
		 * @property {Number} x
		 * @property {Number} y
		 * @constructor
		 */
		constructor: function(x, y) {
			this.x = x;
			this.y = y;
		},
		
		/**
		 * Adds the x and y values of a Vector or Point to this object's
		 * x and y values.
		 * @function
		 * @name add
		 * @memberOf ex.base.Point
		 * @param {ex.base.Point or ex.base.Vector} other Point or Vector to add
		 * to this Point
		 */
		add: function(other) {
			this.x += other.x;
			this.y += other.y;
		},
		
		/**
		 * Subtracts the x and y values of a Vector or Point from this object's
		 * x and y values.
		 * @function
		 * @name subtract
		 * @memberOf ex.base.Point
		 * @param {ex.base.Point or ex.base.Vector} other Point or Vector to
		 * subtract from this Point
		 */
		subtract: function(other) {
			this.x -= other.x;
			this.y -= other.y;
		}
	});
}());
ex.using([
    "ex.base.Point"
],function () {
	ex.define("ex.base.Rectangle", {
	  __alias: 'ex.Rectangle',
	  
		/**
		 * @name ex.base.Rectangle
		 * @param {ex.base.Point} position of top left corner
		 * @param {Number} width width of rectangle
		 * @param {Number} height height of rectangle
		 *
		 * @property {ex.base.Point} position top left corner
		 * @property {Number} width
		 * @property {Number} height
		 * @constructor
		 */
		constructor: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		},
		
		/**
		 * Checks if the supplied point is contained in the Rectangle
		 * @function
		 * @name containsPoint
		 * @memberOf ex.base.Rectangle
		 * @param {Number or ex.base.Point} x
		 *     point's x axis value or an ex.base.Point
		 * @param {Number} [y]
		 *     point's y axis value (not used if x is an ex.base.Point)
		 * @returns {Boolean}
		 */
		containsPoint: function (x, y) {
			if(x instanceof ex.base.Point) {
				if(x.x > this.x && x.x  < this.position.x + this.width &&
				   x.y > this.y && x.y < this.position.y + this.height) {
					return true;
				} else {
					return false;
				}
			} else {
				if(x > this.x && x < this.x + this.width &&
				   y > this.y && y < this.y + this.height) {
				    return true;
			   } else {
			       return false;
			   }
			}
		},
		
		/**
		 * Checks if the supplied point is contained in the Rectangle
		 * @function
		 * @name translate
		 * @memberOf ex.base.Rectangle
		 * @param {Number, ex.base.Point, or ex.base.Vector} x
		 *    translation on x axis value, ex.base.Point offset,
		 * or ex.base.Vector offset
		 * @param {Number} [y]
		 *    translation on y axis value (not used if x is an
		 * ex.base.Point or ex.base.Vector)
		 * @return {ex.base.Rectangle} this
		 */
		translate: function(x, y) {
			if(x instanceof ex.base.Point || x instanceof ex.base.Vector){
				this.x -= x.x;
				this.y -= x.y;
			} else {
				this.x -= x;
				this.y -= y;
			}
			return this;
		}
	});
});
(function () {
	ex.define("ex.base.Vector", {
	  __alias: 'ex.Vector',
	  
		/**
		 * @name ex.base.Vector
		 * @param {Number} x magnitude on x axis
		 * @param {Number} y magnitude on y axis
		 * 
		 * @property {Number} x
		 * @property {Number} y
		 * @constructor
		 */
		constructor: function(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		},
		
		/**
		 * Adds another vector to this one.
		 * @function
		 * @name add
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} v other vector
		 * @returns {ex.base.Vector} this
		 */
		add: function(v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		
		/**
		 * Adds a scaled vector to this vector. To subtract, 
		 * the scalar should be made negative.
		 * @function
		 * @name addScaled
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} v vector to add
		 * @param {Number} s scalar value to apply to v
		 * @returns {ex.base.Vector} this
		 */
		addScaled: function(v, s) {
			this.x += (v.x * s);
			this.y += (v.y * s);
			return this;
		},
		
		/** Adds a number to both the x and y value of this vector
		 * 
		 * @param {Number} n The number to add.
		 * @returns {ex.base.Vector} The resulting vector.
		 */
		addNumber: function (n) {
		  this.x += n;
		  this.y += n;
		  return this;
		},
		
		/**
		 * Subtracts a vector from this vector.
		 * @function
		 * @name subtract
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} v the vector to be subtracted
		 * @returns {ex.base.Vector} this
		 */
		subtract: function(v) {
			this.x -= v.x;
			this.y -= v.y;
			return this;
		},
		
		/**
		 * Scales the vector.
		 * @function
		 * @name scale
		 * @memberOf ex.base.Vector
		 * @param {Nummber} s scalar value
		 * @returns {ex.base.Vector} this
		 */
		scale: function(s) {
			this.x *= s;
			this.y *= s;
			return this;
		},
		
		/**
		 * Returns the magnitude of the vector from the 
		 * supplied vector to this vector. (Magnitude of B-A)
		 * @function
		 * @name distance
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} vectorB vector to check distance between
		 * @returns {Number} magnitude of vectorB - this
		 */
		distance: function(vectorB) {
			return Math.sqrt((this.x - vectorB.x)*(this.x - vectorB.x) 
					+ (this.y - vectorB.y)*(this.y - vectorB.y));
		},
		
		/**
		 * Returns the magnitude of the vector
		 * @function
		 * @name length
		 * @memberOf ex.base.Vector
		 * @returns {Number} magnitude of this vector
		 */
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
		
		/**
		 * Creates a copy of this vector (instead of a pointer if
		 * called directly).
		 * @function
		 * @name clone
		 * @memberOf ex.base.Vector
		 * @returns {ex.base.Vector} a copy of this
		 */
		clone: function() {
			return new ex.base.Vector(this.x, this.y);
		},
		
		/**
		 * Rotates the vector by the supplied value in radians.
		 * @function
		 * @name rotate
		 * @memberOf ex.base.Vector
		 * @param {Number} rad radians to rotate by
		 * @returns {ex.base.Vector} this
		 */
		rotate: function(rad) {
	    var cos = Math.cos(rad), sin = Math.sin(rad), x = this.x, y = this.y;
	    this.x = x * cos - y * sin;
	    this.y = x * sin + y * cos;
	    return this;
  	},
  	
  	/**
  	 * Equality check between this vector and another.
  	 * 
  	 * @function
  	 * @name equals
  	 * @memberOf ex.base.Vector
  	 * 
  	 * @param {ex.base.Vector} vector2 vector to test equality against
  	 * @returns {Boolean}
  	 */
  	equals: function(vector2) {
  	  if(this.x != vector2.x){
  	    return false;
  	  } else if (this.y != vector2.y) {
  	    return false;
  	  } else {
  	    return true;
  	  }
  	},
  	
  	inverse: function () {
      this.x = 1 / this.x;
      this.y = 1 / this.y;
      return this;
    },
    
    /**
     * Trims this vector to the positive and negative values of
     * the other vector.
     */
    limit: function (v) {
      if(this.x > v.x) this.x = v.x;
      else if(this.x < -v.x) this.x = -v.x;
      if(this.y > v.y) this.y = v.y;
      else if(this.y < -v.y) this.y = -v.y;
    }
	});
}());
ex.using([
  'ex.base.Vector'
], function () {
	ex.define("ex.display.Renderable", {
		/**
		 * An interface for objects to use when they need to be
		 * rendered to the screen.
		 * 
		 * @name ex.display.Renderable
		 * @constructor
		 */
		constructor: function(visible, alpha, position, width, height) {
			this.visible = visible;
			this.alpha = alpha;
			position = position || new ex.Vector(0, 0);
			width = width || 0;
			height = height || 0;
			this.position = this.position || position;
			this.width = this.width || width;
			this.height = this.height || height;
		},
		
		/**
		 * Checks properties and determines if renderable is visible
		 * 
		 * @function
		 * @name isVisible
		 * @memberOf ex.display.Renderable
		 * 
		 * @returns {Boolean}
		 */
		isVisible : function() {
			if (this.visible && this.alpha > 0.0) {
				return true;
			} else {
				return false;
			}
		},

		/**
		 * Toggles visibility of the renderable.
		 * 
		 * @function
		 * @name toggleVisibility
		 * @memberOf ex.display.Renderable
		 */
		toggleVisibility : function() {
			if (this.visible)
				this.hide();
			else
				this.show();
		},

		/**
		 * Sets visible property to true, does not affect alpha.
		 * 
		 * @function
		 * @name show
		 * @memberOf ex.display.Renderable
		 */
		show : function() {
			this.visible = true;
		},

		/**
		 * Sets visible property to false, does not affect alpha.
		 * 
		 * @function
		 * @name hide
		 * @memberOf ex.display.Renderable
		 */
		hide : function() {
			this.visible = false;
		},
		
		containsPoint: function (x, y) {
		  if(x < (this.position.x + this.width) &&
		     x > this.position.x &&
		     y < (this.position.y + this.height) &&
		     y > this.position.y) {
		    return true;
		  } else {
		    return false;
		  }
		},
		
		update: function(dt) {
			
		},
		
		destroy: function () {
		  
		}
	});
});ex.using([
  "ex.display.Renderable",
  "ex.base.Rectangle",
  "ex.base.Point"
], function () {
	ex.define("ex.display.AnimatedSprite", ex.display.Renderable, {
		/**
		 * An extension of ex.display.Sprite that is able to animate sprites by
		 * stepping through a tileset.
		 * 
		 * @name ex.display.AnimatedSprite
		 * @extends ex.display.Sprite
		 *  
		 * @param {ex.base.Vector} position position of the animated sprite
		 * @param {Number} frameWidth width of frame (tile width in image)
		 * @param {Number} frameHeight height of frame (tile height in image)
		 * @param {Number} frameRate number of timesteps before advancing a frame
		 * @param {Image} img spriteset
		 * 
		 * @property {Number} timer Animation timer, inverse of framerate.
		 * @property {Number} frameRate Number of frames to wait per
		 * 		sprite tile.
		 * @property {Object} Associative array of animations (name : frames).
		 * @property {Number[]} currentAnimation The frames of the selected
		 * 		animation.
		 * @property {Number} currentFrame the current frame in the animation.
		 * 		Initializes to 0.
		 * @property {Boolean} playing Controls animation playback (on/off).
		 * @property {ex.base.Rectangle} renderingRect Frame dimensions used
		 * 		in rendering from the sprite image.
		 * @constructor
		 */
		constructor: function(spriteSheets) {
		  this.type = "AnimatedSprite";
		  
		  this.scrollFactor = { x: 1, y: 1 };
		  
			this.spriteSheets = this._prepareSpriteSheets(spriteSheets);
			this.animations = {};
			this.currentAnimation = null;
			this.currentAnimationName = null;
			this.currentIndex = 0;
			this.currentFrame = 0;
			this.playing = false;
			this.playQueue = [];
			this.scaled = false;
			
			this.timer = 0; // will be (1 / frameRate)
			
			this._super("constructor", 
			    [true, 
			     1.0, 
			     ex.Vector(0,0), 
			     this.spriteSheets[0].renderingRect.width, 
			     this.spriteSheets[0].renderingRect.height]);
		},
		
		_prepareSpriteSheets: function(spriteSheets) {
		  if(ex.isArray(spriteSheets)) {
		    return spriteSheets;
		  } else if (spriteSheets instanceof ex.display.SpriteSheet) {
		    return [spriteSheets];
		  } else {
		    ex.Debug.log("AnimatedSprite received spriteSheets in wrong format.", 'ERROR');
		    return [];
		  }
		},
		
		/**
		 * Creates a named animation with an array of frame numbers.
		 * @function
		 * @name createAnimation
		 * @memberOf ex.display.AnimatedSprite
		 * @param {String} name name of the animation
		 * @param {Number[]} frames array of frame numbers to be played
		 * in order 
		 */
		createAnimation: function(name, sheetNumber, frames) {		  
	    this.animations[name] = {
	      sheet: this.spriteSheets[sheetNumber],
	      frames: frames
	    };
//	    if(!this.currentAnimation) {
//	      this.currentAnimation = this.animations[name];
//	      this.currentAnimationName = name;
//	    }
		},
		
		/**
		 * Starts playing an animation.
		 * @function
		 * @name play
		 * @memberOf ex.display.AnimatedSprite
		 * @param {String} name name of animation to play
		 * @param {Boolean} [override] if true and the animation 
		 * is already playing this will reset it to frame 1 instead 
		 * of allowing it to continue
		 */
		play: function(name, loop, override) {
		  if(override == true) {
		    this.playQueue = [];
		  } else if(this.currentAnimationName == name) {
		    // Do nothing if animation is already playing and we're not overriding
		    return;
		  } else {  // if we're not overriding and this is new, queue it
		    this._queue({ name: name, loop: loop });
		  }
		  
		  this.currentAnimation = this.animations[name];
		  this.currentAnimationName = name;
		  this.currentAnimation.loop = loop;
		  
		  if(this.scaled == false) {
		    this.width = this.currentAnimation.sheet.renderingRect.width;
		    this.height = this.currentAnimation.sheet.renderingRect.height;
		  }
		  
		  this.currentFrame = 0;
		  this.currentIndex = 0;
		  this.timer = (1 / this.animations[name].sheet.frameRate);
		  this.playing = true;
		},
		
		/**
		 * Puts a function into the play queue.
		 * @param {String} name The name of the animation to play.
		 */
		_queue: function (name) {
		  this.playQueue.push(name);
		},
		
		/**
		 * Stops the current animation.
		 * @function
		 * @name stop
		 * @memberOf ex.display.AnimatedSprite
		 */
		stop: function() {
			this.playing = false;
		},
		
		/**
		 * Resumes play of the current animation.
		 * @function
		 * @name resume
		 * @memberOf ex.display.AnimatedSprite
		 */
		resume: function() {
			this.playing = true;
		},
		
		_animationComplete: function() {
		  return (this.currentIndex > this.currentAnimation.frames.length - 1);
		},
		
		_goToNextAnimation: function() {
		  if(this.playQueue.length > 0) {
		    var next = this.playQueue.shift();
		    this.currentAnimation = this.animations[next.name];
		    this.currentAnimationName = next.name;
		    this.currentAnimation.loop = next.loop;
		    this.currentFrame = 0;
	      this.timer = (1 / this.animations[next.name].sheet.frameRate);
	      this.playing = true;
	      this.currentIndex = 0;
		  } else if(this.currentAnimation.loop == false) {
		    this.currentIndex = this.currentAnimation.frames.length - 1;
		    this.stop();
		  } else {
		    this.currentIndex = 0;
		  }
		},
		
		/**
		 * If the animation is playing, this checks if it is time to advance
		 * to the next frame.
		 * @function
		 * @name update
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} dt timestep
		 */
		update: function(dt) {
		  if(this.currentAnimation == null) {
		    return;
		  }
		  
		  // Get framerate && check for playing
      var frameRate = this.currentAnimation.sheet.frameRate;
		  if(!this.playing || frameRate == 0) {
		    return;
		  }
		  
		  // Decrement and check timer
		  this.timer -= dt;
		  if(this.timer >= 0) {
		    return;
		  }
		  
		  // If spritesheet is ready, play it
		  if(this.currentAnimation.sheet.isReady()) {
		    this.currentIndex++;
		    if(this._animationComplete()) {
		      this._goToNextAnimation();
		    }
		    this.currentFrame = this.currentAnimation.frames[this.currentIndex];
		    this.goToFrame(this.currentFrame);
		  }
		  this.timer += (1 / this.currentAnimation.sheet.frameRate);
		},
		
		/**
		 * Moves the rendering rectangle to a specific frame.
		 * @function
		 * @name goToFrame
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} frame number of the frame to move to
		 */
		goToFrame: function(frame) {
		  var image = this.currentAnimation.sheet.image,
		      renderingRect = this.currentAnimation.sheet.renderingRect;
			var xNumFrames = image.width / renderingRect.width;
			
			var xFrame = frame % xNumFrames;
			var yFrame = Math.floor(frame / xNumFrames);
			
			renderingRect.x = xFrame * renderingRect.width;
			renderingRect.y = yFrame * renderingRect.height;
		},
		
		/**
		 * Moves the rendering rectangle forward one frame.
		 * @function
		 * @name goToNextFrame
		 * @memberOf ex.display.AnimatedSprite
		 */
		goToNextFrame: function() {
		  var image = this.currentAnimation.sheet.image,
		      renderingRect = this.currentAnimation.sheet.renderingRect;
			
		  //--Slide to the right to the next frame
			renderingRect.position.x += renderingRect.width;
			
			//--If that frame is outside the bounds, try to go down a row
			if((renderingRect.position.x + renderingRect.width) > image.width) {
				renderingRect.position.x = 0; //--Reset column position
				renderingRect.position.y += renderingRect.height; //--Move down to next row
				
				//--If that frame is outside bounds, return to the beginning
				if((renderingRect.position.y + renderingRect.height) > image.height) {
					renderingRect.position.y = 0;
				}
			}
		},
		
		/**
		 * Counts the number of frames in the image.
		 * @function
		 * @name numFrames
		 * @memberOf ex.display.AnimatedSprite
		 * @returns {Number} number of frames in the image
		 */
		numFrames: function () {
		  var sheet = this.currentAnimation.sheet;
			var xNumFrames = sheet.image.width / sheet.renderingRect.width;
			var yNumFrames = sheet.image.height / sheet.renderingRect.height;
			
			return xNumFrames * yNumFrames;
		}
	});
});
ex.using([
  "ex.base.Vector"
], function () {
	function vary(n) {
		return (Math.random() * n << 1) - n;
	};
	
	function extend(object, extend) {
		for(var param in extend) {
			object[param] = extend[param];
		}
	}
	
	ex.define("ex.display.Particle", {
		constructor: function(options) {
			var defaults = {
				position: new ex.base.Vector(0, 0),
				velocity: new ex.base.Vector(0, 0),
				xVariance: 0,
				yVariance: 0,
				direction: new ex.base.Vector(0, 0),
				directionVariance: 0,
				age: 0,
				life: 0,
				lifeVariance: 0,
				size: 0,
				sizeVariance: 0,
				active: true,
				alpha: 1,
				color: "#cef"
			};
			
			defaults.extend(options);
			
			defaults.direction = options.direction + vary(options.directionVariance);
			defaults.position = options.position.clone().add(defaults.position);
			defaults.velocity = options.velocity.clone().rotate(defaults.direction * Math.PI / 180);
			defaults.life = options.life + vary(options.lifeVariance);
			defaults.size = options.size + vary(options.sizeVariance);
			
			this.extend(defaults);
		},
		
		update: function(dt) {
			if(this.age >= this.life) this.active = false;
			this.position.add(this.velocity);
			this.alpha -= 0.1;
			this.age++;
		},
		
		render: function(context, camX, camY) {
			if(typeof this.onDraw === "function") this.onDraw(this);
			
			context.save();
			
			context.fillStyle = this.color;
			try {
				context.globalAlpha = this.alpha;
			} catch(e) {
				
			}
			context.translate(this.position.x - (camX * this.scrollFactorX), this.position.y - (camY * this.scrollFactorY));
			
			context.beginPath();
	        context.arc(0, 0, this.size/2, 0, Math.PI/180, true);
	        context.closePath();
	        context.fill();
	        
	        context.restore();
		}
	});	
});ex.using([
  "ex.base.Vector",
  "ex.display.Particle"
], function () {
	/*
	 * Requirements:
	 * - Support for animated sprites as particles
	 * - drawing objects as particles
	 * - variance in all directions (angle or cartesian)
	 * - variance in age/size
	 * - spawn rate
	 * - initial velocity
	 * - degree of randomness
	 * - simulation and render phases
	 * - emitters on points, lines, and maybe polys? (lines could be used for rain effects)
	 */
	
	
	ex.define("ex.display.Emitter", {
		constructor: function(options) {
			var defaults = {
				position: new ex.base.Vector(150, 150),
			    velocity: new ex.base.Vector(0, -3),
			    xVariance: 20,
			    yVariance: 5,
			    spawnSpeed: 4,
			    time: 100000,
			    maxParticles: 500,
			    size: 20,
			    sizeVariance: 5,
			    life: 30,
			    lifeVariance: 10,    
			    direction: 0,
			    directionVariance: 15,
			    color: '#cef',
			    opacity: 1,
			    scrollFactorX: 1,
			    scrollFactorY: 1,
			    onDraw: function(particle) {
			      var y = -this.age * 3;
			      particle.size *= 0.98;
			      particle.color = 'rgb(255, ' + (y + 255) + ', 68)';
			      particle.alpha = 0.5 - (particle.age / particle.life * 0.4);
			    }
		   };
		   
		   defaults.extend(options);
		   
		   this.options = defaults;
		   
		   this.particles = [];
		   
		   this.active = true;
		},
		
		update: function(dt) {
			// Subtract time and check for active
			this.options.time -= dt;
			if(this.options.time <= 0) {
				this.active = false;
			}
			
			// Update existing and remove dead particle
			var i = this.particles.length;
			while(i--) {
				var particle = this.particles[i];
				
				if(particle.active == false) {
					this.particles.splice(i, 1);
				} else {
					particle.update(dt);
				}
			}
			
			// Generate new particles
			for(var spawned = 0; spawned < this.options.spawnSpeed; spawned++) {
				if(this.particles.length >= this.options.maxParticles || this.options.time <= 0) {
					// Do nothing
				} else {
					this.particles.push(new ex.display.Particle(this.options));
				}
			}
		},
  
		render2dCanvas: function(context, camX, camY) {
			for(var i = 0; i < this.particles.length; i++) {
				this.particles[i].render(context, camX, camY);
			}
		}
	});	
});ex.using([ 
    'ex.base.Point', 
    'ex.base.Vector',
    'ex.display.Renderable'
], function() {
	ex.define("ex.display.Image", ex.display.Renderable, {
		/**
		 * Container class for HTML Images with additional position,
		 * size, and name data.
		 * 
		 * @deprecated This class has too much in common with Sprite,
		 * and we should just use Sprite instead.
		 * 
		 * @name ex.display.Image
		 * 
		 * @param {Image} image
		 * @param {ex.base.Point} position
		 * @param {ex.base.Vector} size width and height
		 * @param {String} name 
		 * 
		 * @property {ex.base.Point} position
		 * @property {ex.base.Vector} size width and height
		 * @property {Image} image
		 * 
		 * @constructor
		 */
		constructor : function(image, position, size, name) {
		  this.type = "Image";
		  
			this.name = name;
			this.position = position || new ex.base.Point(0, 0);
			this.width = image.naturalWidth;
			this.height = image.naturalHeight;
			this.image = image;
			this.size = size || new ex.base.Vector(this.width, this.height);
			this.scrollFactor = new ex.base.Vector(0,0);
			
			// If the image is not loaded reset size when it loads
			if(this.image.complete == false) {
				ex.event.listenOnce(this.image, 'load', this.autoSize, this);
			}
			
			this._super("constructor", [true, 1.0]);
		},
		
		/**
		 * Auto sizes this object's width and height to the image supplied, and removes
		 * any event listeners on the image for loading
		 * 
		 * @function
		 * @name autoSize
		 * @memberOf ex.display.Image
		 */
		autoSize: function () {
			this.width = this.image.naturalWidth;
			this.height = this.image.naturalHeight;
			
			if(this.rendering && this.rendering.el) {
			  this.rendering.el.style.width = this.width + 'px';
			  this.rendering.el.style.height = this.height + 'px';
			}
		},

		/**
		 * Retrieves an axis aligned bounding box (AABB) surrounding
		 * 		the image.
		 * 
		 * @function
		 * @name getBounds
		 * @nemberOf ex.display.Image
		 * 
		 * @returns {ex.base.Rectangle} 
		 */
		getBounds: function() {
			return new ex.base.Rectangle(
					this.position,
					this.size.x,
					this.size.y);
		},
		
		/**
		 * performs actions every time period dt
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.Image
		 * 
		 * @param {Number} dt length of current time cycle
		 */
		update : function(dt) {

		},
		
		setupDom: function (el) {
		  var thisEl = this.image;
      thisEl.style.position = 'absolute';
      thisEl.style.width = this.width + 'px';
      thisEl.style.height = this.height + 'px';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
		},
		
		renderDom: function (el, camX, camY, camWidth, camHeight) {
		  // Set opacity to 0 if not visible
      if(!this.visible){
        this.rendering.el.style.opacity = 0;
        return;
      } else {
        this.rendering.el.style.opacity = this.opacity;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          && viewPortX > camWidth
          && (viewPortY + this.height) < 0
          && viewPortY > camHeight) {
        return;
      } else {
        this.rendering.el.style.left = viewPortX + 'px';
        this.rendering.el.style.top = viewPortY + 'px';
      }
		},
		
		destroyDom: function (el) {
		  el.removeChild(this.rendering.el);
		  this.rendering = null;
		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.display.Image
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 * @param {Number} camWidth viewport width
		 * @param {Number} camHeight viewport height
		 */
		render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
			if(!this.isVisible()){
				return;
			}
			
			// Position of the sprite in the viewport
			var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
				viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
						
			// Do nothing if sprite is out of the viewport
			if((viewPortX + this.width) < 0
					&& viewPortX > camWidth
					&& (viewPortY + this.height) < 0
					&& viewPortY > camHeight) {
				return;
			}
			
			if (this.image == null) {
				context.fillStyle = '#888888';
				context.fillRect(
						this.position.x, this.position.y,
						this.size.x, this.size.y
				);
			} else {
				context.drawImage(
						this.image, 
						viewPortX, viewPortY, 
						this.size.x, this.size.y
				);
			}
		}
	});
});(function () {
	ex.define("ex.world.Tile", {
		
		/**
		 * An individial tile in a TileMap.
		 * 
		 * @name ex.world.Tile
		 * 
		 * @param {Number} value
		 * @param {ex.base.Vector} position
		 * @param {Number} width
		 * @param {Number} height
		 * @param {ex.world.Tile} neighborTop
		 * @param {ex.world.Tile} neighborBottom
		 * @param {ex.world.Tile} neighborLeft
		 * @param {ex.world.Tile} neighborRight
		 * 
		 * @property {Number} value
		 * @property {ex.base.Vector} position
		 * @property {Number} width
		 * @property {Number} height
		 * @property {Number} mass used in collision detection
		 * 
		 * @constructor
		 */
		constructor: function(value, position, width, height, neighborTop, neighborBottom, neighborLeft, neighborRight) {
			this.value = value;
			this.position = position;
			this.width = width;
			this.height = height;
			this.mass = 1;
			this.visible = true;

			/**
			 * @name neighbors
			 * @memberOf ex.world.Tile
			 * 
			 * @property {ex.world.Tile} top
			 * @property {ex.world.Tile} bottom
			 * @property {ex.world.Tile} left
			 * @property {ex.world.Tile} right
			 */
			this.neighbors = {
					top: 	neighborTop,
					bottom: neighborBottom,
					left: 	neighborLeft,
					right: 	neighborRight
			};
			
			/**
			 * Used in collision edge detection. Each property is true 
			 * if the neighbor on that side is null or valued as a
			 * non-colliding tile (eg: empty space).
			 * 
			 * @name edges
			 * @memberOf ex.world.Tile
			 * 
			 * @property {Boolean} top
			 * @property {Boolean} bottom
			 * @property {Boolean} left
			 * @property {Boolean} right
			 */
			this.edges = {
					top: 	false,
					bottom: false,
					left: 	false,
					right: 	false
			};
			
			this.update();
		},
		
		/**
		 * The update call. Generally only called when a tile's value
		 * is changed or indirectly called when a neighboring tile's
		 * value changes.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.Tile
		 * 
		 * @param {Boolean} requestedByNeighbor If true, this update request was 
		 * 		called by a neighbor. This results in the tile not updating 
		 * 		its own neighbors which would result in a resonance cascade 
		 * 		a la Half-Life. We wouldn't want that now, would we?
		 */
		update: function(requestedByNeighbor) {
			if(this.value == 0){
				this._setAllEdgesTo(false);
				if(!requestedByNeighbor) {
					this.updateNeighbors();
				}
				return;
			}
			// Set edge based on upper neighbor
			if(this.neighbors.top && this.neighbors.top.value == 0) {
				this.edges.top = true;
			} else if (!this.neighbors.top && this.value > 0) {
				this.edges.top = true;
			} else {
				this.edges.top = false;
			}
			// Set edge based on lower neighbor
			if(this.neighbors.bottom && this.neighbors.bottom.value == 0) {
				this.edges.bottom = true;
			} else if (!this.neighbors.bottom && this.value > 0) {
				this.edges.bottom = true;
			} else {
				this.edges.bottom = false;
			}
			// Set edge based on left neighbor
			if(this.neighbors.left && this.neighbors.left.value == 0) {
				this.edges.left = true;
			} else if (!this.neighbors.left && this.value > 0) {
				this.edges.left = true;
			} else {
				this.edges.left = false;
			}
			// Set edge based on right neighbor
			if(this.neighbors.right && this.neighbors.right.value == 0) {
				this.edges.right = true;
			} else if (!this.neighbors.right && this.value > 0) {
				this.edges.right = true;
			} else {
				this.edges.right = false;
			}
			
			// Keeps the update request from cascading across the map
			if(!requestedByNeighbor){
				this.updateNeighbors();
			}
		},
		
		/**
		 * Calls each neighbor's update function if the neighbor exists.
		 * 
		 * @function
		 * @name updateNeighbors
		 * @memberOf ex.world.Tile
		 */
		updateNeighbors: function() {
			if(this.neighbors.up){
				this.neighbors.up.update(true);
			}
			if(this.neighbors.down){
				this.neighbors.down.update(true);
			}
			if(this.neighbors.left){
				this.neighbors.left.update(true);
			}
			if(this.neighbors.right){
				this.neighbors.right.update(true);
			}
		},
		
		/**
		 * Sets the value of the tile to the given value.
		 * 
		 * @function
		 * @name setValue
		 * @memberOf ex.world.Tile
		 * 
		 * @param {Number} value
		 */
		setValue: function(value) {
			this.value = value;
			this.update();
		},
		
		/**
		 * Sets the position of the tile to the given value.
		 * Not recommended for use, can cause lots of confusion with
		 * neighbors. I don't even know why I left this in here.
		 * 
		 * @function
		 * @name setPosition
		 * @memberOf ex.world.Tile
		 * 
		 * @param {Number} x
		 * @param {Number} y
		 */
		setPosition: function(x, y) {
			this.position.x = x;
			this.position.y = y;
		},
		
		_setAllEdgesTo: function(value) {
			this.edges.up 		= 	value;
			this.edges.down 	= 	value;
			this.edges.left 	= 	value;
			this.edges.right 	= 	value;
		}
	});
}());
ex.using([
    "ex.world.Tile",
    "ex.base.Vector"
], function () {
	ex.define("ex.world.TileMap", {
		
		/**
		 * A 2D grid of ex.world.Tile objects used to create a game level.
		 * 
		 * @name ex.world.TileMap
		 * 
		 * @param {Number} tileWidth the uniform width of each tile.
		 * 		Do not change once set, can and most likely will cause
		 * 		odd behavior.
		 * @param {Number} tileHeight the uniform height of each tile.
		 * 		Do not change once set, can and most likely will cause
		 * 		odd behavior.
		 * @param {Number[][]} map the 2D numerical values for each tile.
		 * 		These values will be converted into ex.world.Tile objects
		 * 		during initialization.
		 * 
		 * @property {Number} tileWidth
		 * @property {Number} tileHeight
		 * @property {ex.world.Tile[][]} data 2D grid of ex.world.Tile objects
		 * @property {Number} width total width of the map
		 * @property {Number} height total height of the map
		 * 
		 * @constructor 
		 */
		constructor: function(tileWidth, tileHeight, map) {
			this.tileWidth = tileWidth;
			this.tileHeight = tileHeight;
			this.data = convertValueMapToTileMap(map, tileWidth, tileHeight);
			setupNeighbors(this.data);
			
			//--Calculate width and height
			this.width = map[0].length * this.tileWidth;
			this.height = map.length * this.tileHeight;
		},
		
		/**
		 * Retrieves a tile at the supplied x, y position.
		 * 
		 * @function
		 * @name getTile
		 * @memberOf ex.world.TileMap
		 * 
		 * @param {Number} x
		 * @param {Number} y
		 * @returns {ex.world.Tile}
		 */
		getTile: function(x, y) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			
			if(x >= 0 && x < this.data[0].length && 
					y >= 0 && y < this.data.length){
				return this.data[y][x];
			} else {
				return null;
			}
		},
		
		/**
		 * Sets a tile at the given x,y position to the given value.
		 * 
		 * @function
		 * @name setTile
		 * @memberOf ex.world.TileMap
		 * 
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} value
		 */
		setTile: function(x, y, value) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			this.data[y][x].setValue(value);
		}
	});
	
	function convertValueMapToTileMap(tileData, tileWidth, tileHeight) {
		var yPos = 0,
			xPos = 0,
			newMap = [];
		for(yPos; yPos < tileData.length; yPos++) {
			newMap[yPos] = [];
			for(xPos = 0; xPos < tileData[yPos].length; xPos++) {
				newMap[yPos][xPos] = new ex.world.Tile(
						tileData[yPos][xPos],
						new ex.base.Vector(xPos * tileWidth, yPos * tileHeight),
						tileWidth,
						tileHeight);
			}
		}
		return newMap;
	};
	
	function setupNeighbors(tiles) {
		var yPos = 0;
		var xPos = 0;
		for(yPos; yPos < tiles.length; yPos++) {
			for(xPos = 0; xPos < tiles[yPos].length; xPos++) {
				if(xPos == 0) {
					tiles[yPos][xPos].neighbors.left = null;
					tiles[yPos][xPos].neighbors.right = tiles[yPos][xPos + 1];
				} else if(xPos == tiles[yPos].length - 1) {
					tiles[yPos][xPos].neighbors.left = tiles[yPos][xPos - 1];
					tiles[yPos][xPos].neighbors.right = null;
				} else {
					tiles[yPos][xPos].neighbors.left = tiles[yPos][xPos - 1];
					tiles[yPos][xPos].neighbors.right = tiles[yPos][xPos + 1];
				}
				if(yPos == 0) {
					tiles[yPos][xPos].neighbors.top = null;
					tiles[yPos][xPos].neighbors.bottom = tiles[yPos + 1][xPos];
				} else if(yPos == tiles.length - 1) {
					tiles[yPos][xPos].neighbors.top = tiles[yPos - 1][xPos];
					tiles[yPos][xPos].neighbors.bottom = null;
				} else {
					tiles[yPos][xPos].neighbors.top = tiles[yPos - 1][xPos];
					tiles[yPos][xPos].neighbors.bottom = tiles[yPos + 1][xPos];
				}
				tiles[yPos][xPos].update();
			}
		}
	};
});ex.using([
  "ex.world.TileMap",
  "ex.display.Renderable"
], function () {
	ex.define("ex.display.SpriteMap", ex.display.Renderable, {
		
		/**
		 * The graphical representation of a TileMap.
		 * 
		 * @name ex.display.SpriteMap
		 * @extends ex.world.TileMap
		 * 
		 * @param {Number} tileWidth
		 * @param {Number} tileHeight
		 * @param {Number[]} map a 2D array of integer values relating to the
		 * 		tiles in the supplied tileSet
		 * @param {Image} tileSet
		 * @param {String} name
		 * 
		 * @property {Boolean} collides Controls whether the object is included
		 * 		in collision detection.
		 * @propety {String} name
		 * @property {Image} tileSet the tile set to use when rendering.
		 * @property {ex.base.Vector} position
		 * @property {ex.base.Vector} scrollFactor
		 */
		constructor: function(tileWidth, tileHeight, map, tileSet, options) {
		  this.type = "SpriteMap";
		  
			this.collides = false;
			this.tileSet = tileSet;
			this.position = new ex.base.Vector(0,0);
			this.scrollFactor = new ex.base.Vector(1,1);

			// Call Renderable constructor (visibility, opacity)
			this._super("constructor", [true, 1.0]);
			
			this.defaults = {
		    repeat: false,
		    preRender: true,
		    alpha: 1,
		    offset: {
		      x: 0,
		      y: 0
		    }
			};
			
			this.options = {};
			ex.extend(this.options, this.defaults);
			ex.extend(this.options, options);
			
			// Create TileMap
			this.tileMap = new ex.world.TileMap(tileWidth, tileHeight, map);
		},
		
		/**
		 * Contains any event handling when a collision occurs between this
		 * and another object.
		 * 
		 * @function
		 * @name onCollide
		 * @memberOf ex.display.SpriteMap
		 */
		onCollide: function() {
			
		},
		
		/**
		 * The update routine.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.SpriteMap
		 * 
		 * @param {Number} dt timestep
		 */
		update: function(dt) {
			// Check for any tile changes
			// If changes found, 
			//		alter the preRenderCanvas accordingly
		}
	});
});
ex.using([
  "ex.base.Rectangle",
  "ex.base.Vector"
], function(){
  ex.define("ex.display.SpriteSheet", {
    constructor: function(image, frameWidth, frameHeight, frameRate, offset) {
      this.image = image;
      this.frameRate = frameRate;
      this.renderingRect = 
        new ex.base.Rectangle(0, 0, frameWidth, frameHeight);
      this.offset = offset || { x: 0, y: 0 };
    },
    
    isReady: function() {
      if(this.image.width <= 0 || this.image.height <= 0) {
        return false;
      } else {
        return true;
      }
    }
  });
});ex.using([
  "ex.base.Vector",
  "ex.display.Renderable"
], function () {
	ex.define("ex.display.Sprite", ex.display.Renderable, {
		/**
		 * Sprite object that contains a single image to draw on the canvas.
		 * 
		 * @name ex.display.Sprite
		 * 
		 * @param {Number} x The sprite's x position.
		 * @param {Number} y The sprite's y position.
		 * @param {Image} img The img to use to render the sprite.
		 * @param {String} name The sprite's name.
		 * 
		 * @property {ex.base.Vector} position
		 * @property {ex.display.Image} image
		 * @property {Number} rotation angle of the image
		 * @property {Boolean} rotationEnabled if rotation is currently
		 * 		being used.
		 * @property {Canvas} rotationCanvas buffer canvas used to rotate
		 * 		the sprite.
		 * @property {ex.base.Vector} scrollFactor the rate at which the
		 * 		sprite moves with the camera. Values less than 1 cause the
		 * 		sprite to move slower than the camera making it appear to be
		 * 		farther away from the focus while numbers greater than 1 
		 *		make the sprite appear to be closer than the focus.
		 * @constructor
		 */
    constructor: function (position, img) {
      this.type = "Sprite";
      
      this.position = position;
      
      this.img = img|| new Image();

      this.rotation = 0;
      this.rotationEnabled = false;
      
      this.rendering = null;
      
      this.scrollFactor = new ex.base.Vector(1,1);
      
      this.width = this.img.naturalWidth;
      this.height = this.img.naturalHeight;
      
      if(this.width == 0  && this.height == 0) {
      	ex.event.listen('load', this.img, function () {
      		this._recalcDimensions();
      	}, this);
      }
      
      this._super("constructor", [true, 1.0]);
    },
    
    /**
     * Recalculates dimensions of sprite based on image. 
     * Automatically called if image changes or loads after sprite 
     * is initialized.
     * 
     * @function
     * @name _recalcDimensions
     * @memberOf ex.display.Sprite
     */
    _recalcDimensions: function () {
    	this.width = this.img.naturalWidth;
      this.height = this.img.naturalHeight;
      
      if(this.rendering && this.rendering.rotationCanvas) {
        this.rendering.rotationCanvas.width = this.width;
        this.rendering.rotationCanvas.height = this.height;
      } else if(this.rendering && this.rendering.el) {
        this.rendering.el.style.width = this.width + 'px';
        this.rendering.el.style.height = this.height + 'px';
      }
    },

    /**
     * Update routine
     * 
     * @function
     * @name update
     * @memberOf ex.display.Sprite
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
        if (typeof this.onUpdate === "function") this.onUpdate(dt);
    },

    /**
     * Returns bounding box of sprite.
     * 
     * @function
     * @name getBounds
     * @memberOf ex.display.Sprite
     * @returns {ex.base.Rectangle} bounding box
     */
    getBounds: function () {
        return new ex.base.Rectangle(
        		this.position, 
        		this.width, 
        		this.height);
    }
  });
});ex.using([], function () {
  
  // Static functions for listening and unlistening to events
  ex.event = {
    /*
     * Listens to an event on a javascript object
     * or a DOM object
     */
    listen: function (event, target, func, handler, useCapture) {
      // Error handling
      if(typeof event != 'string') {
        ex.Debug.log('Event must be a string!');
      }
      
      // Bind to a different handler if needed
      if(handler != null) {
        func = ex.bind(handler, func);
      }
      
      useCapture = useCapture || false;
      
      // Figure out what event handling the object supports
      // and use it to listen on
      if(typeof target.attachEvent != 'undefined') {
        target.attachEvent('on' + event, func, useCapture);
      } else if(typeof target.addEventListener != 'undefined') {
        target.addEventListener(event, func, useCapture);
      }
    },
    
    /**
     * Automatically unlistens to an event after it has been fired
     * 
     * @param target {Object} The object to listen on.
     * @param event {String} The event to listen to.
     * @param func {Function} The function to call when the event happens.
     * @param handler {Object} [Optional] The object to bind to when calling the function.
     */
    listenOnce: function (event, target, func, handler) {
      var newFunc = function () {
        ex.event.unlisten(event, target, func);
        
        func.call(this, arguments);
      };
      
      ex.event.listen(event, target, newFunc, handler);
    },
    
    unlisten: function (event, target, func) {
      if(target.removeEventListener) {
        target.removeEventListener(event, func);
      }
    }
  };
  
  // The extendable event target object
    ex.define("ex.event.EventTarget", {
        constructor: function () {
          this._listeners = {};
        },
        
        addEventListener: function (event, func) {
          if(ex.isNull(this._listeners)) {
            ex.Debug.log('EventTarget _listeners is not defined. Maybe you forgot to call _super in the constructor?', 'ERROR');
          }
          
          if(typeof this._listeners[event] == "undefined") {
            this._listeners[event] = [];
          }
          
          this._listeners[event].push(func);
        },
        
        /**
         * Dispatches all events with the selector event.
         * Returns true if events are dispatched, false
         * if there are no events for that selector.
         * 
         * @param event
         * @param params
         * @returns {Boolean}
         */
        dispatchEvent: function (event, eventObject) {
          if(this._listeners[event] == null) {
            return false;
          }
          
          // Build standard event object
          eventObject = eventObject || {};
          eventObject.target = this;
          
          var i = this._listeners[event].length;
          while(i--) {
            var func = this._listeners[event][i],
              ret = func(eventObject);
            if(ret == false) {
              break;
            }
          }
          return true;
        },
        
        removeEventListener: function (event, func) {
          this._listeners[event].splice(this._listeners[event].indexOf(func), 1);
        }
    });

});ex.using([
   'ex.event.EventTarget'
], function () {
  ex.define("ex.world.Entity", ex.event.EventTarget, {

    /**
     * The base class for all interactive game objects such as players,
     * NPCs, and triggers.
     * 
     * @name ex.world.Entity
     * 
     * @param {String} name name of entity (used mostly in IDE)
     * 
     * @constructor
     */
    constructor : function (name, items) {
      this._super('constructor', []);
      
      // Referencing data
      this.name = name;
      this.type = "Entity";
      
      this.items = items || [];
    },

    /**
     * performs actions every time period dt
     * 
     * @function
     * @name update
     * @memberOf ex.world.Entity
     * 
     * @param {Number} dt delta time, length of each time cycle
     */
    update : function (dt) {
      var index = this.items.length;
      while(index--) {
        this.items[index].update(dt);
      }
    },
    
    destroy: function () {
      delete this.items;
    }
  });
});ex.using([
  'ex.display.Renderable',
  'ex.display.Sprite',
  'ex.base.Rectangle',
  'ex.world.Entity'
], function () {
  var STATE;
  
  ex.define('ex.display.ui.Button', ex.world.Entity, {
    __statics: {
      STATE: {
        UP: 0,
        OVER: 1,
        DOWN: 2
      }
    },
    
    constructor: function (position, sprite, options) {
      this.defaults = {
        actions: {
          pressed: null,
          down: null,
          released: null,
          over: null
        },
        userData: {},
        autoUpdateSprite: false
      };
      
      this.options = ex.extend({}, this.defaults, true);
      ex.extend(this.options, options, true);
      
      this.state = STATE.UP;
      
      sprite.position = ex.clone(position);
      
      this._super('constructor', ["Button", [sprite]]);
    },
    
    update: function (dt) {
      var sprite = this.items[0];
      sprite.update(dt);
      
      // Check for over and down states.
      if(sprite.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
        ex.Input.changeCursor(ex.Input.CURSOR.POINTER);
        if(ex.Input.isDown(ex.util.Key.LMB)) {
          if(this.state != STATE.DOWN) {
            if(this.options.actions.pressed) this.options.actions.pressed(this, this.options.userData);
          }
          if(this.options.actions.down) this.options.actions.down(this, this.options.userData);
          this.state = STATE.DOWN;
          if(this.options.autoUpdateSprite) sprite.play('down');
        } else {
          if(this.state != STATE.OVER && this.options.actions.over) this.options.actions.over(this, this.options.userData);
          this.state = STATE.OVER;
          if(this.options.autoUpdateSprite) sprite.play('over');
        }
      } else {
        if(this.state == STATE.OVER || this.state == STATE.DOWN) {
          ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
          this.state = STATE.UP;
          
          if(this.options.actions.released) this.options.actions.released(this, this.userData);
          if(this.options.autoUpdateSprite) sprite.play('up');
        }
      }
    },
    
    destroy: function () {
      delete this.options.actions;
      delete this.state;
      delete this.width;
      delete this.items;
      delete this.userData;
    }
  });
  
  STATE = ex.display.ui.Button.STATE;
});ex.using([
  'ex.event.EventTarget'
], function () {
	ex.define("ex.base.Component", ex.event.EventTarget, {
		/**
		 * Interface for engine components.
		 * @name ex.base.Component
		 * @constructor
		 */
		constructor: function() {
			this._super('constructor');
		},
		
		/**
		 * Update loop
		 * @function
		 * @name update
		 * @memberOf ex.base.Component
		 * @param {Number} dt timestep between frames
		 */
		update: function(dt) {
			
		},
		
		/**
		 * Component name
		 * @name name
		 * @memberOf ex.base.Component
		 */
		name: "Component"
	});
});ex.using([
  "ex.base.Vector",
  "ex.display.Renderable"
], function () {
  ex.define("ex.display.Rectangle", ex.display.Renderable, {
    /**
     * Rectangle is used to compile drawn rectangles on the screen that are
     * created through the drawing API.
     * 
     * @name ex.display.Rectangle
     * @constructor
     * 
     * @param {Object} options The options used to draw the rectangle:
     * {
     *  x: x position
     *  y: y position
     *  width: Rectangle width
     *  height: Rectangle height
     *  alpha: Rectangle opacity or alpha (0.0 - 1.0)
     *  fill: {
     *    type: The type of fill (none, solid, linear-gradient, radial-gradient)
     *    color: The color of the fill (solid fill only)
     *  },
     *  stroke: {
     *    type: The type of stroke (none, solid)
     *    width: The width of the stroke
     *    color: The color of the stroke (solid fill only)
     *  }
     * }
     */
    constructor: function (options) {
      this.type = "Rectangle";
      
      this.defaults = {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        alpha: 1,
        fill: {
          type: 'solid',      // none, solid, linear-gradient, radial-gradient
          color: '#FF0000'
        },
        stroke: {
          type: 'none',       // none, solid
          width: 0,
          color: '#00FF00'
        }
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.position = new ex.base.Vector(this.options.x, this.options.y);
      this.width = this.options.width;
      this.height = this.options.height;
      this.scrollFactor = this.options.scrollFactor || new ex.base.Vector(1, 1);
      this.rotationEnabled = false;
        
      this._super("constructor", [true, 1.0]);
    },

    /**
     * Update routine
     * 
     * @function
     * @name update
     * @memberOf ex.display.Rectangle
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
        if (typeof this.onUpdate === "function") this.onUpdate(dt);
    },
    
    getFillStyle: function (context) {
      var fillStyle = "",
          options = this.options.fill;
      
      if(options.type == 'solid') {
        fillStyle = options.color;
      } else if(options.type == 'linear-gradient' || options.type == 'radial-gradient') {
        var grad,
            i = 0,
            ln = options.stops.length,
            stop;
        
        if(options.type == 'linear-gradient') {
          grad = context.createLinearGradient(
              options.start.x, options.start.y, options.end.x, options.end.y);
        } else {
          grad = context.createRadialGradient(
              options.start.x, options.start.y, options.start.radius,
              options.end.x, options.end.y, options.end.radius);
        }
        
        for(; i < ln; i++) {
          stop = options.stops[i];
          grad.addColorStop(stop.position, stop.color);
        }
        
        fillStyle = grad;
      }
      
      return fillStyle;
    },
    
    getStrokeStyle: function () {
      return this.options.stroke.color;
    },
    
    getLineWidth: function () {
      return this.options.stroke.width;
    },

    /**
     * Returns bounding box of sprite.
     * 
     * @function
     * @name getBounds
     * @memberOf ex.display.Sprite
     * @returns {ex.base.Rectangle} bounding box
     */
    getBounds: function () {
        return new ex.base.Rectangle(
            this.position, 
            this.width, 
            this.height);
    }
  });
});ex.using([
  'ex.base.Vector',
  'ex.display.Sprite',
  'ex.display.Rectangle',
  'ex.display.Renderable'
], function() { 
  ex.define("ex.display.ui.StatusBar", {
    constructor: function(options) {
      this.defaults = {
        position: new ex.Vector(50, 50),
        scrollFactor: new ex.Vector(0, 0),
        offset: 3,
        orientation: 'horizontal',
        update: 'manual',
        updateOptions: {
          target: null,
          currentSelector: '',
          maxSelector: ''
        },
        outer: new ex.display.Rectangle({
          x: 350, y: 300,
          width: 200, height: 16,
          alpha: 0.5,
          fill: {
            type: 'none'          
          },
          stroke: {
            width: 2,
            color: '#FFF'
          }
        }),
        inner: new ex.display.Rectangle({
          x: 353, y: 303,
          width: 194, height: 10,
          alpha: 0.5,
          fill: {
            type: 'solid',
            color: '#FFF'
          }
        })
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.options.outer.position = this.options.position;
      this.options.inner.position = this.options.position.clone().addNumber(this.options.offset);
      
      this.options.outer.scrollFactor = this.options.scrollFactor;
      this.options.inner.scrollFactor = this.options.scrollFactor;
      
      if(this.options.orientation == 'vertical') {
        this.totalWidth = this.options.inner.height;
        this.initialY = this.options.inner.position.y;
        this.options.inner.height = 0;
      } else {
        this.totalWidth = this.options.inner.width;
        this.options.inner.width = 0;
      }
      this.currentWidth = 0;
      
      // Add to items list for rendering
      this.items = [this.options.inner, this.options.outer];
    },
    
    update: function(dt) {
      if(this.options.update == 'auto') {
        var options = this.options.updateOptions,
            percent = options.target[options.currentSelector] / options.target[options.maxSelector];
        
        percent = ex.toInt(percent * 100);
        this.updatePercentage(percent);
      }
      
      if(this.options.orientation == 'horizontal') {
        this.options.inner.width = this.currentWidth; 
      } else {
        this.options.inner.height = this.currentWidth;
        this.options.inner.position.y = Math.ceil(this.initialY + this.totalWidth - this.currentWidth);
      }
    },
    
    updatePercentage: function (percent) {
      if(percent > 1) percent = percent / 100;
      this.currentWidth = this.totalWidth * percent;
    }
  });
});ex.using([
  'ex.display.Renderable'
], function () {
  ex.define('ex.display.Text', ex.display.Renderable, {
    constructor: function (text, position, options) {
      this.type = "Text";
      
      this.defaults = {
        type: 'canvas',   // 'canvas' or 'sprite'
        maxWidth: null,
        color: '#FFFFFF',
        font: '14pt Arial',
        textAlign: 'left',
        prefix: '',
        suffix: '',
        fontData: {},
        alpha: 1
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.text = text;
      this.position = position;
      this.scrollFactor = new ex.Vector(0, 0);
      
      this._super("constructor", [true, 1.0]);
      
      // If we are using a sprite font generate the font's Image object.
      if(this.options.type == 'sprite') {
        this.loadFontData(this.options.fontData);
      } else {
        var ctx = document.createElement('canvas').getContext('2d');
        ctx.font = this.options.font;
        this.height = ctx.measureText('m');
        this.width = ctx.measureText(this.text);
      }
    },
    
    setText: function (text, recalcWidth) {
      if(text instanceof String == false) text = text.toString();
      
      this.text = text;
      
      if(recalcWidth == true) {
        this._calculateWidth();
      }
    },
    
    _calculateWidth: function () {
      if(this.options.type == 'sprite') {
        // Width has to be calculated by character.
        this.width = 0;
        var i = 0,
            ln = this.text.length,
            charCode, width;
        for(; i < ln; i++) {
          charCode = this.text.charCodeAt(i);
          width = this.options.fontData.widths[charCode];
          this.width += width;
        }
      } else {
        var ctx = document.createElement('canvas').getContext('2d');
        ctx.font = this.options.font;
        this.width = ctx.measureText(this.text);
      }
    },
    
    loadFontData: function (fontData) {
      this.options.fontData = fontData;
      
      if(!fontData.img) {
        var imgData = fontData.data,
            img = new Image();
        img.src = imgData;
        fontData.img = img;
      }
      this.img = fontData.img;
      
      // Height is pre-calculated.
      this.height = fontData.height;
      
      this._calculateWidth();
    }
  });
});ex.using([
  'ex.display.Renderable',
  'ex.display.Text'
], function() {	
	ex.define("ex.display.ui.StatusText", {
		constructor: function(options) {
			this.options = {
				position: new ex.base.Vector(50,50),
				update: 'manual',
        updateOptions: {
          target: null,
          currentSelector: '',
          maxSelector: ''
        },
        displayFormat: 'absolute',
        text: {
          color: '#FFFFFF',
          font: '12pt Calibri',
          prefix: "",
          suffix: ""
        }
			};
			
			ex.extend(this.options, options);
			
			this.items = [
			  new ex.display.Text('Loading...', this.options.position, this.options.text)
      ];
		},
		
		update: function (dt) {
		  if(this.options.update == 'auto') {
		    var options = this.options.updateOptions,
		        current = options.target[options.currentSelector],
		        max = options.target[options.maxSelector],
		        text = "";
		    
		    // Show text in proper format
	      if(this.options.displayFormat == 'percentage') {
	        text = ex.toInt(current / max * 100);
	        text += '%';
	      } else if (this.options.displayFormat == 'absolute') {
	        text = current;
	      }
	      
	      this.setText(text);
		  }
		},
		
		setText: function (text) {
		  // Build text using prefix/suffix.
		  if(this.options.text.prefix) text = this.options.text.prefix + text;
		  if(this.options.text.suffix) text = text + this.options.text.suffix;
		  
		  this.items[0].setText(text);
		}
	});
});ex.using([
  'ex.display.Sprite',
  'ex.display.Rectangle',
  'ex.display.ui.StatusText',
  'ex.display.ui.StatusBar',
  'ex.base.Component'
], function() {	
	ex.define("ex.display.ui.LoadingScreen", ex.base.Component, {
		/**
		 * Creates a loading screen that hooks into the asset manager.
		 * @name ex.display.ui.LoadingScreen
		 * 
		 * @constructor
		 */
		constructor: function(logo) {
		  this.items = [
		    // Background
        new ex.display.Rectangle({
          x: 0, y: 0,
          width: 800, height: 600,
          fill: {
            type: 'radial-gradient',
            start: { x: 400, y: 300, radius: 0 },
            end: { x: 400, y: 300, radius: 500 },
            stops: [
              { position: 0, color: '#555' },
              { position: 1, color: '#000' }
            ]
          }
        }),
        
        // Logo
        new ex.display.Sprite(
            new ex.base.Vector(270, 230),
            logo),
            
        new ex.display.ui.StatusText({
          position: new ex.Vector(340, 295),
          update: 'auto',
          updateOptions: {
            target: ex.Assets,
            currentSelector: '_assetsLoaded',
            maxSelector: '_assetsToLoad'
          },
          displayFormat: 'percentage',
          text: {
            color: '#FFFFFF',
            font: '12pt Arial',
            prefix: 'Loading.. ',
            suffix: ''
          }
        }),
        
        new ex.display.ui.StatusBar({
          position: new ex.Vector(340, 305),
          update: 'auto',
          updateOptions: {
            target: ex.Assets,
            currentSelector: '_assetsLoaded',
            maxSelector: '_assetsToLoad'
          }
        })
      ];
		  
		  var i = 0,
		      ln = this.items.length,
		      item;
		  for(; i < ln; i++) {
		    item = this.items[i];
		    if(item.scrollFactor) {
		      item.scrollFactor.x = 0;
		      item.scrollFactor.y = 0;
		    }
		  }
		  
		  this.items[this.items.length - 1].options.outer.scrollFactor = new ex.Vector(0, 0);
		  this.items[this.items.length - 1].options.inner.scrollFactor = new ex.Vector(0, 0);
		},
		
		/**
		 * The update loop
		 * @function
		 * @name update
		 * @memberOf ex.display.ui.LoadingScreen
		 * @param {Number} dt timestep
		 */
		update: function(dt){
			var index = this.items.length;
			while(index--) {
			  this.items[index].update(dt);
			}
		}
	});
});ex.using([
  'ex.display.Sprite',
  'ex.event.EventTarget',
  'ex.display.Text',
  'ex.display.Renderable'
], function() { 
  ex.define("ex.display.ui.Menu", {
    constructor: function(options) {
      this.defaults = {
        items: [{
          item: null,
          action: null
        }],
        position: 'center',
        onOver: function (item) {},
        onOut: function (item) {},
        defaultSelection: 0,
        controller: null,
        controls: {
          up: 'up',
          down: 'down',
          activate: 'activate',
          click: 'click'
        }
      };
      
      this.enabled = true;
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.currentSelection = this.options.defaultSelection;
      
      // Add each item's item to this object so it draws.
      this.items = [];
      var i = 0,
          ln = this.options.items.length,
          item;
      for(; i < ln; i++) {
        item = this.options.items[i].item;
        if(item instanceof ex.display.Renderable == false) {
          this._throwNotRenderableError(item);
        }
        this.items.push(item);
      }
      
      this._calculateOffset();
      this._addInputBindings();
    },
    
    addItem: function (item, action) {
      this.options.items.push({
        item: item,
        action: action
      });
      this.items.push(item);
    },
    
    removeItem: function (item) {
      ex.Array.remove(this.items, item);
      
      var i = 0,
          ln = this.options.items.length;
      for(; i != ln; i++) {
        if(this.options.items[i].item == item) {
          this.options.items.splice(i, 1);
        }
      }
    },
    
    enable: function () {
      this.enabled = true;
    },
    
    disable: function () {
      this.enabled = false;
    },
    
    _addInputBindings: function () {
      if(this.options.controller) {
        if(this.options.controls.up) 
          this.options.controller.bindAction('pressed', this.options.controls.up, ex.bind(this, this.moveUpMenu));
        if(this.options.controls.down) 
          this.options.controller.bindAction('pressed', this.options.controls.down, ex.bind(this, this.moveDownMenu));
        if(this.options.controls.activate)
          this.options.controller.bindAction('pressed', this.options.controls.activate, ex.bind(this, this.activateCurrentSelection));
        if(this.options.controls.click)
          this.options.controller.bindAction('pressed', this.options.controls.click, ex.bind(this, this.onClick));
      }
    },
    
    _removeInputBindings: function() {
      if(this.options.controller) {
        if(this.options.controls.up) 
          this.options.controller.unbindAction('pressed', this.options.controls.up, ex.bind(this, this.moveUpMenu));
        if(this.options.controls.down) 
          this.options.controller.unbindAction('pressed', this.options.controls.down, ex.bind(this, this.moveDownMenu));
        if(this.options.controls.activate)
          this.options.controller.unbindAction('pressed', this.options.controls.activate, ex.bind(this, this.activateCurrentSelection));
        if(this.options.controls.click)
          this.options.controller.unbindAction('pressed', this.options.controls.click, ex.bind(this, this.onClick));
      }
    },
    
    /**
     * Calculates viewable browser window width and height,
     * then calculates the required offset on the menu
     */
    _calculateOffset: function() {
      
    },
    
    /**
     * Moves the selection up by one if possible.
     * @function
     * @name moveUpMenu
     * @memberOf ex.display.ui.TitleMenu
     */
    moveUpMenu: function() {
      if(this.currentSelection != 0 && this.enabled) {
        this.options.onOut(this.options.items[this.currentSelection].item);
        this.currentSelection--;
        this.options.onOver(this.options.items[this.currentSelection].item);
      }
    },
    
    /**
     * Moves the selection down by one if possible.
     * @function
     * @name moveDownMenu
     * @memberOf ex.display.ui.TitleMenu
     */
    moveDownMenu: function() {
      if(this.currentSelection < (this.options.items.length - 1) && this.enabled) {
        this.options.onOut(this.options.items[this.currentSelection].item);
        this.currentSelection++;
        this.options.onOver(this.options.items[this.currentSelection].item);
      }
    },
    
    onClick: function () {
      if(this.items[this.currentSelection].containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
        this.activateCurrentSelection();
      }
    },
    
    activateCurrentSelection: function() {
      if(this.enabled) {
        var selection = this.options.items[this.currentSelection];
        
        if(selection.action) {
          selection.action(selection.item);
        }
      }
    },
    
    /**
     * The update loop where user input is checked
     * @function
     * @name update
     * @memberOf ex.display.ui.TitleMenu
     * @param {Number} dt timestep
     */
    update: function(dt) {
      if(this.enabled) {
        var i = 0,
            ln = this.options.items.length,
            item,
            found = false;
        for(; i < ln; i++) {
          item = this.options.items[i].item;
          if(item.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
            found = true;
            ex.Input.changeCursor(ex.Input.CURSOR.POINTER);
            this.options.onOut(this.options.items[this.currentSelection].item);
            this.currentSelection = i;
            this.options.onOver(this.options.items[this.currentSelection].item);
          }
        }
      }
      
      // Change the cursor back if we need to.
      if(found == false && ex.Input.getCursorType() == ex.Input.CURSOR.POINTER) {
        ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
      }
    },
    
    _throwNotRenderableError: function (item) {
      ex.Debug.log(
          "Menu item passed in does not extend Renderable: " + item,
          'ERROR');
    },
    
    destroy: function () {
      ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
    }
  });
});ex.using([
  'ex.display.Sprite',
  'ex.base.Component',
  'ex.event.EventTarget',
  'ex.display.Text'
], function() {	
	ex.define("ex.display.ui.TitleMenu", ex.base.Component, {
		/**
		 * Creates a title menu with background, logo, selection options,
		 * and input bindings.
		 * @name ex.display.ui.TitleMenu
		 * @param {Object} selections a selection object (text, action pair)
		 * @param {Number} defaultSelection starting selection index (0 based)
		 * @param {Image} bgImage image to use as the background
		 * @param {Image} logoImage image to use as the logo
		 * @param {ex.Input} input the input component of the engine.
		 * 
		 * @property {Object[]} selections The array of selections
		 * 		available on the menu.
		 * @property {Number} currentSelection The array index of
		 * 		the current selection.
		 * @property {ex.util.Input} listening input component.
		 * @property {Object} settings for orientation and selection events.
		 * 
		 * @constructor
		 */
		constructor: function(
				selections, defaultSelection, bgImage, logoImage, options) {
			this.selections = selections;
			this.currentSelection = defaultSelection;
			
			this.options = {
				background: new ex.display.Sprite(new ex.base.Vector(0, 0), bgImage),
				logo: new ex.display.Sprite(new ex.base.Vector(300, 100), logoImage),
				menu: {
					x: 100,
					y: 320,
					actionKey: ex.util.Key.Enter
				},
				selection: {
					width: 150,
					height: 70
				},
				controls: {
				  moveUp: 'up',
				  moveDown: 'down',
				  activate: 'use',
				  updateSelection: 'move'
				}
			};
			
			this.items = [
        this.options.background,
        this.options.logo
      ];
			
			// Add each selection as a renderable text item
			var i = 0,
			    ln = this.selections.length,
			    selection,
			    yPos = this.options.menu.y;
			
			for(; i < ln; i++) {
			  selection = this.selections[i];
			  this.items.push(new ex.display.Text(selection.text,
    	      {
    			    position: new ex.base.Vector(this.options.menu.x, yPos),
    	        maxWidth: null,
    	        color: i == defaultSelection ? '#FF0000' : '#00FF00',
    	        font: '32pt Arial',
    	        textAlign: 'left',
    	        prefix: '',
    	        suffix: ''
    			  }));
			  this.selections[i] = this.items[this.items.length - 1];
			  this.selections[i].action = selection.action;
			  yPos += 50;
			}
			
			ex.extend(this.options, options);
			
			this.controller = ex.Input.getController(0);
			this.bindings = [
        {
          selector: this.options.controls.moveUp,
          action: ex.bind(this, this.moveUpMenu)
        }, {
          selector: this.options.controls.moveDown,
          action: ex.bind(this, this.moveDownMenu)
        }, {
          selector: this.options.controls.activate,
          action: ex.bind(this, this.activateCurrentSelection)
        }, {
          selector: this.options.controls.updateSelection,
          action: ex.bind(this, this.onMouseMove)
        }
      ];
			this._addInputBindings();
		},
		
		_addInputBindings: function() {
		  var index = this.bindings.length;
		  while(index--) {
		    this.controller.on(
	        this.bindings[index].selector, 
	        this.bindings[index].action);
		  }
		},
		
		_removeInputBindings: function() {
		  var index = this.bindings.length;
      while(index--) {
        this.controller.removeAction(
          this.bindings[index].selector, 
          this.bindings[index].action);
      }
		},
		
		onMouseMove: function(dt, data) {
		  if(data){
		    var index = this.selections.length;
        while(index--){
          if(data.position.x > (this.options.menu.x - this.options.selection.width) &&
              data.position.x < (this.options.menu.x + this.options.selection.width) &&
              data.position.y > (this.options.menu.y + (this.options.selection.height * (index - 1))) &&
              data.position.y < (this.options.menu.y + (this.options.selection.height * (index)))){
            this.selections[this.currentSelection].options.color = '#00FF00';
            this.currentSelection = index;
            this.selections[this.currentSelection].options.color = '#FF0000';
          }
        }
		  }
		},
		
		/**
		 * Moves the selection up by one if possible.
		 * @function
		 * @name moveUpMenu
		 * @memberOf ex.display.ui.TitleMenu
		 */
		moveUpMenu: function() {
			if(this.currentSelection != 0) {
			  this.selections[this.currentSelection].options.color = '#00FF00';
				this.currentSelection--;
				this.selections[this.currentSelection].options.color = '#FF0000';
			}
		},
		
		/**
		 * Moves the selection down by one if possible.
		 * @function
		 * @name moveDownMenu
		 * @memberOf ex.display.ui.TitleMenu
		 */
		moveDownMenu: function() {
			if(this.currentSelection < (this.selections.length - 1)) {
			  this.selections[this.currentSelection].options.color = '#00FF00';
				this.currentSelection++;
				this.selections[this.currentSelection].options.color = '#FF0000';
			}
		},
		
		activateCurrentSelection: function() {
		  this.selections[this.currentSelection].action();
		},
		
		/**
		 * The update loop where user input is checked
		 * @function
		 * @name update
		 * @memberOf ex.display.ui.TitleMenu
		 * @param {Number} dt timestep
		 */
		update: function(dt) {
		  
		}
	});
});ex.using([
    "ex.base.Vector"          
], function () {
	ex.define("ex.display.Camera", {
		/**
		 * A viewport for the game.
		 * @name ex.display.Camera
		 * 
		 * @property {ex.base.Point} position Position of camera.
		 * 		Initialized to (0,0).
		 * @property {Number} width width of the viewport
		 * @property {Number} height height of the viewport
		 * @property {Object} following Entity being followed. 
		 * 		Initialized to null.
		 * @property {Canvas} canvas Canvas to use for rendering.
		 * 		Initialized to null.
		 * @constructor
		 */
		constructor: function(position, width, height) {
			this.position = position;
			this.width = width;
			this.height = height;
			this.following = null;
			this.offset = null;
			this.bounds = null;
			this.timer = null;
		},
		
		/**
		 * Moves the camera to the position of the object being followed.
		 * @function
		 * @name update
		 * @memberOf ex.display.Camera
		 * @param {Number} dt
		 */
		update: function (dt) {
			if(this.following != null) {
			  var halfWidth = (this.width >> 1),
			      halfHeight = (this.height >> 1),
			      followX = this.following.position.x + (this.following.width >> 1),
			      followY = this.following.position.y + (this.following.height >> 1),
			      camX = this.position.x + halfWidth - followX,
			      camY = this.position.y + halfHeight - followY;
			  
			  if(camX > this.offset.x) {
			    this.position.x = followX  + this.offset.x - halfWidth;
		    } else if(camX < -this.offset.x) {
		      this.position.x = followX - this.offset.x - halfWidth;
		    }
				
			  if(camY > this.offset.y) {
			    this.position.y = followY + this.offset.y - halfHeight;
			  } else if(camY < -this.offset.y) {
			    this.position.y = followY - this.offset.y - halfHeight;
			  }
			}
			
			if(this.bounds != null) {
			  if(this.position.x < this.bounds.minX) this.position.x = this.bounds.minX;
			  else if(this.position.x > this.bounds.maxX) this.position.x = this.bounds.maxX;
			  if(this.position.y < this.bounds.minY) this.position.y = this.bounds.minY;
			  else if(this.position.y > this.bounds.maxY) this.position.y = this.bounds.maxY;
			}
			
			if(this.timer) this.timer.update(dt);
		},
		
		shake: function (frequency, strength, duration) {
		  var that = this,
		      offsets = {
		        x: 0,
		        y: 0
		      };
		  this.timer = new ex.world.Timer({
		    delay: frequency,
		    length: duration,
		    onTick: function () {
		      var x = ex.Math.getRandomInt(strength, -strength),
		          y = ex.Math.getRandomInt(strength, -strength);
		      offsets.x += x;
		      offsets.y += y;
		      that.position.x += x;
		      that.position.y += y;
		    },
		    onComplete: function () {
		      that.timer.destroy();
		      that.timer = null;
		      that.position.x -= offsets.x;
		      that.position.y -= offsets.y;
		    }
		  });
		  this.timer.start();
		},
		
		/**
		 * Translates the camera by the supplied x and y values.
		 * @function
		 * @name translate
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} x translation on the x axis
		 * @param {Number} y translation on the y axis
		 */
		translate: function(x, y) {
			this.position.x += x;
			this.position.y += y;
		},
		
		/**
		 * Moves the camera to a specific position.
		 * @function
		 * @name moveTo
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} x position on the x axis
		 * @param {Number} y position on the y axis
		 */
		moveTo: function (x, y) {
			this.position.x = x;
			this.position.y = y;
		},
		
		/**
		 * Sets an object for the camera to follow.
		 * @function
		 * @name follow
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Entity} object entity to follow
		 * @param {Number} offset The dead zone offset on each side.
		 */
		follow: function (object, offset) {
		  this.offset = offset || 0;
			this.following = object;
		},
		
		unfollow: function () {
		  this.following = null;
		},
		
		reset: function () {
		  if(this.timer) {
		    this.timer.destroy();
	      this.timer = null;
		  }
		  this.moveTo(0, 0);
		  this.unfollow();
		  this.unbind();
		},
		
		/**
		 * Calculates the bounds that the camera cannot go beyond.
		 * @function
		 * @name bind
		 * @memberOf ex.display.Camera
		 * @param {Number} x The x position of the rectangle.
		 * @param {Number} y The y position of the rectangle.
		 * @param {Number} width The width of the rectangle.
		 * @param {Number} height The height of the rectangle.
		 */
		bind: function (x, y, width, height) {
		  this.bounds = {
	      minX: x,
	      minY: y,
	      maxX: x + width - this.width,
	      maxY: y + height - this.height
		  }
		},
		
		unbind: function () {
		  this.bounds = null;
		}
	});
});
(function () {
	ex.define("ex.display.ImageRepository", {
		
		/**
		 * *** LEGACY AS OF version 0.6.3! ***
		 * Manages the loading and retrieving of images for the game.
		 * 
		 * @name ex.display.ImageRepository
		 * 
		 * @property {ex.display.Image[]} images array of managed images.
		 * @property {Boolean} ready true if imagesLoaded == imagesToLoad
		 * 		Internal use only. Do not change!
		 * @property {Number} imagesLoaded number of images loaded.
		 * 		Internal use only. Do not change!
		 * @property {Number} imagesToLoad number of images to load.
		 * 		Internal use only. Do not change!
		 * 
		 * @constructor
		 */
		constructor: function () {
			this.images = [];
			this.ready = true;
			this.imagesLoaded = 0;
			this.imagesToLoad = 0;
		},
		
		/**
		 * Retrieves an image by name from the repository.
		 * 
		 * @function
		 * @name getImage
		 * @memberOf ex.display.ImageRepository
		 * 
		 * @param {String} name
		 * @returns {ex.display.Image} returns null if name is not found
		 */
		getImage: function(name) {
			return this.images[name];
		},
		
		/**
		 * Loads an image, creates an ex.base.Image, and gives it a name.
		 * @param {String} name
		 * @param {String} filePath
		 */
		loadImage: function (name, filePath) {
			this.images[name] = new Image();
			
			//--Image loading checking
			this.ready = false;
			this.imagesToLoad++;
			
			var that = this;
			this.images[name].onload = function () {
				that.imagesLoaded++;
				if(that.imagesLoaded == that.imagesToLoad) {
					that.ready = true;
				}
			};
			
			//--Image caching fix
			this.images[name].src = "";
			this.images[name].src = filePath + '? ex=' + (new Date()).getTime();
		}
	});	
}());
ex.using([

], function () {
  ex.define('ex.display.rendering.ObjectRenderer', {
    // DOM
    setupDom: function () {
      
    },
    
    renderDom: function () {
      
    },
    
    destroyDom: function () {
      
    },
    
    // Canvas 2D
    setup2dCanvas: function () {
      
    },
    
    render2dCanvas: function () {
      
    },
    
    destroy2dCanvas: function () {
      
    },
    
    // Canvas 3D
    setup3dCanvas: function () {
      
    },
    
    render3dCanvas: function () {
      
    },
    
    destroy3dCanvas: function () {
      
    }
  });
});ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.AnimatedSpriteRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var spriteSheet = this.currentAnimation.sheet;
      var thisEl = document.createElement('div');
      thisEl.style.backgroundImage = 'url(' + spriteSheet.image.src + ')';
      thisEl.style.display = 'block';
      thisEl.style.width = spriteSheet.renderingRect.width + 'px';
      thisEl.style.height = spriteSheet.renderingRect.height + 'px';
      thisEl.style.position = 'absolute';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      thisEl.style.zIndex = '100';
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      var spriteSheet = this.currentAnimation.sheet;
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
      
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          || viewPortX > camWidth
          || (viewPortY + this.height) < 0
          || viewPortY > camHeight) {
        if(this.visible) {
          this.visible = false;
          this.rendering.el.style = 'none';
        }
        return;
      } else if(this.visible == false) {
        this.visible = true;
        this.rendering.el.style = 'inherit';
      }
      
      this.rendering.el.style.backgroundPosition = 
        spriteSheet.renderingRect.position.x + 'px' + ' ' + spriteSheet.renderingRect.position.y + 'px';
      this.rendering.el.style.left = viewPortX + 'px';
      this.rendering.el.style.top = viewPortY + 'px';
    },
    
    /**
     * Renders the current frame of the animation.
     * 
     * @param {Context} context canvas context to draw with
     * @param {Number} camX camera offset on x
     * @param {Number} camY camera offset on y
     * @param {Number} camWidth viewport width
     * @param {Number} camHeight viewport height
     */
    render2dCanvas: function (context, camX, camY, camWidth, camHeight) {
      if(this.currentAnimation == null) {
        return;
      }
      
      var spriteSheet = this.currentAnimation.sheet;
      if(!this.isVisible()){
        return;
      }
      
      // Position of the animated sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
      
      // Render only if the animated sprite is within the viewport
      if((viewPortX + spriteSheet.renderingRect.width) > 0
          && viewPortX < camWidth
          && (viewPortY + spriteSheet.renderingRect.height) > 0
          && viewPortY < camHeight) {
        context.drawImage(spriteSheet.image, 
                  spriteSheet.renderingRect.x, 
                  spriteSheet.renderingRect.y,
                  spriteSheet.renderingRect.width,
                  spriteSheet.renderingRect.height,
                  viewPortX + spriteSheet.offset.x, 
                  viewPortY + spriteSheet.offset.y,
                  this.width,
                  this.height);
      }
    }
  });
});ex.using([
    'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.RectangleRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      // SVG implementation
    },
    
    destroyDom: function (el) {
      
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      
    },
    
    setup2dCanvas: function () {
      this.rendering = {
          rotationCanvas: document.createElement('canvas')  
      };
      
      this.rendering.rotationCanvas.width = this.width;
      this.rendering.rotationCanvas.height = this.height;
      this.rendering.rotationContext = this.rendering.rotationCanvas.getContext("2d");
    },
    
    /**
     * Renders sprite, usually called by Renderer.
     * 
     * @function
     * @name render
     * @memberOf ex.display.Rectangle
     * 
     * @param {Context} context canvas context to draw with
     * @param {Number} camX camera offset on x
     * @param {Number} camY camera offset on y
     * @param {Number} camWidth viewport width
     * @param {Number} camHeight viewport height
     */
    render2dCanvas: function (context, camX, camY, camWidth, camHeight) {
      // Do nothing if this is not visible
      if(!this.isVisible()){
        return;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          || viewPortX > camWidth
          || (viewPortY + this.height) < 0
          || viewPortY > camHeight) {
      } else {
        if (this.rotationEnabled == false) {
          context.save();
          
          if(this.options.alpha < 1) {
            context.globalAlpha = this.options.alpha;
          }
          
          if(this.options.stroke.type != 'none') {
            context.strokeStyle = this.getStrokeStyle(context);
            context.lineWidth = this.getLineWidth();
            context.strokeRect(viewPortX, viewPortY, this.width, this.height);
          }
          
          if(this.options.fill.type != 'none') {
            context.fillStyle = this.getFillStyle(context);
            context.fillRect(viewPortX, viewPortY, this.width, this.height); 
          }
          
          context.restore();
        } else {
          throw "Not implemented.";
        }
      }
    }
  });
});(function () {
  ex.define('ex.display.rendering.RenderingContext', {
    constructor: function (width, height) {
      this.width = width;
      this.height = height;
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      // Not implemented
    }
  });
})();ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContext2dCanvas', ex.display.rendering.RenderingContext, {
    constructor: function (width, height, renderers, canvas, bgColor) {
      this._super('constructor', [width, height]);
      
      this.canvas = canvas || document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.backgroundColor = bgColor;
      this.context = this.canvas.getContext("2d");
      
      this.bufferCanvas = document.createElement("canvas");
      this.bufferCanvas.width = width;
      this.bufferCanvas.height = height;
      this.bufferCanvas.style.backgroundColor = bgColor;
      this.buffer = this.bufferCanvas.getContext("2d");
      
      // If a canvas was not passed in, add a new one to the page
      if(canvas == null) {
        document.body.appendChild(this.canvas);
      }
      
      this.renderers = renderers;
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      // Move buffer to front.
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.bufferCanvas, 0, 0);
      
      // Draw everything else to the back buffer.
      this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var i = 0,
          ln = items.length,
          item,
          renderers = this.renderers,
          context = this.buffer;
      for(; i < ln; i++) {
        item = items[i];
        if(!item.renderer) {
          renderers[item.type].render2dCanvas.call(item, context, camX, camY, camWidth, camHeight);
        } else {
          item.renderer.render2dCanvas.call(item, context, camX, camY, camWidth, camHeight);
        }
      }
    },
    
    /**
     * Resizes the canvas.
     * 
     * @function
     * @name resizeCanvas
     * @memberOf ex.display.Renderer
     * 
     * @param {Number} newWidth
     * @param {Number} newHeight
     */
    resizeViewport: function (newWidth, newHeight) {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
    }
  });
});ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContext3dCanvas', ex.display.rendering.RenderingContext, {
    
  });
});ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContextDom', ex.display.rendering.RenderingContext, {
    constructor: function (width, height, renderers, el, bgColor) {
      this._super('constructor', [width, height]);
      
      this.el = el || document.createElement('div');
      this.el.id = 'exstoGame';
      this.el.style.display = 'block';
      this.el.style.width = width + 'px';
      this.el.style.height = height + 'px';
      this.el.style.overflow = 'hidden';
      this.el.style.position = 'relative';
      this.el.style.backgroundColor = bgColor;
      
      // If a canvas was not passed in, add a new one to the page
      if(el == null) {
        document.body.appendChild(this.el);
      }
      
      this.renderers = renderers;
    },
    
    resizeViewport: function(newWidth, newHeight) {
      this.el.style.width = newWidth + 'px';
      this.el.style.height = newHeight + 'px';
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      var i = 0,
          ln = items.length,
          item,
          el = this.el,
          renderers = this.renderers;
      
      for(; i < ln; i++) {
        item = items[i];
        if(!item.renderer) {
          renderers[item.type].renderDom.call(item, el, camX, camY, camWidth, camHeight);
        } else {
          item.renderer.renderDom.call(item, el, camX, camY, camWidth, camHeight);
        }
      }
    }
  });
});ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.SpriteMapRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var tileMap = document.createElement('div');
      tileMap.style.position = 'absolute';
      tileMap.style.left = this.position.x + 'px';
      tileMap.style.top = this.position.y + 'px';
      tileMap.style.display = 'block';
      tileMap.style.width = this.tileMap.width + 'px';
      tileMap.style.height = this.tileMap.height + 'px';
      tileMap.style.zIndex = '99';
      
      var yPos = this.tileMap.data.length - 1,
          xPos = 0;
      for(yPos; yPos > -1; yPos--) {
        for(xPos; xPos < this.tileMap.data[yPos].length; xPos++) {
          var tile = this.tileMap.data[yPos][xPos], sx = 0, sy = 0;
          var tileValue = tile.value;
          if(tileValue != 0) {
            while(--tileValue) {
              sx += this.tileMap.tileWidth;
              if(sx >= this.tileSet.width) {
                sy += this.tileMap.tileHeight;
                sx = 0;
              }
            }
            
            var tileEl = document.createElement('div');
            tileEl.style.position = 'absolute';
            tileEl.style.left = tile.position.x + 'px';
            tileEl.style.top = (tile.position.y - (this.yOffset * yPos)) + 'px';
            tileEl.style.display = 'block';
            tileEl.style.width = tile.width + 'px';
            tileEl.style.height = tile.height + 'px';
            tileEl.style.backgroundImage = 'url(' + this.tileSet.src + ')';
            tileEl.style.backgroundPosition = 
              -sx + 'px' + ' ' + -sy + 'px';
            tileMap.appendChild(tileEl);
          } else {
            var tileEl = document.createElement('div');
            tileEl.style.position = 'absolute';
            tileEl.style.left = tile.position.x + 'px';
            tileEl.style.top = (tile.position.y - (this.yOffset * yPos)) + 'px';
            tileEl.style.width = tile.width + 'px';
            tileEl.style.height = tile.height + 'px';
            tileEl.style.display = 'none';
            tileMap.appendChild(tileEl);
          }
        }
        xPos = 0;
      }
      
      this.rendering = {
        el: tileMap
      };
      
      el.appendChild(this.rendering.el);
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      // Set opacity to 0 if not visible
      if(!this.visible){
        this.rendering.el.style.opacity = 0;
        return;
      } else {
        this.rendering.el.style.opacity = this.opacity;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite map is out of the viewport
      if((viewPortX + this.tileMap.width) < 0
          || viewPortX > camWidth
          ||(viewPortY + this.tileMap.height) < 0
          || viewPortY > camHeight) {
        this.rendering.el.style.display = 'none';
        return;
      } else {
        this.rendering.el.style.display = 'inherit';
      }
      
      var yPos = this.tileMap.data.length - 1,
          xPos = 0;
      for(yPos; yPos > -1; yPos--) {
        for(xPos; xPos < this.tileMap.data[yPos].length; xPos++) {
          var tile = this.tileMap.data[yPos][xPos];
          var tileValue = tile.value;
          if(tileValue != 0) {
            var tilePortX = ex.toInt((this.position.x + tile.position.x) - (camX * this.scrollFactor.x)),
                tilePortY = ex.toInt((this.position.y + tile.position.y) + (camY * this.scrollFactor.y) - (camHeight / 2));
            if((tilePortX + tile.width) < 0
                || tilePortX > camWidth
                || (tilePortY + tile.height) < 0
                || tilePortY > camHeight) {
              if(tile.visible == true) {
                var tileIndex = (yPos * this.tileMap.data[0].length) + xPos;
                var el = this.rendering.el.childNodes[tileIndex];
                el.style.display = 'none';
                tile.visible = false; 
              }
            } else if(tile.visible == false) {
              var tileIndex = (yPos * this.tileMap.data[0].length) + xPos;
              var el = this.rendering.el.childNodes[tileIndex];
              tile.visible = true;
              el.style.display = 'inherit';
            }
          }
        }
        xPos = 0;
      }
      
      this.rendering.el.style.left = -camX + 'px';
      this.rendering.el.style.top = -camY + 'px';
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    /**
     * Pre-renders the SpriteMap to the preRenderCanvas,
     * which acts as a buffer to the SpriteMap. This
     * results in the SpriteMap not having to be fully
     * generated each frame, instead redrawing the buffer
     * as a single image.
     */
    setup2dCanvas: function (canvas) {
      if(this.options.preRender == true) {
        // Used to pre-render the whole map as an image
        this.preRenderCanvas = document.createElement("canvas");
        this.preRenderCanvas.width = this.tileMap.width;
        this.preRenderCanvas.height = this.tileMap.height;
        this.preRenderContext = this.preRenderCanvas.getContext('2d');
        
        // Set alpha to 1 to prevent doubling alpha value.
        var alpha = this.options.alpha;
        this.options.alpha = 1;
        ex.display.rendering.SpriteMapRenderer.renderSpriteMapToContext(this, this.preRenderContext);
        this.options.alpha = alpha;
      }
    },
    
    /**
     * The render routine.
     * 
     * @function
     * @name render
     * @memberOf ex.display.SpriteMap
     * 
     * @param {Context} context
     * @param {Number} camX
     * @param {Number} camY
     * @param {Number} camWidth
     * @param {Number} camHeight
     */
    render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
      // Do nothing if not visible
      if(!this.isVisible()){
        return;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite map is out of the viewport
      if((viewPortX + this.tileMap.width) < 0
          || viewPortX > camWidth
          ||(viewPortY + this.tileMap.height) < 0
          || viewPortY > camHeight) {
        if(this.options.repeat == false) {
          return;
        }
      }
      
      var SpriteMapRenderer = ex.display.rendering.SpriteMapRenderer;
      
      if(this.options.repeat == false) {
        if(this.options.preRender == true) {
          SpriteMapRenderer.renderPreRenderedSpriteMapToContext(this, context, { x: viewPortX, y: viewPortY }, camWidth, camHeight);
        } else {
          // Render all the tiles on the map at once.
          SpriteMapRenderer.renderSpriteMapToContext(this, context, { x: viewPortX, y: viewPortY });
        }
      } else {
        // The starting x and y is equal to the remainder of how many times the tile
        // map can fit between its position and the camera top left.
        var startX = viewPortX % this.tileMap.width, 
            startY = viewPortY % this.tileMap.height,
            curX, curY;
        
        // Subtract one more tile if the tiles need to repeat negatively.
        if(viewPortX > 0) startX -= this.tileMap.width;
        if(viewPortY > 0) startY -= this.tileMap.height;
        
        curX = startX;
        curY = startY;
        
        while(curX < camWidth) {
          while(curY < camHeight) {
            // Copied from after if(this.options.repeat == false)
            if(this.options.preRender == true) {
              SpriteMapRenderer.renderPreRenderedSpriteMapToContext(this, context, { x: curX, y: curY }, camWidth, camHeight);
            } else {
              // Render all the tiles on the map at once.
              SpriteMapRenderer.renderSpriteMapToContext(this, context, { x: curX, y: curY });
            }
            curY += this.tileMap.height;
          }
          curY = startY;
          curX += this.tileMap.width;
        }
      }
    },
    
    // Global static functions.
    __statics: {
      renderPreRenderedSpriteMapToContext: function (spriteMap, context, position, width, height) {
        context.save();
        context.globalAlpha = spriteMap.options.alpha;
        
        position = position || {
          x: 0,
          y: 0
        };
        
        // Calculate section of preRenderCanvas to draw
        var sourceX = -position.x,
            sourceY = -position.y,
            sourceWidth = width - position.x,
            sourceHeight = height - position.y;
        var destX = position.x,
            destY = position.y;
        
        // Constrain values to image size
        if(sourceX < 0) sourceX = 0;
        if(sourceY < 0) sourceY = 0;
        if((sourceX + sourceWidth) > spriteMap.preRenderCanvas.width) sourceWidth = spriteMap.preRenderCanvas.width - sourceX;
        if((sourceY + sourceHeight) > spriteMap.preRenderCanvas.height) sourceHeight = spriteMap.preRenderCanvas.height - sourceY;
        if(destX < 0) destX = 0;
        if(destY < 0) destY = 0;
        
        // Draw image
        context.drawImage(
                  spriteMap.preRenderCanvas,
                  sourceX,
                  sourceY,
                  sourceWidth,
                  sourceHeight,
                  destX, 
                  destY,
                  sourceWidth,  //destWidth and Height == sourceWidth and Height
                  sourceHeight);
        
        context.restore();
      },
      
      renderSpriteMapToContext: function (spriteMap, context, offset) {
        context.save();
        context.globalAlpha = spriteMap.options.alpha;
        
        var yPos = spriteMap.tileMap.data.length - 1,
            xPos = 0;
        
        offset = offset || {
          x: 0,
          y: 0
        };
        
        // Loop through all the tiles and draw them onto the context.
        for(yPos; yPos > -1; yPos--) {
          for(xPos; xPos < spriteMap.tileMap.data[yPos].length; xPos++) {
            var tile = spriteMap.tileMap.data[yPos][xPos], sx = 0, sy = 0;
            var tileValue = tile.value;
            if(tileValue != 0) {
              while(--tileValue) {
                sx += spriteMap.tileMap.tileWidth;
                if(sx >= spriteMap.tileSet.width) {
                  sy += spriteMap.tileMap.tileHeight;
                  sx = 0;
                }
              }
              context.drawImage(
                  spriteMap.tileSet,
                  sx,
                  sy,
                  spriteMap.tileMap.tileWidth,
                  spriteMap.tileMap.tileHeight,
                  tile.position.x + offset.x,
                  tile.position.y - (spriteMap.options.offset.y * yPos) + offset.y,
                  tile.width,
                  tile.height);
            }
          }
          xPos = 0;
        }
        
        context.restore();
      }
    }
  });
});ex.using([
    'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.SpriteRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var thisEl = this.img;
      thisEl.style.position = 'absolute';
      thisEl.style.width = this.width + 'px';
      thisEl.style.height = this.height + 'px';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      // Set opacity to 0 if not visible
      if(!this.visible){
        this.rendering.el.style.opacity = 0;
        return;
      } else {
        this.rendering.el.style.opacity = this.alpha;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
      
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          || viewPortX > camWidth
          || (viewPortY + this.height) < 0
          || viewPortY > camHeight) {
        if(this.visible == true) {
          this.visible = false;
          this.rendering.el.style.display = 'none';
        }
        return;
      } else if(this.visible == false) {
        this.visible = true;
        this.rendering.el.style.display = 'inherit';
      }
      
      if(this.rotationEnabled == false) {
        this.rendering.el.style.left = viewPortX + 'px';
        this.rendering.el.style.top = viewPortY + 'px';
      } else {
        
      }
    },
    
    setup2dCanvas: function () {
      this.rendering = {
          rotationCanvas: document.createElement('canvas')  
      };
      
      this.rendering.rotationCanvas.width = this.width;
      this.rendering.rotationCanvas.height = this.height;
      this.rendering.rotationContext = this.rendering.rotationCanvas.getContext("2d");
    },
    
    /**
     * Renders sprite, usually called by Renderer.
     * 
     * @function
     * @name render
     * @memberOf ex.display.Sprite
     * 
     * @param {Context} context canvas context to draw with
     * @param {Number} camX camera offset on x
     * @param {Number} camY camera offset on y
     * @param {Number} camWidth viewport width
     * @param {Number} camHeight viewport height
     */
    render2dCanvas: function (context, camX, camY, camWidth, camHeight) {
      // Do nothing if sprite is not visible
      if(!this.isVisible()){
        return;
      }
      
      var alpha = context.globalAlpha;
      context.globalAlpha = this.alpha;
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          || viewPortX > camWidth
          || (viewPortY + this.height) < 0
          || viewPortY > camHeight) {
        return;
      }
            
      if (this.rotationEnabled == false) {
        if(!this.renderingRect) {
          context.drawImage(
              this.img, 
              viewPortX, 
              viewPortY,
              this.width,
              this.height);
        } else {
          var renderingRect = this.renderingRect;
          context.drawImage(
              this.img,
              renderingRect.x, renderingRect.y,
              renderingRect.width, renderingRect.height,
              viewPortX, viewPortY,
              renderingRect.width, renderingRect.height);
        }
      } else {
          //--Ensure width and height are not 0 to avoid INVALID_STATE_ERR
        var rotCanvas = this.rendering.rotationCanvas,
            rotContext = this.rendering.rotationContext;
        rotCanvas.width = this.img.width || 1;
        rotCanvas.height = this.img.height || 1;
        
        rotContext.save();
        rotContext.translate(this.width / 2, this.height / 2);
        rotContext.rotate(this.rotation);
        rotContext.translate(-this.width / 2, -this.height / 2);
        rotContext.drawImage(this.img, 0, 0);
        rotContext.restore();

        context.drawImage(
            rotCanvas, 
            viewPortX, 
            viewPortY);
      }
      
      context.globalAlpha = alpha;
    }
  });
});ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.TextRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var thisEl = document.createElement('div');
      thisEl.innerHTML = this.text;
      thisEl.style.position = 'absolute';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      thisEl.style.font = this.options.font;
      thisEl.style.color = this.options.color;
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      this.rendering.el.innerHTML = this.text;
      this.rendering.el.style.left = this.position.x + 'px';
      this.rendering.el.style.top = this.position.y + 'px';
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
      if(!this.isVisible()) {
        return;
      }
        
      context.save();
      
      context.globalAlpha = this.options.alpha;
      
      
      
      if(this.options.type == 'canvas') {
        context.font = this.options.font;
        context.fillStyle = this.options.color;
        
        context.fillText(
            this.text, 
            this.position.x, 
            this.position.y,
            this.options.maxWidth || 9000000);
      } else if(this.options.type == 'sprite') {
        var i = 0, 
            ln = this.text.length,
            charCode, 
            width, 
            x, 
            objX = this.position.x - (camX * this.scrollFactor.x),
            objY = this.position.y - (camY * this.scrollFactor.y);
        for(; i < ln; i++) {
          charCode = this.text.charCodeAt(i);
          width = this.options.fontData.widths[charCode];
          x = this.options.fontData.positions[charCode];
          context.drawImage(this.img,
              x,
              0,
              width,
              this.img.height,
              objX,
              objY,
              width,
              this.img.height);
          objX += width;
        }
      }
      
      context.restore();
    }
  });
});ex.using([
    'ex.display.rendering.RenderingContextDom',
    'ex.display.rendering.RenderingContext2dCanvas',
    'ex.display.rendering.RenderingContext3dCanvas',
    
    'ex.display.rendering.SpriteRenderer',
    'ex.display.rendering.RectangleRenderer',
    'ex.display.rendering.TextRenderer',
    'ex.display.rendering.AnimatedSpriteRenderer',
    'ex.display.rendering.SpriteMapRenderer'
], function () {
	ex.define("ex.display.rendering.Renderer", {
	  __statics: {
	    DOM: 1,
	    CANVAS2D: 2,
	    CANVAS3D: 3
	  },
	  
		/**
		 * The rendering component of the engine.
		 * 
		 * @name ex.display.Renderer
		 * 
		 * @param {Number} width
		 * @param {Number} height
		 * @param {String} bgColor hex value, eg #FFFFFF
		 * @param {Canvas} canvas DOM Canvas to render to
		 * 
		 * @property {Canvas} canvas
		 * @property {Context} context
		 * @property {ex.display.Renderable[]} renderables objects to render
		 */
		constructor: function (options) {
		  // Set dimensions and background color
		  this.width = options.width;
		  this.height = options.height;
		  this.bgColor = options.bgColor;
		  this.fullscreen = options.fullscreen;
		  this.fullscreenType = options.fullscreenType;
		  
		  this.renderables = [];
			this.renderingContext = null;
			this.type = options.context;
			
			// Setup the default renderers
			this.renderers = {
			  Sprite: new ex.display.rendering.SpriteRenderer(),
			  Rectangle: new ex.display.rendering.RectangleRenderer(),
			  Text: new ex.display.rendering.TextRenderer(),
			  AnimatedSprite: new ex.display.rendering.AnimatedSpriteRenderer(),
			  SpriteMap: new ex.display.rendering.SpriteMapRenderer()
			};
			
			this.setup(options.params);
		},
		
		/**
     * Initiate the rendering context depending on what type is passed in.
     * @param {Int} type The type of rendering.
     * @param {Object} params The parameters to pass into the context.
     */
    setup: function (params) {
      if(this.type == ex.display.rendering.Renderer.DOM) {
        this.renderingContext = 
          new ex.display.rendering.RenderingContextDom(this.width, this.height, this.renderers, params.el, this.bgColor);
      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
        this.renderingContext = 
          new ex.display.rendering.RenderingContext2dCanvas(this.width, this.height, this.renderers, params.canvas, this.bgColor);
      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
        this.renderingContext = 
          new ex.display.rendering.RenderingContext3dCanvas(this.width, this.height, this.renderers, params.canvas, this.bgColor);
      }
    },
    
    getRenderingElement: function () {
      if(this.renderingContext.el) {
        return this.renderingContext.el;
      } else if(this.renderingContext.canvas) {
        return this.renderingContext.canvas;
      }
      
      return null;
    },
    
    _resizeViewport: function() {
      if(this.type == ex.display.rendering.Renderer.DOM) {
        switch(this.fullscreenType) {
          case 'resize':
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.renderingContext.resizeViewport(this.width, this.height);
        }
      } else if (this.type == ex.display.rendering.Renderer.CANVAS2D) {
        switch(this.fullscreenType) {
          case 'resize':
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.renderingContext.resizeViewport(this.width, this.height);
            break;
          case 'scale':
            // Do nothing, CSS will auto scale it
            break;
        }
      } else if (this.type == ex.display.rendering.Renderer.CANVAS3D) {
        
      }
    },
		
		/**
		 * Sets up rendering for an object and adds it to the list of renderables.
		 * @param {Renderable} object The object to add to the rendering list.
		 */
		addRenderable: function (object) {
	    // Checking to see if a renderer exists for this object
	    if(!object.renderer && !this.renderers[object.type]) {
	      ex.Debug.log('There is no renderer setup for ' + object.type, 'ERROR');
	    }
	    
	    if(this.type == ex.display.rendering.Renderer.DOM) {
        if(!object.renderer) {
          this.renderers[object.type].setupDom.call(object, this.renderingContext.el);
        } else {
          object.renderer.setupDom.call(object, this.renderingContext.el);
        }
      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
        if(!object.renderer) {
          this.renderers[object.type].setup2dCanvas.call(object, this.renderingContext.canvas);
        } else {
          object.renderer.setup2dCanvas.call(object, this.renderingContext.canvas);
        }
      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
        if(!object.renderer) {
          this.renderers[object.type].setup3dCanvas.call(object, this.renderingContext.canvas);
        } else {
          object.renderer.setup3dCanvas.call(object, this.renderingContext.canvas);
        }
      }
      
      this.renderables.push(object);
		},
		
		/**
		 * Removes an object from the rendering list and calls destroy based on the rendering type.
		 * @param {Renderable} object The object to remove from the list.
		 */
		removeRenderable: function (object) {
		  // If this item has child items remove them, otherwise just
		  // remove the item itself.
		  if(object.items) {
		    var i = 0,
		        ln = object.items.length;
		    for(; i < ln; i++) {
		      this.removeRenderable(object.items[i]);
		    }
		  } else {
		    if(this.type == ex.display.rendering.Renderer.DOM) {
	        if(!object.renderer) {
	          this.renderers[object.type].destroyDom.call(object, this.renderingContext.el);
	        } else {
	          object.renderer.destroyDom.call(object, this.renderingContext.el);
	        }
	      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
	        if(!object.renderer) {
	          this.renderers[object.type].destroy2dCanvas.call(object, this.renderingContext.canvas);
	        } else {
	          object.renderer.destroy2dCanvas.call(object, this.renderingContext.canvas);
	        }
	      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
	        if(!object.renderer) {
	          this.renderers[object.type].destroy3dCanvas.call(object, this.renderingContext.canvas);
	        } else {
	          object.renderer.destroy3dCanvas.call(object, this.renderingContext.canvas);
	        }
	      }
	      
	      index = this.renderables.length;
	      while(index--) {
	        if(this.renderables[index] === object) {
	          this.renderables.splice(index, 1);
	        }
	      }
		  }
		},
		
		/**
		 * Called on every frame to update the screen.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.Renderer
		 * 
		 * @param {Number} dt 
		 * @param {ex.display.Camera} camera
		 */
		update: function (dt, camera) {
			this.renderingContext.render(this.renderables, camera.position.x, camera.position.y, camera.width, camera.height);
		}
	});
});(function() {
	ex.define("ex.base.GlobalComponent", {
	  __alias: "GlobalComponent",
	  
		__statics: {
			type: "GlobalComponent"
		}
	});
}());ex.using([
          
], function () {
  var mixer;
  
	ex.define("ex.sound.SoundMixer", {
		__statics: {
		  audio: [],
		  muted: false,
		  masterVolume: 1,
		  
		  registerAudio: function (audio) {
		    audio.volume = mixer.masterVolume;
		    audio.muted = mixer.muted;
		    mixer.audio.push(audio);
		  },
		  
		  unregisterAudio: function (audio) {
		    ex.Array.remove(mixer.audio, audio);
		  },
		  
		  setMasterVolume: function (volume) {
		    ex.Array.each(mixer.audio, function (audio, index) {
		      if(audio.volume > volume) audio.volume = volume;
		    });
		    
		    mixer.masterVolume = volume;
		  },
	    
	    muteAll: function () {
	      ex.Array.each(mixer.audio, function (channel, index) {
	        channel.muted = true;
	      });
	      
	      mixer.muted = true;
	    },
	    
	    unmuteAll: function () {
	      ex.Array.each(mixer.audio, function (channel, index) {
	        channel.muted = false;
	      });
	      
	      mixer.muted = false;
	    }
		}
	});
	
	mixer = ex.sound.SoundMixer;
});ex.using([
   'ex.sound.SoundMixer'
], function () {
  ex.define("ex.sound.Sound", {
    
    /**
     * A container class for sound objects.
     * 
     * @name ex.sound.Sound
     * 
     * @param {String} url address to the audio track
     * @param {Number} numChannels number of audio channels in the track
     * 
     * @property {Audio} audio
     * @property {Number} channels
     * @property {Object[]} readyChannels the channels that are ready
     *    to play.
     * @property {Boolean} ready true if audio track is finished loading.
     * 
     * @constructor
     */
    constructor: function (audio, options) {
      this.defaults = {
          volume: 1,
          endTime: Number.MAX_VALUE,
          loop: false,
          maxChannels: 10,
          preloadChannels: 1
      };
      
      this.options = ex.extend({}, this.defaults, true);
      ex.extend(this.options, options, true);
      
      this.audio = audio;
      this.audio.volume = this.options.volume;
      this.audio.loop = this.options.loop;
      
      this.channels = [];
      this.readyChannels = [];
      this.endedListeners = [];
      this.paused = false;
      this.volume = this.options.volume;
      
      var i = 0,
          ln = this.options.preloadChannels;
      for(; i != ln; i++) {
        this._generateAudioChannel();
      }
    },
    
    /**
     * Plays the audio track.
     * 
     * @function
     * @name play
     * @memberOf ex.sound.Sound
     */
    play: function (loop, channel) {
      var that = this,
          index,
          audio;
      
      if(this.paused) {
        this.paused = false;
        
        ex.Array.each(this.channels, function (channel, index) {
          if(channel.paused && channel.currentTime != channel.initialTime) that.play(channel.loop, index);
        });
      } else {
        if(ex.isNull(channel) == false) {
          index = channel;
        } else {
          if(this.readyChannels.length == 0) {
            this._generateAudioChannel();
          }
          
          index = this.readyChannels.shift();
        }
        
        audio = this.channels[index];
        
        if(!loop) {
          var checkEnded = ex.bind(this, this._onChannelEnded);
          ex.event.listen('ended', audio, checkEnded);
          this.endedListeners[index] = checkEnded;
        } else {
          audio.loop = loop;
        }
        
        audio.play();
      }
    },
    
    _onChannelEnded: function (event) {
      var index = event.target.__audioId;
      ex.event.unlisten('ended', event.target, this.endedListeners[index]);
      ex.event.unlisten('timeupdate', event.target, event.target.__updateHandler);
      this.endedListeners[index] = null;
      this.seek(event.target.initialTime, index);
      
      // Clean up channels if there more than we need.
      if(this.readyChannels.length > this.options.maxChannels) {
        this.destroyChannel(index);
      } else {
        this.readyChannels.push(index);
      }
    },
    
    pause: function (channel) {
      if(ex.isNull(channel) == false) {
        this.channels[i].pause();
      } else {
        var that = this;
        ex.Array.each(this.channels, function (channel, index) {
          if(channel.currentTime != channel.initialTime) {
            channel.pause();
            that.paused = true;
          }
        });
      }
    },
    
    setVolume: function (volume) {
      ex.Array.each(this.channels, function (channel, index) {
        channel.volume = volume;
      });
      
      this.volume = volume;
    },
    
    fadeOut: function (duration, callback) {
      this.fadeTo(0, duration, callback);
    },
    
    fadeTo: function (volume, duration, callback) {
      ex.Array.each(this.channels, function (channel, index) {
        ex.Tween.add(channel, duration, { volume: volume }, { callback: callback });
      });
    },
    
    fadeIn: function (duration, callback) {
      this.fadeTo(1, duration, callback);
    },
    
    _generateAudioChannel: function () {
      this.readyChannels.push(this.channels.push(this.audio.cloneNode(true)) - 1);
      
      var channel = this.channels[this.channels.length - 1];
      ex.sound.SoundMixer.registerAudio(channel);
      channel.volume = this.volume;
      channel.__audioId = this.channels.length - 1;
      channel.__updateHandler = ex.bind(this, this.__onTimeUpdate);
      
      ex.event.listen('timeupdate', channel, channel.__updateHandler);
    },
    
    __onTimeUpdate: function (event) {
      var audio = event.target;
      if(audio.currentTime >= this.options.endTime) {
        if(audio.loop == true) {
          this.seek(audio.initialTime, audio.__audioId);
        } else {
          this.stop(audio.__audioId);
        }
      }
    },
    
    seek: function (time, channel) {
      try {
        if(ex.isNull(channel) == false) {
          this.channels[channel].currentTime = time;
        } else {
          ex.Array.each(this.channels, function (channel, i) {
            channel.currentTime = time;
          });
        }
      } catch (e) {
        // Minor hack because the audio api is still buggy in browsers.
      }
    },
    
    /**
     * Stops audio playback.
     * 
     * @function
     * @name stop
     * @memberOf ex.sound.Sound
     */
    stop: function (channel) {
      if(ex.isNull(channel) == false) {
        var audio = this.channels[channel];
        audio.pause();
        audio.loop = false;
        this.seek(audio.initialTime, channel);
        this._onChannelEnded({ target: audio });
      } else {
        var that = this;
        ex.Array.each(this.channels, function (channel, index) {
          that.stop(index);
        });
      }
    },
    
    destroyChannel: function (channel) {
      var audio = this.channels[channel];
      audio.pause();
      ex.sound.SoundMixer.unregisterAudio(this.channels[i]);
      ex.Array.remove(this.channels, channel);
      this.channels[channel] = null;
    },
    
    destroy: function () {
      this.stop();
      
      ex.Array.each(this.channels, function (channel, index) {
        this.destroyChannel(index);
      });
      
      delete this.channels;
      delete this.readyChannels;
      delete this.audio;
    }
  });
});(function () {
	ex.define("ex.util.Logger", {
		__statics: {
			MAX_LENGTH: 300,
			LEVEL: {
				ALL: 5,
				DEBUG: 4,
				INFO: 3,
				ERROR: 2,
				NONE: 1
			}
		},
		
		constructor: function(loggingType, level) {
			this.loggingType = loggingType;
			this.loggingLevel = level || 3;
			this.defaultLoggingLevel = 4;
			this.textLog = "--Logger Enabled <br />";
			this.logs = [];
			
			for(var i = 0; i < 6; i++) {
				this.logs[i] = [];
			}
		},
		
		enableDOM: function (loggingElement) {
			this.loggingElement = loggingElement;
			this.loggingType = ex.util.Debug.DOM;
		},
		
		log: function(message, level) {
			level = level || this.defaultLoggingLevel;
			this.logs[level].push({
				message: message,
				date: new Date().getTime()
			});
			
			if(this.loggingLevel >= level) {
				this.textLog += "- " + message + "<br />";
				if(this.loggingType == ex.util.Debug.BROWSER) {
					console.log(message);
				} else if(this.loggingType == ex.util.Debug.DOM) {
					this.textLog = this.textLog.substring(this.textLog.length - ex.util.Logger.MAX_LENGTH, this.textLog.length);
					this.loggingElement.innerHTML = this.textLog;
				}
			}
		}
	});
}());
ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Logger'
], function() {
	// Local private
	var timeLog = {};
	
	ex.define("ex.util.Debug", ex.base.GlobalComponent, {
		__alias: 'ex.Debug',
	  
		__statics: {
			componentName: 'Debug',
			
			DOM: 0,
			BROWSER: 1,
			
			_enabled: false,
			_loggingLevel: 5,
			logTime: 3,
			logger: new ex.util.Logger(ex.util.Logger.BROWSER),
			
			enable: function (loggingType, loggingLevel) {
				ex.util.Debug._enabled = true;
				ex.util.Debug._createDebugWindow();
				
				if(loggingType == ex.util.Debug.DOM) {
				  ex.util.Debug.logger.enableDOM(ex.util.Debug.loggerElement);
				  this.domElement.style.display = 'inherit';
				}
				
				ex.util.Debug.logger.loggingType = loggingType;
				ex.util.Debug.logger.loggingLevel = loggingLevel;
			},
			
			// Time tracking
			time: function (name, instant) {
				var time = timeLog[name];
				if(time == null) {
					time = {
						currentTime: null,
						timer: new Date(),
						log: []
					};
					timeLog[name] = time;
				}
				
				if(time.currentTime == null) {
					time.currentTime = new Date();
				} else {
					var endTime = new Date(),
						ms = endTime - time.currentTime;
					
					time.log.push(ms);
					if(time.log.length > 5) {
						time.log.pop();
					}
					
					if(endTime - time.timer > ex.util.Debug.logTime * 1000 || instant == true) {
						ex.util.Debug.log('Time[' + name + ']: ' + ex.Array.average(time.log) + 'ms', ex.util.Logger.LEVEL.DEBUG);
						time.timer = endTime;
					}
					
					time.currentTime = null;
				}
			},
			
			log: function (message, loggingLevel) {
			  ex.util.Debug.logger.log(message, ex.util.Logger.LEVEL[loggingLevel]);
			},
			
			benchmarkEngine: function (dt) {
				if(this._enabled == false){
					return;
				}
				
				var debug = ex.util.Debug;
				
				debug.logged.push(dt);
				if(debug.logged.length > 20) {
					debug.logged.shift();
				}
				var ms = ex.Array.average(debug.logged);
				
				var fps = Math.floor(1 / ms);
				
				debug.benchmarkElement.innerHTML = "<b>" + fps + " fps </b>";
				debug.benchmarkElement.innerHTML += " | " + Math.floor(ms * 1000) + " ms";
			},
			
			_createDebugWindow: function () {
				var debug = ex.util.Debug;
				debug.domElement = document.createElement("div");
				debug.domElement.id = "debug";
				debug.domElement.style.backgroundColor = "#222526";
				debug.domElement.style.opacity = "0.9";
				debug.domElement.style.border = "1px solid #ffbb6e";
				debug.domElement.style.color = "#f28d00";
				debug.domElement.style.fontSize = "10pt";
				debug.domElement.style.position = "fixed";
				debug.domElement.style.bottom = "5px";
				debug.domElement.style.right = "5px";
				debug.domElement.style.padding = "5px";
				
				debug.benchmarkElement = document.createElement('div');
				debug.domElement.appendChild(debug.benchmarkElement);
				
				debug.logged = [];
				
				//--Create logger box
				debug.loggerElement = document.createElement("div");
				debug.loggerElement.style.backgroundColor = "#111111";
				debug.loggerElement.style.padding = "5px";
				debug.loggerElement.style.color = "#FFFFFF";
				debug.loggerElement.style.maxHeight = "150px";
				debug.loggerElement.style.maxWidth = "200px";
				debug.loggerElement.style.overflow = "auto";
				
				debug.writeLog = document.createElement("input");
				debug.writeLog.type = "checkbox";
				debug.writeLog.name = "writeLog";
				debug.writeLog.value = "logger";
				debug.writeLog.checked = "checked";
				debug.writeLog.id = "writeLog";
				debug.domElement.appendChild(debug.writeLog);
				debug.domElement.appendChild(debug.loggerElement);
				
				debug.domElement.style.display = 'none';
				document.body.appendChild(debug.domElement);
			}
		}
	});
});
ex.using([
    'ex.base.GlobalComponent',
    'ex.sound.Sound',
    'ex.event.EventTarget',
    'ex.util.Debug'
],function () {
  ex.define("ex.util.AssetManager", ex.base.GlobalComponent, {
    __alias: 'ex.Assets',
    
    /**
     * The global asset manager, loads and retrieves audio, video, 
     * and image files.
     * 
     * @name ex.Assets
     * @class
     */
    __statics: {
      _audio: {
        numAssets: 0
      },
      _video: {
        numAssets: 0
      },
      _images: {
        numAssets: 0
      },
      _files: {
        numAssets: 0
      },
      _ready: true,
      _eventHandler: new ex.event.EventTarget(),
      _assetsToLoad: 0,
      _assetsLoaded: 0,
  
      _supportedExtensions: {
        video: [
            // MP4 (Chrome, IE9, Safari, iOS, Android)
            '.mp4', '.m4v', '.f4v', '.mov',
            // WebM (FF, Chrome, Opera)
            '.webm',
            // Vorbis (FF, Chrome, Opera)
            '.ogv'
            ],
        audio: [
            // AAC (Chrome, IE9, Safari, iOS, Android)
            '.aac', '.m4a', '.f4a',
            // Vorbis (FF, Chrome, Opera, Android)
            '.ogg', '.oga',
            // MP3 (Chrome, IE9, Safari, iOS, Android)
            '.mp3'
            ],
        image: [
            // Full Support
            '.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi',
            '.png',
            '.gif',
            '.bmp', '.dib'
            ]
      },
      
      /**
       * Retrieves an audio file by name from the asset manager.
       * 
       * @function
       * @name getAudio
       * @memberOf ex.Assets
       * 
       * @param {String} name
       * @returns {ex.sound.Sound} audio file or null with error
       */
      getAudio: function(name) {
        return this._audio[name] || 
          this._throwAssetDoesNotExistError(name, 'audio');
      },
      
      /**
       * Retrieves a video file by name from the asset manager.
       * 
       * @function
       * @name getVideo
       * @memberof ex.Assets
       * 
       * @param {String} name
       * @returns {Boolean}
       */
      getVideo: function(name) {
        return this._video[name] || 
          this._throwAssetDoesNotExistError(name, 'video');
      },
      
      /**
       * Retrieves an image file by name from the asset manager.
       * 
       * @function
       * @name getImage
       * @memberOf ex.Assets
       * 
       * @param {String} name
       * @returns {Image} image file or null with error
       */
      getImage: function(name) {
        if(!this._ready){
          this._throwImageNotReadyError(name);
        }
        return this._images[name] || 
          this._throwAssetDoesNotExistError(name, 'image');
      },
      
      getFile: function (name) {
        if(!this._ready) {
          this._throwFileNotReadyError(name);
        }
        return this._files[name] ||
          this._throwAssetDoesNotExistError(name, 'file');
      },
      
      /**
       * Loads a file from the file system and adds it to the
       * asset manager.
       * 
       * @function
       * @name load
       * @memberOf ex.Assets
       * 
       * @param {String} name name used to retrieve asset once loaded
       * @param {String} filePath path to the asset in the file system
       * @param {Object} [options] extra parameters, varies
       *    by asset type.
       */
      load: function (name, filePath, options, bulkLoading) {
        if(this._ready == true) {
          this._eventHandler.dispatchEvent('loadStart');
        }
        
        if(bulkLoading != true) {
          this._assetsToLoad++;
        }
        
        // Determine file type and use proper loading method
        var extension = filePath.substring(filePath.lastIndexOf('.'));
        if(this._supportedExtensions.image.indexOf(extension) > -1) {
          this._loadImage(name, filePath, options);
        } else if (this._supportedExtensions.audio.indexOf(extension) > -1) {
          this._loadAudio(name, filePath, options);
        } else if (this._supportedExtensions.video.indexOf(extension) > -1) {
          this._loadVideo(name, filePath, options);
        } else {
          this._loadFile(name, filePath, options);
          // Technically if we add the "File" type we can load anything into text format.
          //this._throwFileTypeNotSupportedError(name, filePath, extension);
        }
      },
      
      /**
       * Loads a collection of files from the file system and adds
       * them to the asset manager.
       * 
       * @function
       * @name loadBulk
       * @memberOf ex.Assets
       * 
       * @param {Array} list each item is formatted as {name, filePath, options}
       */
      loadBulk: function(list){
        if(this._ready == true) {
          this._ready = false;
          this._eventHandler.dispatchEvent('loadStart');
        }
        
        this._assetsToLoad += list.length;
        
        var index = list.length;
        while(index--){
          this.load(list[index].name, list[index].filePath, list[index].options, true);
        }
      },
      
      _loadFile: function (name, filePath, options) {
        this._ready = false;
        
        var that = this;
        
        function completeAsset(asset) {
          that._assetsLoaded++;
          that._eventHandler.dispatchEvent('assetLoaded', asset);
          that._debugOnAssetLoaded(asset);
          that._checkReadyState();
        };
        
        if(this._files[name]) {
          var asset = this._files[name];
          completeAsset(asset);
          return;
        }
        
        this._files[name] = {};
        
        // Load the file using AJAX
        var that = this;
        ex.Loader.ajax(filePath, {}, function (data) {
          if(filePath.substr(filePath.length - 3) == 'exf') data = JSON.parse(data);
          that._files[name] = data;
          that._files.numAssets++;
          completeAsset(that._files[name]);
        });
      },
      
      _loadImage: function(name, filePath, options) {
        this._ready = false;
        
        if(this._images[name]) {
          this._throwImageNameConflictError(name, filePath);
          this._assetsLoaded++;
          this._checkReadyState();
          return;
        }
        
        this._images[name] = new Image();
        
        var that = this;
        this._images[name].onError = this._throwUnableToLoadFileError;
        this._images[name].onload = function () {
          var asset = {type: 'Image', name: name, filePath: filePath, options: options};
          that._assetsLoaded++;
          that._images.numAssets++;
          that._eventHandler.dispatchEvent('assetLoaded', asset);
          that._debugOnAssetLoaded(asset);
          that._checkReadyState();
        };
        
        this._images[name].src = '';
        this._images[name].src = filePath;
      },
      
      _loadAudio: function(name, filePath, options) {
        var audio = new Audio();
        var that = this;
        
        this._ready = false;
        
        audio.onError = this._throwUnableToLoadFileError;
        audio.src = filePath;
        audio.addEventListener('canplaythrough', function (event) {
          var asset = {type: 'Audio', name: name, filePath: filePath, options: options};
          that._eventHandler.dispatchEvent('assetLoaded',  asset);
          that._debugOnAssetLoaded(asset);
          that._assetsLoaded++;
          that._audio.numAssets++;
          that._checkReadyState();
        });
        
        this._audio[name] = audio;
      },
      
      _loadVideo: function(name, filePath, options) {
        this._throwVideoNotSupportedError();
      },
      
      _checkReadyState: function() {
        if(this._assetsLoaded == this._assetsToLoad && this._ready == false) {
          this._ready = true;
          this._eventHandler.dispatchEvent('loadEnd');
          this._debugAssetCount();
        }
      },
      
      /*
       * DEBUG LOGGING
       */
      
      _debugAssetCount: function() {
        ex.Debug.log(
            'Total Assets: ' + this._assetsLoaded +
            ' | Audio: ' + this._audio.numAssets + 
            ' | Image: ' + this._images.numAssets + 
            ' | Video: ' + this._video.numAssets +
            ' | File: ' + this._files.numAssets,
            'INFO');
      },
      
      _debugOnAssetLoaded: function(asset) {
        ex.Debug.log(
            'Asset Loaded: ' + asset.type + ' | ' + asset.name + ' | "' +
            asset.filePath + '" | ' + asset.options,
            'INFO');
      },
      
      /*  
       * ERROR LOGGING
       */
      
      _throwAssetDoesNotExistError: function(name, type) {
        ex.Debug.log(
          "The " + type + " file '" + name + "' does not exist. Maybe you forgot to load it.", 
          'ERROR');
      },
      
      _throwUnableToLoadFileError: function(filePath) {
        ex.Debug.log(
            "An error occured while loading the file at '" + filePath + "'.",
            'ERROR');
      },
      
      _throwFileTypeNotSupportedError: function(name, filePath, extension) {
        ex.Debug.log(
          'Not loading  "' + name + '" from "' + filePath + 
          '" because the extension "' + extension + '" is not supported.',
          'ERROR');
      },
      
      _throwVideoNotSupportedError: function() {
        ex.Debug.log("Sorry, video is not supported in this version of the engine.",
            'ERROR');
      },
      
      _throwImageNameConflictError: function(name, filePath) {
        ex.Debug.log(
            'An image by the name "' + name + '" already exists. Not loading "' + filePath + '".',
            'INFO');
      },
      
      _throwImageNotReadyError: function(name) {
        ex.Debug.log(
            "Retrieved image " + name + ", but it has not finished loading.",
            'INFO');
      },
      
      _throwFileNotReadyError: function(name) {
        ex.Debug.log(
            "Retrieved file " + name + ", but it has not finished loading.",
            'INFO');
      }
    }
  });
});(function () {
	ex.define("ex.util.Key", {
	  __alias: 'ex.Key',
	  
		__statics: {
		  LMB: 0,     //// Chrome mouse button values.
		  MMB: 1,     // We will have to synthesize these values
		  RMB: 2,     // to be cross-browser compliant.
		  
		  Backspace:	 8,
		  Tab:			   9,
		  Enter:		  13,
		  Shift:		  16,
		  Control:	  17,
		  PauseBreak:	19,
		  CapsLock:	  20,
		  Esc:			  27,
		  Spacebar:	  32,
		  PageUp:		  33,
		  PageDown:	  34,
		  End:			  35,
		  Home:			  36,
		  Left:			  37,
		  Up: 			  38,
		  Right:		  39,
		  Down:			  40,
		  Insert:		  45,
		  Delete:		  46,
		  
		  Keyb0: 		48,
		  Keyb1: 		49,
		  Keyb2: 		50,
		  Keyb3: 		51,
		  Keyb4: 		52,
		  Keyb5: 		53,
		  Keyb6: 		54,
		  Keyb7: 		55,
		  Keyb8: 		56,
		  Keyb9: 		57,
		  
		  A: 			              65,
		  B: 			              66,
		  C: 			              67,
		  D: 			              68,
		  E: 			              69,
		  F: 			              70,
		  G: 			              71,
		  H: 			              72,
		  I: 			              73,
		  J: 			              74,
		  K: 									  75,
		  L: 									  76,
		  M: 									  77,
		  N: 									  78,
		  O: 									  79,
		  P: 									  80,
		  Q: 									  81,
		  R: 									  82,
		  S: 									  83,
		  T: 									  84,
		  U: 									  85,
		  V: 									  86,
		  W: 									  87,
		  X: 									  88,
		  Y: 									  89,
		  Z: 									  90,
		  
		  Numpad0: 							96,
		  Numpad1: 							97,
		  Numpad2: 							98,
		  Numpad3: 							99,
		  Numpad4: 							100,
		  Numpad5: 							101,
		  Numpad6: 							102,
		  Numpad7: 							103,
		  Numpad8: 							104,
		  Numpad9: 							105,
		  NumpadStar:						106,
		  NumpadPlus:						107,
		  NumpadMinus:					109,
		  NumpadPeriod:					110,
		  NumpadSlash:					111,
		  
		  F1:							    	112,
		  F2:							  		113,
		  F3:						   			114,
		  F4:						   			115,
		  F5:						   			116,
		  F6:								   	117,
		  F7:									  118,
		  F8:									  119,
		  F9:									  120,
		  F10:                  121,
		  F11: 								  122,
		  F12: 								  123,
		  F13: 								  124,
		  F14:								  125,
		  F15:								  126,
		  
		  NumLck:								144,
		  ScrLck:								145,
		  
		  SemiColon:						186,
		  Equal:								187,
		  Comma:								188,
		  Minus:								189,
		  Period:								190,
		  Question:							191,
		  BackQuote:						192,

		  LeftBrace:						219,
		  Pipe:								  220,
		  RightBrace:						221,
		  SingleQuote:					222
		}
	});
}());
ex.using([
  'ex.base.GlobalComponent',
  'ex.base.Vector',
  'ex.util.Key'
], function() {
	ex.define("ex.util.Input", ex.base.GlobalComponent, {
	  __alias: 'ex.Input',
	  
	  __statics: {
	    // Constants.
	    CURSOR: {
	      AUTO: 'auto',
	      POINTER: 'pointer',
	      CROSSHAIR: 'crosshair'
	    },
	    
	    _keyListenerElement: document,
	    _inputTarget: document,
	    
	    // Keeping the current and previous state allows us to detect
	    // all forms of input. (pressed, released, down)
	    mouse: new ex.Vector(0, 0),
	    _inputState: {},
	    _previousState: {},
	    _released: [],
	    
	    update: function(dt) {
	      // Set the new state and then update the current state.
	      ex.extend(this._previousState, this._inputState);
	      
	      var i = 0,
	          ln = this._released.length;
	      for(; i < ln; i++) {
	        this._inputState[this._released[i]] = false;
	      }
	      this._released = [];
	    },
	    
	    /**
	     * Checks if the button is pressed or held down.
	     * @param {String} key The button to check.
	     */
	    isDown: function (key) {
	      if(key.charAt && key.charAt(0) != '#') key = ex.util.Key[key];
	      return this._inputState[key];
	    },
	    
	    /**
	     * Checks if the button was just pressed.
	     * @param {String} key The button to check.
	     */
	    isPressed: function (key) {
	      if(key.charAt && key.charAt(0) != '#') key = ex.util.Key[key];
	      return this._inputState[key] == true && (this._previousState[key] == false || this._previousState[key] == null);
	    },
	    
	    /**
	     * Checks if the button was just released.
	     * @param {String} key The button to check.
	     */
	    isReleased: function (key) {
	      if(key.charAt && key.charAt(0) != '#') key = ex.util.Key[key];
	      return this._inputState[key] == false && this._previousState[key] == true;
	    },
	    
	    /**
	     * Changes the target for the mouse listeners and mouse position calculations.
	     * The mouse x and y are based off the top left corner of the inputElement it
	     * is listening to.
	     */
	    changeInputTarget: function(element) {
	      this._removeEventListenersFromInput();
	      if(!element) {
	        ex.Debug.log('"Element" can not be null in ex.Input.changeInputTarget. Defaulting to document.', 'WARNING');
	        element = document;
	      }
	      this._inputTarget = element;
	      this._addEventListenersOnInput();
	    },
	    
	    bindElement: function (downEvent, upEvent, elementId) {
	      elementId = elementId.substr(1);
	      var element = ex.Element.getById(elementId);
	      ex.event.listen(downEvent, element, this._onElementDown);
	      ex.event.listen(upEvent, element, this._onElementUp);
	    },
	    
	    _onElementDown: function (event) {
	      ex.Input._inputState['#' + event.target.id] = true;
	    },
	    
	    _onElementUp: function (event) {
	      ex.Input._released.push('#' + event.target.id);
	    },
	    
	    unbindElement: function (downEvent, upEvent, elementId) {
	      delete ex.Input._inputState[elementId];
	      delete ex.Input._previousState[elementId];
	      elementId = elementId.substr(1);
	      var element = ex.Element.getById(elementId);
	      ex.event.unlisten(downEvent, element, this._onElementDown);
        ex.event.unlisten(upEvent, element, this._onElementUp);
	    },
	    
	    _addEventListenersOnInput: function() {
	      ex.event.listen('keydown', this._keyListenerElement, this._onKeyDown);
	      ex.event.listen('keyup', this._keyListenerElement, this._onKeyUp);
	      ex.event.listen('mousedown', this._inputTarget, this._onMouseDown);
	      ex.event.listen('mouseup', this._inputTarget, this._onMouseUp);
	      ex.event.listen('mousemove', this._inputTarget, this._onMouseMove);
	    },
	    
	    _removeEventListenersFromInput: function() {
	      ex.event.unlisten('keydown', this._keyListenerElement, this._onKeyDown);
        ex.event.unlisten('keyup', this._keyListenerElement, this._onKeyUp);
        ex.event.unlisten('mousedown', this._inputTarget, this._onMouseDown);
        ex.event.unlisten('mouseup', this._inputTarget, this._onMouseUp);
        ex.event.unlisten('mousemove', this._inputTarget, this._onMouseMove);
	    },
	    
	    _onKeyDown: function(event) {
        ex.Input._inputState[event.keyCode] = true;
	    },
	    
	    _onKeyUp: function(event) {
        ex.Input._released.push(event.keyCode);
      },
	    
	    _onMouseDown: function(event) {
	      ex.Input._inputState[event.button] = true;
	    },
	    
	    _onMouseUp: function(event) {
	      ex.Input._released.push(event.button);
	    },
	    
	    _onMouseMove: function(event) {
        // Update current mouse position
        ex.Input.mouse.x = event.clientX;
        ex.Input.mouse.y = event.clientY;
        
        if(ex.Input._inputTarget.offsetLeft && ex.Input._inputTarget.offsetTop) {
          ex.Input.mouse.x -= ex.Input._inputTarget.offsetLeft;
          ex.Input.mouse.y -= ex.Input._inputTarget.offsetTop;
        }
	    },
	    
	    /**
       * Changes the style of the cursor.
       */
      changeCursor: function (type) {
        if(ex.Input._inputTarget.style.cursor != type)
            ex.Input._inputTarget.style.cursor = type;
      },
      
      /**
       * Gets the current style of the cursor.
       */
      getCursorType: function () {
        return ex.Input._inputTarget.style.cursor;
      },
		}
	});
});ex.using([

], function () {
  ex.define('ex.base.WorldComponent', {
    constructor: function (renderer, options) {
      
    },
    
    addObject: function (object) {
      
    },
    
    update: function (dt) {
      
    },
    
    removeObject: function (object) {
      
    },
    
    debug: function (dt, camera) {
      
    },
    
    destroy: function () {
      
    }
  });
});ex.using([
  'ex.base.WorldComponent',
  'ex.event.EventTarget'
], function() {
  ex.define("ex.world.World", ex.event.EventTarget, {
    
    /**
     * The world object contains all the relevant game data such as
     * levels, menus, and entities.
     * 
     * @name ex.world.World
     * 
     * @param {ex.display.Renderer} renderer the renderer to call
     *    to render each frame
     * @param {ex.util.CollisionManager} collisionManager the collision
     *    manager to use on the world
     * 
     * @property {ex.display.Renderer} renderer
     * @property {ex.simplex.Map[]} levels all levels in the world
     * @property {Object[]} objects all objects in the current scene
     * @property {Object[]} globalobjects all objects that persist 
     *    between scenes
     * 
     * @constructor
     */
    constructor: function(name, renderer, options) {
      this.name = name;
      this.active = true;
      this.renderer = renderer;
      this.components = [];
      this.objects = [];
      this.globalObjects = [];
      this.objectsToRemove = [];
      
      this.options = options;
      this.options.componentConfig = this.options.componentConfig || [];
      
      var i = 0,
          ln = options.components.length,
          component;
      for(; i != ln; i++) {
        component = new options.components[i](this.renderer, this.options.componentConfig[i]);
        if(component instanceof ex.base.WorldComponent) {
          this.components.push(component);
        } else {
          ex.Debug.log('Component must be an instance of ex.base.WorldComponent: ' + component, 'ERROR');
        }
      }
      
      this._super('constructor');
    },
    
    /**
     * Updates all levels and objects.
     * 
     * @function
     * @name update
     * @memberOf ex.world.World
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
      if(this.active == false) {
        return;
      }
      
      // Remove old objects
      var n = this.objectsToRemove.length;
      while(n--) {
        this._removeObject(this.objectsToRemove.pop());
      }
      
      // update objects
      var i = 0,
          ln = this.objects.length;
      for(; i != ln; i++) {
        this.objects[i].update(dt);
      }
      
      //--Step components
      i = 0;
      ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].update(dt);
      }
    },
    
    /**
     * Called after the engine has drawn the game to the screen
     * for any debug drawing of entities, collision objects,
     * triggers, etc.
     */
    debug: function (dt, camera) {
      i = 0;
      ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].debug(dt, camera);
      }
    },
    
    /**
     * Adds an object to the world by direct reference.
     * 
     * @function
     * @name addObject
     * @memberOf ex.world.World
     * 
     * @param {Object} object
     */
    addObject: function(object, recursive) {
      if(!recursive) {
        this.objects.push(object);
      }
      
      if(object instanceof ex.display.Renderable) {
        this.renderer.addRenderable(object);
      }
      
      var i = 0,
          ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].addObject(object);
      }
      
      if(object.items) {
        i = 0;
        ln = object.items.length;
        for(; i != ln; i++) {
          this.addObject(object.items[i], true);
        }
      }
    },
    
    /**
     * Adds a list of objects to the world using the addObject function
     * on each item in the list.
     * 
     * @function
     * @name addObjects
     * @memberOf ex.world.World
     * 
     * @param {Object[]} objects
     */
    addObjects: function(objects) {
      var index = objects.length;
      while(index--){
        this.addObject(objects[index]);
      }
    },
    
    /**
     * Removes an object from the world by direct reference.
     * 
     * @function
     * @name removeObject
     * @memberOf ex.world.World
     * 
     * @param {Object} object
     */
    removeObject: function(object) {
      // Tag the object for removal on the next update loop.
      this.objectsToRemove.push(object);
    },
    
    _removeObject: function (object, recursive) {
      if(!recursive) ex.Array.remove(this.objects, object);
      
      // Remove object from renderer and collisionManager
      if(object instanceof ex.display.Renderable) {
        this.renderer.removeRenderable(object);
      }
      
      var i = 0,
          ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].removeObject(object);
      }
      
      if(object.items) {
        i = 0;
        ln = object.items.length;
        for(; i != ln; i++) {
          this._removeObject(object.items[i], true);
        }
      }
      
      if(object.destroy) {
        object.destroy();
      }
    },
    
    /**
     * Removes all objects from the world. Generally only called
     * during scene desctruction.
     * 
     * @function
     * @name removeAllObjects
     * @memberOf ex.world.World
     * 
     */
    removeAllObjects: function() {
      var index = this.objects.length;
      while(index--) {
        this._removeObject(this.objects[index]);
      }
    },
    
    show: function() {
      var that = this;
      
      function addRenderable(object) {
        if(object instanceof ex.display.Renderable) {
          that.renderer.addRenderable(object);
        }
        
        if(object.items) {
          ex.Array.each(object.items, addRenderable);
        }
      }
      
      ex.Array.each(this.objects, addRenderable);
      
      this.hidden = false;
      
      this.dispatchEvent('show');
    },
    
    hide: function() {
      var that = this;
      
      function removeRenderable(object) {
        if(object instanceof ex.display.Renderable) {
          that.renderer.removeRenderable(object);
        }
        
        if(object.items) {
          ex.Array.each(object.items, removeRenderable);
        }
      }
      
      ex.Array.each(this.objects, removeRenderable);
      
      this.hidden = true;
      
      this.dispatchEvent('hide');
    },
    
    pause: function () {
      this.active = false;
      
      this.dispatchEvent('pause');
    },
    
    unpause: function () {
      this.active = true;
      
      this.dispatchEvent('unpause');
    },
    
    getObject: function(name) {
      var index = this.objects.length;
      while(index--){
        if(this.objects[index].name === name){
          return this.objects[index];
        }
      }
      return null;
    },
    
    destroy: function() {
      var i = 0,
          ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].destroy();
      }
      
      this.active = false;
      this.removeAllObjects();
      delete this.renderer;
      delete this.objects;
      delete this.globalObjects;
      delete this.objectsToRemove;
    }
  });
});ex.using([
  "ex.base.Component",
  "ex.base.Point",
  "ex.util.Debug",
  "ex.util.AssetManager",
  "ex.util.Input",
  "ex.display.ImageRepository",
  "ex.display.Renderable",
  "ex.display.Camera",
  "ex.display.rendering.Renderer",
  "ex.world.World"
], function () {
  
  var requestAnimationFrame = 
        window.requestAnimationFrame 
        || window.mozRequestAnimationFrame 
        || window.webkitRequestAnimationFrame 
        || window.msRequestAnimationFrame
        || function (callback) {
             setTimeout(callback, (1/30) * 1000);
           };
  
  var MAX_FRAME_TIME = 5;
	
	ex.define("ex.Engine", {
		/**
		 * The base engine class for loading games and drawing to the canvas
		 * @name ex.Engine
		 * 
		 * @param {Int} width The width of the canvas
		 * @param {Int} height The height of the canvas
		 * @param {Int} frameRate The frame rate of the game
		 * @constructor
		 */
		constructor: function (options) {
			//--Fail if canvas is not supported
			if(!document.createElement("canvas").getContext) {
			  ex.Debug.log("Your browser does not support canvas!");
			  return;
			}
			
			this.defaults = {
		    rendering: {
		      width: 500,
		      height: 500,
		      frameRate: 60,
		      bgColor: '#000',
		      fullscreen: false,
		      fullscreenType: 'resize',
		      context: ex.display.rendering.Renderer.CANVAS2D,
		      params: { canvas: null }
		    },
		    loadingScreen: null,
		    debug: {
		      enabled: false,
		      type: ex.Debug.DOM,
		      level: ex.util.Logger.LEVEL.ALL
		    },
		    components: [],
			  world: {
			    components: []
			  }  
			};
			
			this.options = ex.extend({}, this.defaults, true);
			ex.extend(this.options, options, true);
			
			//--Public
			this.deltaTime = 1 / this.options.rendering.frameRate;
			this.currentWorld = null;
			this.worlds = [];
			this.worldsToRemove = [];
			this.lastTime = (new Date()).getTime();
			
			// Debugging
			if(this.options.debug.enabled) {
			  this.enableDebugging(this.options.debug.type, this.options.debug.level);
			}
			
			// Components
			this.components = [];
			var i = 0,
			    ln = this.options.components.length;
			for(; i != ln; i++) {
			  this.loadComponent(new this.options.components[i]());
			}
			
			//--Load new camera
			this.camera = new ex.display.Camera(
					new ex.base.Point(0,0),
					this.options.rendering.width,
					this.options.rendering.height);
			
			//--Load renderer
			this.renderer = new ex.display.rendering.Renderer(this.options.rendering);
			
			// Switch input to focus on the main game element.
			ex.Input.changeInputTarget(this.renderer.getRenderingElement());
			
			if(this.fullscreen) {
        this._setupFullscreenViewport();
      }
			
			//--Setup update interval
			//var _gameInterval = setInterval(ex.bind(this, this.update), (1 / this.options.rendering.frameRate) * 1000);
			requestAnimationFrame(ex.bind(this, this.update));
		},
		
		_setupFullscreenViewport: function() {
		  this._resizeViewport();
		  ex.event.listen('resize', window, ex.bind(this, this._resizeViewport), true);
		},
		
		_resizeViewport: function() {
		  this.renderer._resizeViewport();
		  this.camera.width = this.renderer.width;
		  this.camera.height = this.renderer.height;
		},
		
		enableDebugging: function(debugType, loggingLevel) {
			this.options.debug = true;
			ex.Debug.enable(debugType, loggingLevel);
		},
		
		update: function () {
		  ex.Debug.time('engine');
		  
			//--Calculate delta time
			var newTime = (new Date()).getTime();
			var dt = newTime - this.lastTime;
			dt /= 1000;
			var frameTime = dt;
			this.lastTime = newTime;
			
			// Limit frame time to avoid spiral of death.
			if(frameTime > MAX_FRAME_TIME) frameTime = MAX_FRAME_TIME;
			
			while(frameTime > 0) {
			  var deltaTime = Math.min(frameTime, this.deltaTime);
			  this.integrate(deltaTime);
			  frameTime -= this.deltaTime;
			}
			
			this.render(dt);
			
			requestAnimationFrame(ex.bind(this, this.update));
			
			if(this.debug){
				ex.Debug.benchmarkEngine(dt);
			}
			
			ex.Debug.time('engine');
		},
		
		integrate: function (dt) {
		  // Garbage collect old worlds for stability.
		  var i = 0,
		      ln = this.worldsToRemove.length;
		  for(; i < ln; i++) {
		    this._removeWorld(this.worldsToRemove.pop());
		  }
		  
		  //--Step components
      i = this.components.length;
      while(i--) {
        this.components[i].update(dt);
      }
      
      //--Step world 
      i = 0;
      ln = this.worlds.length;
      for(; i < ln; i++) {
        this.worlds[i].update(dt);
      }
      
      ex.Input.update(dt);
      
      if(this.onUpdate) {
        this.onUpdate(dt);
      }
		},
		
		render: function (dt) {
      var that = this;
      
      ex.Debug.time('render');
      
      //--Step camera
      this.camera.update(dt);
      
      //--Step renderer
      if(this.renderer != null) {
        that.renderer.update(dt, that.camera);
        
        // Use request animation frame to vsync drawing calls.
        /*requestAnimationFrame(function () {
          
        });*/
      }
      
      ex.Debug.time('render');
      
      var i = 0,
          ln = this.worlds.length;
      for(; i < ln; i++) {
        this.worlds[i].debug(dt, this.camera);
      }
		},
		
		onUpdate: function() {
			
		},
		
		addWorld: function (name, scene, setToCurrentWorld, sceneCallback) {
		  // Default values
		  name = name || "DefaultWorldName";
		  if(!setToCurrentWorld && setToCurrentWorld != false) setToCurrentWorld = true;
		  
		  var world = new ex.world.World(name, this.renderer, this.options.world);
		  
		  // Check for removing current world.
		  if(setToCurrentWorld == true) {
		    if(this.currentWorld) {
		      this.removeWorld(this.currentWorld);
		    }
		    this.currentWorld = world;
		    
		    // Reset camera position
	      this.camera.reset();
		  }
		  
		  // Check for loading a scene into the world.
		  if(scene) {
		    this.loadScene(scene, world, sceneCallback);
		  }
		  
		  this.worlds.push(world);
		  
		  return world;
		},
		
		getWorld: function (name) {
		  return ex.Array.find(this.worlds, function (world) {
		    if(world.name == name) return true;
		  });
		},
		
		removeWorld: function (world) {
		  // Safe remove world in case we are removing the world on an update function.
		  this.worldsToRemove.push(world);
		},
		
		_removeWorld: function (world) {
		  if(this.currentWorld == world) {
		    this.currentWorld = null;
		  }
		  
		  ex.Array.remove(this.worlds, world);
		  
		  world.destroy();
		},
		
		/**
		 * Loads assets for multiple scenes silently (no loading screen)
		 */
		preloadScenes: function(sceneNames) {
		  if(!ex.isArray(sceneNames)) {
		    ex.Debug.log("Cannot preload scenes because argument is not an array", 'ERROR');
		  }
		  
		  var index = sceneNames.length;
		  while(index--) {
		    this.preloadScene(sceneNames[index]);
		  }
		},
		
		/**
		 * Loads assets for a scene silently (no loading screen)
		 */
		preloadScene: function(sceneName) {
		  if(game.levels[sceneName] && game.levels[sceneName].assetsLoaded) {
		    ex.Debug.log('Preloading scene "' + sceneName + '": already preloaded, skipped.', 'INFO');
		  } else {
		    ex.Debug.log('Preloading scene "' + sceneName + '"...', 'INFO');
		    ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
		      ex.Debug.log('Preloading scene "' + sceneName + '" complete.', 'INFO');
		    });
		    this._loadSceneAssets(sceneName);
		  }
		},
		
		/**
		 * Wrapper function for scene loading, will load assets before code
		 * if assets have not already been preloaded.
		 */
		loadScene: function(sceneName, world, callback) {
		  var that = this;
		  this._showLoadingScreen(world);
      // Load assets if not already loaded
			if(!game.levels[sceneName] || !game.levels[sceneName].assetsLoaded) {
			  ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
          ex.Debug.log('Loading assets for scene "' + sceneName + '" complete.', 'INFO');
			    that._hideLoadingScreenAndLoadScene(world, sceneName, callback);
			  });
			  this._loadSceneAssets(sceneName);
			} else {
			  this._hideLoadingScreenAndLoadScene(world, sceneName, callback);
			}
		},
		
		_showLoadingScreen: function(world) {
		  var loadingScreen = this.options.loadingScreen,
		      fadeInDelay = loadingScreen.fadeInDelay || 1;
      loadingScreen.alpha = 0;
      world.addObject(loadingScreen);
      ex.Tween.add(loadingScreen, fadeInDelay, { alpha: 1 });
		},
		
		_hideLoadingScreenAndLoadScene: function(world, sceneName, callback) {
		  var that = this,
		      loadingScreen = this.options.loadingScreen,
          fadeOutDelay = loadingScreen.fadeOutDelay || 1;
		  ex.Tween.add(loadingScreen, fadeOutDelay, { alpha: 0 }, 
	      { callback: function() {
  		    world.removeObject(loadingScreen);
  	      ex.Debug.log('Loading objects for scene "' + sceneName + '"...', 'INFO');
  	      that._loadScene(sceneName, world, callback);
  	      ex.Debug.log('Loading objects for scene "' + sceneName + '" complete.', 'INFO');
	      }
		  });
		},
		
		/**
		 * Loads scene assets
		 */
		_loadSceneAssets: function(sceneName) {
		  var that = this;
      var sceneNamespace = "game.levels." + sceneName;
      
      ex.using([sceneNamespace], function() {
        ex.event.listenOnce('loadStart', ex.Assets._eventHandler, function() {
          ex.Debug.log('Loading assets for scene "' + sceneName + '"...', 'INFO');
        });
        ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
          game.levels[sceneName].assetsLoaded = true;
        });
        var scene = new game.levels[sceneName]();
        ex.Assets.loadBulk(scene.getAssets());
      });
		},
		
		/**
		 * Loads scene code
		 */
		_loadScene: function(sceneName, world, callback) {
		  var that = this;
      var sceneNamespace = "game.levels." + sceneName;
      
      ex.using([sceneNamespace], function() {
        var scene = new game.levels[sceneName](that, world);
        var objects = scene.getObjects();
          
        world.addObjects(objects);
        scene.finalSetup();
          
        if(callback) {
          callback(world);
        }
      });
		},
		
		loadComponent: function(component) {
			if(component instanceof ex.base.Component == false) {
				this.logger.log("Component must be an instance of ExstoEngine.Base.Component!");
			} else {
				this.components.push(component);
			}
		},
		
		getComponent: function(name) {
			var i = this.components.length;
			while(i--) {
				if(this.components[i].name == name) {
					return this.components[i];
				}
			}
		},
			
		unloadComponent: function (component) {
		  this.components.splice(this.components.indexOf(component), 1);
		}
	});
});
ex.using([
      'ex.event.EventTarget'
], function () {
	ex.define('ex.novus.NovusClient', 'ex.event.EventTarget', {
		/**
		 * The client object to connect to a Novus node.js server.
		 * 
		 * @name ex.novus.NovusClient
		 * 
		 * @param {String} url The url to connect to.
		 * 
		 * @property {String} url The url of the server connected to.
		 * @property {Object} socket The socket.io socket connection.
		 * 
		 * @constructor
		 */
		constructor: function (url) {
			this.url = url;
			this.socket = io.connect(url);
			this.listeners = {};
			
			var that = this;
			
			this.socket.on('login', function (data) {
				that.callback(data.success);
			});
			
			this.socket.on('guestLogin', function (data) {
			  that.callback(data.success);
			});
			
			this.socket.on('roomList', function (data) {
				that.callback(data.list);
			});
			
			this.socket.on('joinRoom', function (data) {
				that.callback(data);
			});
			
			this.socket.on('createRoom', ex.bind(this, function (data) {
				this.dispatchEvent('createRoom', data);
			}));
			
			this.socket.on('roomMessage', ex.bind(this, function(data) {
				var callbacks = this.listeners[data.type] || [];
				callbacks.forEach(function (callback, index, array) {
					callback(data.message);
				});
			}));
		},
		
		/**
		 * Allows a client to listen for a certain room message type and call a function
		 * when it receives that message.
		 * 
		 * @param {String} type The type to listen for.
		 * @param {Function} callback The function to call when we receive that message.
		 */
		on: function(message, callback) {
			if(typeof this.listeners[message] == "undefined") {
				this.listeners[message] = [];
			}
			
			this.listeners[message].push(callback);
		},
		
		/**
		 * Logs a user into the novus server using the given credentials.
		 * 
		 * Callback: void ({Boolean} success)
		 * 
		 * @param {String} name The user name to login as.
		 * @param {String} password The user's password.
		 * @param {Function} callback What to call upon logging in.
		 */
		login: function (name, password, callback) {
			this.callback = callback;
			this.socket.emit('login', { name: name, password: password });
		},
		
		/**
		 * Logs a user into the novus server as a guest.
		 * 
		 * @param {String} name The user name to login as.
		 * @param {Function} callback What to call upon logging in.
		 */
		guestLogin: function (name, callback) {
		  this.callback = callback;
		  this.socket.emit('guestLogin', { name: name });
		},
		
		/**
		 * Gets the list of the currently created rooms.
		 * 
		 * @param {Function} callback The function to call upon getting the room list.
		 */
		roomList: function (callback) {
			this.callback = callback;
			this.socket.emit('roomList', {});
		},
		
		/**
		 * Creates and joins a room on the server.
		 * 
		 * @param {String} name The name of the room. Must be unique.
		 */
		createRoom: function(name) {
			this.socket.emit('createRoom', { name: name });
		},
		
		/**
		 * Joins a room on the server.
		 * 
		 * @param {String} The name of the room to join.
		 */
		joinRoom: function(name, callback) {
			this.callback = callback;
			this.socket.emit('joinRoom', { name: name });
		},
		
		/**
		 * Leaves the current room if the client is currently in one.
		 */
		leaveRoom: function() {
			this.socket.emit('leaveRoom', {});
		},
		
		/**
		 * Sends a message to every user in the same room.
		 * 
		 * @param {String} type The type of the message to send. This is the type that NovusClient.on looks for.
		 * @param {Object} message The data message to send.
		 */
		message: function(type, message) {
			this.socket.emit('roomMessage', { type: type, message: message });
		},
		
		/**
		 * Sends a message to the given username.
		 * 
		 * @param {String} name The user to send the message to.
		 * @param {Type} type The type of the message to send.
		 * @param {Object} message The data message to send.
		 */
		messageTo: function (name, type, message) {
			this.socket.emit('roomMessageTo', { name: name, type: type, message: message });
		}
	});
});/**
 * Interface for objects that wish to implement collision.
 * 
 * @class ex.util.Collidable
 */
(function() {
	ex.define("ex.physics.Collidable", {
	  constructor: function (type, data) {
	    this.type = type;
	    this.data = data;
	    
	    // Set both group and colliding groups to all (1 1 1 1)
	    this.collisionBit = ~0;
	    this.collisionBitMask = ~0;
	  },
	  
	  setCollisionGroup: function (group) {
	    // If null is passed, set to all (1 1 1 1)
	    // Else bit shift 1 by the group
	    this.collisionBit = ex.isNull(group) ? ~0 : (1 << group);
	  },
	  
	  setCollidableGroups: function (groups) {
	    this.collisionBitMask = 0;
	    
	    // Start with 0 0 0 0 and OR each bit shifted group into the bit mask.
	    var i = 0,
	        ln = groups.length;
	    for(; i != ln; i++) {
	      this.collisionBitMask = this.collisionBitMask | (1 << groups[i]);
	    }
	  },
	  
	  setAllCollidableGroups: function () {
	    this.collisionMaskBit = ~0;
	  },
	  
	  update: function (dt) {
	    // Never should be used, just there for world.
	  },
	  
		integrate: function (dt) {
		  
		},
		
		onCollide: function (target, data, dt) {
		  
		},
		
		destroy: function () {
		  
		}
	});
}());(function() {
	ex.define("ex.physics.CollisionDetector", {
		constructor: function() {
			this.algorithms = {
				RigidBoxToCollisionMap: 	boxToMapCheck,
				CollisionMapToRigidBox: 	boxToMapCheck,
				RigidBoxToRigidBox:      	boxToBoxCheck,
				EntityToTrigger:	boxToBoxCheck,
				TriggerToEntity:	boxToBoxCheck,
			};
		},
		
		detectCollisions: function(collidables, dt) {
			var collisions = [],
			    sourceIndex = 0,
			    targetIndex = 0,
			    source,
			    target;
			for(sourceIndex; sourceIndex < collidables.length; sourceIndex++) {
				for(targetIndex = sourceIndex + 1; targetIndex < collidables.length; targetIndex++) {
				  source = collidables[sourceIndex];
				  target = collidables[targetIndex];
				  
				  // Use bit masking to check if they should collide.
				  if((source.collisionBit & target.collisionBitMask)
				      && (target.collisionBit & source.collisionBitMask)) {
				    var result = this.detectCollisionBetween(
	              source,
	              target,
	              dt);
	          if(result != null) {
	            collisions.push(result);
	          }
				  } 
				}
			}
			
			return collisions;
		},
		
		detectCollisionBetween: function(source, target, dt) {
			var selector = source.type + "To" + target.type;
			if(this.algorithms[selector]){
				return this.algorithms[selector](source, target, dt);
			}
		}
	});
	
	/**
	 * Strict bounding box to bounding box collision test.
	 * 
	 * @returns {CollisionData}
	 */
	function boxToBoxCheck(source, target, dt){
		// check for x intersection
		if(source.position.x <= target.position.x) {
			if((source.position.x + source.width) < target.position.x) {
				return null;
			}
		} else {
			if((target.position.x + target.width) < source.position.x) {
				return null;
			}
		}
		// check for y intersection
		if(source.position.y <= target.position.y) {
			if((source.position.y + source.height) < target.position.y) {
				return null;
			}
		} else {
			if((target.position.y + target.height) < source.position.y) {
				return null;
			}
		}
		
		var penVector = new ex.base.Vector(0,0),
			  tempPenVector = new ex.base.Vector(0,0);
		// Find y penetration
		if(source.velocity.y > 0) {
			// Find out if box is penetrating top edge of tile
			if(source.position.y < target.position.y && source.position.y + source.height > target.position.y) {
				tempPenVector.y = (source.position.y + source.height) - target.position.y;
			}
		} else if(source.velocity.y < 0) {
			// Find out if box is penetrating bottom edge of tile
			if(target.position.y < source.position.y && target.position.y + target.height > source.position.y) {
				tempPenVector.y = source.position.y - (target.position.y + target.height);
			}
		}
		
		// Find x penetration
		if(source.velocity.x > 0) {
			// Find out if box is penetrating left edge of tile
			if(source.position.x < target.position.x && source.position.x + source.width > target.position.x) {
				tempPenVector.x = (source.position.x + source.width) - target.position.x;
			}
		} else if(source.velocity.x < 0) {
			// Find out if box is penetrating right edge of tile
			if(target.position.x < source.position.x && target.position.x + target.width > source.position.x) {
				tempPenVector.x = source.position.x - (target.position.x + target.width);
			}
		}
		
		if(tempPenVector.x != 0 && tempPenVector.y != 0) {
			var deltaDX = source.velocity.x * dt,
				deltaDY = source.velocity.y * dt,
				x2 = tempPenVector.x,
				y2 = tempPenVector.y,
				x1 = x2 - deltaDX,
				y1 = y2 - deltaDY,
				b = -(y2 - (( (y1 - y2) / (x1 - x2) ) * x2)),
				top = tempPenVector.y > 0;
				
			if(top) {
				if(b < 0)
					penVector.x = tempPenVector.x;
				else
					penVector.y = tempPenVector.y;
			} else {
				if(b > 0)
					penVector.x = tempPenVector.x;
				else
					penVector.y = tempPenVector.y;
			}
		} else if(tempPenVector.x != 0) {
			penVector.x = tempPenVector.x;
		} else if(tempPenVector.y != 0) {
			penVector.y = tempPenVector.y;
		}
		
		return {
			source: source,
			target: target,
			data: {
				pen: penVector
			}
		};
	};
	
	/**
	 * checks collision between a spriteMap and a bounding box.
	 * 
	 * @returns {CollisionData} both elements with a list of tiles that collided.
	 */
	function boxToMapCheck(box, map, dt){	
		// Swap box and map if the arguments get pushed in backwards
		if(box.type == "CollisionMap") {
			var temp = box;
			box = map;
			map = temp;
		}
		
		// Collision map actually just wraps a tile map so it can extend Collidable.
		var tileMap = map.tileMap;
		
		// find collisions between tiles and box
		var collidedTiles = [],
  			xPos = 0,
  			yPos = 0,
  			firstTile = tileMap.getTile(box.position.x, box.position.y) || { position: { x: 0, y: 0 }},
  			xMax = Math.floor((box.width + box.position.x - firstTile.position.x) / tileMap.tileWidth),
  			yMax = Math.floor((box.height + box.position.y - firstTile.position.y) / tileMap.tileHeight),
  			penVector = new ex.base.Vector(0, 0),
  			tempPenVector = new ex.base.Vector(0, 0),
  			i,
  			currentTile,
  			tile;
		
		// Generate list of tile collisions
		for(yPos; yPos <= yMax; yPos++) {
			for(xPos; xPos <= xMax; xPos++) {
				currentTile = tileMap.getTile(
						box.position.x + (xPos*tileMap.tileWidth), 
						box.position.y + (yPos*tileMap.tileHeight));
					
				if(currentTile){
					if(currentTile.value != 0) {
						collidedTiles.push(currentTile);
					}
				}
			}
			xPos = 0;
		}
		
		i = collidedTiles.length;
		while(i--) {
			tile = collidedTiles[i];
			
			// Find y penetration
			if(box.velocity.y > 0 && tile.edges.top) {
				// Find out if box is penetrating top edge of tile
				if(box.position.y < tile.position.y && box.position.y + box.height > tile.position.y) {
					tempPenVector.y = (box.position.y + box.height) - tile.position.y;
				}
			} else if(box.velocity.y < 0 && tile.edges.bottom) {
				// Find out if box is penetrating bottom edge of tile
				if(tile.position.y < box.position.y && tile.position.y + tile.height > box.position.y) {
					tempPenVector.y = box.position.y - (tile.position.y + tile.height);
				}
			}
			
			// Find x penetration
			if(box.velocity.x > 0 && tile.edges.left) {
				// Find out if box is penetrating left edge of tile
				if(box.position.x < tile.position.x && box.position.x + box.width > tile.position.x) {
					tempPenVector.x = (box.position.x + box.width) - tile.position.x;
				}
			} else if(box.velocity.x < 0 && tile.edges.right) {
				// Find out if box is penetrating right edge of tile
				if(tile.position.x < box.position.x && tile.position.x + tile.width > box.position.x) {
					tempPenVector.x = box.position.x - (tile.position.x + tile.width);
				}
			}
			
			if(tempPenVector.x != 0 && tempPenVector.y != 0) {
				var deltaDX = box.velocity.x * dt,
  					deltaDY = box.velocity.y * dt,
  					x2 = tempPenVector.x,
  					y2 = tempPenVector.y,
  					x1 = x2 - deltaDX,
  					y1 = y2 - deltaDY,
  					b = -(y2 - (( (y1 - y2) / (x1 - x2) ) * x2)),
  					top = tempPenVector.y > 0;
					
				if(top) {
					if(b < 0)
						penVector.x = tempPenVector.x;
					else
						penVector.y = tempPenVector.y;
				} else {
					if(b > 0)
						penVector.x = tempPenVector.x;
					else
						penVector.y = tempPenVector.y;
				}
			} else if(tempPenVector.x != 0) {
				penVector.x = tempPenVector.x;
			} else if(tempPenVector.y != 0) {
				penVector.y = tempPenVector.y;
			}
			
			tempPenVector = new ex.base.Vector(0, 0);
		}
		
		if(collidedTiles.length > 0) {
			return {
				source: box,
				target: map,
				data: {
					pen: penVector,
					tiles: collidedTiles
				}
			};
		} else {
			return null;
		}
	};
}());(function() {
  var DAMPING = 0.98;
  
	ex.define("ex.physics.CollisionResolver", {
		constructor: function(){
			this.algorithms = {
			    RigidBoxToCollisionMap: 	resolveBoxToMap,
			    RigidBoxToRigidBox: 	resolveBoxToBox,
				};
		},
		
		resolveCollisions: function(collisions, dt) {
			var index = collisions.length;
			while(index--) {
				// resolve collisions
				this.resolveCollisionBetween(
						collisions[index].source, 
						collisions[index].target,
						collisions[index].data,
						dt);
				// call source's collision event
				collisions[index].source.onCollide(
						collisions[index].target,
						collisions[index].data, 
						dt);
				// call target's collision event
				collisions[index].target.onCollide(
						collisions[index].source,
						collisions[index].data,
						dt);
			}
		},
		
		/**
		 * Selects the proper algorithms based on source and target types.
		 * 
		 * @param source
		 * @param target
		 * @param data
		 * @param dt
		 * @returns 
		 */
		resolveCollisionBetween: function(source, target, data, dt) {
			var selector = source.type + "To" + target.type;
			if(this.algorithms[selector]) {
				return this.algorithms[selector](source, target, data, dt);
			}
		}
	});
	
	function resolveBoxToMap(box, map, data, dt) {
	  if(box.mass == 0) return;
	  
		data = data.pen;
		if(data.y != 0) {
			if(data.y > 0) data.y += 0.1;
			else data.y -= 0.1;
			box.position.y -= data.y;
			box.velocity.y = -box.velocity.y * box.elasticity;
		}
		
		if(data.x != 0) {
			if(data.x > 0) data.x += 0.1;
			else data.x -= 0.1;
			box.position.x -= data.x;
			box.velocity.x = -box.velocity.x * box.elasticity;
		}
		
		box.velocity.scale(DAMPING);
	};
	
	function resolveBoxToBox(source, target, data, dt) {		
		if(source.anchored) {
			if(target.anchored) {
				return;
			} else {
				resolveBoxToMap(target, source, data, dt);
			}
		} else {
			if(target.anchored) {
				resolveBoxToMap(source, target, data, dt);
			} else {
				
			}
		}
	};
}());ex.using([
  'ex.base.Vector',
], function () {
  ex.define('ex.physics.Force', {
    update: function (dt) {
      // Never used.
    },
    
    solve: function (dt, collidables) {
      
    },
    
    destroy: function () {
      
    }
  });
});ex.using([
    'ex.base.WorldComponent',
    'ex.physics.CollisionDetector',
    'ex.physics.CollisionResolver',
    'ex.physics.Collidable',
    'ex.physics.Force'
], function(){
	ex.define("ex.physics.CollisionManager", ex.base.WorldComponent, {
		
		/**
		 * The engine component that handles collision detection and
		 * resolution.
		 * 
		 * @name ex.util.CollisionManager
		 * 
		 * @property {ex.simplex.Map} activeLevel the current level in the game
		 * 		world.
		 * 
		 * @constructor
		 */
		constructor: function (renderer, options) {
			this.collidables = [];
			this.forces = [];
			this.detector = new ex.physics.CollisionDetector();
			this.resolver = new ex.physics.CollisionResolver();
			this.renderer = renderer;
			
			this.defaults = {
			    debugDraw: false
			};
			
			this.options = ex.extend({}, this.defaults);
			ex.extend(this.options, options);
			
			// Debug drawing.
			this.context = null;
			if(this.options.debugDraw && this.renderer.type == ex.display.rendering.Renderer.CANVAS2D) {
			  this.context = this.renderer.renderingContext.context;
			}
		},
		
		addObject: function (object) {
		  if(object instanceof ex.physics.Collidable) {
		    this.collidables.push(object);
		  } else if (object instanceof ex.physics.Force) {
		    this.forces.push(object);
		  }
		},
		
		removeObject: function (object) {
		  if(object instanceof ex.physics.Collidable) {
		    ex.Array.remove(this.collidables, object);
		    object.destroy();
		  } else if (object instanceof ex.physics.Force) {
		    ex.Array.remove(this.forces, object);
		    object.destroy();
		  }
		},
		
		/**
		 * Clears the collisions array, request collision detection on each
		 * layer separately from the detector, then requests resolution of
		 * each collision from the resolver.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.util.CollisionManager
		 * 
		 * @param {Number} dt timestep
		 */
		update: function (dt, camera) {
			ex.Debug.time('collision');
			
			// Solve for all forces.
			var i = 0,
			    ln = this.forces.length;
			for(; i != ln; i++) {
			  this.forces[i].solve(dt, this.collidables);
			}
			
			// Integrate all objects forward in time.
			i = 0;
			ln = this.collidables.length;
			for(; i != ln; i++) {
			  this.collidables[i].integrate(dt);
			}
			
			var collisions = this.detector.detectCollisions(this.collidables, dt);
			
			this.resolver.resolveCollisions(collisions, dt);
			
			ex.Debug.time('collision');
		},
		
		debug: function (dt, camera) {
		  if(this.options.debugDraw == true) {
		    this.draw(this.context, camera);
		  }
		},
		
		draw: function (context, camera) {
	    context.save();
	    
	    context.strokeStyle = '#FF0000';
      context.lineWidth = 1;
      
      var i = 0,
          ln = this.collidables.length;
      for(; i != ln; i++) {
        this.collidables[i].draw(context, camera.position.x, camera.position.y);
      }
      
      context.restore();
		},
		
		destroy: function () {
		  delete this.collisionGroups;
		  delete this.detector;
		  delete this.resolver;
		}
	});	
});ex.using([
  "ex.world.TileMap",
  "ex.physics.Collidable"
], function () {
	ex.define("ex.physics.CollisionMap", ex.physics.Collidable, {
		/**
		 * Tile based collision data for an area.
		 * 
		 * @name ex.world.CollisionMap
		 * 
		 * @param tileWidth
		 * @param tileHeight
		 * @param data
		 * 
		 * @property tileMap
		 * 
		 * @constructor
		 */
		constructor: function(tileWidth, tileHeight, data, userData) {
			this.tileMap = new ex.world.TileMap(tileWidth, tileHeight, data);
		  
			this._super("constructor", ['CollisionMap', userData]);
		},
		
		draw: function (context, camX, camY) {
		  var x = 0,
		      y = 0,
		      tile, drawX, drawY;
		  for(; x != this.tileMap.data.length; x++) {
		    y = 0;
		    for(; y != this.tileMap.data[x].length; y++) {
		      tile = this.tileMap.data[x][y];
		      if(tile.value > 0) {
		        drawX = tile.position.x - camX;
		        drawY = tile.position.y - camY;
		        context.beginPath();
		        if(tile.edges.top) {
		          context.moveTo(drawX, drawY);
		          context.lineTo(drawX + tile.width, drawY);
		        }
		        if(tile.edges.bottom) {
              context.moveTo(drawX, drawY + tile.height);
              context.lineTo(drawX + tile.width, drawY + tile.height);
            }
		        if(tile.edges.left) {
              context.moveTo(drawX, drawY);
              context.lineTo(drawX, drawY + tile.height);
            }
		        if(tile.edges.right) {
              context.moveTo(drawX + tile.width, drawY);
              context.lineTo(drawX + tile.width, drawY + tile.height);
            }
		        context.stroke();
		        context.closePath();
		      }
		    }
		  }
		}
	});
});ex.using([
  'ex.physics.Force',
], function () {
  ex.define('ex.physics.force.Gravity', ex.physics.Force, {
    constructor: function (strength) {
      this.strength = strength;
    },
    
    solve: function (dt, collidables) {
      var i = 0,
          ln = collidables.length,
          rigidBody;
      for(; i != ln; i++) {
        rigidBody = collidables[i];
        if(rigidBody.velocity && rigidBody.gravity != false) {
          collidables[i].applyForce(0, this.strength);
        }
      }
    }
  });
});ex.using([
  'ex.base.Vector',
  'ex.physics.Collidable',
], function () {
  ex.define('ex.physics.RigidBody', ex.physics.Collidable, {
    constructor: function (type, position, data) {
      this.position = position;
      this.velocity = new ex.Vector(0, 0);
      this.acceleration = new ex.Vector(0, 0);
      this.mass = 1;
      this.elasticity = 0;
      this.maxVelocity = new ex.Vector(3000, 3000);
      this.zero = 0.01;
      
      this._super('constructor', [type, data]);
    },
    
    applyForce: function (x, y) {
      this.acceleration.x += x / this.mass;
      this.acceleration.y += y / this.mass;
    },
    
    applyImpulse: function (x, y) {
      this.velocity.x += x;
      this.velocity.y += y;
    },
    
    integrate: function (dt) {
      if(this.mass != 0) {
        this.velocity.addScaled(this.acceleration, dt);
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        
        this.velocity.limit(this.maxVelocity);
        
        if(this.velocity.x < this.zero && this.velocity.x > -this.zero) this.velocity.x = 0;
        if(this.velocity.y < this.zero && this.velocity.y > -this.zero) this.velocity.y = 0;
        
        this.position.addScaled(this.velocity, dt);
      }
    },
    
    linkObject: function (object) {
      object.position = this.position;
    }
  });
});ex.using([
  'ex.physics.RigidBody'
], function () {
  ex.define('ex.physics.RigidBox', ex.physics.RigidBody, {
    constructor: function (position, width, height, data) {
      this.width = width;
      this.height = height;
      
      this._super('constructor', ['RigidBox', position, data]);
    },
    
    draw: function (context, camX, camY) {
      context.strokeRect(
          this.position.x - camX,
          this.position.y - camY,
          this.width,
          this.height);
    }
  });
});ex.using([
  'ex.physics.CollisionManager',
  'ex.physics.CollisionMap',
  'ex.physics.RigidBox',
  'ex.physics.force.Gravity'
], function () {
  ex.define('ex.physics.Physics', {});
});ex.using([
  'ex.base.Component'
], function () {
  ex.define('ex.plugins.Data', ex.base.Component, {
    __alias: 'ex.Data',
    
    __statics: {
      data: {},
      storageKeys: null,
      
      setStorageKeys: function (keys) {
        this.storageKeys = keys;
      },
      
      clear: function () {
        localStorage.clear();
      },
      
      save: function () {
        var data = {};
        
        if(this.storageKeys) {
          var i = 0,
              ln = this.storageKeys.length,
              key;
          for(; i != ln; i++) {
            key = this.storageKeys[i];
            data[key] = this.data[key];
          }
        } else {
          data = this.data;
        }
        
        data = JSON.stringify(data);
        
        localStorage['data'] = data;
      },
      
      load: function () {
        var data = localStorage['data'];
        
        if(data) {
          data = JSON.parse(data);
          
          if(this.storageKeys) {
            var i = 0,
                ln = this.storageKeys.length,
                key;
            for(; i != ln; i++) {
              key = this.storageKeys[i];
              this.data[key] = data[key];
            }
          } else {
            ex.extend(this.data, data, true);
          }
        }
        
        return data;
      },
      
      set: function (key, value) {
        ex.Data.data[key] = value;
      },
      
      get: function (key) {
        return ex.Data.data[key];
      }
    }
  });
});ex.using([
  "ex.base.Vector",
], function () {
	ex.define("ex.plugins.Particle2", {
		constructor: function (options) {
			var defaults = {
				position: new ex.base.Vector(0,0),
				vector: new ex.base.Vector(0,0),
				age: 0,
				lifespan: 0,
				size: 0,
				alpha: 1,
				color: "#cef",
				scrollFactorX: 1,
				scrollFactorY: 1
			};
			
			ex.extend(defaults, options);
			defaults.position = options.position.clone();
			
			ex.extend(this, defaults);
			
			// Execute birth event
			this.onBirth();
		},
		
		// Performs on every time step
		update: function(dt) {
			if(this.age >= this.lifespan){
				this.onDeath();
			} else {
				this.position = this.position.addScaled(this.vector, dt);
				this.mature(dt);
			}
		},
		
		// Perform on birth event
		onBirth: function() {
			//TODO: consider a different name for this function
		},
		
		// Age the particle in some way
		mature: function(dt) {
			this.alpha -= 1.0/this.age;	//evenly reduces alpha over lifespan
			this.age += dt;
		},
		
		// Perform on death event
		onDeath: function() {
			this.active = false;
		},
		
		render: function(context, camX, camY) {
			// Copied from old Particle class...consider revision.
			if(typeof this.onDraw === "function") this.onDraw(this);
			
			context.save();
			
			context.fillStyle = this.color;
			try {
				context.globalAlpha = this.alpha;
			} catch(e) { }
			context.translate(this.position.x - (camX * this.scrollFactorX), this.position.y - (camY * this.scrollFactorY));
			
			context.beginPath();
	        context.arc(0, 0, Math.abs(this.size/2), 0, Math.PI/180, true);
	        context.closePath();
	        context.fill();
	        
	        context.restore();
		}
	});
});/**
 * Note: While rebuilding the emitter class I realized that
 * the particle class was inseparable so I am rebuilding both.
 * Reasons include:
 *  - Simplifying particle class
 *  - Placing all variance calculations in Emitter
 * 			(Nic)
 */

/* Requirements:
 * - Support for animated sprites as particles
 * - drawing objects as particles
 * - variance in all directions (angle or cartesian)
 * - variance in age/size
 * - spawn rate
 * - initial velocity
 * - degree of randomness
 * - simulation and render phases
 * - emitters on points, lines, and maybe polys? (lines could be used for rain effects)
 */

ex.using([
  "ex.base.Vector",
  "ex.plugins.Particle2"
], function () {
	function vary(n) {
		return (Math.random() * n) - n / 2;
	};
	
	// (x,y) to (r,theta)
	function cartesianToPolar(x,y){
		var theta = Math.atan(y/x);
		var r = Math.sqrt(x*x + y*y);
		return {
			r: r, 
			theta: theta
		};
	}
	
	// (r,theta) to (x,y)
	function polarToCartesian(r,theta) {
		var x = r * Math.cos(theta);
		var y = r * Math.sin(theta);
		return {
			x: x,
			y: y
		};
	}
	
	function varyVector(vector, angleVariance, magnitudeVariance) {
		var polarCoords = cartesianToPolar(vector.x, vector.y);
		polarCoords.r += vary(magnitudeVariance);
		polarCoords.theta += vary(angleVariance);
		var adjustedCoords = polarToCartesian(polarCoords.r, polarCoords.theta);
		return new ex.base.Vector(adjustedCoords.x, adjustedCoords.y);
	};
	
	function vectorDifference(a, b){
		return new ex.base.Vector(b.x - a.x, b.y - a.y);
	}
	
	function extend(object, extend) {
		for(var param in extend) {
			object[param] = extend[param];
		}
	};
	
	/*
	 * Emitter Class
	 */
	ex.define("ex.plugins.Emitter2", {
		constructor: function(emitterOptions, particleOptions) {
			/* Set Emitter default options and extend new options */
			var defaults = {
				position: new ex.base.Vector(300, 300),			// position of emitter
				particleVector: new ex.base.Vector(150, -50),	// base particle vector
				angleVariance: Math.PI / 4,						// theta variance (radians)
				magnitudeVariance: 0.2,							// v0 variance (0.0 - 1.0)
				spawnSpeed: 5,									// max spawn per time step
				maxParticles: 500,								// particle cap
				sizeVariance: 5,								// randomness of size
				lifeVariance: 20,								// randomness of lifespan
				active: true									// is emitter emitting?
			};
			ex.extend(defaults, emitterOptions);
			this.options = defaults;
			this.options.origin = this.options.position.clone();		//remembers start for movement
			this.options.lastPosition = this.options.origin.clone();	//used to detect movement
			/* Set particle default options and extend new options */
			var particleDefaults = {
				position: this.options.position.clone(),	//.clone() to pass by value
				vector: defaults.particleVector.clone(),	//
				age: 0,
				lifespan: 2,
				size: 15,
				alpha: 1,
				color: '#ff0',
				onDraw: function(particle) {
					var y = -this.age * 100;
					y = Math.floor(y);
					particle.size *= 0.98;
					particle.color = this.color;
					particle.alpha = 0.5 - (particle.age / particle.lifespan * 0.4);
			    }
			};
			ex.extend(particleDefaults, particleOptions);
			this.particleOptions = particleDefaults;
			
			this.particles = [];
			this.active = true;
		},
		
		/**
		 * Two implementations for updating can be used, one favors accuracy, the other speed.
		 * 
		 * Accuracy (3 passes):
		 *  - remove dead particles
		 *  - spawn new particles
		 *  - update all particles
		 *  
		 * Speed (2 passes):
		 *  - update all particles, dead particles are removed
		 *  - spawn new particles (they miss their first time step)
		 *  
		 *  Below is the Speed implementation.
		 * @param dt
		 */
		update: function(dt) {
			// Update each live particle, remove dead ones
			var index = this.particles.length;
			var emitterMoved = false;
			if(this.options.position != this.options.lastPosition) {
				this.particleOptions.position = this.options.position.clone();
				this.particleOptions.vector = this.options.particleVector.clone();
				this.options.lastPosition = this.options.position.clone();
			}
			while(index--) {		
				if(this.particles[index].age > this.particles[index].lifespan) {
					this.particles.splice(index, 1);
				} else {
					this.particles[index].update(dt);
				}
			}
			
			// spawn new particles
			for(var birthCount = 0; birthCount < this.options.spawnSpeed; birthCount++) {
				if(this.particles.length >= this.options.maxParticles || this.options.active == false) {
					// Do nothing, no room or emitter inactive
					// break;
				} else {
					this.spawnParticle();
				}
			}
		},
		
		spawnParticle: function() {
			var optionsWithVariance = {};
			//MUST use .clone(), will pass by reference otherwise
			ex.extend(optionsWithVariance, ex.clone(this.particleOptions));
			//optionsWithVariance.lifespan += vary(this.options.lifeVariance);
			optionsWithVariance.vector = varyVector(optionsWithVariance.vector, this.options.angleVariance, this.options.magnitudeVariance);
			optionsWithVariance.size += vary(this.options.sizeVariance);
			this.particles.push(new ex.plugins.Particle2(optionsWithVariance));
		},
		
		render: function(context, camX, camY) {
			var index = this.particles.length;
			while(index--) {
				this.particles[index].render(context, camX, camY);
			}
		}
	});
});ex.using([
  'ex.base.Vector',
  'ex.base.Component'
], function () {
  var extween;
  
  ex.define('ex.plugins.Tween', ex.base.Component, {
    __alias: 'ex.Tween',
    
    constructor: function () {
      if(!extween.__instance) {
        this._super('constructor');
        
        extween.__instance = this; 
      } else {
        ex.Debug.log('ex.plugins.Tween has already been initialized!', 'INFO');
      }
    },
    
    update: function (dt) {
      extween.__update(dt);
    },
    
    __statics: {
      // Make this class a singleton so it can still be loaded into the engine
      // but can be called anywhere in the engine.
      __instance: null,
      
      tweens: [],
      
      /**
       * Adds a tween to the list to be changed over a period of time.
       * 
       * @param {Object} element The element to be tweened.
       * @param {Number} duration The time period to tween over.
       * @param {Object} properties The properties to tween assigned to their end values.
       * @param {Options} options Extra tween options including callbacks, type, etc.
       */
      add: function (element, duration, properties, options) {
        var tween = this.__generateTween(element, duration, properties, options);
        
        extween.tweens.push(tween);
      },
      
      delayedCall: function (duration, callback) {
        var tween = this.__generateTween({}, duration, {}, {
          callback: callback
        });
        
        extween.tweens.push(tween);
      },
      
      __generateTween: function (element, duration, properties, options) {
        var tween = {
          element: element,
          duration: duration,
          elapsed: 0,
          properties: properties,
          starting: {},
          options: options || {}
        };
        
        for(var key in properties) {
          tween.starting[key] = element[key];
        }
        
        return tween;
      },
      
      __update: function (dt) {
        var i = 0,
            ln = extween.tweens.length,
            tween,
            delta,
            remove = false;
        for(; i < ln; i++) {
          tween = extween.tweens[i];
          
          // Update the tween's properties.
          tween.elapsed += dt;
          delta = dt;
          
          // Check for delaying the Tween.
          if(tween.options.delay) {
            if(tween.elapsed > tween.options.delay) {
              tween.elapsed -= tween.options.delay;
              tween.options.delay = null;
            } else {
              continue;
            }
          }
          
          // Check for over duration.
          if(tween.elapsed > tween.duration) {
            delta = tween.duration - tween.elapsed;
            tween.elapsed = tween.duration;
            remove = true;
          }
          
          // Update the properties of the element.
          for(var key in tween.properties) {
            if(remove == false) {
              var dd = ((tween.properties[key] - tween.starting[key]) / tween.duration) * delta;
              tween.element[key] += dd;
            } else {
              tween.element[key] = tween.properties[key];
            }
          }
          
          // Remove tween if needed and complete it.
          if(remove == true) {
            if(extween.tweens[i].options.callback) {
              extween.tweens[i].options.callback();
            }
            extween.tweens.splice(i, 1);
            i--;
            ln--;
            remove = false;
          }
        }
      }
    }
  });
  
  // Set globals for data hiding.
  extween = ex.Tween;
});ex.using([
  'ex.event.EventTarget',
  'ex.util.Input'
], function() {
  var Input;
  
  ex.define("ex.util.Controller", ex.event.EventTarget, {
    constructor: function (inputBindings) {
      this.bindings = {};
      this.actions = {};
      this.currentState = null;
      
      this.loadInputBindings(inputBindings);
      
      this._super('constructor');
    },
    
    loadInputBindings: function(inputBindings) {
      for(var key in inputBindings) {
        var binding = inputBindings[key];
        
        if(binding instanceof Array == true) {
          var i = 0,
              ln = binding.length;
          for(; i < ln; i++) {
            this.bind(key, binding[i]);
          }
        } else {
          this.bind(key, binding);
        }
      }
    },
    
    bind: function (button, event) {
      // Check for binding to div elements as we have to add them to the
      // input class binding list.
      if(event.charAt && event.charAt(0) == '#') {
        var parts = event.split(' '),
            id = parts[0],
            type = parts[1];
        
        if(type == 'touch') {
          Input.bindElement('touchstart', 'touchstop', id);
        } else if(type == 'mouse') {
          Input.bindElement('mousedown', 'mouseup', id);
        } else {
          ex.Debug.log('ex.util.Controller.bind: Unrecognized input type ' + type + ' on ' + id, 'WARNING');
        }
        
        event = id;
      } else if(isNaN(parseInt(event))) {
        event = ex.util.Key[event];
      }
      
      if(typeof this.bindings[button] == 'undefined') {
        this.bindings[button] = [];
      }
      
      this.bindings[button].push(event);
    },
    
    unbind: function (button, event) {
      // Check for binding to div elements as we have to add them to the
      // input class binding list.
      if(event.charAt(0) == '#') {
        var parts = event.split(' '),
            id = parts[0],
            type = parts[1];
        if(type == 'touch') {
          this.input.unbindElement('touchstart', 'touchstop', id);
        } else if(type == 'mouse') {
          this.input.unbindElement('mousedown', 'mouseup', id);
        } else {
          ex.Debug.log('ex.util.Controller.unbind: Unrecognized input type ' + type + ' on ' + id, 'WARNING');
        }
        
        event = id;
      } else if(isNaN(parseInt(event))) {
        event = ex.util.Key[event];
      }
      
      if(this.bindings[button]) {
        ex.Array.remove(this.bindings[button], event);
        
        if(this.bindings[button].length == 0) {
          delete this.bindings[button];
        }
      }
    },
    
    unbindAll: function () {
      for(var key in this.bindings) {
        var i = 0,
            ln = this.bindings[key].length;
        for(; i < ln; i++) {
          this.unbind(this.bindings[key][i], key);
        }
      }
    },
    
    update: function (dt) {
      // Get the current input state.
      var that = this;
      
      // Fire actions based on the current controller state.
      for(var key in this.actions) {
        var actions = this.actions[key],
            action,
            events = ['pressed', 'released', 'down'];
        
        // For each event type.
        ex.Array.each(events, function (event, index) {
          // Make sure there are actions to check.
          if(actions[event] && actions[event].length > 0) {
            // Setup function name to use to check against.
            var checkFunction = 'is' + event.charAt(0).toUpperCase() + event.substr(1),
            isEvent = false;
            
            // Check each event type in the current input state.
            if(that.bindings[key]) {
              ex.Array.each(that.bindings[key], function (key, index) {
                if(Input[checkFunction](key)) {
                  // If the event type returns true then run all the actions and drop out.
                  ex.Array.each(actions[event], function (action, index) {
                    return action(dt);
                  });
                  return false;
                }
              });
            }
          }
        });
      }
    },
    
    /**
     * Checks if the button is pressed or held down.
     * @param {String} key The button to check.
     */
    isDown: function (button) {
      var isDown = false;
      
      ex.Array.each(this.bindings[button], function (key, index) {
        if(Input.isDown(key)) {
          isDown = true;
          return false;
        }
      });
      
      return isDown;
    },
    
    /**
     * Checks if the button was just pressed this frame.
     * @param {String} key The button to check.
     */
    isPressed: function (button) {
      var isPressed = false;
      
      ex.Array.each(this.bindings[button], function (key, index) {
        if(Input.isPressed(key)) {
          isPressed = true;
          return false;
        }
      });
      
      return isPressed;
    },
    
    /**
     * Checks if the button was just released this frame.
     * @param {String} key The button to check.
     */
    isReleased: function (button) {
      var isReleased = false;
      
      ex.Array.each(this.bindings[button], function (key, index) {
        if(Input.isReleased(key)) {
          isReleased = true;
          return false;
        }
      });
      
      return isReleased;
    },
    
    bindAction: function (event, button, action) {
      if(ex.isNull(this.actions[button])) {
        this.actions[button] = {};
      }
      
      if(ex.isNull(this.actions[button][event])) {
        this.actions[button][event] = [];
      }
      
      this.actions[button][event].push(action);
    },
    
    unbindAction: function (event, button, action) {
      ex.Array.remove(this.actions[button][event], action);
      
      if(this.actions[button][event].length == 0) {
        delete this.actions[button][event];
      }
    },
    
    unbindAllActions: function() {
      for(var button in this.actions) {
        this.actions[button] = [];
      }
    },
    
    destroy: function () {
      this.unbindAllActions();
      this.unbindAll();
      
      this.bindings = null;
      this.released = null;
      this.buttonState = null;
      this.previousState = null;
      this.actions = null;
      this.input = null;
    }
  });
  
  Input = ex.Input;
});ex.using([

], function () {
  var uagent = navigator.userAgent.toLowerCase();
  
  ex.define('ex.util.Device', {
    __alias: 'ex.Device',
    
    __statics: {
      isOnline: function () {
        return navigator.onLine;
      },
      
      isMobile: function () {
        return ex.Device.isiOS();
      },
      
      isiOS: function () {
        return ex.Device.isiPhone() || ex.Device.isiPad();
      },
      
      isiPhone: function () {
        return uagent.search('iphone') > -1;
      },
      
      isiPad: function () {
        return uagent.search('ipad') > -1;
      },
      
      cache: {
        UNCACHED: 0,
        IDLE: 1,
        CHECKING: 2,
        DOWNLOADING: 3,
        UPDATEREADY: 4,
        OBSOLETE: 5,
        
        status: function () {
          var appCache = window.applicationCache;
          
          switch(appCache.status) {
            case appCache.UNCACHED:
              return ex.Device.cache.UNCACHED;
              break;
            case appCache.IDLE:
              return ex.Device.cache.IDLE;
              break;
            case appCache.CHECKING:
              return ex.Device.cache.CHECKING;
              break;
            case appCache.DOWNLOADING:
              return ex.Device.cache.DOWNLOADING;
              break;
            case appCache.UPDATEREADY:
              return ex.Device.cache.UPDATEREADY;
              break;
            case appCache.OBSOLETE:
              return ex.Device.cache.OBSOLETE;
              break;
          }
        },
        
        update: function (callback) {
          window.applicationCache.addEventListener('updateready', function(e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
              window.applicationCache.swapCache();
              callback();
            } else {
              // Manifest didn't changed. Nothing new to server.
            }
          }, false);
          
          window.applicationCache.update();
        }
      },
      
      supports: {
        canvas: function () {
          var el = document.createElement('canvas');
          return !ex.isNull(el.getContext);
        },
        
        localStorage: function () {
          try {
            return 'localStorage' in window && window['localStorage'] !== null;
          } catch(e) {
            return false;
          }
        }
      }
    }
  });
});ex.using([
  'ex.base.GlobalComponent'
], function() {
  ex.define('ex.util.DOM', ex.base.GlobalComponent, {
    
    __statics: {
      __browser: null,
      
      determineBrowser: function() {
        
      },
      
      // returns the absolute position of some element within document
      // Original source:
      // http://blogs.korzh.com/progtips/2008/05/28/absolute-coordinates-of-dom-element-within-document.html
      getElementAbsolutePos: function(elemID) {
        var element;
        if (typeof (elemID) == "string") {
          element = document.getElementById(elemID);
        } else {
          element = elemID;
        }
        
        var res = {
            x: 0,
            y: 0
        }
        if (element !== null) {
          res.x = element.offsetLeft;
          
          var offsetParent = element.offsetParent;
          var offsetParentTagName = "";
          if(offsetParent != null) {
            offsetParent.tagName.toLowerCase();
          }
          
          if (__isIENew && offsetParentTagName == 'td') {
            res.y = element.scrollTop;
          } else {
            res.y = element.offsetTop;
          }
          
          var parentNode = element.parentNode;
          var borderWidth = null;
          
          while (offsetParent != null) {
            res.x += offsetParent.offsetLeft;
            res.y += offsetParent.offsetTop;
            
            var parentTagName = offsetParent.tagName.toLowerCase();
            
            if ((__isIEOld && parentTagName != "table")
                || (__isFireFoxNew && parentTagName == "td") || __isChrome) {
              borderWidth = __getBorderWidth(offsetParent);
              res.x += borderWidth.left;
              res.y += borderWidth.top;
            }
            
            if (offsetParent != document.body
                && offsetParent != document.documentElement) {
              res.x -= offsetParent.scrollLeft;
              res.y -= offsetParent.scrollTop;
            }
            
            // next lines are necessary to fix the problem with offsetParent
            if (!__isIE && !__isOperaOld || __isIENew) {
              while (offsetParent != parentNode && parentNode !== null) {
                res.x -= parentNode.scrollLeft;
                res.y -= parentNode.scrollTop;
                if (__isFireFoxOld || __isWebKit) {
                  borderWidth = __getBorderWidth(parentNode);
                  res.x += borderWidth.left;
                  res.y += borderWidth.top;
                }
                parentNode = parentNode.parentNode;
              }
            }
            
            parentNode = offsetParent.parentNode;
            offsetParent = offsetParent.offsetParent;
          }
        }
        return res;
      }
    }
  });
  
  function __getIEVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    return rv;
  }
  
  function __getOperaVersion() {
    var rv = 0; // Default value
    if (window.opera) {
      var sver = window.opera.version();
      rv = parseFloat(sver);
    }
    return rv;
  }
  
  var __userAgent = navigator.userAgent;
  var __isIE = navigator.appVersion.match(/MSIE/) != null;
  var __IEVersion = __getIEVersion();
  var __isIENew = __isIE && __IEVersion >= 8;
  var __isIEOld = __isIE && !__isIENew;
  
  var __isFireFox = __userAgent.match(/firefox/i) != null;
  var __isFireFoxOld = __isFireFox
      && ((__userAgent.match(/firefox\/2./i) != null) || (__userAgent
          .match(/firefox\/1./i) != null));
  var __isFireFoxNew = __isFireFox && !__isFireFoxOld;
  
  var __isWebKit = navigator.appVersion.match(/WebKit/) != null;
  var __isChrome = navigator.appVersion.match(/Chrome/) != null;
  var __isOpera = window.opera != null;
  var __operaVersion = __getOperaVersion();
  var __isOperaOld = __isOpera && (__operaVersion < 10);
  
  function __parseBorderWidth(width) {
    var res = 0;
    if (typeof (width) == "string" && width != null && width != "") {
      var p = width.indexOf("px");
      if (p >= 0) {
        res = parseInt(width.substring(0, p));
      } else {
        // do not know how to calculate other values (such as 0.5em or 0.1cm)
        // correctly now
        // so just set the width to 1 pixel
        res = 1;
      }
    }
    return res;
  }
  
  // returns border width for some element
  function __getBorderWidth(element) {
    var res = new Object();
    res.left = 0;
    res.top = 0;
    res.right = 0;
    res.bottom = 0;
    if (window.getComputedStyle) {
      // for Firefox
      var elStyle = window.getComputedStyle(element, null);
      res.left = parseInt(elStyle.borderLeftWidth.slice(0, -2));
      res.top = parseInt(elStyle.borderTopWidth.slice(0, -2));
      res.right = parseInt(elStyle.borderRightWidth.slice(0, -2));
      res.bottom = parseInt(elStyle.borderBottomWidth.slice(0, -2));
    } else {
      // for other browsers
      res.left = __parseBorderWidth(element.style.borderLeftWidth);
      res.top = __parseBorderWidth(element.style.borderTopWidth);
      res.right = __parseBorderWidth(element.style.borderRightWidth);
      res.bottom = __parseBorderWidth(element.style.borderBottomWidth);
    }
    
    return res;
  }
});ex.using([ 
	'ex.base.Point', 
	'ex.base.Vector',
	'ex.display.Renderable'
], function() {
	ex.define("ex.world.Layer", ex.display.Renderable, {

		/**
		 * A collection of items at a certain z-index in a map.
		 * 
		 * @name ex.world.Layer
		 * 
		 * @param {String} name name of the layer (mostly for IDE purposes)
		 * @param {ex.display.SpriteMap} map tile data for the layer
		 * @param {ex.base.Point} origin origin of the layer, defaults to (0,0) 
		 * 		if not supplied
		 * @param {ex.base.Vector} scrollFactor a multiplier that affects the 
		 * 		scroll rate relative to the camera
		 * 
		 * @property {String} name the name of the layer (mostly for 
		 * 		labeling in the IDE)
		 * @property {Object[]} items an array of all items in the layer
		 * @property {ex.base.Vector} position the starting location of the 
		 * 		layer
		 * @property {ex.base.Vector} scrollFactor the multiplier for the 
		 * 		amount of scroll per pixel moved by the camera, can be 
		 * 		used to simulate depth of field.
		 * 
		 * @constructor
		 */
		constructor : function(name, map, origin, scrollFactor) {
			this.name = name;
			this.items = [];
			this.map = map;
			if(this.map != null) {
				this.items.push(this.map);
			}

			if (origin == null) {
				this.position = new ex.base.Point(0, 0);
			} else {
				this.position = origin;
			}

			if (scrollFactor == null) {
				this.scrollFactor = new ex.base.Vector(1, 1);
			} else {
				this.scrollFactor = scrollFactor;
			}
			
			this._super("constructor", [true, 1.0]);
		},

		/**
		 * Adds an item to the layer, could be anything really...
		 * 
		 * @function
		 * @name addItem
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Object} item something that belongs in the layer
		 */
		addItem : function(item) {
			if(item instanceof ex.world.CollisionMap){
				if(this.map == null){
					this._setMap(item);
				} else {
					console.error("Layers cannot contain more than one CollisionMap");
				}
			} else {
				item.visible = this.visible;
				item.opacity = this.opacity;
				this.items.push(item);
			}
		},
		
		/**
		 * Retrieves an item by name.
		 * 
		 * @function
		 * @name getItem
		 * @memberOf ex.world.Layer
		 * 
		 * @param {String} name name of the item to retrieve
		 * 
		 * @returns {Object} returns the item if found, otherwise null
		 */
		getItem: function(name) {
			var index = this.items.length;
			while(index--) {
				if(this.items[index].name == name){
					return this.items[index];
				}
			}
		},
		
		_setMap : function(map) {
			this.map = map;
			this.items.push(this.map);
		},
		
		/**
		 * removes an item from the layer
		 * 
		 * @function
		 * @name removeItem
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Object} item pointer to item that needs removing
		 */
		removeItem: function(item) {
			var index = this.items.length;
			while(index--) {
				if(this.items[index] === item) {
					this.items.splice(index, 1);
				}
			}
		},

		/**
		 * Performs actions every time period dt
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Number} dt delta time, length of each time cycle
		 */
		update : function(dt) {
			var index = this.items.length;
			while(index--){
				this.items[index].update(dt);
			}
		},

		/**
		 * Supplies a canvas context and camera parameters for
		 * rendering to the canvas.
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 * @param {Number} camWidth viewport width
		 * @param {Number} camHeight viewport height
		 */
		render : function(context, camX, camY, camWidth, camHeight) {
			if (!this.isVisible()) // Don't render if it won't be seen
				return;
			
			// render items
			var count = this.items.length;
			while (count--) {
				this.items[count].render(
						context, 
						camX * this.scrollFactor.x,
						camY * this.scrollFactor.y, 
						camWidth, 
						camHeight);
			}
		},
		
		debugRender: function (context, camX, camY, camWidth, camHeight) {
			this.render(context, camX, camY);
			var count = this.items.length;
			while (count--) {
				this.items[count].debugRender(
						context, 
						camX * this.scrollFactor.x, 
						camY * this.scrollFactor.y,
						camWidth, 
						camHeight);
			}
		}
	});
});ex.using([ 
    'ex.world.Layer' 
], function() {
	ex.define("ex.world.Map", {
		/**
		 * Builds the map with a name and an empty set of layers
		 * 
		 * @name ex.world.Map
		 * 
		 * @param {String} name name of map
		 * 
		 * @property {String} name
		 * @property {ex.world.Layer[]} layers
		 * 
		 * @constructor
		 */
		constructor : function(name) {
			this.name = name;
			this.layers = [];
		},

		/**
		 * Adds a layer to the the end of layers.
		 * 
		 * @function
		 * @name addLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param layer
		 */
		addLayer : function(layer) {
			if (layer != null){
				this.layers.push(layer);
			}
		},
		
		/**
		 * Retrieves a layer from the map by name.
		 * 
		 * @function
		 * @name getLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param {String} name
		 * @returns {ex.world.Layer} returns null if no layer is found
		 * 		by the supplied name.
		 */
		getLayer: function(name) {
			if(name == null)
				return null;
			
			var index = this.layers.length;
			while(index--){
				if(this.layers[index].name == name){
					return this.layers[index];
				}
			}
			
			// if not found...
			return null;
		},

		/**
		 * Removes the layer at the specified index.
		 * 
		 * @function
		 * @name removeLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param {String} name name of layer to remove
		 */
		removeLayer : function(name) {
			var index = this.layers.length;
			while(index--) {
				if(this.layers[index].name == name){
					this.layers.splice(index, 1);
				}
			}
		},

		/**
		 * Toggles layer visiblity.
		 * 
		 * @function
		 * @name toggleLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param {Number} layerId index of layer to toggle
		 */
		toggleLayer : function(layerId) {
			var layer = this.layers[layerId];
			layer.visible = !layer.visible;
		},

		/**
		 * Performs actions every time period dt.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.Map
		 * 
		 * @param {Number} dt delta time, length of each time cycle
		 */
		update : function(dt) {
			var index = this.layers.length;
			while(index--) {
				this.layers[index].update(dt);
			}
		},

		/**
		 * Supplies a canvas context and camera parameters for
		 * rendering to the canvas.
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.world.Map
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 * @param {Number} camWidth viewport width
		 * @param {Number} camHeight viewport height
		 */
		render : function(context, camX, camY, camWidth, camHeight) {
			var i = this.layers.length;
			while (i--) {
				this.layers[i].render(context, camX, camY, camWidth, camHeight);
			}
		}
	});
});ex.using([
  'ex.event.EventTarget'
], function () {
  ex.define('ex.world.Timer', ex.event.EventTarget, {
    constructor: function (options) {
      this.defaults = {
        delay: 1,
        length: 1,
        onTick: null,
        onComplete: null
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.started = false;
      this.duration = 0;
      this.tick = 0;
      
      this._super('constructor');
    },
    
    start: function () {
      if(this.options.length) {
        if(this.duration > this.options.length) {
          return;
        }
      }
      this.started = true;
    },
    
    reset: function () {
      this.started = false;
      this.duration = 0;
      this.tick = 0;
    },
    
    stop: function () {
      this.started = false;
    },
    
    update: function (dt) {
      if(this.started) {
        // Add to our duration.
        this.duration += dt;
        this.tick += dt;
        
        // Check for tick.
        if(this.tick > this.options.delay) {
          this.tick -= this.options.delay;
          if(this.options.onTick) {
            this.options.onTick();
          }
          this.dispatchEvent('tick');
        }
        
        // Check for complete.
        if(this.options.length > 0) {
          if(this.duration > this.options.length) {
            if(this.options.onComplete) {
              this.options.onComplete();
            }
            this.dispatchEvent('complete');
            this.stop();
          }
        }
      }
    },
    
    destroy: function () {
      delete this.options['onTick'];
      delete this.options['onComplete'];
      delete this.options;
      this.started = false;
    }
  });
});ex.using([
    "ex.event.EventTarget"
], function() {
	ex.define("ex.world.Trigger", ex.event.EventTarget, {
		/**
		 * Trigger:
		 * 
		 * A special Entity with no render
		 * function used specifically to
		 * trigger events on contact with other Entities.
		 * 
		 * Properties:
		 * position
		 * width
		 * height (hitbox)
		 * trigger requirement
		 * trigger event
		 */
		constructor: function(position, width, height) {
			this.position = position;
			this.velocity = new ex.base.Vector(0,0);
			this.width = width;
			this.height = height;
			this.anchored = true;
			this.collides = true;
			this.type = "Trigger";
			
			this._super('constructor', []);
		},
		
		onCollide: function(target, data){
			this.dispatchEvent(target.name, data);
		},
		
		update: function(dt) {
			
		},
		
		setupDom: function (el) {
      
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      
    },
    
    destroyDom: function (el) {
      
    },
		
		render2dCanvas: function() {
			
		},
		
		debugRender: function() {
			
		}
	});
});