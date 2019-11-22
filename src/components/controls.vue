<template>
  <div id="controls">

    <!-- controls -->
    <div class="controls">
      <div class="fas fa-step-backward" @click="$songs.songHandler($parent, 'previous')"/>
      <div class="fas fa-play" @click="$parent.$refs.player.play()" v-if="$parent.$refs.player.paused"/>
      <div class="fas fa-pause" @click="$parent.$refs.player.pause()" v-else/>
      <div class="fas fa-step-forward" @click="$songs.songHandler($parent, 'next')" style="margin-right: 15px;"/>
      
      <div @click="$base.random = !$base.random" class="far fa-random" v-bind:class="{ 'active' : random }"/>    
      <div @click="toggleMode()" class="far fa-repeat-1 active" v-if="mode === 'repeat_once'" style="margin-right: 8px;"/>    
      <div @click="toggleMode()" class="far fa-repeat" v-bind:class="{ 'active' : mode == 'repeat' }" v-else/>    
    </div>

    <!-- progres bar + song name -->
    <div class="middle">
      {{ currentSong.name }}
      <!-- {{songCurrentTime }} -->
      <ProgressBar v-if="currentSong.name" :start="0" :end="$parent.$refs.player.duration" :current="$parent.$refs.player.currentTime" :player="$parent.$refs.player"/>
      <!-- <ProgressBar :start="0"/> -->
      {{ formatTime(songCurrentTime) }} / {{ formatTime($parent.$refs.player.duration) }}
      <!-- <input @input="UpdateSongTime()" v-if="currentSong.name" type="range" :max="Math.round($refs.player.duration)" min="0" v-model="songCurrentTime"/> -->
      <!-- <a v-if="songCurrentTime">{{ Math.round(songCurrentTime) }}</a> -->
    </div>
    <!-- volume & etc -->
    <div class="etc">
      <!-- {{ songCurrentTime }} -->
      <!-- <input type="range" step="0.001" min="0.00" max="0.1" value="$base.volume" @input="updateVolume" v-model="$base.volume"/> -->
      <div class="fa fa-volume-up volume" v-if="muted === false" @click="toggleSound()"/>
      <div class="fa fa-volume-mute volume" v-else @click="toggleSound"/>
      <Volume/>
    </div>
    
    <!-- <audio preload="none" @timeupdate="xx()" @ended="$songs.NextSong($refs.player)" ref="player"></audio> -->
    
  </div>
</template>

<script>
import ProgressBar from './Controls/ProgressBar';
import Volume from './Controls/Volume';

export default {
  name: 'controls',
  components: {
    ProgressBar,
    Volume
  },
  data() {
    return {
      ...this.mapData({
        currentSong: 'songs/currentSong',
        volume: 'base/volume',
        songCurrentTime: 'songs/currentTime',
        muted: 'base/muted',
        mode: 'base/mode',
        random: 'base/random'
      })
    }
  },
  methods: {
    toggleMode() {
      if (this.mode === 'normal') this.$base.mode = 'repeat';
      else if (this.mode === 'repeat') this.$base.mode = 'repeat_once';
      else if (this.mode === 'repeat_once') this.$base.mode = 'normal';
    },
    toggleSound() {
      this.muted ? this.$base.muted = false : this.$base.muted = true
      this.$parent.$refs.player.muted  ? this.$parent.$refs.player.muted = false : this.$parent.$refs.player.muted  = true
    },
    xx() {
      console.log(this.$refs.player.currentTime)
      // $songs.currentTime = $refs.player.currentTime
    },
    updateVolume() {
      console.log(this.$parent.$refs.player.volume)
      // this.$parent.$refs.player.volume = this.$base.volume / 1000
      this.$parent.$refs.player.volume = this.$base.volume;
    },
    UpdateSongTime() {
      this.$refs.player.currentTime = this.songCurrentTime
    },
    formatTime(value) {
      var valueInSeconds = Math.floor(value);
      var hours = Math.floor(valueInSeconds / 3600);
      var minutes = Math.floor(valueInSeconds / 60);
      var seconds = valueInSeconds - (hours * 3600) - (minutes * 60)

      return hours + ":" + minutes + ":" + seconds
    }
    
  },
  watch: {
    currentSong() {
      // when currentsong change to play that song
      // console.log(this.currentSong)
      this.$songs.playSong(this.$parent, this.currentSong.path)
    }
  },
  computed: {
    // formatTime() {
    //   var valueInSeconds = Math.floor(this.songCurrentTime);
    //   var hours = Math.floor(valueInSeconds / 3600);
    //   var minutes = Math.floor(valueInSeconds / 60);
    //   var seconds = valueInSeconds - (hours * 3600) - (minutes * 60)

    //   return hours + ":" + minutes + ":" + seconds
    // }
  },
  mounted() {
    console.log('[APP] setting volume correct')
    
    this.$parent.$refs.player.volume = this.volume;
  }

}
</script>

<style lang="scss" scoped>
#controls {
  min-height: 75px;
  max-height: 75px;
  width: 100%;
  background: #121212;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;

  .controls {
    margin: auto 0;
    margin-left: 50px;
    min-width: 200px;

    .active {
      color: rgb(224, 125, 33)!important;
    }
    .fas,
    .far {
      font-size: 25px;
      font-weight: 800;
      margin: 0 5px;
    
      height: 19px;
      color: #414141;
      margin: 0 3px;
      cursor: pointer;

      
      &:hover {
        color: #6b6b6b;
      }
    }
  }


  .middle {
    margin: auto 0;
    // min-width: 80%;
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;

    input[type=range] {
      background: none;
      &::-webkit-slider-thumb {

      }

    }
  }

  button {
    background: none;
    border: none;
    outline: none;

    &:hover {
      background: gray;
    }
  }

  .etc {
    margin: auto 20px;
    min-width: 160px;
    width: 160px;
    display: flex;

    .fa {
      color: #636363;
      padding-right: 10px;
    }

    .volume {
      cursor: pointer;
    }

  }


}
</style>
