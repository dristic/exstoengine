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
		        	region: 'north',
		        	items: {
		        		xtype: 'tileview'
		        	}
		        }, {
		        	xtype: 'menu',
		        	region: 'east'
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