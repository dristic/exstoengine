
ex.using([
  'ex.ai.Action',
  'ex.ai.actions.Shoot'
], function(){
  ex.define('ex.ai.actions.Chase', ex.ai.Action, {
    constructor: function(entity, target, maxRange, speedModifier) {
      this.name = "chase";
      this.entity = entity;
      this.target = target;
      this.maxRange = maxRange;
      
      this.speedModifier = speedModifier || 1;
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      var distX = Math.abs(this.entity.physical.position.x - this.target.physical.position.x),
      minY = this.entity.physical.position.y - this.target.physical.height,
      maxY = this.entity.physical.position.y + this.entity.physical.height;
  
      if(distX < this.maxRange
          && this.target.physical.position.y > minY
          && this.target.physical.position.y < maxY) {
        this.moveTowardTarget(dt);
        if(this.entity.weapon) {
          this.attackTarget(dt);
        }
        return false;
      } else {
        return true;
      }
    },
    
    attackTarget: function(dt) {
      this.entity.cooldown += Math.random() * dt;
      if(this.entity.weapon.cooldown <= 0) {
        this.entity.ai.push(new ex.ai.actions.Shoot(this.entity.weapon));
      }
    },
    
    moveTowardTarget: function(dt) {
      var speed = this.entity.speed * this.speedModifier;
      if(this.target.physical.position.x < this.entity.physical.position.x) {
        this.entity.facing = 'left';
        this.entity.physical.applyImpulse(-speed * dt, 0);
        this.entity.moving = true;
      } else {
        this.entity.facing = 'right';
        this.entity.physical.applyImpulse(speed * dt, 0);
        this.entity.moving = true;
      }
      if(this.entity.weapon) {
        this.entity.weapon.facing = this.entity.facing;
      }
    }
  });
});