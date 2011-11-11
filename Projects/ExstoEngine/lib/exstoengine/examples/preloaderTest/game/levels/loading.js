ex.using([
          "ex.display.Image",
          ],
function(){
	ex.define("game.levels.loading", {
		constructor: function(input){
			// Globals go here
		},
		
		getAssets: function(){
			return [
	    		{name: "background", filePath: "assets/bg.png"},
	    	];
		},
		
		getObjects: function(){
			var objects = [];
			
			// Background Image
			objects.push(
				new ex.display.Image(
					ex.Assets.getImage("background"),
					new ex.base.Vector(0,0))
			);
			
			objects.push(
				new ex.display.ui.StatusBar(
					ex.Assets,
					'_assetsLoaded',
					{
						displayFormat: 'percentage',
						maxSelector: '_assetsToLoad',
						textBefore: 'Loading... '
					})
			);
			
			return objects;
		},
		
		finalSetup: function(engine) {
			engine.camera.follow(this.followTarget);
		}
	});
});