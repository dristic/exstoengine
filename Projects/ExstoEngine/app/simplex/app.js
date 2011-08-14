Ext.application({
	name: 'Simplex',
	
	appFolder: '',
	
	controllers: [
      	'Menu',
      	'Game'
  	],
	
	launch: function () {
		Ext.create('Ext.container.Viewport', {
			layout: 'border',
			items: [
		        {
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