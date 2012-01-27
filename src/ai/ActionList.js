ex.using([
  'ex.ai.Action',
], function() {
  ex.define("ex.ai.ActionList", {
    constructor: function() {
      this.masks = {
          animation: (1 << 0),
          movement: (1 << 1),
          behavior: (1 << 2)
      };
      
      this.actionList = [];
    },
    
    push: function(action) {
      this.actionList.push(action);
    },
    
    update: function(dt) {
      var blockMask = 0,
          index = 0,
          action = null;
      
      for(; index != this.actionList.length; index++) {
        action = this.actionList[index];
        
        // If blocking, skip to next action
        if(action.mask & blockMask) {
          continue;
        }
        
        // Action complete if it returns true
        var complete = action.update(dt);
        
        // If complete, remove the action from the action list
        if(complete) {
          this.actionList.splice(index, 1);
        }
      }
    }
  });
});