ex.using([
   
], function () {
	ex.define("ex.sound.Sound", {
		constructor: function (url, numChannels) {
			var _audio = new Audio(),
				_this = this;
			
			_audio.src = url;
			
			_audio.addEventListener('canplaythrough', function (event) {
				var i = numChannels || 4;
				while(i--) {
					_this.channels.push(this.cloneNode(true));
					_this.readyChannels.push(true);
					_this.ready = true;
				}
			});
			
			this.audio = _audio;
			this.channels = [];
			this.readyChannels = [];
			this.ready = false;
		},
		
		play: function () {
			if(this.ready == true) {
				var i = 0;
				while(this.readyChannels[i] == false) {
					i++;
					if(i == this.channels.length) {
						return;
					}
				}
				
				var _this = this;
				this.channels[i].addEventListener('ended', function (event) {
					_this.readyChannels[i] = true;
				});
				this.readyChannels[i] = false;
				this.channels[i].play();
			}
		},
		
		stop: function () {
			this.audio.stop();
		}
	});
});