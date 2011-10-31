ex.using([
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          
          "game.entities.Player",
  	      "game.entities.Teleporter"
          ],
		function(){
	ex.define("game.levels.level1", {
		constructor: function(input){
			// Globals go here
			this.input = input;
			this.tileWidth = 32;
			this.tileHeight = 32;
		},
		
		getAssets: function(){
			return [
	       		{name: "tiles", filePath: "assets/tileset-platformer.png"},
	    		{name: "background", filePath: "assets/bg.png"},
	    		{name: "player", filePath: "assets/player.png"}
	    	];
		},
		
		getObjects: function(){
			return [
	            new ex.world.CollisionMap(
            		this.tileWidth,
            		this.tileHeight,
            		[
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0, 	0, 	0, 	0, 	4, 	5, 	6, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0, 10],
    					[  12, 	0, 	0, 	0, 	0, 10, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12, 	0, 	0, 	0, 	0, 10, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12, 	0, 	0, 	0, 	0, 10, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11,  5, 	5, 	5, 	5, 11, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	4, 	5, 	5, 	5, 	5, 	5, 	5, 	5, 	5, 	5,  5,	6, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 	5, 	5, 	5, 	5, 	5, 	5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6, 	0, 	0,  0, 	0, 	0, 	0, 	0, 	0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11,  5,  5,  5,  5,  6,  0,  0,  4,  5, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    				]),
	            new ex.display.SpriteMap(
            		this.tileWidth,
            		this.tileHeight,
            		[
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 51, 52, 52, 52, 52, 53, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0,	0,	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12,	0, 	0, 	0, 	0, 	4, 	5, 	6, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 51, 52, 52, 52, 53,  0,  0,  0,  0,  0, 10],
    					[  12, 	0, 	0, 	0, 	0, 10, 11, 12, 	0, 	0, 	0, 	0, 	0, 51, 52, 52, 52, 52, 53, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12, 	0, 	0, 	0, 	0, 10, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,	0,	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  12, 	0, 	0, 	0, 	0, 10, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 49, 50, 	0, 	0, 	0, 49, 50, 	0, 	0, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11,  5, 	5, 	5, 	5, 11, 11, 12, 	0, 	0, 	0, 	0, 	0, 	0, 	4, 	5, 	5, 	5, 	5, 	5, 	5, 	5, 	5, 	5,  5,	6, 	0, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 	5, 	5, 	5, 	5, 	5, 	5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 	0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6, 	0, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6, 	0, 	0, 	0,  0,  0,  0,  0,  0,  0,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6, 	0, 	0,  0,  0, 83,  0,  0, 83,  0, 10],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11,  5,  5,  5,  5,  6,  0,  0,  4,  5, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    					[  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    				],
            		ex.Assets.getImage("tiles")),
        		new game.entities.Player(
        				"Player", 
        				new ex.base.Vector(50, 150), 
        				ex.Assets.getImage("player"),
        				true, 
        				this.input)
        	];
		}
	});
});