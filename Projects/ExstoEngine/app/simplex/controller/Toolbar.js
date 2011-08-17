Ext.define('Simplex.controller.Toolbar', {
	extend: 'Ext.app.Controller',
	
	views: [
        'toolbar.Panel'
    ],
    
    init: function () {
    	this.control({
    		'toolbar button[text="Save"]': {
    			click: this.save
    		},
    		
    		'toolbar button[text="Load"]': {
    			click: this.load
    		}
    	})
    },
    
    save: function () {
    	alert("Save Clicked");
    },
    
    load: function () {
    	alert("Load Clicked");
    }
});