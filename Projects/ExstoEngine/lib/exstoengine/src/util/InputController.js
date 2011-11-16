ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Input',
  'ex.util.GameController'
], function() {
	ex.define("ex.util.InputController", ex.base.GlobalComponent, {
		__alias: 'ex.Input',
	  
	  __statics: {
	    _controllers: [],
	    
	    _input: new ex.util.Input(),
	    
	    _inputControllerMap: [],
	    
	    _playerControllerMap: {
	      jump: [],
	      left: [],
	      right: [],
	      down: [],
	      shoot: []
	    },
	    
	    _pressed: {},
	    
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
	            if(this._pressed[eventTokens[1]] > 0) {
	              console.log("firing", button, "on", eventTokens[0], eventTokens[1]);
	              this._sendCommandToControllers(button);
	              this._pressed[eventTokens[1]] = 2;
	            }
	            break;
	          case 'keydown':
	            if(this._pressed[eventTokens[1]] == 1) {
	              console.log("firing", button, "on", eventTokens[0], eventTokens[1]);
	              this._sendCommandToControllers(button);
	              this._pressed[eventTokens[1]]++;
	            }
	            break;
	          case 'keyup':
	            if(this._pressed[eventTokens[1]] == -1) {
	              console.log("firing", button, "on", eventTokens[0], eventTokens[1]);
	              this._sendCommandToControllers(button);
	              this._pressed[eventTokens[1]] = 0;
	            }
	            break;
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
	      ex.event.listen(document, 'keydown', this._updatePressedKey);
	      ex.event.listen(document, 'keyup', this._updateReleasedKey);
	    },
	    
	    _updatePressedKey: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        if(ex.Input._pressed[selector] == null || ex.Input._pressed[selector] < 0){
          ex.Input._pressed[selector] = 1;
        }
	    },
	    
	    _updateReleasedKey: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        ex.Input._pressed[selector] = -1;
	    }
		}
	});
});