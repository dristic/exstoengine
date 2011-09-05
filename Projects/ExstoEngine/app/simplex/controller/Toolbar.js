Ext.define('Simplex.controller.Toolbar', {
	extend: 'Ext.app.Controller',
	
	views: [
        'toolbar.Panel',
        'toolbar.FileWindow'
    ],
    
    stores: [ 'FileList' ],
    
    models: [ 'File' ],
    
    refs: [
       { ref: 'fileField', selector: 'filefield' }
    ],
    
    init: function () {
    	this.fileWindow = Ext.create('Simplex.view.toolbar.FileWindow');
    	
    	var editor = this.getController('Game');
    	this.control({
    		'toolbar button[text="Save"]': {
    			click: this.save
    		},
    		
    		'toolbar button[text="Load"]': {
    			click: {
    				fn: this.load,
    				scope: this
    			}
    		},
    		
    		'toolbar button[text="Image"]': {
    			click: function(){
    				editor.setActiveTool('imagePlacer');
    			}
    		}
    	});
    },
    
    addChangeListener: function() {
    	//this.getFileField().fileInputEl.dom.addEventListener('change', this.load, false);
    },
    
    save: function () {
    	alert("Save Clicked");
    },
    
    load: function (field, value) {
    	window.loadMap = ex.bind(this.getController('Game'), this.getController('Game').loadMap);
    	
    	this.fileWindow.show();
    }
});