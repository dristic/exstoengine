Ext.Loader.setConfig({ enabled: true });

Ext.require([
     'exsocket.LoginPanel'
 ]);

Ext.application({
    name: 'ExSocket',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	id: 'viewport',
            layout: {
            	type: 'vbox',
            	align: 'center',
            	pack: 'center'
            },
            items: [
                Ext.create('exsocket.LoginPanel')
            ]
        });
    }
});