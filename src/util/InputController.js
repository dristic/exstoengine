ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Input',
  'ex.util.GameController',
  'ex.base.Vector'
], function() {
	ex.define("ex.util.InputController", ex.base.GlobalComponent, {
		__alias: 'ex.Input',
	  
	  __statics: {
	    // References
	    _inputTarget: document,
	    _engine: null,
	    clickableObjects: [],
	    
	    // Bindings and Controllers
	    _inputControllerMaps: [],
	    _controllers: [],
	    
	    // Mouse data
	    mouse: {
	      position: new ex.base.Vector(0,0),
	      lastPosition: new ex.base.Vector(0,0),
	      event: {
	        LMB: false,  // left click
	        MMB: false,  // middle click
	        RMB: false,  // right click
	        move: false,
	        drag: false
	      }
	    },
	    
	    // Keyboard data
	    keyboard: {
	      event: {}
	    },
	    
	    /**
	     * Returns the gameController assigned to a specific
	     * player.
	     * 
	     * @returns {ex.util.GameController}
	     */
	    getController: function(playerId) {
	      return this._controllers[playerId];
	    },
	    
	    addController: function(playerId, controlMap) {
	      this._controllers[playerId] = new ex.util.GameController(
	          this._inputControllerMaps[playerId], this);
	    },
	    
	    update: function(dt) {
	      var index = this._controllers.length;
	      while(index--) {
	        this._controllers[index].update(dt);
	      }
	    },
	    
	    /**
	     * Takes an array of objects and only tracks ones with 
	     * the property 'clickable = true'.
	     */
	    trackClickableObjects: function(objects) {
	      var index = objects.length;
	      while(index--) {
	        if(objects[index].clickable) {
	          this.clickableObjects.push(objects[index]);
	        }
	      }
	    },
	    
	    /**
	     * Clears the reference array for all objects that can be clicked
	     * in the scene.
	     */
	    untrackAllClickableObjects: function() {
	      this.clickableObjects = [];
	    },
	    
	    /**
	     * Changes the target for the event listeners. Default is document.
	     */
	    changeInputTarget: function(element) {
	      this._removeEventListenersFromInput();
	      if(!element) {
	        console.log("Cannot change input target to null, defaulting to document.");
	        element = document;
	      }
	      this._inputTarget = element;
	      this._addEventListenersOnInput();
	    },
	    
	    linkToEngine: function(engine) {
	      this._engine = engine;
	      ex.Debug.log("ex.Input linked to engine.", ex.util.Logger.LEVEL.DEBUG);
	    },
	    
	    /**
	     * Loads a map that specifies the input event to controller mapping.
	     */
	    loadInputMaps: function(inputControllerMaps, controllerButtonMap) {
	      this._inputControllerMaps = inputControllerMaps;
	      this._addEventListenersOnInput();
	      
	      var index = 0,
	          ln = this._inputControllerMaps.length;
	      for(; index < ln; index++) {
	        this.addController(index, ex.clone(controllerButtonMap));
	        ex.Debug.log("Player " + index + " controller created.", ex.util.Logger.LEVEL.DEBUG);
	      }
	    },
	    
	    _addEventListenersOnInput: function() {
	      ex.event.listen('keydown', this._inputTarget, this._onKeyDown);
	      ex.event.listen('keyup', this._inputTarget, this._onKeyUp);
	      ex.event.listen('mousedown', document, this._onMouseDown);
	      ex.event.listen('mouseup', document, this._onMouseUp);
	      ex.event.listen('mousemove', document, this._onMouseMove);
	    },
	    
	    _removeEventListenersFromInput: function() {
	      ex.event.unlisten('keydown', this._inputTarget, this._onKeyDown);
        ex.event.unlisten('keyup', this._inputTarget, this._onKeyUp);
        ex.event.unlisten('mousedown', document, this._onMouseDown);
        ex.event.unlisten('mouseup', document, this._onMouseUp);
        ex.event.unlisten('mousemove', document, this._onMouseMove);
	    },
	    
	    _onKeyDown: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        ex.Input.keyboard.event[selector] = true;
	    },
	    
	    _onKeyUp: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        ex.Input.keyboard.event[selector] = false;
	    },
	    
	    _onMouseDown: function(event) {
	      ex.Input.mouse.event.LMB = true;
	    },
	    
	    _onMouseUp: function(event) {
	      ex.Input.mouse.event.LMB = false;
	    },
	    
	    _onMouseMove: function(event) {
	      // Update last mouse position
	      ex.Input.mouse.lastPosition.x = ex.Input.mouse.position.x;
	      ex.Input.mouse.lastPosition.y = ex.Input.mouse.position.y;
	      
	      // Set event flags
        ex.Input.mouse.event.move = true;
	      if(ex.Input.mouse.event.LMB) {
	        ex.Input.mouse.event.drag = true;
	      }
	      	      
        // Update current mouse position
	      if(!event) {
	        var event = window.event;
	      }
	      if(event.pageX || event.pageY) {
	        ex.Input.mouse.position.x = event.pageX;
	        ex.Input.mouse.position.y = event.pageY;
	      } else if (event.clientX || event.clientY) {
	        ex.Input.mouse.position.x = event.clientX
	          + document.body.scrollLeft;
	        ex.Input.mouse.position.y = event.clientY
	          + document.body.scrollTop;
	      }
	    }
		}
	});
});