Ext.Loader.setConfig({ enabled: true });

Ext.application({
	name: 'Simplex',
	
	appFolder: '',
	
	controllers: [
      	'Menu',
      	'Game',
      	'Status',
      	'Toolbar'
  	],
	
	launch: function () {
		Ext.create('Ext.container.Viewport', {
			layout: 'border',
			items: [
		        {
		        	xtype: 'toolbarpanel',
		        	region: 'north'
		        }, {
		        	xtype: 'menu',
		        	region: 'east',
		        	items: [{
	        			xtype: 'layerpanel'
	        		}, {
	        			xtype: 'itempanel'
	        		}]
		        }, {
		        	xtype: 'editor',
		        	region: 'center'
		        }, {
		        	xtype: 'status',
		        	region: 'south'
		        }
	        ]
		});
	}
});