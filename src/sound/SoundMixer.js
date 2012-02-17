ex.using([
          
], function () {
  var mixer;
  
	ex.define("ex.sound.SoundMixer", {
		__statics: {
		  audio: [],
		  volumes: [],
		  muted: false,
		  masterVolume: 1,
		  tempMasterVolume: 1,
		  
		  registerAudio: function (audio) {
		    audio.volume = mixer.masterVolume;
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
	      var manager = mixer;
	      manager.volumes = [];
	      
	      var i = 0,
	          ln = manager.audio.length,
	          audio;
	      for(; i != ln; i++) {
	        audio = manager.audio[i];
	        manager.volumes.push(audio.volume);
	        audio.volume = 0;
	      }
	      
	      mixer.tempMasterVolume = mixer.masterVolume;
	      mixer.masterVolume = 0;
	      
	      mixer.muted = true;
	    },
	    
	    unmuteAll: function () {
	      var manager = mixer,
	          i = 0,
	          ln = manager.audio.length;
	      for(; i != ln; i++) {
	        manager.audio[i].volume = manager.volumes[i];
	      }
	      
	      mixer.masterVolume = mixer.tempMasterVolume;
	      
	      mixer.muted = false;
	    }
		}
	});
	
	mixer = ex.sound.SoundMixer;
});