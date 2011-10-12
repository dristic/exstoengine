ex.using([
  'ex.display.Sprite',
  'ex.base.Component'
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
					x: 300,
					y: 100
				},
				menu: {
					x: 400,
					y: 300,
					actionKey: ex.util.Key.Enter
				},
				selection: {
					width: 150,
					height: 70
				},
			};
		},
		
		moveUpMenu: function() {
			if(this.currentSelection != 0){
				this.currentSelection--;
			}
		},
		
		moveDownMenu: function() {
			if(this.currentSelection < (this.selections.length - 1)) {
				this.currentSelection++;
			}
		},
		
		update: function(dt){
			if(this.input.isKeyPressed(this.options.menu.actionKey)) {
				this.selections[this.currentSelection].action();
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
			if(this.input.mouseDown){
				var index = this.selections.length;
				while(index--){
					if(this.input.mouseX > (this.options.menu.x - this.options.selection.width) &&
							this.input.mouseX < (this.options.menu.x + this.options.selection.width) &&
							this.input.mouseY > (this.options.menu.y + (this.options.selection.height * (index - 1))) &&
							this.input.mouseY < (this.options.menu.y + (this.options.selection.height * (index)))){
						this.selections[index].action();
					}
				}
			}
		},
		
		render: function(context, camX, camY){
			if(this.options.background.image != null) {
				context.drawImage(
						this.options.background.image,
						0,0);
			}
			
			if(this.options.logo.image != null) {
				context.drawImage(
						this.options.logo.image,
						this.options.logo.x,
						this.options.logo.y);
			}
			
			context.font = "40pt Calibri";
			context.fillStyle = "#FF0000";
			context.textAlign = "center";
			
			var xPos = this.options.menu.x;
			var yPos = this.options.menu.y;
			var index = 0;
			for(index; index < this.selections.length; index++) {
				// Color current selection differently
				if(index == this.currentSelection){
					context.fillStyle = "#00FF00";
					context.fillText(this.selections[index].text, xPos, yPos);
					context.fillStyle = "#FF0000";
				} else {
					// Print non selected options in normal color
					context.fillText(this.selections[index].text, xPos, yPos);
				}
				yPos += this.options.selection.height;
			}
		}
	});
});