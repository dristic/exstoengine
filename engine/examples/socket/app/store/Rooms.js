Ext.define('ExSocket.store.Rooms', {
	extend: 'Ext.data.ArrayStore',
    
    fields: [
        'name', 
        'creator', 
        'users'
    ],
    
    data: {
    	'items': [
         ]
    },
    
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});