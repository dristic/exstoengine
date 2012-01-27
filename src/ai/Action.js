ex.using([

], function() {
  ex.define("ex.ai.Action", {
    constructor: function(mask, blocking) {
      this.mask = mask || 0;
      this.blocking = blocking || false;
    },
    
    // Default update, completes instantly
    update: function(dt) {
      return true;
    }
  });
});