Ext.define('ExSocket.view.login.Login', {
    extend: 'Ext.Container',
    
    xtype: 'login-form',
    
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    
    defaults: {
        width: 400,
        height: 295
    },
    
    items: [
        {
            xtype: 'form',
            
            title: 'Login',
            frame:true,
            bodyPadding: 13,
            height: null,
            
            defaultType: 'textfield',
            defaults: { anchor: '100%' },
            
            items: [
                { allowBlank:false, fieldLabel: 'User Name', name: 'name', emptyText: 'user name' },
                { allowBlank:false, fieldLabel: 'Password', name: 'password', emptyText: 'password', inputType: 'password' }
            ],
            
            buttons: [{
                text: 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }, {
                text: 'Login',
                id: 'login-button'
            }]
            
        }
    ]
});