/**
 * This action does nothing.
 */

ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Idle', ex.ai.Action, {
    constructor: function(entity) {
      this.name = "idle";
      this.entity = entity;
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      return false;
    }
  });
});