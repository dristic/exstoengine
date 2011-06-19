ex.using([
   
], function () {
	ex.namespace("ex.sound");
	
	ex.sound.Sound = new ex.class({
		constructor: function (url) {
			var _audio = new Audio();
			_audio.src = url;
			
			this.audio = _audio;
		},
		
		play: function () {
			this.audio.play();
		},
		
		stop: function () {
			this.audio.stop();
		}
	});
});