ex.using([], function () {
  
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
        _listeners: {},
      
        constructor: function () {
          this._listeners = {};
        },
        
        addEventListener: function (event, func) {
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
          if(this._listeners[event] == null){
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

});