ex.using([
   "ex.Class"
], function () {
	ex.namespace("ex.event");
	
	// Static functions for listening and unlistening to events
	window.ex.event = {
		/*
		 * Listens to an event on a javascript object
		 * or a DOM object
		 */
		listen: function (target, event, func, handler) {
			// Bind to a different handler if needed
			if(handler != null) {
				func = ex.bind(handler, func);
			}
			
			// Figure out what event handling the object supports
			// and use it to listen on
			if(target.attachEvent) {
				target.attachEvent(event, func);
			} else if(target.addEventListener) {
				target.addEventListener(event, func);
			}
		},
		
		unlisten: function (target, event, func) {
			if(target.removeEventListener) {
				target.removeEventListener(event, func);
			}
		}
	};
	
	// The extendable event target object
    window.ex.event.EventTarget = new ex.Class({
        constructor: function () {
        	this._listeners = [];
        },
        
        addEventListener: function (event, func) {
        	if(typeof this._listeners[event] == "undefined") {
        		this._listeners[event] = [];
        	}
        	
        	this._listeners[event].push(func);
        },
        
        dispatchEvent: function (event, params) {
        	var i = this._listeners[event].length;
        	while(i--) {
        		var func = this._listeners[event][i];
        		func(event);
        	}
        },
        
        removeEventListener: function (event, func) {
        	this._listeners[event].splice(this._listeners[event].indexOf(func), 1);
        }
    });

});