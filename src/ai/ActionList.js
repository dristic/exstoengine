ex.using([
  'ex.ai.Action'
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
    
    remove: function(action) {
      action.destroy();
      ex.Array.remove(this.actionList, action);
    },
    
    update: function(dt) {
      var blockMask = 0,
          index = this.actionList.length,
          action = null;
      
      
      while(index--) {
        action = this.actionList[index];
        
        // If channel is already blocked, skip to next action
        if(action.mask & blockMask) {
          continue;
        }
        
        // Action complete if it returns true
        var complete = action.update(dt);
        
        // If complete, remove action
        if(complete) {
          this.remove(this.actionList[index]);
        }
        
        // Update blocked channels
        if(action.blocking) {
          blockMask = blockMask | action.mask;
        }
      }
    }
  });
});