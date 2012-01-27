ex.using([
  'ex.display.Renderable',
  'ex.display.Sprite',
  'ex.base.Rectangle'
], function () {
  var STATE;
  
  ex.define('ex.display.ui.Button', ex.display.Renderable, {
    __statics: {
      STATE: {
        UP: 0,
        OVER: 1,
        DOWN: 2
      }
    },
    
    constructor: function (position, image, width, actions) {
      var sprite = new ex.display.Sprite(position, image);
      
      // Define the initial button rendering rect.
      sprite.renderingRect = new ex.Rectangle(0, 0, width, image.height);
      
      this.width = width;
      this.state = STATE.UP;
      this.actions = actions || {
        pressed: null,
        down: null,
        released: null,
        over: null
      };
      
      this.items = [sprite];
    },
    
    update: function (dt) {
      var sprite = this.items[0],
          spriteRect = new ex.Rectangle(sprite.position.x, sprite.position.y, this.width, sprite.height);
      
      // Check for over and down states.
      if(spriteRect.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
        ex.Input.changeCursor(ex.Input.CURSOR.POINTER);
        if(ex.Input.isDown(ex.util.Key.LMB)) {
          if(this.state != STATE.DOWN) {
            if(this.actions.pressed) this.actions.pressed();
          }
          if(this.actions.down) this.actions.down();
          this.state = STATE.DOWN;
          sprite.renderingRect.x = this.width * 2;
        } else {
          if(this.state != STATE.OVER && this.actions.over) this.actions.over();
          this.state = STATE.OVER;
          sprite.renderingRect.x = this.width;
        }
      } else {
        if(this.state == STATE.OVER) {
          ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
          this.state = STATE.UP;
          sprite.renderingRect.x = 0;
          
          if(this.actions.released) this.actions.released();
        }
      }
    }
  });
  
  STATE = ex.display.ui.Button.STATE;
});