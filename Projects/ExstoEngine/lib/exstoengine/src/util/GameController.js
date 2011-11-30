ex.using([

], function() {
  ex.define("ex.util.GameController", ex.base.Component, {
    constructor: function(buttons) {
      // Lazy Initialization
      this.buttons = {};
      
      // Normal Initialization, results in all controllers mirroring actions
      // this.buttons = buttons;
    },
    
    update: function(pressed, dt) {
      for(var button in this.buttons) {
        this._updateButton(button, pressed[button], dt);
        if(this.buttons[button].duration > 0) {
          this._fireActions(button, dt);
        }
      }
    },
    
    _updateButton: function(button, value, dt) {
      if(!value) {
        this.buttons[button].duration = 0;
      } else if(this.buttons[button].duration == null){
        this.buttons[button].duration = dt;
      } else {
        this.buttons[button].duration += dt;
      }
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
      
      // Lazy Initialization
      if(!this.buttons[button]) { 
        this.buttons[button] = {
            actionList: [],
            duration: 0
        };  
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
          console.log('Removing', action, "from", selector);
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
          actionList[index].run();
        }
      }
    }
  });
});