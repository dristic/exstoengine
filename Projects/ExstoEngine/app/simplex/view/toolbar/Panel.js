Ext.define('Simplex.view.toolbar.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.toolbarpanel',
	
	height: 29,
	items: [{
		xtype: 'toolbar',
		items: [{
		    xtype: 'button',
		    text: 'Save',
		    icon: 'resources/icons/16x16/Save.png'
		}, {
			xtype: 'button',
			text: 'Load',
		    icon: 'resources/icons/16x16/Folder3.png'
		}, {
			xtype: 'button',
			text: 'Image',
			icon: 'resources/icons/16x16/Photo.png'
		}]
	}]
});