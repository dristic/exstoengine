ex.using([

], function () {
  ex.define('ex.util.Device', {
    __alias: 'ex.Device',
    
    __statics: {
      isOnline: function () {
        return navigator.onLine;
      },
      
      supports: {
        canvas: function () {
          var el = document.createElement('canvas');
          return !ex.isNull(el.getContext);
        }
      }
    }
  });
});