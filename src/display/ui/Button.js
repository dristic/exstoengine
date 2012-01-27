ex.using([
  'ex.display.Renderable',
  'ex.display.Sprite'
], function () {
  ex.define('ex.display.ui.Button', ex.display.Renderable, {
    constructor: function (position, image, width) {
      var sprite = new ex.display.Sprite(position, image);
      
      // Define the initial button rendering rect.
      sprite.renderingRect = {
        x: 0, y: 0,
        width: width, height: image.height
      };
      
      this.items = [sprite];
    },
    
    update: function (dt) {
      
    }
  });
});