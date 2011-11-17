ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Input',
  'ex.util.GameController',
  'ex.base.Vector'
], function() {
	ex.define("ex.util.InputController", ex.base.GlobalComponent, {
		__alias: 'ex.Input',
	  
	  __statics: {
	    _controllers: [],
	    
	    _inputControllerMap: [],
	    
	    _playerControllerMap: {
	      jump: [],
	      left: [],
	      right: [],
	      down: [],
	      shoot: []
	    },
	    
	    // Mouse
	    mouse: {
	      position: new ex.base.Vector(0,0),
	      lastPosition: new ex.base.Vector(0,0),
	      pressed: {
	        LMB: 0,    // left click
	        MMB: 0,    // middle click
	        RMB: 0     // right click
	      }
	    },
	    
	    // Keyboard
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
	    
	    addController: function(playerId) {
	      this._controllers[playerId] = new ex.util.GameController(this._playerControllerMap);
	    },
	    
	    update: function(dt) {
	      var index = this._inputControllerMap.length;
	      var button = '';
	      var eventTokens = '';
	      while(index--) {
	        button = this._inputControllerMap[index][0];
	        eventTokens = this._inputControllerMap[index][1].split(' ');
	        
	        switch(eventTokens[0]){
	          case 'keypressed':
	            if(this.keyboard.pressed[eventTokens[1]] > 0) {
	              this._sendCommandToControllers(button);
	              this.keyboard.pressed[eventTokens[1]] = 2;
	            }
	            break;
	          case 'keydown':
	            if(this.keyboard.pressed[eventTokens[1]] == 1) {
	              this._sendCommandToControllers(button);
	              this.keyboard.pressed[eventTokens[1]]++;
	            }
	            break;
	          case 'keyup':
	            if(this.keyboard.pressed[eventTokens[1]] == -1) {
	              this._sendCommandToControllers(button);
	              this.keyboard.pressed[eventTokens[1]] = 0;
	            }
	            break;
	          case 'mousedown':
	          case 'mouseup':
	          case 'mousemove':
	          case 'mousedrag':
	        }
	      }
	    },
	    
	    _sendCommandToControllers: function(button) {
	      var controllerIndex = this._controllers.length;
        while(controllerIndex--) {
          this._controllers[controllerIndex]._fireActions(button);
        }
	    },
	    
	    loadInputControllerMap: function(inputControllerMap) {
	      this._inputControllerMap = inputControllerMap;
	      this._addEventListenersOnInput();
	    },
	    
	    _addEventListenersOnInput: function() {
	      ex.event.listen(document, 'keydown', this._onKeyDown);
	      ex.event.listen(document, 'keyup', this._onKeyUp);
	      ex.event.listen(document, 'mousedown', this._onMouseDown);
	      ex.event.listen(document, 'mouseup', this._onMouseUp);
	      ex.event.listen(document, 'mousemove', this._onMouseMove);
	    },
	    
	    _onKeyDown: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        if(ex.Input.keyboard.pressed[selector] == null || ex.Input.keyboard.pressed[selector] < 0){
          ex.Input.keyboard.pressed[selector] = 1;
        }
	    },
	    
	    _onKeyUp: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        ex.Input.keyboard.pressed[selector] = -1;
	    },
	    
	    _onMouseDown: function(event) {
	      console.log("mousedown!");
	      ex.Input.mouse.pressed.LMB = true;
	    },
	    
	    _onMouseUp: function(event) {
	      console.log("mouseup!");
	      ex.Input.mouse.pressed.LMB = false;
	    },
	    
	    _onMouseMove: function(event) {
	      if(ex.Input.mouse.pressed.LMB) {
	        console.log("mousedrag!");
	      } else {
	        console.log("mousemove!");
	      }
	    }
	    
		}
	});
});