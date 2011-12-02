ex.using([
          "ex.display.Image",
          ],
		function(){
	ex.define("game.levels.template", {
		constructor: function(input){
			// Globals go here
			this.input = input;
			this.tileWidth = 32;
			this.tileHeight = 32;
			this.followTarget = null;
		},
		
		getAssets: function(){
			return [
	       		{name: "tiles", filePath: "assets/tileset-platformer.png"},
	    		{name: "background", filePath: "assets/bg.png"},
	    	];
		},
		
		getObjects: function(){
			var objects = [];
			
			// Background Image
			objects.push(
					new ex.display.Image(
						ex.Assets.getImage("Nebula"),
						new ex.base.Vector(0,0))
			);			
			
			return objects;
		},
		
		finalSetup: function(engine) {
			engine.camera.follow(this.followTarget);
		}
	});
});