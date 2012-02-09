ex.using([
  'ex.physics.Force',
], function () {
  ex.define('ex.physics.force.Gravity', ex.physics.Force, {
    constructor: function (strength) {
      this.strength = strength;
    },
    
    solve: function (dt, collidables) {
      var i = 0,
          ln = collidables.length,
          rigidBody;
      for(; i != ln; i++) {
        rigidBody = collidables[i];
        if(rigidBody.velocity && rigidBody.gravity != false) {
          collidables[i].applyForce(0, this.strength);
        }
      }
    }
  });
});