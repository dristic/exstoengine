
ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Shoot', ex.ai.Action, {
    constructor: function(weapon) {
      this.name = "shoot";
      this.weapon = weapon;
      
      this._super("constructor", [1, false]);
    },
    
    update: function(dt) {
      this.weapon.shoot();
      return true;
    }
  });
});