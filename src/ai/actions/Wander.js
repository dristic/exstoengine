ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Wander', ex.ai.Action, {
    constructor: function(entity) {
      this.entity = entity;
      this.currentX = this.entity.position.x;
      this.lastX = 0;
      
      this._super("constructor", [0, false]);
    },
    
    update: function(dt) {
      // Update position data
      this.lastX = this.currentX;
      this.currentX = this.entity.position.x;      
      
      // If movement less then a pixel, turn around
      if(Math.abs(this.currentX - this.lastX) < this.entity.velocity * dt) {
        console.log("Flip the bitch!");
        this.turnAround(dt);
      }
      
      if(this.entity.facing == 'left') {
        this.entity.velocity.x = -this.entity.speed * dt;
        this.entity.moving = true;
      } else {
        this.entity.velocity.x = this.entity.speed * dt;
        this.entity.moving = true;
      }
      return false;
    },
    
    turnAround: function(dt) {
      if(this.entity.facing == 'left') {
        this.entity.facing = 'right';
      } else {
        this.entity.facing = 'left';
      }
      this.entity.velocity.x = 0;
    }
  });
});