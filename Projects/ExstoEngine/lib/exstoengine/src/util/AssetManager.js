ex.using([
    'ex.base.GlobalComponent',
    'ex.sound.Sound'
],function () {
	ex.define("ex.util.AssetManager", ex.base.GlobalComponent, {
		constructor: function () {
			this.audio = [];
			this.video = [];
			this.images = [];
			this.ready= true;
			this.assetsToLoad = 0;
			this.assetsLoaded = 0;
			
			this.supportedExtensions = {
					video: [
					    // MP4 (Chrome, IE9, Safari, iOS, Android)
					    '.mp4', '.m4v', '.f4v', '.mov',
					    // WebM (FF, Chrome, Opera)
					    '.webm',
					    // Vorbis (FF, Chrome, Opera)
					    '.ogv'
					    ],
					audio: [
					    '.aac', '.m4a', '.f4a',
					    '.ogg', '.oga',
					    '.mp3'
					    ],
					image: [
					    '.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi',
					    '.png',
					    '.gif',
					    '.bmp', '.dib'
					    ]
			}
		},
		
		load: function (name, filePath) {
			// Determine file type and use proper loading method
			var extension = filePath.substring(filePath.indexOf('.'));
			if(this.supportedExtensions.image.indexOf(extension) > -1) {
				this._loadImage(name, filePath);
			} else if (this.supportedExtensions.audio.indexOf(extension) > -1) {
				this._loadAudio(name, filePath);
			} else if (this.supportedExtensions.video.indexOf(extension) > -1) {
				this._loadVideo(name, filePath);
			} else {
				console.error('Cannot load  "' + name + '" from "' + filePath + '": extension "' + extension + '" is not supported.');
			}
		},
		
		_loadImage: function(name, filePath) {
			this.images[name] = new Image();
			
			this.ready = false;
			this.assetsToLoad++;
			
			var that = this;
			this.images[name].onload = function () {
				that.assetsLoaded++;
				if(that.assetsLoaded == that.assetsToLoad) {
					that.ready = true;
				}
			};
			
			this.images[name].src = '';
			this.images[name].src = filePath + '? ex=' + (new Date());
		},
		
		_loadAudio: function(name, filePath, numChannels) {
			var exSound = new ex.sound.Sound(new Audio()),
				that = exSound;
			
			this.ready = false;
			this.assetsToLoad++;
			
			that.audio.src = filePath + '? ex=' + (new Date());
			that.audio.addEventListener('canplaythrough', function (event) {
				var i = numChannels || 4;
				while(i--) {
					that.channels.push(that.audio.cloneNode(true));
					that.readyChannels.push(true);
					that.ready = true;
				}
			});
			
			this.audio[name] = exSound;
		},
		
		_loadVideo: function(name, filePath) {
			
		}
	});
});