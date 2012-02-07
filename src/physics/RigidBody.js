ex.using([
  'ex.base.Vector',
  'ex.physics.Collidable',
], function () {
  ex.define('ex.physics.RigidBody', ex.physics.Collidable, {
    constructor: function (type, position, data) {
      this.position = position;
      this.velocity = new ex.Vector(0, 0);
      this.acceleration = new ex.Vector(0, 0);
      this.mass = 1;
      this.elasticity = 0;
      this.maxVelocity = new ex.Vector(3000, 3000);
      this.zero = 0.01;
      
      this._super('constructor', [type, data]);
    },
    
    applyForce: function (x, y) {
      this.acceleration.x += x / this.mass;
      this.acceleration.y += y / this.mass;
    },
    
    applyImpulse: function (x, y) {
      this.velocity.x += x;
      this.velocity.y += y;
    },
    
    integrate: function (dt) {
      if(this.mass != 0) {
        this.velocity.addScaled(this.acceleration, dt);
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        
        this.velocity.limit(this.maxVelocity);
        
        if(this.velocity.x < this.zero && this.velocity.x > -this.zero) this.velocity.x = 0;
        if(this.velocity.y < this.zero && this.velocity.y > -this.zero) this.velocity.y = 0;
        
        this.position.addScaled(this.velocity, dt);
      }
    },
    
    linkObject: function (object) {
      object.position = this.position;
    }
  });
});