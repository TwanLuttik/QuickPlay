<template>
  <div id="progressbar" @click="UpdateSongPosition(), a()" ref="progressbar" >
    <!-- <div class="ghost" @mousemove="a()">

    </div> -->
    <div v-if="currentSong" class="progressed" :style="{ width: test +'%' }"></div> 
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['start', 'end', 'current', 'player'],
  data() {
    return {
      ...this.mapData({
        currentTime: 'songs/currentTime',
        currentSong: 'songs/currentSong'
      }),
    }
  },
  computed: {
    test() {
      // get 1 % 
      var a = this.end / 100
      return this.current / a;
    },
    formatTime() {
      var valueInSeconds = Math.floor(this.current);
      var hours = Math.floor(valueInSeconds / 3600);
      var minutes = Math.floor(valueInSeconds / 60);
      var seconds = valueInSeconds - (hours * 3600) - (minutes * 60)

      return hours + ":" + minutes + ":" + seconds
    },
    mouseX() {
      return event.clientX
    }
  },
  methods: {
    a() {
      console.log(event.clientX)
    },
    UpdateSongPosition() {
      // console.log(this.player.currentTime)
      var difference = function (a, b) { return Math.abs(a - b); }

      // get left side and the right side of the progressbar
      const a = this.$refs.progressbar.getBoundingClientRect();
      var left = a.left;
      var right = a.right;

      // get the clicked location (only includes X location)
      var clickedLocation = event.clientX

      // we need to know what 1 px is in time
      // we need to know how big the progressbar is
      var barWidth = difference(left, right);
      var timeForOnePx = this.end / barWidth;
    
      // get the position of the progress bar where the user clicked on
      var positionClickedLength = difference(left, clickedLocation)

      // calculate the new position of the song
      var newTime = positionClickedLength * timeForOnePx;

      // set the audio time to the new time
      this.player.currentTime = newTime;
      this.$songs.currentTime = newTime;
    }
  }
}
</script>

<style lang="scss" scoped>
#progressbar {
  height: 7px;
  border-radius: 10px;
  width: 100%;
  background: rgb(24, 24, 24);
  cursor: pointer;
  margin: 5px 0;

  .ghost {
    height: 100%;
    width: 100%;
    background: red;
    opacity: 0.2;
    position: fixed;
    top: 0;
  }

  .progressed {
    background: rgb(224, 125, 33);
    height: 100%;
    border-radius: 10px;
    width: 0;
  }
}

</style>
