ex.using([
  'ex.display.Sprite',
  'ex.display.Rectangle',
  'ex.display.ui.StatusText',
  'ex.display.ui.StatusBar',
  'ex.base.Component'
], function() {	
	ex.define("ex.display.ui.LoadingScreen", ex.base.Component, {
		/**
		 * Creates a loading screen that hooks into the asset manager.
		 * @name ex.display.ui.LoadingScreen
		 * 
		 * @constructor
		 */
		constructor: function(logo) {
		  this.items = [
		    // Background
        new ex.display.Rectangle({
          x: 0, y: 0,
          width: 800, height: 600,
          fill: {
            type: 'radial-gradient',
            start: { x: 400, y: 300, radius: 0 },
            end: { x: 400, y: 300, radius: 500 },
            stops: [
              { position: 0, color: '#555' },
              { position: 1, color: '#000' }
            ]
          }
        }),
        
        // Logo
        new ex.display.Sprite(
            new ex.base.Vector(270, 230),
            logo),
            
        new ex.display.ui.StatusText({
          position: new ex.Vector(340, 295),
          update: 'auto',
          updateOptions: {
            target: ex.Assets,
            currentSelector: '_assetsLoaded',
            maxSelector: '_assetsToLoad'
          },
          displayFormat: 'percentage',
          text: {
            color: '#FFFFFF',
            font: '12pt Arial',
            prefix: 'Loading.. ',
            suffix: ''
          }
        }),
            
        new ex.display.ui.StatusBar({
          position: new ex.Vector(340, 305),
          update: 'auto',
          updateOptions: {
            target: ex.Assets,
            currentSelector: '_assetsLoaded',
            maxSelector: '_assetsToLoad'
          }
        })
      ];
		  
		  var i = 0,
		      ln = this.items.length,
		      item;
		  for(; i < ln; i++) {
		    item = this.items[i];
		    if(item.scrollFactor) {
		      item.scrollFactor.x = 0;
		      item.scrollFactor.y = 0;
		    }
		  }
		  
		  this.items[this.items.length - 1].options.outer.scrollFactor = new ex.Vector(0, 0);
		  this.items[this.items.length - 1].options.inner.scrollFactor = new ex.Vector(0, 0);
		},
		
		/**
		 * The update loop
		 * @function
		 * @name update
		 * @memberOf ex.display.ui.LoadingScreen
		 * @param {Number} dt timestep
		 */
		update: function(dt){
			this.items[2].update(dt);
			this.items[3].update(dt);
		}
	});
});