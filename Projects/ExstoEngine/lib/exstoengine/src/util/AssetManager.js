ex.using([
    'ex.base.GlobalComponent',
    'ex.sound.Sound',
    'ex.event.EventTarget'
],function () {
  ex.define("ex.util.AssetManager", ex.base.GlobalComponent, {
    /**
     * The global asset manager, loads and retrieves audio, video, 
     * and image files.
     * 
     * @name ex.Assets
     * @class
     */
    statics: {
      componentName: 'Assets',
      
      _audio: [],
      _video: [],
      _images: [],
      _ready: true,
      _readyListener: new ex.event.EventTarget(),
      _assetsToLoad: 0,
      _assetsLoaded: 0,
  
      _supportedExtensions: {
        video: [
            // MP4 (Chrome, IE9, Safari, iOS, Android)
            '.mp4', '.m4v', '.f4v', '.mov',
            // WebM (FF, Chrome, Opera)
            '.webm',
            // Vorbis (FF, Chrome, Opera)
            '.ogv'
            ],
        audio: [
            // AAC (Chrome, IE9, Safari, iOS, Android)
            '.aac', '.m4a', '.f4a',
            // Vorbis (FF, Chrome, Opera, Android)
            '.ogg', '.oga',
            // MP3 (Chrome, IE9, Safari, iOS, Android)
            '.mp3'
            ],
        image: [
            // Full Support
            '.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi',
            '.png',
            '.gif',
            '.bmp', '.dib'
            ]
      },
      
      /**
       * Retrieves an audio file by name from the asset manager.
       * 
       * @function
       * @name getAudio
       * @memberOf ex.Assets
       * 
       * @param {String} name
       * @returns {ex.sound.Sound} audio file or null with error
       */
      getAudio: function(name) {
        return this._audio[name] || 
          throwAssetDoesNotExistError(name, 'audio');
      },
      
      getVideo: function(name) {
        return this._video[name] || 
          throwAssetDoesNotExistError(name, 'video');
      },
      
      /**
       * Retrieves an image file by name from the asset manager.
       * 
       * @function
       * @name getImage
       * @memberOf ex.Assets
       * 
       * @param {String} name
       * @returns {Image} image file or null with error
       */
      getImage: function(name) {
        if(!this._ready){
          console.log("Cannot retrieve " + name + " image. Assets are still loading.");
        }
        return this._images[name] || 
          throwAssetDoesNotExistError(name, 'image');
      },
      
      /**
       * Loads a file from the file system and adds it to the
       * asset manager.
       * 
       * @function
       * @name load
       * @memberOf ex.Assets
       * 
       * @param {String} name name used to retrieve asset once loaded
       * @param {String} filePath path to the asset in the file system
       * @param {Object} [options] extra parameters, varies
       *    by asset type.
       */
      load: function (name, filePath, options) {
        // Determine file type and use proper loading method
        var extension = filePath.substring(filePath.lastIndexOf('.'));
        if(this._supportedExtensions.image.indexOf(extension) > -1) {
          this._loadImage(name, filePath, options);
        } else if (this._supportedExtensions.audio.indexOf(extension) > -1) {
          this._loadAudio(name, filePath, options);
        } else if (this._supportedExtensions.video.indexOf(extension) > -1) {
          this._loadVideo(name, filePath, options);
        } else {
          throwFileTypeNotSupportedError(name, filePath, extension);
        }
      },
      
      loadBulk: function(list){
        var index = list.length;
        while(index--){
          this.load(list[index].name, list[index].filePath, list[index].options);
        }
      },
      
      _loadImage: function(name, filePath, options) {
        if(this._images[name]){
          console.error(name + " cannot be loaded. This image already exists.");
          return;
        }
        this._images[name] = new Image();
        
        this._ready = false;
        this._assetsToLoad++;
        
        var that = this;
        this._images[name].onError = throwFileUnableToLoadError;
        this._images[name].onload = function () {
          that._assetsLoaded++;
          that._checkReadyState();
        };
        
        this._images[name].src = '';
        this._images[name].src = filePath;
      },
      
      _loadAudio: function(name, filePath, options) {
        var numChannels = 4;
        if(options && options.numChannels){
          numChannels = options.numChannels;
        }
        
        var exSound = new ex.sound.Sound(new Audio());
        var that = exSound;
        var that2 = this;
        
        this._ready = false;
        this._assetsToLoad++;
        
        that.audio.onError = throwFileUnableToLoadError;
        that.audio.src = filePath;
        that.audio.addEventListener('canplaythrough', function (event) {
          while(numChannels--) {
            that.channels.push(that.audio.cloneNode(true));
            that.readyChannels.push(true);
            that2._assetsLoaded++;
            that2._checkReadyState();
          }
        });
        
        this._audio[name] = exSound;
      },
      
      _loadVideo: function(name, filePath, options) {
        console.error("No support for video loading yet. Maybe next time!");
      },
      
      _checkReadyState: function() {
        if(this._assetsLoaded == this._assetsToLoad) {
          this._ready = true;
          this._readyListener.dispatchEvent('ready');
        }
      }
    }
  });
  
  function throwAssetDoesNotExistError(name, type) {
    console.error("The " + type + " file '" + name + "' does not exist. Maybe you forgot to load it.");
  };
  
  function throwFileUnableToLoadError(filePath) {
    console.error("An error occured while loading the file at '" + filePath + "'.");
  };
  
  function throwFileTypeNotSupportedError(name, filePath, extension) {
    console.error(
        'Not loading  "' + name + 
        '" from "' + filePath + 
        '" because the extension "' + extension + 
        '" is not supported.');
  }
  
  ex.Assets = ex.util.AssetManager;
});