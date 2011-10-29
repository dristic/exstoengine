{
	assets: [
		{name: "tiles", filePath: "tileset-platformer.png"},
		{name: "background", filePath: "bg.png"}
	],
	
	entities: [
	    "Player",
	    "Teleporter"
	],
	
	objects: [
        {
        	type: "ex.world.Collisionmap",
        	params: {
        		position: new ex.base.Vector(0,0),
        		data: [[]] // 2D array of data
        	}
        }, {
        	type: "ex.display.SpriteMap",
        	params: {
        		position: new ex.base.Vector(0,0),
        		data: [[]], // 2D array of data
        		tileSet: ex.Assets.getImage("tiles"), // Don't know how to call this properly...check next line
        		tileSet: {
        			func: "ex.Assets.getImage",
        			params: ["tiles"]
        		}
        	}
        }      
	]
}