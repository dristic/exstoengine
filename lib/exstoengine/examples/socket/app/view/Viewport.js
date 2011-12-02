Ext.define('ExSocket.view.Viewport', {
    extend: 'Ext.container.Viewport',
    //requires: ['ExSocket.view.Header'],
    
    layout: {
    	type: 'vbox',
    	align: 'center',
    	pack: 'center'
    },
    
    items: [
        {
            xtype : 'header'
        },
        
        {
        	bodyPadding: 0,
        	layout: 'fit',
        	id: 'content-panel'
        }
    ]
});
