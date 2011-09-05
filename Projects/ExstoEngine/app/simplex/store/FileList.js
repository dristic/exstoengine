Ext.define('Simplex.store.FileList', {
	extend: 'Ext.data.Store',
	model: 'Simplex.model.File',
	proxy: {
        type: 'ajax',
        url : 'api/php/fileList.php',
        extraParams: {
        	dir: ''
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true
});