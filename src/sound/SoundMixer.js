ex.using([
          
], function () {
  var mixer;
  
	ex.define("ex.sound.SoundMixer", {
		__statics: {
		  audio: [],
		  muted: false,
		  masterVolume: 1,
		  
		  registerAudio: function (audio) {
		    audio.volume = mixer.masterVolume;
		    audio.muted = mixer.muted;
		    mixer.audio.push(audio);
		  },
		  
		  unregisterAudio: function (audio) {
		    ex.Array.remove(mixer.audio, audio);
		  },
		  
		  setMasterVolume: function (volume) {
		    ex.Array.each(mixer.audio, function (audio, index) {
		      if(audio.volume > volume) audio.volume = volume;
		    });
		    
		    mixer.masterVolume = volume;
		  },
	    
	    muteAll: function () {
	      ex.Array.each(mixer.audio, function (channel, index) {
	        channel.muted = true;
	      });
	      
	      mixer.muted = true;
	    },
	    
	    unmuteAll: function () {
	      ex.Array.each(mixer.audio, function (channel, index) {
	        channel.muted = false;
	      });
	      
	      mixer.muted = false;
	    }
		}
	});
	
	mixer = ex.sound.SoundMixer;
});