ex.using([
  'ex.display.Sprite',
], function() {	
	ex.define("ex.display.ui.TitleMenu", ex.base.Component, {
		constructor: function(selections, defaultSelection, bgImage, logoImage, input){
			this.selections = selections;
			this.currentSelection = defaultSelection;
			this.input = input;
			
			this.options = {
				background: {
					image: bgImage
				},
				logo: {
					image: logoImage,
					x: 400,
					y: 300
				},
				menu: {
					x: 400,
					y: 500,
					actionKey: ex.util.Key.Enter
				},
				selection: {
					width: 200,
					height: 100
				},
			};
		},
		
		update: function(dt){
			if(this.input.isKeyPressed(this.options.menu.actionKey)) {
				this.currentSelection.action();
			}
			if(this.input.isKeyPressed(ex.util.Key.Up)) {
				this.moveUpMenu();
			}
			if(this.input.isKeyPressed(ex.util.Key.Down)) {
				this.moveDownMenu();
			}
			
			// Mouse events for mobile devices or people using mice
			// should go here...
			// 		Requirements:
			//		 - bounding box
			//		 - click event to run action
			//		 - mouseover event to set currentSelection
		},
		
		render: function(context, camX, camY){
			if(this.options.background.image != null) {
				context.drawImage(
						this.options.background.image,
						0,0);
			}
			
			var xPos = this.options.menu.x - (this.options.selection.width / 2);
			var yPos = this.options.menu.y;
			var index = 0;
			for(index; index < this.selections.length; index++) {
				if(this.selections[index] === this.currentSelection){
					// TODO: Set color to selected
					ctx.fillText(this.selections[index].text, xPos, yPos);
					// TODO: Set color back to default
				} else {
					ctx.fillText(this.selections[index].text, xPos, yPos);
				}
				yPos += this.options.selection.height;
			}
		}
	});
});