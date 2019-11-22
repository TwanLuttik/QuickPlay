<template>
  <div id="songs">
    <div class="top">
      <div class="search">
        <input @input="Search()" v-model="$songs.songSearch" placeholder="Search..."/>
        <div class="clear">
          <transition-group name="fade" tag="div">
            <div key="1" v-show="!search"/>
            <svg key="2" v-show="search" @click="ClearSearch()" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs></defs><title>quickplay-icons</title><rect class="cls-1" x="20.12" y="-5.48" width="9.75" height="60.96" transform="translate(60.36 25) rotate(135)"/><rect class="cls-1" x="20.12" y="-5.48" width="9.75" height="60.96" transform="translate(25 60.36) rotate(-135)"/></svg>
          </transition-group>
        </div>

      </div>
      <p class="etcInformation" v-if="songs.length">Results: {{ songs.length }}</p>
    </div>

      
    <div class="list">
      <!-- <transition-group name="list" tag="div"> -->
        <div v-for="(item, index) in songs" v-bind:key="index" @click="$songs.listType = 'list', $songs.currentSong = item" >
          <div class="song" :class="{ 'active': item.path == currentSong.path }" @click.ctrl="$songs.toggleFavorite(item)">
            <div class="title">
              {{ item.name }}
            </div>
            <div class="etc" v-if="item.isFavorite">  
              <span class="fas fa-star"/>
            </div>
          </div>
        </div>
      <!-- </transition-group> -->
    </div>

  </div>
</template>

<script>
export default {
  name: 'songs',
  data() {
    return {
      ...this.mapData({
        songs: 'songs/songs',
        search: 'songs/songSearch',
        currentSong: 'songs/currentSong',
        searched: 'songs/searchList',
        favorites: 'songs/favorites'
      }),
      search: ''
    }
  },
  methods: {
    Search() {
      this.$songs.searchByName(this.search)
    },
    ClearSearch() {
      this.$songs.songSearch = '';
    }
  }
  
}
</script>


<style lang="scss">
#songs {
  height: 100%;
  width: 100%;
  margin-left: 25px;

  input {
    color: white;
    background: none;
    padding: 5px 2px 0px 2px;
    border: none;
    outline: none;
    font-size: 18px;
    margin-top: 10px;
    user-select: none;
    margin-bottom: 10px;
    width: 60%;
  }


  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .search {
      display: flex;
      border-bottom: solid 1.5px #e59b56;
      margin-bottom: 20px;
      width: 500px;

      input {
        margin-right: 12px;
        width: 100%;
      }

      .clear {
        margin: auto 5px;
        font-size: 20px;
        cursor: pointer;
        min-height: 14px;
        height: 14px;
        width: 14px;
        min-width: 14px;
        fill: #6b6b6b;

        transition: fill .2s;
        &:hover {
          fill: #8b8b8b;
        }
      }
    }

    .etcInformation {
      color: #555555;
      font-size: 15px;
      font-weight: 500;
      margin-right: 10px;
    }
  }


  .list {
    overflow-y: auto;
    height: 80%;
    display: flex;
    flex-direction: column;
    // align-items: center;

    .song {
      padding: 5px 0;
      cursor: pointer;
      user-select: none;
      display: flex;
      justify-content: space-between;

      transition: all 0.1s;

     

      &.active,
      &:hover {
        .title {
          color: #e59b56;
        }
      }

      .etc {
        margin-right: 50px;
      }
    }
    
  }
}

.list-enter-active,
.list-leave-active {
  transition: all .15s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scaleY(-20px);
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

</style>
