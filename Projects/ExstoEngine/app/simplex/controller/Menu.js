Ext.define('Simplex.controller.Menu', {
	extend: 'Ext.app.Controller',
	
	views: [
        'menu.Panel',
        'menu.TileView',
        'menu.LayerPanel'
    ],
    
    refs: [
       { ref: 'layerList', selector: 'layerlist' }
    ],
    
	init: function () {		
		this.control({
			"layerlist": {
				// Set active layer
				selectionchange: this.onSelectionChange,
		
				check: function(){		//FIXME: this doesn't work because the checkbox is in the template
					alert("checked!");
				}
		
				//Layer checkbox checked show layer
				//Layer checkbox checked hide layer
			}
			
		});
	},
	
	onSelectionChange: function (e) {
		var editor = this.getController('Game');
		var records = this.getLayerList().getSelectionModel().getSelection();
		var index = 0;
		for(index; index < records.length; index++){
			editor.toggleLayer(records[index].get('layerId'));
		}
		
	}
});