(function (window) {
	"use strict";
	
	var baseUrl = "../";
	
	/**
	 * The main namespace for all engine classes and global functions.
	 * 
	 */
	var _ex = {
		bind: function (object, func) {
			return function() {
				return func.apply(object, arguments);
			};
		},
		
		//--Namespaces
		base: {},
		Display: {},
		Util: {},
		World: {},
		
		_scriptsToLoad: 0,
		_scriptsLoaded: 0,
		_isReady: false,
		_listeners: {},
		
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
			// Check if namespaces are loaded
			
			// Setup function to run on namespaces loading complete
		},
		
		//--Includes an external JS file
		include: function (namespace) {
			//--If were passing in a list of includes, iterate through them
			if(typeof namespace == "object") {
				for(var i = 0; i < namespace.length; i++) {
					_ex.include(namespace[i]);
				}
			} else {
				this._scriptsToLoad++;
				
				var head = document.getElementsByTagName("head").item(0);
				var script = document.createElement("script");
				script.language = "javascript";
				script.type = "text/javascript";
				script.src = baseUrl + namespace;
				script.onload = function () {
					_ex._scriptsLoaded++;
					
					if(_ex._scriptsLoaded == _ex._scriptsToLoad) {
						_ex._isReady = true;
						_ex._fire("ready");
					}
				};
				head.appendChild(script);
			}
		},
		
		ajax: function () {
			//--Use ajax call to grab file and append it to the document
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
			
			xmlhttp.open("GET", baseUrl + namespace);
			xmlhttp.send();
		}
	};
	
	/**
	 * Include files
	 */	
	//--Include:
	//--Is defined? do nothing
	//--Is not defined? load based on '.'
	//--Use modules[] to keep track
	
	//--Engine files
	_ex.include([
			//--Base
			"js/exstoengine/Helpers.js",
			"js/exstoengine/Class.js",
			 ]);
	//--
	
	//--Expose the engine
	window.ex = window.ExstoEngine = _ex;
	
})(window);