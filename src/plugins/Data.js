ex.using([
  'ex.base.Component'
], function () {
  ex.define('ex.plugins.Data', ex.base.Component, {
    __alias: 'ex.Data',
    
    __statics: {
      data: {},
      storageKeys: null,
      
      setStorageKeys: function (keys) {
        this.storageKeys = keys;
      },
      
      clear: function () {
        localStorage.clear();
      },
      
      save: function () {
        var data = {};
        
        if(this.storageKeys) {
          var i = 0,
              ln = this.storageKeys.length,
              key;
          for(; i != ln; i++) {
            key = this.storageKeys[i];
            data[key] = this.data[key];
          }
        } else {
          data = this.data;
        }
        
        data = JSON.stringify(data);
        
        localStorage['data'] = data;
      },
      
      load: function () {
        var data = localStorage['data'];
        
        if(data) {
          data = JSON.parse(data);
          
          if(this.storageKeys) {
            var i = 0,
                ln = this.storageKeys.length,
                key;
            for(; i != ln; i++) {
              key = this.storageKeys[i];
              this.data[key] = data[key];
            }
          } else {
            ex.extend(this.data, data, true);
          }
        }
        
        return data;
      },
      
      set: function (key, value) {
        ex.Data.data[key] = value;
      },
      
      get: function (key) {
        return ex.Data.data[key];
      }
    }
  });
});