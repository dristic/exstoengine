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
		bind: function (object, func) {
			return function() {
				return func.apply(object, arguments);
			};
		},
		
		_namespaces: {},
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
		
		using: function (namespaces, func) {
			if(!ex.ready) {
				// Preload if not already
				preload();
				
				ex.onReady(function () { 
					ex.using(namespaces, func); 
				});
				return;
			}
			
			if(namespaces == null){
				func();
				return;
			}
			
			var i = -1;
			var j = -1;
			while(++i < namespaces.length){
				// Break up namespace by '.'
				var parts = namespaces[i].split(".");
				// Build file url
				var fileUrl = ex.config.baseUrl;
				
				j = -1;
				while(++j < parts.length) {
					fileUrl += "/" + parts[j];
				}
				fileUrl += '.js';
				//alert(fileUrl + "\n\n" + func);
				
				// Write script object
				var scriptTag = ex.helpers.createScriptTag(fileUrl);
				scriptTag.onload = function(){func();};
			}
		},
		
//		using: function (namespaces, func) {
//			if(ex.ready == true) {
//				var i = -1;
//				while(++i < namespaces.length)
//				{
//					var namespace = namespaces[i];
//					
//					// Check if namespaces are loaded
//					if(this._namespaces[namespace] != null) {
//						// Do nothing
//					} else {
//						// If they are not loaded, import them
//						this._importNamespace(namespace, func);
//					}
//				}
//				
//				ex.loader.startQueue(func);
//			} else {
//				// Preload if not already
//				preload();
//				
//				ex.onReady(function () {
//					ex.using(namespaces, func);
//				});
//			}
//		},
		
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
			//document.write('<script type="text/javascript" src="' + fileUrl + '"></script>');
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
		
		//--Includes an external JS file
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
					runFunc();
					
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
		// Manually load base classes before anything else
		ex._importNamespace("ex.Class", startEngine);
		ex._importNamespace("ex.Helpers", startEngine);
		
		ex.loader.startQueue(startEngine);
	}
	
	function startEngine() {
		ex.ready = true;
		ex._fire("ready");
	}
	
})(window);