ex.using([

], function() {
  ex.define("ex.util.GameController", ex.base.Component, {
    constructor: function(buttons) {
      this.buttons = buttons;
    },
    
    on: function(button, action) {
      if(this.buttons[button]) {
        this.buttons[button].push(action);
      }
    },
    
    _fireActions: function(buttonSelector) {
      if(this.buttons[buttonSelector] == null) {
        console.error(buttonSelector, "does not exist in controller map -->", this.buttons);
        return;
      }
      var index = this.buttons[buttonSelector].length;
      while(index--) {
        this.buttons[buttonSelector][index]();
      }
    }
  });
});