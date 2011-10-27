Ext.create('Ext.data.Store', {
    storeId:'roomStore',
    fields:['name', 'creator', 'users'],
    data:{'items':[
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

Ext.define('exsocket.RoomList', {
	extend: 'Ext.grid.Panel',
    title: 'Rooms',
    store: Ext.data.StoreManager.lookup('roomStore'),
    columns: [
        { header: 'Name',  dataIndex: 'name', flex: 1 },
        { header: 'Creator', dataIndex: 'creator' },
        { header: 'Users', dataIndex: 'users' }
    ],
    height: 300,
    width: 400
});
