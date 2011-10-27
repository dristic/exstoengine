Ext.define('exsocket.LoginPanel', {
	extend: 'Ext.form.Panel',

    title: 'Login',
    bodyPadding: 5,
    id: 'login-form',

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        fieldLabel: 'User Name',
        name: 'username',
        allowBlank: false
    },{
        fieldLabel: 'Password',
        name: 'password',
        inputType: 'password',
        allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
            	Ext.get('login-form').fadeOut({
            		duration: 200
            	});
            	setTimeout(function () {
            		login(form.getValues());
            		form.destroy();
            		//var viewport = Ext.getCmp('viewport');
            		//viewport.removeAll();
            		//viewport.destroy();
            		//Ext.select('.x-box-inner').destroy();
            	}, 200);
            }
        }
    }]
});