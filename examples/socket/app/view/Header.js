Ext.define('ExSocket.view.Header', {
    extend: 'Ext.Toolbar',
    xtype : 'header',
    
    ui: 'sencha',
    height: 53,
    
    items: [
        {
            xtype: 'component',
            cls  : 'x-logo',
            html : 'Exsto Engine'
        }
    ]
});
