ex.using([
  'ex.display.Sprite',
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
		constructor: function(bgImage, logo, options){			
			this.options = {
				background: new ex.display.Sprite(
					new ex.base.Vector(0, 0),
					bgImage),
				logo: new ex.display.Sprite(
					new ex.base.Vector(50, 50),
					logo),
				status: {
					message: "Loading... ",
					x: 100,
					y: 200
				}
			};
			
			if(options != null) {
				ex.extend(this.options, options);
			}
			
			this.progressBar = new ex.display.ui.StatusBar(
				ex.Assets,
				'_assetsLoaded',
				{
					position: new ex.base.Vector(
							this.options.status.x, 
							this.options.status.y),
					color: "#FFFFFF",
					font: '24pt Calibri',
					displayFormat: 'percentage',
					maxSelector: '_assetsToLoad',
					textBefore: this.options.status.message
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
		
		/**
		 * Renders the TitleMenu to the screen.
		 * @function
		 * @name render
		 * @memberOf ex.display.ui.TitleMenu
		 * @param {Canvas Context} context canvas context to render with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 */
		render: function(context, camX, camY){
			this.options.background.render(context, camX, camY);
			this.options.logo.render(context, camX, camY);
			this.progressBar.render(context, camX, camY);
			
			
		}
	});
});