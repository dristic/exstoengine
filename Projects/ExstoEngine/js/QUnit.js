module("ExstoEngine Setup");
			
test("Includes", function(){
	expect(8);
	ok(typeof ex.Engine != 'undefined', "ex.Engine included");
	ok(typeof ex.world.World != 'undefined', "ex.world.World included");
	ok(typeof ex.simplex.LevelEditor != 'undefined', "ex.simplex.LevelEditor included");
	ok(typeof ex.simplex.Layer != 'undefined', "ex.simplex.Layer included");
	ok(typeof ex.simplex.TileLayer != 'undefined', "ex.simplex.TileLayer included");
	ok(typeof ex.simplex.ImageLayer != 'undefined', "ex.simplex.ImageLayer included");
	ok(typeof ex.display.SpriteMap != 'undefined', "ex.display.SpriteMap included");
	ok(typeof ex.world.TileMap != 'undefined', "ex.world.TileMap included");
});