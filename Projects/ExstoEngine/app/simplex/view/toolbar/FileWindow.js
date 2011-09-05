Ext.define('Simplex.view.toolbar.FileWindow', {
	extend: 'Ext.window.Window',
	
	title: 'Select a File',
	width: 600,
	height: 350,
	modal: true,
	draggable: false,
	closable: true,
	closeAction: 'hide',
	layout: 'fit',
	
	initComponent: function () {
		Ext.apply(this, {
			tbar: [{
				xtype: 'button',
				text: 'Up',
				listeners: {
					click: this.dirUp,
					scope: this
				}
			}],
			
			items: [{
		        xtype: 'grid',
		        store: 'FileList',
		        
		        listeners: {
		        	itemdblclick: this.dirDown,
		        	scope: this
		        },
		        
		        columns: [
		          { text: 'Name', sortable: true, dataIndex: 'name' }
		        ]
		    }]
		});
		
		this.callParent(arguments);
	},
	
	dirUp: function () {
		var grid = this.getComponent(0);
		grid.store.getProxy().extraParams.dir += '../';
		grid.store.load();
	},
	
	dirDown: function (view, record, item, index, e) {
		var grid = this.getComponent(0);
		
		if(record.data.isDir == true) {
			grid.store.getProxy().extraParams.dir += record.data.name + '/';
			grid.store.load();
		} else {
			// Select file
			Ext.Ajax.request({
			    url: 'api/php/fileRead.php',
			    params: {
			        dir: grid.store.getProxy().extraParams.dir,
			        file: record.data.name
			    },
			    success: this.onloaded,
			    scope: this
			});
		}		
	},
	
	onloaded: function (response) {
		var text = response.responseText;
    	var script = ex.Element.createTag("script", ex.Element.defaults.SCRIPT);
    	script.innerHTML = text;
    	ex.Element.getByTagName('head').appendChild(script);
    	this.close();
    }
});