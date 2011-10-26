ex.using([
   
], function () {
	ex.define("ex.sound.Sound", {
		
		/**
		 * A container class for sound objects.
		 * 
		 * @name ex.sound.Sound
		 * 
		 * @param {String} url address to the audio track
		 * @param {Number} numChannels number of audio channels in the track
		 * 
		 * @property {Audio} audio
		 * @property {Number} channels
		 * @property {Object[]} readyChannels the channels that are ready
		 * 		to play.
		 * @property {Boolean} ready true if audio track is finished loading.
		 * 
		 * @constructor
		 */
		constructor: function (audio) {
			this.audio = audio;
			this.channels = [];
			this.readyChannels = [];
			this.ready = false;
		},
		
		/**
		 * Plays the audio track.
		 * 
		 * @function
		 * @name play
		 * @memberOf ex.sound.Sound
		 */
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
		
		/**
		 * Stops audio playback.
		 * 
		 * @function
		 * @name stop
		 * @memberOf ex.sound.Sound
		 */
		stop: function () {
			this.audio.stop();
		}
	});
});