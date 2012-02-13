ex.using([
  'ex.base.GlobalComponent',
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
	    
	    _keyListenerElement: document,
	    _inputTarget: document,
	    
	    // Keeping the current and previous state allows us to detect
	    // all forms of input. (pressed, released, down)
	    mouse: new ex.Vector(0, 0),
	    _inputState: {},
	    _previousState: {},
	    _released: [],
	    
	    update: function(dt) {
	      // Set the new state and then update the current state.
	      ex.extend(this._previousState, this._inputState);
	      var i = 0,
	          ln = this._released.length;
	      for(; i < ln; i++) {
	        this._inputState[this._released[i]] = false;
	      }
	      this._released = [];
	    },
	    
	    /**
	     * Changes the target for the mouse listeners and mouse position calculations.
	     * The mouse x and y are based off the top left corner of the inputElement it
	     * is listening to.
	     */
	    changeInputTarget: function(element) {
	      this._removeEventListenersFromInput();
	      if(!element) {
	        ex.Debug.log('"Element" can not be null in ex.Input.changeInputTarget. Defaulting to document.', 'WARNING');
	        element = document;
	      }
	      this._inputTarget = element;
	      this._addEventListenersOnInput();
	    },
	    
	    /**
	     * Loads a map that specifies the input event to controller mapping.
	     */
	    loadInputMaps: function(inputControllerMaps) {
	      var index = 0,
	          ln = inputControllerMaps.length;
	      for(; index < ln; index++) {
	        this.addController(index, inputControllerMaps[index]);
	        ex.Debug.log("Player " + index + " controller created.", ex.util.Logger.LEVEL.DEBUG);
	      }
	    },
	    
	    /**
	     * Checks if the button is pressed or held down.
	     * @param {String} key The button to check.
	     */
	    isDown: function (key) {
	      if(key.charAt && key.charAt(0) != '#') key = ex.util.Key[key];
	      return this._inputState[key];
	    },
	    
	    /**
	     * Checks if the button was just pressed this frame.
	     * @param {String} key The button to check.
	     */
	    isPressed: function (key) {
	      if(key.charAt && key.charAt(0) != '#') key = ex.util.Key[key];
	      return this._inputState[key] == true && (this._previousState[key] == false || this._previousState[key] == null);
	    },
	    
	    /**
	     * Checks if the button was just released this frame.
	     * @param {String} key The button to check.
	     */
	    isReleased: function (key) {
	      if(key.charAt && key.charAt(0) != '#') key = ex.util.Key[key];
	      return this._inputState[key] == false && this._previousState[key] == true;
	    },
	    
	    bindElement: function (downEvent, upEvent, elementId) {
	      elementId = elementId.substr(1);
	      var element = ex.Element.getById(elementId);
	      ex.event.listen(downEvent, element, this._onElementDown);
	      ex.event.listen(upEvent, element, this._onElementUp);
	    },
	    
	    _onElementDown: function (event) {
	      ex.Input._inputState['#' + event.target.id] = true;
	      ex.Input._controllerButtonDown('#' + event.target.id);
	    },
	    
	    _onElementUp: function (event) {
	      ex.Input._released.push('#' + event.target.id);
	      ex.Input._controllerButtonUp('#' + event.target.id);
	    },
	    
	    unbindElement: function (downEvent, upEvent, elementId) {
	      delete ex.Input._inputState[elementId];
	      delete ex.Input._previousState[elementId];
	      elementId = elementId.substr(1);
	      var element = ex.Element.getById(elementId);
	      ex.event.unlisten(downEvent, element, this._onElementDown);
        ex.event.unlisten(upEvent, element, this._onElementUp);
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
        ex.Input._inputState[event.keyCode] = true;
	    },
	    
	    _onKeyUp: function(event) {
        ex.Input._released.push(event.keyCode);
      },
	    
	    _onMouseDown: function(event) {
	      ex.Input._inputState[event.button] = true;
	    },
	    
	    _onMouseUp: function(event) {
	      ex.Input._released.push(event.button);
	    },
	    
	    _onMouseMove: function(event) {
        // Update current mouse position
        ex.Input.mouse.x = event.clientX;
        ex.Input.mouse.y = event.clientY;
        
        if(ex.Input._inputTarget.offsetLeft && ex.Input._inputTarget.offsetTop) {
          ex.Input.mouse.x -= ex.Input._inputTarget.offsetLeft;
          ex.Input.mouse.y -= ex.Input._inputTarget.offsetTop;
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
		}
	});
});