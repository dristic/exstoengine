ex.using([
  'ex.physics.RigidBody'
], function () {
  ex.define('ex.physics.RigidBox', ex.physics.RigidBody, {
    constructor: function () {
      
      this._super('constructor', ['RigidBox']);
    }
  });
});