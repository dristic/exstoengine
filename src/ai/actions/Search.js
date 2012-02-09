
ex.using([
  'ex.ai.Action',
  'ex.ai.actions.Wander',
  'ex.ai.actions.Chase'
], function(){
  ex.define("ex.ai.actions.Search", ex.ai.Action, {
    constructor: function(entity, target, sightRange) {
      this.name = "search";
      this.entity = entity;
      this.target = target;
      this.sightRange = sightRange;
      
      // Setup sub-actions
      this.actions = {
          chase: new ex.ai.actions.Chase(this.entity, this.target, this.sightRange)
      }
      
      this._super("constructor", [1, true]);
    },
    
    update: function(dt) {
      var distX = Math.abs(this.entity.physical.position.x - this.target.physical.position.x),
          minY = this.entity.physical.position.y - this.target.physical.height,
          maxY = this.entity.physical.position.y + this.entity.physical.height;
      
      if(distX < this.sightRange
          && this.target.physical.position.y > minY
          && this.target.physical.position.y < maxY) {
        this.entity.ai.push(new ex.ai.actions.Chase(this.entity, this.target, 200));
      }
    }
  });
});