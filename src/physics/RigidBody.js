ex.using([
  'ex.base.Vector',
  'ex.physics.Collidable',
], function () {
  ex.define('ex.physics.RigidBody', ex.physics.Collidable, {
    constructor: function (type, position) {
      this.position = position;
      this.velocity = new ex.Vector(0, 0);
      this.mass = 1;
      this.elasticity = 0;
      
      this._super('constructor', [type]);
    },
    
    integrate: function (dt) {
      
    }
  });
});