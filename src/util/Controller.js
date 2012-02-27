ex.using([
  'ex.event.EventTarget',
  'ex.util.Input'
], function() {
  var Input;
  
  ex.define("ex.util.Controller", ex.event.EventTarget, {
    constructor: function (inputBindings) {
      this.bindings = {};
      this.actions = {};
      this.currentState = null;
      
      this.loadInputBindings(inputBindings);
      
      this._super('constructor');
    },
    
    loadInputBindings: function(inputBindings) {
      for(var key in inputBindings) {
        var binding = inputBindings[key];
        
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
      if(event.charAt && event.charAt(0) == '#') {
        var parts = event.split(' '),
            id = parts[0],
            type = parts[1];
        
        if(type == 'touch') {
          Input.bindElement('touchstart', 'touchstop', id);
        } else if(type == 'mouse') {
          Input.bindElement('mousedown', 'mouseup', id);
        } else {
          ex.Debug.log('ex.util.Controller.bind: Unrecognized input type ' + type + ' on ' + id, 'WARNING');
        }
        
        event = id;
      } else if(isNaN(parseInt(event))) {
        event = ex.util.Key[event];
      }
      
      if(typeof this.bindings[button] == 'undefined') {
        this.bindings[button] = [];
      }
      
      this.bindings[button].push(event);
    },
    
    unbind: function (button, event) {
      // Check for binding to div elements as we have to add them to the
      // input class binding list.
      if(event.charAt(0) == '#') {
        var parts = event.split(' '),
            id = parts[0],
            type = parts[1];
        if(type == 'touch') {
          this.input.unbindElement('touchstart', 'touchstop', id);
        } else if(type == 'mouse') {
          this.input.unbindElement('mousedown', 'mouseup', id);
        } else {
          ex.Debug.log('ex.util.Controller.unbind: Unrecognized input type ' + type + ' on ' + id, 'WARNING');
        }
        
        event = id;
      } else if(isNaN(parseInt(event))) {
        event = ex.util.Key[event];
      }
      
      if(this.bindings[button]) {
        ex.Array.remove(this.bindings[button], event);
        
        if(this.bindings[button].length == 0) {
          delete this.bindings[button];
        }
      }
    },
    
    unbindAll: function () {
      for(var key in this.bindings) {
        var i = 0,
            ln = this.bindings[key].length;
        for(; i < ln; i++) {
          this.unbind(this.bindings[key][i], key);
        }
      }
    },
    
    update: function (dt) {
      // Get the current input state.
      var that = this;
      
      // Fire actions based on the current controller state.
      for(var key in this.actions) {
        var actions = this.actions[key],
            action,
            events = ['pressed', 'released', 'down'];
        
        // For each event type.
        ex.Array.each(events, function (event, index) {
          // Make sure there are actions to check.
          if(actions[event] && actions[event].length > 0) {
            // Setup function name to use to check against.
            var checkFunction = 'is' + event.charAt(0).toUpperCase() + event.substr(1),
            isEvent = false;
            
            // Check each event type in the current input state.
            if(that.bindings[key]) {
              ex.Array.each(that.bindings[key], function (key, index) {
                if(Input[checkFunction](key)) {
                  // If the event type returns true then run all the actions and drop out.
                  ex.Array.each(actions[event], function (action, index) {
                    return action(dt);
                  });
                  return false;
                }
              });
            }
          }
        });
      }
    },
    
    /**
     * Checks if the button is pressed or held down.
     * @param {String} key The button to check.
     */
    isDown: function (button) {
      var isDown = false;
      
      ex.Array.each(this.bindings[button], function (key, index) {
        if(Input.isDown(key)) {
          isDown = true;
          return false;
        }
      });
      
      return isDown;
    },
    
    /**
     * Checks if the button was just pressed this frame.
     * @param {String} key The button to check.
     */
    isPressed: function (button) {
      var isPressed = false;
      
      ex.Array.each(this.bindings[button], function (key, index) {
        if(Input.isPressed(key)) {
          isPressed = true;
          return false;
        }
      });
      
      return isPressed;
    },
    
    /**
     * Checks if the button was just released this frame.
     * @param {String} key The button to check.
     */
    isReleased: function (button) {
      var isReleased = false;
      
      ex.Array.each(this.bindings[button], function (key, index) {
        if(Input.isReleased(key)) {
          isReleased = true;
          return false;
        }
      });
      
      return isReleased;
    },
    
    bindAction: function (event, button, action) {
      if(ex.isNull(this.actions[button])) {
        this.actions[button] = {};
      }
      
      if(ex.isNull(this.actions[button][event])) {
        this.actions[button][event] = [];
      }
      
      this.actions[button][event].push(action);
    },
    
    unbindAction: function (event, button, action) {
      ex.Array.remove(this.actions[button][event], action);
      
      if(this.actions[button][event].length == 0) {
        delete this.actions[button][event];
      }
    },
    
    unbindAllActions: function() {
      for(var button in this.actions) {
        this.actions[button] = [];
      }
    },
    
    destroy: function () {
      this.unbindAllActions();
      this.unbindAll();
      
      this.bindings = null;
      this.released = null;
      this.buttonState = null;
      this.previousState = null;
      this.actions = null;
      this.input = null;
    }
  });
  
  Input = ex.Input;
});