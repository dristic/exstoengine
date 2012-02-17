ex.using([
   'ex.sound.SoundMixer'
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
     *    to play.
     * @property {Boolean} ready true if audio track is finished loading.
     * 
     * @constructor
     */
    constructor: function (audio, options) {
      this.defaults = {
          volume: 1,
          loop: false,
          maxChannels: 10,
          preloadChannels: 1
      };
      
      this.options = ex.extend({}, this.defaults, true);
      ex.extend(this.options, options, true);
      
      this.audio = audio;
      this.audio.volume = this.options.volume;
      this.audio.loop = this.options.loop;
      
      this.channels = [];
      this.readyChannels = [];
      this.endedListeners = [];
      this.paused = false;
      this.volume = this.options.volume;
      
      var i = 0,
          ln = this.options.preloadChannels;
      for(; i != ln; i++) {
        this._generateAudioChannel();
      }
    },
    
    /**
     * Plays the audio track.
     * 
     * @function
     * @name play
     * @memberOf ex.sound.Sound
     */
    play: function (loop, channel) {
      var that = this,
          index,
          audio;
      
      if(this.paused) {
        this.paused = false;
        
        ex.Array.each(this.channels, function (channel, index) {
          if(channel.paused && channel.currentTime != channel.initialTime) that.play(channel.loop, index);
        });
      } else {
        if(ex.isNull(channel) == false) {
          index = channel;
        } else {
          if(this.readyChannels.length == 0) {
            this._generateAudioChannel();
          }
          
          index = this.readyChannels.shift();
        }
        
        audio = this.channels[index];
        
        if(!loop) {
          var checkEnded = ex.bind(this, this._onChannelEnded);
          audio.addEventListener('ended', checkEnded);
          this.endedListeners[index] = checkEnded;
        } else {
          audio.loop = loop;
        }
        
        audio.play();
      }
    },
    
    _onChannelEnded: function (event) {
      var index = this.channels.indexOf(event.target);
      event.target.removeEventListener('ended', this.endedListeners[index]);
      this.endedListeners[index] = null;
      this.seek(event.target.initialTime, index);
      
      // Clean up channels if there more than we need.
      if(this.readyChannels.length > this.options.maxChannels) {
        this.destroyChannel(index);
      } else {
        this.readyChannels.push(index);
      }
    },
    
    pause: function (channel) {
      if(ex.isNull(channel) == false) {
        this.channels[i].pause();
      } else {
        var that = this;
        ex.Array.each(this.channels, function (channel, index) {
          if(channel.currentTime != channel.initialTime) {
            channel.pause();
            that.paused = true;
          }
        });
      }
    },
    
    setVolume: function (volume) {
      ex.Array.each(this.channels, function (channel, index) {
        channel.volume = volume;
      });
      
      this.volume = volume;
    },
    
    fadeOut: function (duration, callback) {
      this.fadeTo(0, duration, callback);
    },
    
    fadeTo: function (volume, duration, callback) {
      ex.Array.each(this.channels, function (channel, index) {
        ex.Tween.add(channel, duration, { volume: volume }, { callback: callback });
      });
    },
    
    fadeIn: function (duration, callback) {
      this.fadeTo(1, duration, callback);
    },
    
    _generateAudioChannel: function () {
      this.readyChannels.push(this.channels.push(this.audio.cloneNode(true)) - 1);
      ex.sound.SoundMixer.registerAudio(this.channels[this.channels.length - 1]);
      this.channels[this.channels.length - 1].volume = this.volume;
    },
    
    seek: function (time, channel) {
      if(ex.isNull(channel) == false) {
        this.channels[channel].currentTime = time;
      } else {
        ex.Array.each(this.channels, function (channel, i) {
          channel.currentTime = time;
        });
      }
    },
    
    /**
     * Stops audio playback.
     * 
     * @function
     * @name stop
     * @memberOf ex.sound.Sound
     */
    stop: function (channel) {
      if(ex.isNull(channel) == false) {
        var audio = this.channels[channel];
        audio.pause();
        audio.loop = false;
        this.seek(audio.initialTime, channel);
        this._onChannelEnded({ target: audio });
      } else {
        var that = this;
        ex.Array.each(this.channels, function (channel, index) {
          that.stop(index);
        });
      }
    },
    
    destroyChannel: function (channel) {
      var audio = this.channels[channel];
      audio.pause();
      ex.sound.SoundMixer.unregisterAudio(this.channels[i]);
      ex.Array.remove(this.channels, channel);
      this.channels[channel] = null;
    },
    
    destroy: function () {
      this.stop();
      
      ex.Array.each(this.channels, function (channel, index) {
        this.destroyChannel(index);
      });
      
      delete this.channels;
      delete this.readyChannels;
      delete this.audio;
    }
  });
});