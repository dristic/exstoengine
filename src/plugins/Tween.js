ex.using([
  'ex.base.Vector',
  'ex.base.Component'
], function () {
  ex.define('ex.plugins.Tween', ex.base.Component, {
    __alias: 'ex.Tween',
    
    constructor: function () {
      if(!ex.Tween.__instance) {
        this._super('constructor');
        
        ex.Tween.__instance = this; 
      } else {
        ex.Debug.log('ex.plugins.Tween has already been initialized!', 'INFO');
      }
    },
    
    update: function (dt) {
      ex.Tween.__update(dt);
    },
    
    __statics: {
      // Make this class a singleton so it can still be loaded into the engine
      // but can be called anywhere in the engine.
      __instance: null,
      
      tweens: [],
      
      add: function (element, duration, properties, options) {
        var tween = {
          element: element,
          duration: duration,
          elapsed: 0,
          properties: properties,
          starting: {},
          options: options || {}
        };
        
        for(var key in properties) {
          tween.starting[key] = element[key];
        }
        
        ex.Tween.tweens.push(tween);
      },
      
      __update: function (dt) {
        var i = 0,
            ln = ex.Tween.tweens.length,
            tween,
            delta,
            remove = false;
        for(; i < ln; i++) {
          tween = ex.Tween.tweens[i];
          
          // Update the tween's properties.
          tween.elapsed += dt;
          delta = dt;
          
          // Check for delaying the Tween.
          if(tween.options.delay) {
            if(tween.elapsed > tween.options.delay) {
              tween.elapsed -= tween.options.delay;
              tween.options.delay = null;
            } else {
              continue;
            }
          }
          
          // Check for over duration.
          if(tween.elapsed > tween.duration) {
            delta = tween.duration - tween.elapsed;
            tween.elapsed = tween.duration;
            remove = true;
          }
          
          // Update the properties of the element.
          for(var key in tween.properties) {
            if(remove == false) {
              var dd = ((tween.properties[key] - tween.starting[key]) / tween.duration) * delta;
              tween.element[key] += dd;
            } else {
              tween.element[key] = tween.properties[key];
            }
          }
          
          // Remove tween if needed and complete it.
          if(remove == true) {
            if(ex.Tween.tweens[i].options.callback) {
              ex.Tween.tweens[i].options.callback();
            }
            ex.Tween.tweens.splice(i, 1);
            i--;
            ln--;
            remove = false;
          }
        }
      }
    }
  });
});