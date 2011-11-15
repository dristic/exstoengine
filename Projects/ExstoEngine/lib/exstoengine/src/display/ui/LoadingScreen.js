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
	    this.background = new ex.display.Rectangle({
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
				});
	    
      this.logo = new ex.display.Sprite(
					new ex.base.Vector(270, 230),
					logo);
			
			this.progressBar = new ex.display.ui.StatusText(
				ex.Assets,
				'_assetsLoaded',
				{
					position: new ex.base.Vector(
							340, 
							300),
					color: "#FFFFFF",
					font: '12pt Arial',
					displayFormat: 'percentage',
					maxSelector: '_assetsToLoad',
					textBefore: "Loading.. "
				});
		},
		
		/**
		 * The update loop
		 * @function
		 * @name update
		 * @memberOf ex.display.ui.LoadingScreen
		 * @param {Number} dt timestep
		 */
		update: function(dt){
			this.progressBar.update(dt);
		},
		
		setupDom: function (el) {
		  this.background.setupDom(el);
		  this.logo.setupDom(el);
		  this.progressBar.setupDom(el);
		},
		
		renderDom: function (el, camX, camY) {
		  this.background.renderDom(el, camX, camY);
      this.logo.renderDom(el, camX, camY);
      this.progressBar.renderDom(el, camX, camY);
		},
		
		destroyDom: function (el) {
		  this.background.destroyDom(el);
      this.logo.destroyDom(el);
      this.progressBar.destroyDom(el);
		},
		
		setup2dCanvas: function (canvas) {
		  this.background.setup2dCanvas(canvas);
		  this.logo.setup2dCanvas(canvas);
		},
		
		/**
		 * Renders the TitleMenu to the screen.
		 * @function
		 * @name render
		 * @memberOf ex.display.ui.TitleMenu
		 * @param {Canvas Context} context canvas context to render with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 */
		render2dCanvas: function(context, camX, camY){
			this.background.render2dCanvas(context, camX, camY);
			this.logo.render2dCanvas(context, camX, camY);
			this.progressBar.render2dCanvas(context, camX, camY);
		}
	});
});