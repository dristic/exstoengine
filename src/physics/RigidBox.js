ex.using([
  'ex.physics.RigidBody'
], function () {
  ex.define('ex.physics.RigidBox', ex.physics.RigidBody, {
    constructor: function (position, width, height, data) {
      this.width = width;
      this.height = height;
      
      this._super('constructor', ['RigidBox', position, data]);
    },
    
    draw: function (context, camX, camY) {
      context.strokeRect(
          this.position.x - camX,
          this.position.y - camY,
          this.width,
          this.height);
    }
  });
});