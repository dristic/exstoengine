ex.using([
          "ex.display.Image",
          "ex.display.ui.TitleMenu"
          ],
		function(){
	ex.define("game.levels.titleMenu", {
		constructor: function(engine){
			// Globals go here
			this.engine = engine;
		},
		
		_startGame: function(){
			this.engine.loadScene("level1");
		},
		
		getAssets: function(){
			return [
       		{name: "logo", filePath: "assets/explode3.png"},
	    		{name: "bg", filePath: "assets/bg.png"},
	    		{name: 'hubbleimage', filePath: 'assets/hubbleimage.jpg'}
	    	];
		},
		
		getObjects: function(){
			var objects = [];
			var that = this;
			
			var titleMenu = new ex.display.ui.TitleMenu(
				[{
					text: "Start Game",
					action: null
				}, {
					text: "Options",
					action: function() {
						alert("Just kidding! You have no options!");
					}
				}, {
					text: "Quit",
					action: function() {
						alert("You can't quit! You're miiiine!!!");
					}
				}], 
				0, 
				ex.Assets.getImage("bg"),
				ex.Assets.getImage("logo"),
				{
				  controls: {
				    moveUp: 'up once',
				    moveDown: 'down once',
				    activate: 'use once',
				    updateSelection: 'mousemove'
				  }
				}
			);	
			
			titleMenu.selections[0].action = function() {
        titleMenu._removeInputBindings();
        that._startGame();
      };
			
			objects.push(titleMenu);
			
			return objects;
		},
		
		finalSetup: function(engine) {

		}
	});
});