Ext.define('ExSocket.view.room.List', {
	extend: 'Ext.grid.Panel',
	xtype: 'room-list',
	
    title: 'Rooms',
    
    columns: [
        { header: 'Name',  dataIndex: 'name', flex: 1 },
        { header: 'Creator', dataIndex: 'creator' },
        { header: 'Users', dataIndex: 'users', renderer: function (value) { return value.length; } }
    ],
    
    height: 300,
    width: 400,
    
    buttons: [{
        text: 'Join Room',
        id: 'join-button'
    }]
});
