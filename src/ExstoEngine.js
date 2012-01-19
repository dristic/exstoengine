/**
 * The base ExstoEngine library.
 * 
 * @name ex
 * 
 * @constructor
 */
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
	
	/**
	 * Copies the values from one object to another object.
	 * 
	 * @function
	 * @name extend
	 * @memberOf ex
	 * 
	 * @param {Object} object The object to copy values to
	 * @param {Object} other The object to copy values from
	 * 
	 * @return {Object} Returns the new object for chaining
	 */
	ex.extend = function (object, other) {
		for(var prop in other) {
			object[prop] = other[prop];
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
			function Constructor() {};
		    Constructor.prototype = object;
		    return new Constructor();
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
			array.splice(array.indexOf(object), 1);
		},
		
		average: function(array) {
			var ret = 0;
			
			var i = array.length;
			while(i--) {
				ret += array[i];
			}
			
			ret = ret / array.length;
			
			return ret;
		}
	};
	
	/**
	 * Returns true of object is an Array
	 */
	ex.isArray = function(object) {
    return object.constructor == Array;
	}
	
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
			if(typeof namespaces == 'undefined'){
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
					delete this.onload;
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

		var _base = ex.clone(base.prototype);
		function NewClass() {
			// empty function to hold new class
			base.apply(this);
		};

		// Set constructor: Priority on extension, then base class
		if (typeof extension.constructor == "function"
				&& extension.constructor != Object) {
			NewClass = extension.constructor;
		} else if (typeof _base.constructor == "function") {
			NewClass.constructor = _base.constructor;
		}

		// clone, mix-in, set _super call, and add to namespace
		NewClass.prototype = _base;
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