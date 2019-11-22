<template>
  <div id="debug">
    debug
    <button>set song 1</button>
    <button>set song 2</button>
    <button>skip 10+ seconds</button>
    <button @click="$songs.playSong($parent, 'D:\\Users\\Twan\\Music\\Spinnen Records\\Bassjackers & Reez - Rough (Official Music Video).mp3')">play</button>
    <button @click="stop()">pause</button>
    <button>stop</button>
    <button @click="debug()">_debug</button>
    <button @click="debug_player()">_debug player</button>
    <button @click="reset()">RESET STORAGE</button>
  </div>
</template>

<script>
export default {
  name: 'debug',
  data() {
    return {

    }
  },
  methods: {
    stop() {
      var player = this.$parent.$refs.player;
      player.stop()
    },
    setSong1() {
      this.$songs.playSong('D:\\Users\\Twan\\Music\\Spinnen Records\\Bassjackers & Reez - Rough (Official Music Video).mp3')
      // var player = this.$parent.$refs.player;
      // player.src = 'D:\\Users\\Twan\\Music\\Spinnen Records\\Bassjackers & Reez - Rough (Official Music Video).mp3';
      // player.play();
    },
    debug() {
      console.log(this)
    },
    debug_player() {
      console.log(this.$parent.$refs)
    },
    test() {
      var audio = new Audio('D:\\Users\\Twan\\Music\\Spinnen Records\\Bassjackers & Reez - Rough (Official Music Video).mp3');
      audio.play();
      audio.volume = 0.2;
    },
    reset() {
      this.$songs.list = []
    }
  }
}
</script>


<style lang="scss">
#debug {
  display: flex;
  flex-direction: column;
  button {
    color: black;
    height: 50px;
  }
}

</style>
