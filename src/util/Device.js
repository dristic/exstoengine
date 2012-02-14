ex.using([

], function () {
  ex.define('ex.util.Device', {
    __alias: 'ex.Device',
    
    __statics: {
      isOnline: function () {
        return navigator.onLine;
      },
      
      cache: {
        UNCACHED: 0,
        IDLE: 1,
        CHECKING: 2,
        DOWNLOADING: 3,
        UPDATEREADY: 4,
        OBSOLETE: 5,
        
        status: function () {
          var appCache = window.applicationCache;
          
          switch(appCache.status) {
            case appCache.UNCACHED:
              return ex.Device.cache.UNCACHED;
              break;
            case appCache.IDLE:
              return ex.Device.cache.IDLE;
              break;
            case appCache.CHECKING:
              return ex.Device.cache.CHECKING;
              break;
            case appCache.DOWNLOADING:
              return ex.Device.cache.DOWNLOADING;
              break;
            case appCache.UPDATEREADY:
              return ex.Device.cache.UPDATEREADY;
              break;
            case appCache.OBSOLETE:
              return ex.Device.cache.OBSOLETE;
              break;
          }
        },
        
        update: function (callback) {
          window.applicationCache.addEventListener('updateready', function(e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
              window.applicationCache.swapCache();
              callback();
            } else {
              // Manifest didn't changed. Nothing new to server.
            }
          }, false);
          
          window.applicationCache.update();
        }
      }
      
      supports: {
        canvas: function () {
          var el = document.createElement('canvas');
          return !ex.isNull(el.getContext);
        },
        
        localStorage: function () {
          try {
            return 'localStorage' in window && window['localStorage'] !== null;
          } catch(e) {
            return false;
          }
        }
      }
    }
  });
});