<template>
  <div id="sidebar">
    <button @click="$base.tab = 'settings'" :class="{ 'active': tab ==  'settings'}">Settings</button>
    <div class="line"/>
    <button @click="$base.tab = 'songs'" :class="{ 'active': tab ==  'songs'}">Song's</button>
    <button @click="$base.tab = 'folders'" :class="{ 'active': tab ==  'folders'}">Folder's</button>
    <button @click="$base.tab = 'favorites'" :class="{ 'active': tab ==  'favorites'}">Favorites</button>
    <button @click="$base.tab = 'debug'" :class="{ 'active': tab ==  'debug'}">DEBUG</button>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      ...this.mapData({
        tab: 'base/tab'
      })

    }
  }
}
</script>

<style lang="scss">
#sidebar {
  min-width: 270px;
  max-width: 270px;
  background: #151515;

  button {
    border: none;
    background: none;
    font-weight: 500;
    font-size: 18px;
    padding: 10px 0;
    padding-left: 10px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    outline: none;

    &.active {
      // background: #252525;
      color: #e59b56;
    }

    transition: all .2s;

    &:hover {
      background: #252525;
    }   
  }

  .line {
    height: 3px;
    background: #202020;
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
  }

  .title {
    font-size: 20px;
    margin-left: 10px;
  }
}

</style>
