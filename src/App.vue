<template>
  <div id="app">
    <div class="topbar">
      <div class="buttons">
        <button @click="w.minimize()">
          <svg x="0px" y="0px" viewBox="0 0 10.2 1"><rect x="0" y="50%" width="10.2" height="1" /></svg>
        </button>

        <button @click="maximize()">
          <svg viewBox="0 0 10 10"><path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" /></svg>
        </button>

        <button @click="w.close()" class="close">
          <svg viewBox="0 0 10 10"><polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" /></svg>
        </button>




        <!-- <svg @click="w.minimize()" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>buttons</title><rect x="11" y="10" width="3" height="23" transform="translate(34 9) rotate(90)"/></svg>
        <svg @click="maximize()" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>buttons</title><rect x="11" y="12" width="2" height="18" transform="translate(-9 33) rotate(-90)"/><rect x="3" y="3" width="2" height="18"/><rect x="11.5" y="-5.5" width="2" height="19" transform="translate(16.5 -8.5) rotate(90)"/><rect x="20" y="3" width="2" height="19" transform="translate(42 25) rotate(180)"/></svg>
        <svg class="close" @click="w.close()" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>buttons</title><rect x="11" width="3" height="25" transform="translate(30.18 12.5) rotate(135)"/><rect x="11" width="3" height="25" transform="translate(12.5 -5.18) rotate(45)"/></svg> -->
      </div>
    </div>

    <div class="container">
      <sidebar/>
      <songs v-if="tab == 'songs'"/>
      <favorites v-if="tab == 'favorites'"/>
      <settings v-if="tab == 'settings'"/>
      <folders v-if="tab == 'folders'"/>
      <debug v-if="tab == 'debug'"/>
      <controls/>
       <!-- <audio preload="none" ref="player" @timeupdate="xx()" @ended="$songs.NextSong($root.$children[0], currentSong)"></audio> -->
       <audio preload="none" ref="player" @timeupdate="xx()" @ended="$songs.songHandler($root.$children[0])"/>
    </div>
    <controls/>
  </div>
</template>


<script>
import sidebar from './components/sidebar';
import controls from './components/controls';

import songs from './views/songs';
import settings from './views/settings';
import folders from './views/folders';
import favorites from './views/Favorites';
import debug from './views/debug';

const remote = require('electron').remote;
const os = require('os');


export default {
  components: {
    sidebar,
    controls,
    songs,
    settings,
    folders,
    debug,
    favorites
  },
  data() {
    return {
      ...this.mapData({
        volume: 'base/volume',
        tab: 'base/tab',
        currentSong: 'songs/currentSong'
      }),
      w: remote.getCurrentWindow()
    }
  },
  methods: {
    maximize() {
      if (this.w.isMaximized()) {
        this.w.unmaximize();
      } else {
        this.w.maximize();
      }
    },
    play() {
      this.$refs.player.play()
    },
    updateVolume() {
      console.log(this.$refs.player.volume)
      this.$refs.player.volume = this.$base.volume / 1000
    },
    test() {
      console.log(this.$refs.player.volume)
      // console.log(this.$refs)
      this.$refs.player.volume = (this.$base.volume / 1000)
    },
    playsound() {
      var files = this.$refs.file.files;
      console.log(files)
      var file = URL.createObjectURL(files[0]); 
      var player = this.$refs.player;
      player.src = file; 
      player.play();
    },
    testVolume() {
      console.log(this.$refs)
      console.log(this.$refs.player.volume)
    },
    xx() {
      this.$songs.currentTime = this.$refs.player.currentTime
    },

  },
  computed: {
    isWindowMax() {
      return this.w.isMaximized();
    }
  },
  async mounted() {
    var loc = [];

    if (this.$base.locations === null) this.$base.locations = null
    if (this.$songs.favorites === null) this.$songs.favorites = []
    if (this.$songs.mode === null) this.$songs.mode = 'normal'

    await this.$songs.init();
    await this.$songs.buildFolderStructure();
  }
}
</script>

<style lang="scss">
@import "~@fortawesome/fontawesome-pro/css/all.min.css";

* {
  color: #d0d0d0;
}

body,
html {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#app {
  font-family: sans-serif;
  background: #1a1a1a;
  height: 100%;
  width: 100%;
  overflow-y: hidden;

  .topbar {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    -webkit-app-region: drag;
    background: #121212;

    .buttons {
      -webkit-app-region: no-drag;
      width: fit-content;
      button {
        margin: 0;
        padding: 0;
	      width: 48px;
	      height:32px;
	      border: 0;
	      outline: 0;
	      background: transparent;
        cursor: pointer;

        &:hover {
          background: rgb(46, 46, 46);
          
          &.close {
            background: rgb(212, 78, 78);  
          }
        }

        svg {
          height: 12px;
          width: 12px;
          fill: #dfdfdf;
        }
      }
    }
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
  }
}

.info {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #202020;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #494949;
  border-radius: 10px;
}
</style>
