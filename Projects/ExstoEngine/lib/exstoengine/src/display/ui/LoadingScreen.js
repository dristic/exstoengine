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
            
        new ex.display.ui.StatusText(
            ex.Assets,
            '_assetsLoaded',
            {
              position: new ex.base.Vector(
                  340, 
                  295),
              color: "#FFFFFF",
              font: '12pt Arial',
              displayFormat: 'percentage',
              maxSelector: '_assetsToLoad',
              textBefore: "Loading.. "
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