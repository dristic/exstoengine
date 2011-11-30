ex.using([

], function() {
  ex.define("ex.util.GameController", ex.base.Component, {
    constructor: function(inputMap, inputReference) {
      // Lazy Initialization
      this.buttons = {};
      this.input = inputReference;
      
      this._setupController(inputMap);
    },
    
    _setupController: function(inputMap) {
      var mapIndex = inputMap.length,
          inputIndex = 0;
      var buttonName = '';
      var inputTokens = [];
      while(mapIndex--) {
        buttonName = inputMap[mapIndex][0];
        this.buttons[buttonName] = {
            actionList: [],
            duration: 0,
            bindings: []
        };  
        
        inputTokens = inputMap[mapIndex][1].split(' ');
        inputIndex = inputTokens.length;
        while(inputIndex--) {
          this.buttons[buttonName].bindings.push(inputTokens[inputIndex]);
        }
      }
    },
    
    update: function(dt) {
      for(var button in this.buttons) {
        this._updateButton(button, dt);
        if(this.buttons[button].duration > 0) {
          this._fireActions(button, dt);
        }
      }
    },
    
    _updateButton: function(button, dt) {
      var index = this.buttons[button].bindings.length;
      var binding = '';
      while(index--) {
        binding = this.buttons[button].bindings[index];
        if (this.input.keyboard.pressed[binding]
          || this.input.mouse.pressed[binding]) {
          this.buttons[button].duration += dt;
          return;
        }
      }
      
      this.buttons[button].duration = 0;
    },
    
    on: function(selector, action) {
      var tokens = selector.split(' ');
      var button = tokens[0];
      
      // second parameter in selector is the optional repeat,
      // if the value is 'once', repeat is set to false
      var repeat = tokens[1];
      if(repeat == 'once'){
        repeat = false;
      } else {
        repeat = true;
      }
      
      // push the action onto the button's actionList
      this.buttons[button].actionList.push({
        run: action,
        repeat: repeat
      });
    },
    
    removeAction: function(selector, action) {
      var tokens = selector.split(' ');
      var button = this.buttons[tokens[0]];
            
      var index = button.actionList.length;
      while(index--) {
        console.log(button.actionList[index], action);
        if(button.actionList[index].run == action) {
          button.actionList.splice(index, 1);
        }
      }
    },
    
    _fireActions: function(button, dt) {
      if(this.buttons[button] == null) {
        // No actions assigned to the selector, do nothing
        return;
      }
      var actionList = this.buttons[button].actionList;
      var index = actionList.length;
      while(index--) {
        if(actionList[index].repeat == true
            || this.buttons[button].duration == dt){
          console.log(dt, this.buttons[button].duration);
          actionList[index].run(dt);
        }
      }
    }
  });
});