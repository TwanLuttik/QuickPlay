<template>
  <div id="volume" @click="adjustVolume()" ref="volume" @mousedown="a" @mouseup="b" >
    <div class="volumePoint" :style="{ width: test +'%' }" v-bind:class="{ 'mute': muted === true }"></div>
  </div>
</template>

<script>
// step="0.001" min="0.00" max="0.1"
export default {
  name: 'Volume',
  data() {
    return {
      ...this.mapData({
        currentTime: 'songs/currentTime',
        currentSong: 'songs/currentSong',
        volume: 'base/volume',
        muted: 'base/muted'
      }),
    }
  },
  computed: {
    test() {
      var a = 0.1 / 100;

      return this.volume / a;
      
    }
  },
  methods: {
    a() {
      console.log('a')
    },
    b() {
      console.log('b')
    },
    adjustVolume() {

      if (this.muted) this.$base.muted = false;
      if (this.$root.$children[0].$refs.player.muted) this.$root.$children[0].$refs.player.muted = false;

      // // update the currentTime from the player 
      // this.player.currentTime = (this.player.currentTime + 3)
      
      // // update the currentTime from the state storage
      // this.$songs.currentTime = this.player.currentTime;

      // -----------------
      
      var difference = function (a, b) { return Math.abs(a - b); }

      // get left side and the right side of the progressbar
      const a = this.$refs.volume.getBoundingClientRect();
      var left = a.left;
      var right = a.right;

      // get the clicked location (only includes X location)
      var clickedLocation = event.clientX

      // we need to know what 1 px is in time
      // we need to know how big the progressbar is
      var barWidth = difference(left, right);
      var volumeForOnePx = 0.1 / barWidth;


    
      // get the position of the progress bar where the user clicked on
      var positionClickedLength = difference(left, clickedLocation)

      // calculate the new position of the song
      var newVolumeValue = positionClickedLength * volumeForOnePx;
      console.log(newVolumeValue)
      // console.log(timeForOnePx)

      // set the audio time to the new time
      this.$base.volume = newVolumeValue
      this.$parent.$parent.$refs.player.volume = this.$base.volume
    }
  }
}
</script>

<style lang="scss" scoped>
#volume {
  height: 7px;
  border-radius: 10px;
  width: 100%;
  background: #181818;
  cursor: pointer;
  margin: 5px 0;

  .volumePoint {
    background: rgb(224, 125, 33);
    height: 100%;
    border-radius: 10px;
    width: 0;
  }




  input[type=range] {
    margin: auto;
    outline: none;
    padding: 0;
    width: 640px;
    height: 2px;
    background-color: #dedede;
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ff1100), color-stop(100%, #ff1100));
    background-size: 50% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: pointer;
    -webkit-appearance: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
      box-shadow: none;
      border: none;
      background: transparent;
      -webkit-appearance: none;
  }


  input[type=range]::-webkit-slider-thumb {
    height: 18px;
    width: 28px;
      border: 0;
      background: #fff;
      border: 1px solid #777;
      border-radius: 8px;
      box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
      -webkit-appearance: none;
  }

  .mute {
    width: 0!important;
  }
}

</style>
