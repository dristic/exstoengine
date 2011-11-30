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
	    _playerControllerMap: {},
	    _controllers: [],
	    
	    // Mouse data
	    mouse: {
	      position: new ex.base.Vector(0,0),
	      lastPosition: new ex.base.Vector(0,0),
	      pressed: {
	        LMB: 0,    // left click
	        MMB: 0,    // middle click
	        RMB: 0     // right click
	      }
	    },
	    
	    // Keyboard data
	    keyboard: {
	      pressed: {}
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
	      this._controllers[playerId] = new ex.util.GameController(controlMap);
	    },
	    
	    update: function(dt) {
	      var index = this._inputControllerMaps.length;
	      while(index--) {
	        this._updateController(index, dt);
	      }
	    },
	    
	    _updateController: function(playerId, dt) {
	      var index = this._inputControllerMaps[playerId].length;
        var pressedButtons = {};
	      var button = '';
        var eventTokens = '';
        while(index--) {
          button = this._inputControllerMaps[playerId][index][0];
          eventTokens = this._inputControllerMaps[playerId][index][1].split(' ');
          
          // If bound keyboard/mouse button is pressed, add it to pressedButtons
          if(this.keyboard.pressed[eventTokens[0]] > 0
              || this.mouse.pressed[eventTokens[0]]) {
            pressedButtons[button] = 1;
          } else {
            pressedButtons[button] = 0;
          }        
        }
        
        this._controllers[playerId].update(pressedButtons, dt);
	    },
	    
//	    _sendCommandToController: function(playerId, button) {
//	      console.log("controller", playerId, ", button", button);
//        this._controllers[playerId]._fireActions(button);
//	    },
//	    
//	    _pushClickEvents: function(eventTokens) {
//	      var index = this.clickableObjects.length;
//	      var object = {};
//	      var camX = this._engine.camera.position.x,
//	          camY = this._engine.camera.position.y;
//	      var objectX = 0,
//	          objectY = 0;
//	      while(index--) {
//	        object = this.clickableObjects[index];
//	        objectX = object.position.x - camX;
//	        objectY = object.position.y - camY;
//	        if(objectX < this.mouse.position.x
//	            && (objectX + object.width) > this.mouse.position.x
//	            && objectY < this.mouse.position.y
//	            && (objectY + object.height) > this.mouse.position.y) {
//	          console.log("You clicked on", object, "!");
//	        }
//	      }
//	    },
	    
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
        ex.Input.keyboard.pressed[selector] = 1;
	    },
	    
	    _onKeyUp: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        ex.Input.keyboard.pressed[selector] = 0;
	    },
	    
	    _onMouseDown: function(event) {
	      ex.Input.mouse.pressed.LMB = true;
	    },
	    
	    _onMouseUp: function(event) {
	      ex.Input.mouse.pressed.LMB = false;
	    },
	    
	    _onMouseMove: function(event) {
	      ex.Input.mouse.lastPosition.x = ex.Input.mouse.position.x;
	      ex.Input.mouse.lastPosition.y = ex.Input.mouse.position.y;
	      
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