ex.using([
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          "ex.display.Image",
          "ex.world.Trigger",
          
          "game.entities.Player",
  	      "game.entities.Teleporter"
          ],
		function(){
	ex.define("game.levels.level1", {
		constructor: function(engine){
			// Globals go here
			this.engine = engine;
			this.tileWidth = 32;
			this.tileHeight = 32;
			this.followTarget = null;
		},
		
		getAssets: function(){
			return [
        // Images
     		{name: "tiles", filePath: "assets/tileset-platformer.png"},
    		{name: "bg", filePath: "assets/bg.png"},
    		{name: "player", filePath: "assets/player.png"},
    		{name: "teleport", filePath: "assets/teleport2.png"},
    		
    		// Audio
    		
    		// Video
    	];
		},
		
		getObjects: function(){
			var objects = [];
			var that = this;
			
			/*
			 * Build all scene objects.
			 */
			
			var background = new ex.display.Image(
        ex.Assets.getImage("bg"),
        new ex.base.Vector(0,0)
      );
			
			var collisionMap = new ex.world.CollisionMap(
        this.tileWidth,
        this.tileHeight,
        [
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  4,  5,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0, 10, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0, 10, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0, 10, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11,  5,  5,  5,  5, 11, 11, 12,  0,  0,  0,  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11,  5,  5,  5,  5,  5,  5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11,  5,  5,  5,  5,  6,  0,  0,  4,  5, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        ]
      );
			
			var platforms = new ex.display.SpriteMap(
        this.tileWidth,
        this.tileHeight,
        [
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0, 51, 52, 52, 52, 52, 53,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0,  4,  5,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 51, 52, 52, 52, 53,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0, 10, 11, 12,  0,  0,  0,  0,  0, 51, 52, 52, 52, 52, 53,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0, 10, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  12,  0,  0,  0,  0, 10, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0, 49, 50,  0,  0,  0, 49, 50,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11,  5,  5,  5,  5, 11, 11, 12,  0,  0,  0,  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11,  5,  5,  5,  5,  5,  5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  6,  0,  0,  0,  0, 83,  0,  0, 83,  0, 10],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11,  5,  5,  5,  5,  6,  0,  0,  4,  5, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        ],
        ex.Assets.getImage("tiles")
      );
			
			var hiddenOverlay = new ex.display.SpriteMap(
        this.tileWidth,
        this.tileHeight,
        [
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 83, 83,  0,  0,  0],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  5,  5,  5,  5,  5,  5,  5,  5,  5, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
          [  11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        ],
        ex.Assets.getImage("tiles")
      );
			
			
			this.engine.currentWorld.globalObjects.player = new game.entities.Player(
        "Player", 
        new ex.base.Vector(50, 50), 
        new ex.display.AnimatedSprite(
          new ex.base.Vector(0,0),
          36, 40, 7,
          ex.Assets.getImage("player")),
        true, 
        this.engine.input
      );
			
			var teleporter = new game.entities.Teleporter(
        "Teleporter",
        new ex.base.Vector(448, 512),
        new ex.display.AnimatedSprite(
          new ex.base.Vector(0,0),
          60, 60, 10,
          ex.Assets.getImage("teleport")),
        true
      );
      teleporter.onCollide = function(target, data){
        if(target.name == "Player" && !teleporter.triggered){
          ex.Assets.getAudio("laser").play();
          teleporter.triggered = true;
          that.engine.loadScene("level2");
        }
      };
      
      var hiddenOverlayTrigger = new ex.world.Trigger(
        new ex.base.Point(1088, 608),
        64, 32
      );
      hiddenOverlayTrigger.addEventListener('Player', function(){
        hiddenOverlay.visible = false;
      });
			
      /*
       * Push all scene objects into array and return them.
       */
      
			// Background Image
      objects.push(hiddenOverlay);
      objects.push(platforms);
      objects.push(hiddenOverlayTrigger);
      objects.push(teleporter);
      objects.push(this.engine.currentWorld.globalObjects.player);
      objects.push(collisionMap);
      objects.push(background);
		
			return objects;
		},
		
		finalSetup: function() {
			this.engine.camera.follow(this.engine.currentWorld.globalObjects.player);
		}
	});
});