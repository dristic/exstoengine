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
	      while(index--) {
	        var selector = this._inputControllerMap[index][1].split(' ')[1];
	        if(this._pressed[selector]) {
	          var controllerIndex = this._controllers.length;
	          while(controllerIndex--) {
	            this._controllers[controllerIndex]._fireActions(this._inputControllerMap[index][0]);
	          }
	        }
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
        console.log('setting ', selector, " to true!");
        ex.Input._pressed[selector] = true;
	    },
	    
	    _updateReleasedKey: function(event) {
	      var selector = ex.util.Key.names[event.keyCode];
        console.log('setting ', selector, " to false!");
        ex.Input._pressed[selector] = false;
	    }
		}
	});
});