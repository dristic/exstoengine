ex.using([
  'ex.base.Vector',
  'ex.base.Component'
], function () {
  var extween;
  
  ex.define('ex.plugins.Tween', ex.base.Component, {
    __alias: 'ex.Tween',
    
    constructor: function () {
      if(!extween.__instance) {
        this._super('constructor');
        
        extween.__instance = this; 
      } else {
        ex.Debug.log('ex.plugins.Tween has already been initialized!', 'INFO');
      }
    },
    
    update: function (dt) {
      extween.__update(dt);
    },
    
    __statics: {
      // Make this class a singleton so it can still be loaded into the engine
      // but can be called anywhere in the engine.
      __instance: null,
      
      tweens: [],
      
      /**
       * Adds a tween to the list to be changed over a period of time.
       * 
       * @param {Object} element The element to be tweened.
       * @param {Number} duration The time period to tween over.
       * @param {Object} properties The properties to tween assigned to their end values.
       * @param {Options} options Extra tween options including callbacks, type, etc.
       */
      add: function (element, duration, properties, options) {
        var tween = this.__generateTween(element, duration, properties, options);
        
        extween.tweens.push(tween);
      },
      
      delayedCall: function (duration, callback) {
        var tween = this.__generateTween({}, duration, {}, {
          callback: callback
        });
        
        extween.tweens.push(tween);
      },
      
      __generateTween: function (element, duration, properties, options) {
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
        
        return tween;
      },
      
      __update: function (dt) {
        var i = 0,
            ln = extween.tweens.length,
            tween,
            delta,
            remove = false;
        for(; i < ln; i++) {
          tween = extween.tweens[i];
          
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
            if(extween.tweens[i].options.callback) {
              extween.tweens[i].options.callback();
            }
            extween.tweens.splice(i, 1);
            i--;
            ln--;
            remove = false;
          }
        }
      }
    }
  });
  
  // Set globals for data hiding.
  extween = ex.Tween;
});