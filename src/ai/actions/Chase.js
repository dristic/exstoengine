
ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Chase', ex.ai.Action, {
    constructor: function(entity, target, maxRange) {
      this.name = "chase";
      this.entity = entity;
      this.target = target;
      this.maxRange = maxRange;
      
      this.speedModifier = 2;
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      var distance = this.entity.position.distance(this.target.position);
      
      // Action complete cases
      if(distance > this.maxRange) {
        return true;
      } else if (this.target.health == 0) {
        return true;
      } 
      
      this.moveTowardTarget(dt);
      return false;
    },
    
    moveTowardTarget: function(dt) {
      var speed = this.entity.speed * this.speedModifier;
      if(this.target.position.x < this.entity.position.x) {
        this.entity.facing = 'left';
        this.entity.velocity.x = -speed * dt;
        this.entity.moving = true;
      } else {
        this.entity.facing = 'right';
        this.entity.velocity.x = speed * dt;
        this.entity.moving = true;
      }
    }
  });
});