ex.using([
  "ex.base.Rectangle",
  "ex.base.Vector"
], function(){
  ex.define("ex.display.SpriteSheet", {
    constructor: function(image, frameWidth, frameHeight, frameRate, offset) {
      this.image = image;
      this.frameRate = frameRate;
      this.renderingRect = 
        new ex.base.Rectangle(0, 0, frameWidth, frameHeight);
      this.offset = offset || { x: 0, y: 0 };
    },
    
    isReady: function() {
      if(this.image.width <= 0 || this.image.height <= 0) {
        return false;
      } else {
        return true;
      }
    }
  });
});