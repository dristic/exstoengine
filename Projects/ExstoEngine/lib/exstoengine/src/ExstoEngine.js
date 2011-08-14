var ex = {};

(function () {
	"use strict";
	
	/**
	 * ex helper functions for basic library use
	 */
	ex = {
		/**
		 * Copies the values from one object to another object.
		 * @param {Object} object The object to copy values to
		 * @param {Object} other The object to copy values from
		 * @return {Object} Returns the new object for chaining
		 */
		extend: function (object, other) {
			for(var prop in other) {
				object[prop] = other[prop];
			}
			return object;
		},
		
		/**
		 * Calls the function using apply which sets the 'this' when running
		 * that function to the object specified.
		 * @param {Object} object Object to be bound
		 * @param {Function} func Function to receive object
		 * @return {Function} Function with object bound
		 */
		bind: function (object, func) {
			return function() {
				return func.apply(object, arguments);
			};
		},
		
		clone: function (object) {
			function Constructor() { }
		    Constructor.prototype = object;
		    return new Constructor();
		},
		
		each: function (object, func) {
			for (var property in object) {
		        if (Object.prototype.propertyIsEnumerable.call(object, property)) {
		            action(property, object[property]);
		        }
		    }
		}
	};
	
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
		 * @param namespaces {String} dependencies to be loaded
		 * @param func {Function} the class being defined
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
					console.log('Exists: ' + namespace);
				}
			}
			
			if(loaded == true) {
				func();
				return;
			}
		},
		
		require: function(namespace) {
			ex.Loader.asyncFile(this.namespaceToUrl(namespace));
		},
		
		/**
		 * Create relationship between the namespace and class
		 * for forward and reverse lookup. Saves forward lookup in
		 * _namespaces and reverse in _classes.
		 * @param namespace {String or String[]} namespace in relationship
		 * @param func {Function} class in relationship
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
			var fileUrl = ex.config.baseUrl;
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
	
	ex.Loader = {
		_urls: {},
		_callbacks: {},
		
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
			
			// Add script tag with on load parameter
			this.addScriptTag(url, function () {
				ex.Loader.onScriptLoad(url);
				delete this.onload;
			});
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
		 * @param url src value for script tag
		 * @returns {___script0} DOM object
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
		}
	};
	
	function preload() {
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
		
		ex.require('ex.Class');
	}
	
	preload();
	
})();