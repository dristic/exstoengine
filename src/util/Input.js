ex.using([
  'ex.base.GlobalComponent',
  'ex.util.DOM',
  'ex.util.GameController',
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
	    
	    // References
	    _keyListenerElement: document,
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
        ex.Input.mouse.position.x = event.clientX;
        ex.Input.mouse.position.y = event.clientY;
        
        if(ex.Input._inputTarget.offsetLeft && ex.Input._inputTarget.offsetTop) {
          ex.Input.mouse.position.x -= ex.Input._inputTarget.offsetLeft;
          ex.Input.mouse.position.y -= ex.Input._inputTarget.offsetTop;
        }
	    }
		}
	});
});