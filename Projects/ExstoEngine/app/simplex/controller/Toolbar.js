Ext.define('Simplex.controller.Toolbar', {
	extend: 'Ext.app.Controller',
	
	views: [
        'toolbar.Panel'
    ],
    
    refs: [
       { ref: 'fileField', selector: 'filefield' }
    ],
    
    init: function () {
    	this.control({
    		'toolbar button[text="Save"]': {
    			click: this.save
    		},
    		
    		'toolbar filefield': {
    			change: {
    				fn: this.load,
    				scope: this
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
    	var file = field.fileInputEl.dom.files[0];
    	var reader = new FileReader();
    	
    	window.loadMap = ex.bind(this.getController('Game'), this.getController('Game').loadMap);
    	
    	reader.onload = this.onloaded;
    	reader.readAsText(file);
    },
    
    onloaded: function (event) {
    	var fileString = event.target.result;
    	
    	var script = ex.Element.createTag("script", ex.Element.defaults.SCRIPT);
    	script.innerHTML = fileString;
    	ex.Element.getByTagName('head').appendChild(script);
    }
});