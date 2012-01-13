ex.using([
  'ex.base.Component'
], function() {
  ex.define("ex.util.GameController", ex.base.Component, {
    constructor: function(inputMap, inputReference) {
      // Lazy Initialization
      this.bindings = {};
      this.released = [];
      this.buttonState = {};
      this.previousState = {};
      this.actions = {};
      this.input = inputReference;
      
      this.loadInputMap(inputMap);
    },
    
    loadInputMap: function(inputMap) {
      for(var key in inputMap) {
        var binding = inputMap[key];
        
        if(binding instanceof Array == true) {
          var i = 0,
              ln = binding.length;
          for(; i < ln; i++) {
            this.bind(key, binding[i]);
          }
        } else {
          this.bind(key, binding);
        }
      }
    },
    
    bind: function (button, event) {
      // Check for binding to div elements as we have to add them to the
      // input class binding list.
      if(event.charAt(0) == '#') {
        var parts = event.split(' '),
            id = parts[0],
            type = parts[1];
        if(type == 'touch') {
          this.input.bindElement('touchstart', 'touchstop', id);
        } else if(type == 'mouse') {
          this.input.bindElement('mousedown', 'mouseup', id);
        } else {
          ex.Debug.log('ex.util.GameController.bind: Unrecognized input type ' + type + ' on ' + id, 'WARNING');
        }
        
        event = id;
      } else {
        event = ex.util.Key[event];
      }
      
      if(typeof this.bindings[event] == 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push(button);
    },
    
    update: function(dt) {
      // Fire actions based on the current controller state.
      for(var key in this.actions) {
        i = 0;
        ln = this.actions[key].length;
        var action;
        for(; i < ln; i++) {
          action = this.actions[key][i];
          //console.log(key, this.isDown(key));
          if(action.event == 'pressed') {
            if(this.isPressed(key)) action.action();
          } else if(action.event == 'down') {
            if(this.isDown(key)) action.action();
          } else if(action.event == 'released') {
            if(this.isReleased(key)) action.action();
          }
        }
      }
      
      // Set the new state and then update the current state.
      ex.extend(this.previousState, this.buttonState);
      var i = 0,
          ln = this.released.length;
      for(; i < ln; i++) {
        this.buttonState[this.released[i]] = false;
      }
      this.released = [];
    },
    
    /**
     * Checks if the button is pressed or held down.
     * @param {String} key The button to check.
     */
    isDown: function (button) {
      return this.buttonState[button];
    },
    
    /**
     * Checks if the button was just pressed this frame.
     * @param {String} key The button to check.
     */
    isPressed: function (button) {
      return this.buttonState[button] == true && (this.previousState[button] == false || this.previousState[button] == null);
    },
    
    /**
     * Checks if the button was just released this frame.
     * @param {String} key The button to check.
     */
    isReleased: function (button) {
      return this.buttonState[button] == false && this.previousState[button] == true;
    },
    
    _onButtonDown: function (button) {
      if(this.bindings[button]) {
        var i = 0,
            ln = this.bindings[button].length;
        for(; i < ln; i++) {
          console.log(this.bindings[button][i]);
          this.buttonState[this.bindings[button][i]] = true;
        }
      }
    },
    
    _onButtonUp: function (button) {
      if(this.bindings[button]) {
        var i = 0,
            ln = this.bindings[button].length;
        for(; i < ln; i++) {
          this.released.push(this.bindings[button][i]);
        }
      }
    },
    
    bindAction: function (event, button, action) {
      if(typeof this.actions[button] == 'undefined') {
        this.actions[button] = [];
      }
      
      this.actions[button].push({
        event: event,
        action: action
      });
    },
    
    unbindAction: function (event, button, action) {
      var i = 0,
          ln = this.actions[button].length;
      for(; i < ln; i++) {
        if(this.actions[button][i].event == event && this.actions[button][i].action == action) {
          this.actions[button].splice(i, 1);
          if(this.actions[button].length == 0) {
            delete this.actions[button];
          }
        }
      }
    }
  });
});