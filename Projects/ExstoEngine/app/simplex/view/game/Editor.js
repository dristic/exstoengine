Ext.define('Simplex.view.game.Editor', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.editor',
	
	title: 'Editor',
	html: '<canvas id="game"></canvas>',
	
	// Toolbar dock
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Save',
            tooltip: 'Save Button',
            icon: 'resources/icons/16x16/Save.png'
        }, {
            xtype: 'button',
            text: 'Add',
            tooltip: 'Add Button',
            icon: 'resources/icons/16x16/Plus.png'
        }, {
            xtype: 'button',
            text: 'Close',
            tooltip: 'Close Button',
            icon: 'resources/icons/16x16/Trash.png'
        }, '-', {
            xtype: 'splitbutton',
            text: 'Split Button'
        }, '->', {
            xtype: 'textfield',
            name: 'search',
            emptyText: 'Search'
        }]
    }]
});