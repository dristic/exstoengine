/**
 * This action is a simple collision-based wandering routine. When the entity
 * runs into an obstruction (a tile), it turns around and goes back the other
 * way.
 */

ex.using([
  'ex.ai.Action'
], function(){
  ex.define('ex.ai.actions.Wander', ex.ai.Action, {
    constructor: function(entity) {
      this.name = "wander";
      this.entity = entity;
      
      this._super("constructor", [1, false]);
    },
    
    update: function(dt) {     
      if(this.isObstructed()) {
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
    
    isObstructed: function() {
      if(!this.entity.collisionData || !this.entity.collisionData.tiles) {
        return false;
      }
      
      var tiles = this.entity.collisionData.tiles;
      var minY = this.entity.position.y - tiles[0].height,
          maxY = this.entity.position.y + this.entity.height;
      
      var index = tiles.length,
          tile;
      while(index--) {
        tile = tiles[index];
        if(tile.position.y >= minY && tile.position.y <= maxY) {
          if(this.entity.facing == 'left' && tile.position.x <= this.entity.position.x){
            return true;
          } else if (this.entity.facing == 'right' && tile.position.x >= this.entity.position.x) {
            return true;
          }
        }
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