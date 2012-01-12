ex.using([
  "ex.base.Rectangle",
  "ex.base.Vector"
], function(){
  ex.define("ex.display.SpriteSheet", {
    constructor: function(image, frameWidth, frameHeight, frameRate) {
      this.image = image;
      this.frameRate = frameRate;
      this.renderingRect = 
        new ex.base.Rectangle(new ex.Vector(0,0), frameWidth, frameHeight);
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