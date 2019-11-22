<template>
  <div id="favorites">

    <div class="list" v-if="favorites">
      <div v-for="(item, index) in favorites" v-bind:key="index" @click="$songs.listType = 'favorites', $songs.currentSong = item" >
        <div class="song" :class="{ 'active': item.path == currentSong.path }" @click.ctrl="$songs.toggleFavorite(item)">
          {{ item.name }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'favorites',
  data() {
    return {
      ...this.mapData({
        favorites: 'songs/favorites',
        currentSong: 'songs/currentSong',
      })
    }
  }
}
</script>

<style lang="scss">
  .list {
    overflow-y: auto;
    height: 80%;
    display: flex;
    flex-direction: column;
    // align-items: center;

    .song {
      padding: 5px 0;
      cursor: pointer;

      transition: all 0.1s;
      &:hover {
        color: #e59b56;
      }

      &.active {
        color: #e59b56;
      }
    }
  }
</style>
