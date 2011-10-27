ex.using([
    'ex.base.GlobalComponent',
    'ex.sound.Sound'
],function () {
	ex.define("ex.util.AssetManager", ex.base.GlobalComponent, {
		statics: {
			componentName: 'Assets',
			
			_audio: [],
			_video: [],
			_images: [],
			_ready: true,
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
			
			getAudio: function(name) {
				return this._audio[name] || 
					throwAssetDoesNotExistError(name, 'audio');
			},
			
			getVideo: function(name) {
				return this._video[name] || 
					throwAssetDoesNotExistError(name, 'video');
			},
			
			getImage: function(name) {
				return this._images[name] || 
					throwAssetDoesNotExistError(name, 'image');
			},
			
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
			
			_loadImage: function(name, filePath, options) {
				this._images[name] = new Image();
				
				this._ready = false;
				this._assetsToLoad++;
				
				var that = this;
				this._images[name].onError = throwFileUnableToLoadError;
				this._images[name].onload = function () {
					that._assetsLoaded++;
					if(that._assetsLoaded == that._assetsToLoad) {
						that._ready = true;
					}
				};
				
				this._images[name].src = '';
				this._images[name].src = filePath + '? ex=' + (new Date());
			},
			
			_loadAudio: function(name, filePath, options) {
				var numChannels = 4;
				if(options && options.numChannels){
					numChannels = options.numChannels;
				}
				
				var exSound = new ex.sound.Sound(new Audio()),
					that = exSound;
				
				this._ready = false;
				this._assetsToLoad++;
				
				that.audio.onError = throwFileUnableToLoadError;
				that.audio.src = filePath + '? ex=' + (new Date());
				that.audio.addEventListener('canplaythrough', function (event) {
					while(numChannels--) {
						that.channels.push(that.audio.cloneNode(true));
						that.readyChannels.push(true);
						that.ready = true;
					}
				});
				
				this._audio[name] = exSound;
			},
			
			_loadVideo: function(name, filePath, options) {
				console.error("No support for video loading yet. Maybe next time!");
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