
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
      var distX = Math.abs(this.entity.position.x - this.target.position.x),
      minY = this.entity.position.y - this.target.height,
      maxY = this.entity.position.y + this.entity.height;
  
      if(distX < this.maxRange
          && this.target.position.y > minY
          && this.target.position.y < maxY) {
        this.moveTowardTarget(dt);
        this.attackTarget(dt);
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