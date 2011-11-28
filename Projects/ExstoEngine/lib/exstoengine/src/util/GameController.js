ex.using([

], function() {
  ex.define("ex.util.GameController", ex.base.Component, {
    constructor: function(buttons) {
      // Lazy Initialization
      this.buttons = {};
      
      // Normal Initialization, results in all controllers mirroring actions
      // this.buttons = buttons;
    },
    
    on: function(button, action) {
      if(!this.buttons[button]) {
        this.buttons[button] = [];  // Lazy Initialization
      }  
      this.buttons[button].push(action);
    },
    
    _fireActions: function(buttonSelector) {
      if(this.buttons[buttonSelector] == null) {
        // No actions assigned to the selector, do nothing
        return;
      }
      var index = this.buttons[buttonSelector].length;
      while(index--) {
        this.buttons[buttonSelector][index]();
      }
    }
  });
});