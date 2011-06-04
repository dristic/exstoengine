/*
 * Solumn is an application framework for creating object oriented
 * javascript + HTML 5 applications using common methods found in
 * other programming languages such as event listeners, url loaders,
 * and more
 */
(function (window) {
	
	Object.prototype.clone = function () {
	    function Constructor() { }
	    Constructor.prototype = this;
	    return new Constructor();
	};
	    
	Object.prototype.mixInto = function (mixIn) {
	    mixIn.forEachIn(ex.bind(this, _assign));
	};
	
	function _assign(name, value) {
	    this[name] = value;
	};
	
	    //--Calls a function on each value of an array
	Object.prototype.forEachIn = function (action) {
	    for (var property in this) {
	        if (Object.prototype.propertyIsEnumerable.call(this, property)) {
	            action(property, this[property]);
	        }
	    }
	};
	
	/*
	 * Event Dispatcher allows other objects to listen for events
	 * being fired on another object
	 * 
	 */
	function EventDispatcher()
	{
		
	};
	
	EventDispatcher.prototype = {
		_listeners: {},
		
		addListener: function(type, func) {
			// If this is a fire once and has already fired, run function
			if(this._listeners[type] == "fired") {
				func();
			} else {
				// Create array if it does not exist
				if(typeof this._listeners[type] == "undefined") {
					this._listeners[type] = [];
				}
				
				this._listeners[type].push(func);
			}
		},
		
		fire: function(event) {
			// Loop through listeners and fire them
			var i = 0;
			while(i++ < this._listeners[event.type].length) {
				this._listeners[event.type][i]();
			}
		},
		
		fireOnce: function(event) {
			this.fire(event);
			
			// Set listeners to "fired"
			this._listeners[event.type] = "fired";
		},
		
		removeListener: function(type, func) {
			var i = 0;
			while(i++ < this._listeners[type].length) {
				if(this._listeners[type][i] == func) {
					this._listeners[type].splice(i, 1);
				}
			}
		}
	};
	
	window.EventDispatcher = EventDispatcher;

	/*
	 * Bulk Loader loads a set of files at once, and fires events
	 * when those files have finished firing
	 */
	function BulkLoader()
	{
		
	};
	
	BulkLoader.prototype = EventDispatcher.prototype.clone();
	
	BulkLoader.prototype.mixInto({ 
		filesToLoad: 0,
		filesLoaded: 0
	});
	
})(window);