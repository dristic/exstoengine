 (function (window) {
	"use strict";
	
	Array.prototype.contains = function(item) {
		var i = this.length;
		while(i--) {
			if(this[i] === item) {
				return true;
			}
		}
		
		return false;
	};
	
	/**
	 * The main namespace for all engine classes and global functions.
	 * 
	 */
	var _ex;
	
	window.ex = _ex = {
		
		/**
		 * 
		 * @param object {Object} object to be bound
		 * @param func {Function} function to receive object
		 * @returns {Function} function with object bound
		 */
		bind: function (object, func) {
			return function() {
				return func.apply(object, arguments);
			};
		},
		
		_namespaces: {},		// registered namespace -> class relations
		_classes: {},			// registered class -> namespace relations
		_loaded: {},			// loaded namespaces
		_listeners: {},
		ready: false,
		
		config: {
			baseUrl: ""
		},
		
		onReady: function (func) {
			if(ex._isReady == true) {
				func();
			} else {
				if(typeof ex._listeners["ready"] == "undefined") {
					ex._listeners["ready"] = [];
				}
				
				ex._listeners["ready"].push(func);
			}
		},
		
		_fire: function (event) {
			if(this._listeners[event] != null) {
				for(var i = 0; i < this._listeners[event].length; i++) {
					this._listeners[event][i]();
				}
			}
		},
		
		/**
		 * prepares all dependencies for loading then starts
		 * the loader queue
		 * @param namespaces {String} dependencies to be loaded
		 * @param func {Function} the class being defined
		 */
		using: function (namespaces, func) {
			// If ex is not setup, wait to rerun this function
			if(!ex.ready) {
				ex.onReady(function() {
					ex.using(namespaces, func);
				});
				return;
			}
			
			// If the class has no dependencies, load it and return
			if(typeof namespaces == 'undefined'){
				func();
				return;
			}
			var index = namespaces.length;
			while(index--){
				var namespace = namespaces[index];
				if(typeof this._namespaces[namespace] == 'undefined'){
					this._importNamespace(namespace, func);
					this.addRelationship(namespace, func);
				}				
			}
			ex.loader.startQueue(func);
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
		_importNamespace: function(namespace, func) {
			// Break up namespace by '.'
			var parts = namespace.split(".");
			
			// Build file url
			var fileUrl = ex.config.baseUrl;
			var i = -1;
			while(++i < parts.length) {
				fileUrl += "/" + parts[i];
			}
			fileUrl += '.js';
			
			// Include file
			ex.loader.queue(fileUrl, func);
		},
		
		namespace: function (namespace) {
			// Break up namespace by '.'
			var parts = namespace.split('.');
			
			// If the part exists, do nothing, else create it
			for(var i = 0; i < parts.length; i++) {
				var part = parts[i];
				
				// Loop up from 0 to grab namespace parent object
				var context = window;
				for(var n = 0; n < i; n++) {
					context = context[parts[n]];
				}
				
				// Create the namespace if it exists, else do nothing
				context[part] = context[part] || {};
			}
		},
		
		/**
		 * Includes an external javascript file
		 * @param namespace {String} a single namespace or array of namespaces
		 * @param onLoad {Function} function to call when inclusion is complete
		 */
		include: function (namespace, onLoad) {
			//--If were passing in a list of includes, iterate through them
			if(typeof namespace == "object") {
				for(var i = 0; i < namespace.length; i++) {
					ex.include(namespace[i]);
				}
			} else {
				this._scriptsToLoad++;
				
				var script = ex.helpers.createScriptTag(namespace);
				
				script.onload = function () {
					onLoad();
				};
			}
		},
		
		/**
		 * Adds script tag to DOM
		 * @param fileName {String} script tag's src parameter
		 */
		ajaxScript: function (fileName) {
			//--Use ajax call to grab a script and append it to the document
			var xmlhttp;
			
			if(window.XMLHttpRequest) {
				//--If XML Http request is available (FF, Chrome, IE 8+)
				xmlhttp = new XMLHttpRequest();
			} else {
				//--If http request is not available (IE 6, 7)
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			xmlhttp.onreadystatechange = function () {
				//--If the request was successful
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					// Create a script tag and add it to the html
					var head = document.getElementsByTagName("head").item(0);
					var script = document.createElement("script");
					script.language = "javascript";
					script.type = "text/javascript";
					script.defer = true;
					script.text = xmlhttp.responseText;
					head.appendChild(script);
					
					ex._scriptsLoaded++;
					if(ex._scriptsLoaded == ex._scriptsToLoad) {
						ex._isReady = true;
						ex._fire("ready");
					}
				}
			};
			
			xmlhttp.open("GET", ex.config.baseUrl + fileName);
			xmlhttp.send();
		}
	};
	
	window.ex.helpers = {
		/**
		 * Creates script DOM object and appends to DOM head
		 * @param url src value for script tag
		 * @returns {___script0} DOM object
		 */
		createScriptTag: function(url) {
			// Create a script tag and add it to the html
			var head = document.getElementsByTagName("head").item(0);
			var script = document.createElement("script");
			script.language = "javascript";
			script.type = "text/javascript";
			script.defer = false;
			script.src = url;
			head.appendChild(script);
			
			return script;
		}
	};
	
	window.ex.loader = {
		_queue: [],
		_requests: {},
		
		queue: function(url, func) {
			if(typeof this._requests[func] == "undefined") {
				// Create queue object
				this._requests[func] = {
					_toLoad: 0,
					_loaded: 0,
					_urls: []
				};
			}
			
			// Add file to queue for that function
			this._requests[func]._urls.push(url);
			
			// Add this to global queue
			if(this._queue.contains(func) == false) {
				this._queue.push(func);
			}
		},
		
		startQueue: function(func) {
			// If no files are queued, call function
			if(typeof this._requests[func] == "undefined") {
				func();
			} else {
				// Get _toLoad
				this._requests[func]._toLoad = this._requests[func]._urls.length;
				
				for(var i = 0; i < this._requests[func]._urls.length; i++) {
					var url = this._requests[func]._urls[i];
					
					// Write script object
					var scriptTag = ex.helpers.createScriptTag(url);
					
					// Set on load to check for completion
					scriptTag.onload = function () {
						ex.loader._onLoaded(func);
					};
				}
			}
		},
		
		_onLoaded: function(func) {
			// Add to _loaded
			this._requests[func]._loaded++;
			
			// Ensure this is the latest script to load, if not, wait
			var i = this._queue.length;
			while(i--) {
				var runFunc = this._queue[i];
				
				if(this._requests[runFunc]._loaded == this._requests[runFunc]._toLoad) {
					//runFunc();
					func();
					
					// Cleanup
					this._requests[runFunc] = null;
					this._queue.splice(i, 1);
				} else {
					break;
				}
			}
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
				ex.config.baseUrl = script.src.split("/ex/ExstoEngine.js", 1)[0];
			}
		}
		
		// Manually load base classes before anything else
		ex._importNamespace("ex.Class", startEngine);
		ex._importNamespace("ex.Helpers", startEngine);
		
		ex.loader.startQueue(startEngine);
	}
	
	function startEngine() {
		ex.ready = true;
		ex._fire("ready");
	}
	
	preload();
	
})(window);