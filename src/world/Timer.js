ex.using([
  'ex.event.EventTarget'
], function () {
  ex.define('ex.world.Timer', ex.event.EventTarget, {
    constructor: function (options) {
      this.defaults = {
        delay: 1,
        length: 1,
        onTick: null,
        onComplete: null
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.started = false;
      this.duration = 0;
      this.tick = 0;
      
      this._super('constructor');
    },
    
    start: function () {
      if(this.options.length) {
        if(this.duration > this.options.length) {
          return;
        }
      }
      this.started = true;
    },
    
    reset: function () {
      this.started = false;
      this.duration = 0;
      this.tick = 0;
    },
    
    stop: function () {
      this.started = false;
    },
    
    update: function (dt) {
      if(this.started) {
        // Add to our duration.
        this.duration += dt;
        this.tick += dt;
        
        // Check for tick.
        if(this.tick > this.options.delay) {
          this.tick -= this.options.delay;
          if(this.options.onTick) {
            this.options.onTick();
          }
          this.dispatchEvent('tick');
        }
        
        // Check for complete.
        if(this.options.length) {
          if(this.duration > this.options.length) {
            if(this.options.onComplete) {
              this.options.onComplete();
            }
            this.dispatchEvent('complete');
            this.stop();
          }
        }
      }
    },
    
    destroy: function () {
      delete this.options['onTick'];
      delete this.options['onComplete'];
      this.options = null;
      this.started = false;
    }
  });
});