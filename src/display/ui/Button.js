ex.using([
  'ex.display.Renderable',
  'ex.display.Sprite',
  'ex.base.Rectangle'
], function () {
  var STATE;
  
  ex.define('ex.display.ui.Button', ex.world.Entity, {
    __statics: {
      STATE: {
        UP: 0,
        OVER: 1,
        DOWN: 2
      }
    },
    
    constructor: function (position, sprite, options) {
      this.defaults = {
        actions: {
          pressed: null,
          down: null,
          released: null,
          over: null
        },
        userData: {},
        autoUpdateSprite: false
      };
      
      this.options = ex.extend({}, this.defaults, true);
      ex.extend(this.options, options, true);
      
      this.state = STATE.UP;
      
      sprite.position = ex.clone(position);
      
      this._super('constructor', ["Button", [sprite]]);
    },
    
    update: function (dt) {
      var sprite = this.items[0];
      sprite.update(dt);
      
      // Check for over and down states.
      if(sprite.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
        ex.Input.changeCursor(ex.Input.CURSOR.POINTER);
        if(ex.Input.isDown(ex.util.Key.LMB)) {
          if(this.state != STATE.DOWN) {
            if(this.options.actions.pressed) this.options.actions.pressed(this, this.options.userData);
          }
          if(this.options.actions.down) this.options.actions.down(this, this.options.userData);
          this.state = STATE.DOWN;
          if(this.options.autoUpdateSprite) sprite.play('down');
        } else {
          if(this.state != STATE.OVER && this.options.actions.over) this.options.actions.over(this, this.options.userData);
          this.state = STATE.OVER;
          if(this.options.autoUpdateSprite) sprite.play('over');
        }
      } else {
        if(this.state == STATE.OVER || this.state == STATE.DOWN) {
          ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
          this.state = STATE.UP;
          
          if(this.options.actions.released) this.options.actions.released(this, this.userData);
          if(this.options.autoUpdateSprite) sprite.play('up');
        }
      }
    },
    
    destroy: function () {
      delete this.options.actions;
      delete this.state;
      delete this.width;
      delete this.items;
      delete this.userData;
    }
  });
  
  STATE = ex.display.ui.Button.STATE;
});