ex.using([
  'ex.base.Component'
], function () {
  ex.define('ex.plugins.Data', ex.base.Component, {
    __alias: 'ex.Data',
    
    __statics: {
      data: {},
      
      set: function (key, value) {
        ex.Data.data[key] = value;
      },
      
      get: function (key) {
        return ex.Data.data[key];
      }
    }
  });
});