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
            icon: '../../Content/Images/Save.png'
        }, {
            xtype: 'button',
            text: 'Add',
            tooltip: 'Add Button',
            icon: '../../Content/Images/Add.png'
        }, {
            xtype: 'button',
            text: 'Close',
            tooltip: 'Close Button',
            icon: '../../Content/Images/Erase.png'
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