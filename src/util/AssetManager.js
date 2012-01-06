ex.using([
    'ex.base.GlobalComponent',
    'ex.sound.Sound',
    'ex.event.EventTarget',
    'ex.util.Debug'
],function () {
  ex.define("ex.util.AssetManager", ex.base.GlobalComponent, {
    __alias: 'ex.Assets',
    
    /**
     * The global asset manager, loads and retrieves audio, video, 
     * and image files.
     * 
     * @name ex.Assets
     * @class
     */
    __statics: {
      _audio: {
        numAssets: 0
      },
      _video: {
        numAssets: 0
      },
      _images: {
        numAssets: 0
      },
      _files: {
        numAssets: 0
      },
      _ready: true,
      _eventHandler: new ex.event.EventTarget(),
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
          this._throwAssetDoesNotExistError(name, 'audio');
      },
      
      /**
       * Retrieves a video file by name from the asset manager.
       * 
       * @function
       * @name getVideo
       * @memberof ex.Assets
       * 
       * @param {String} name
       * @returns {Boolean}
       */
      getVideo: function(name) {
        return this._video[name] || 
          this._throwAssetDoesNotExistError(name, 'video');
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
          this._throwImageNotReadyError(name);
        }
        return this._images[name] || 
          this._throwAssetDoesNotExistError(name, 'image');
      },
      
      getFile: function (name) {
        if(!this._ready) {
          this._throwFileNotReadyError(name);
        }
        return this._files[name] ||
          this._throwAssetDoesNotExistError(name, 'file');
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
        if(this._ready == true) {
          this._eventHandler.dispatchEvent('loadStart');
        }
        // Determine file type and use proper loading method
        var extension = filePath.substring(filePath.lastIndexOf('.'));
        if(this._supportedExtensions.image.indexOf(extension) > -1) {
          this._loadImage(name, filePath, options);
        } else if (this._supportedExtensions.audio.indexOf(extension) > -1) {
          this._loadAudio(name, filePath, options);
        } else if (this._supportedExtensions.video.indexOf(extension) > -1) {
          this._loadVideo(name, filePath, options);
        } else {
          this._loadFile(name, filePath, options);
          // Technically if we add the "File" type we can load anything into text format.
          //this._throwFileTypeNotSupportedError(name, filePath, extension);
        }
      },
      
      /**
       * Loads a collection of files from the file system and adds
       * them to the asset manager.
       * 
       * @function
       * @name loadBulk
       * @memberOf ex.Assets
       * 
       * @param {Array} list each item is formatted as {name, filePath, options}
       */
      loadBulk: function(list){
        if(this._ready == true) {
          this._ready = false;
          this._eventHandler.dispatchEvent('loadStart');
        }
        
        var index = list.length;
        while(index--){
          this.load(list[index].name, list[index].filePath, list[index].options);
        }
      },
      
      _loadFile: function (name, filePath, options) {
        this._assetsToLoad++;
        this._ready = false;
        
        function completeAsset(asset) {
          that._assetsLoaded++;
          that._eventHandler.dispatchEvent('assetLoaded', asset);
          that._debugOnAssetLoaded(asset);
          that._checkReadyState();
        };
        
        if(this._files[name]) {
          var asset = this._files[name];
          completeAsset(asset);
          return;
        }
        
        this._files[name] = {};
        
        // Load the file using AJAX
        var that = this;
        ex.Loader.ajax(filePath, {}, function (data) {
          if(filePath.substr(filePath.length - 3) == 'exf') data = JSON.parse(data);
          that._files[name] = data;
          that._files.numAssets++;
          completeAsset(that._files[name]);
        });
      },
      
      _loadImage: function(name, filePath, options) {
        this._assetsToLoad++;
        this._ready = false;
        
        if(this._images[name]) {
          var asset = this._images[name];
          this._throwImageNameConflictError(name, filePath);
          this._assetsLoaded++;
          this._eventHandler.dispatchEvent('assetLoaded', asset);
          this._debugOnAssetLoaded(asset);
          this._checkReadyState();
          return;
        }
        
        this._images[name] = new Image();
        
        var that = this;
        this._images[name].onError = this._throwUnableToLoadFileError;
        this._images[name].onload = function () {
          var asset = {type: 'Image', name: name, filePath: filePath, options: options};
          that._assetsLoaded++;
          that._images.numAssets++;
          that._eventHandler.dispatchEvent('assetLoaded', asset);
          that._debugOnAssetLoaded(asset);
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
        
        that.audio.onError = this._throwUnableToLoadFileError;
        that.audio.src = filePath;
        that.audio.addEventListener('canplaythrough', function (event) {
          var asset = {type: 'Audio', name: name, filePath: filePath, options: options};
          that2._eventHandler.dispatchEvent('assetLoaded',  asset);
          that2._debugOnAssetLoaded(asset);
          that2._assetsLoaded++;
          that2._audio.numAssets++;
          that2._checkReadyState();
          while(numChannels--) {
            that.channels.push(that.audio.cloneNode(true));
            that.readyChannels.push(true);
          }
        });
        
        this._audio[name] = exSound;
      },
      
      _loadVideo: function(name, filePath, options) {
        this._throwVideoNotSupportedError();
      },
      
      _checkReadyState: function() {
        if(this._assetsLoaded == this._assetsToLoad && this._ready == false) {
          this._ready = true;
          this._eventHandler.dispatchEvent('loadEnd');
          this._debugAssetCount();
        }
      },
      
      /*
       * DEBUG LOGGING
       */
      
      _debugAssetCount: function() {
        ex.Debug.log(
            'Total Assets: ' + this._assetsLoaded +
            ' | Audio: ' + this._audio.numAssets + 
            ' | Image: ' + this._images.numAssets + 
            ' | Video: ' + this._video.numAssets +
            ' | File: ' + this._files.numAssets,
            'INFO');
      },
      
      _debugOnAssetLoaded: function(asset) {
        ex.Debug.log(
            'Asset Loaded: ' + asset.type + ' | ' + asset.name + ' | "' +
            asset.filePath + '" | ' + asset.options,
            'INFO');
      },
      
      /*  
       * ERROR LOGGING
       */
      
      _throwAssetDoesNotExistError: function(name, type) {
        ex.Debug.log(
          "The " + type + " file '" + name + "' does not exist. Maybe you forgot to load it.", 
          'ERROR');
      },
      
      _throwUnableToLoadFileError: function(filePath) {
        ex.Debug.log(
            "An error occured while loading the file at '" + filePath + "'.",
            'ERROR');
      },
      
      _throwFileTypeNotSupportedError: function(name, filePath, extension) {
        ex.Debug.log(
          'Not loading  "' + name + '" from "' + filePath + 
          '" because the extension "' + extension + '" is not supported.',
          'ERROR');
      },
      
      _throwVideoNotSupportedError: function() {
        ex.Debug.log("Sorry, video is not supported in this version of the engine.",
            'ERROR');
      },
      
      _throwImageNameConflictError: function(name, filePath) {
        ex.Debug.log(
            'An image by the name "' + name + '" already exists. Not loading "' + filePath + '".',
            'INFO');
      },
      
      _throwImageNotReadyError: function(name) {
        ex.Debug.log(
            "Retrieved image " + name + ", but it has not finished loading.",
            'INFO');
      },
      
      _throwFileNotReadyError: function(name) {
        ex.Debug.log(
            "Retrieved file " + name + ", but it has not finished loading.",
            'INFO');
      }
    }
  });
});