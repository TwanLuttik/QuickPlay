<template>
  <div id="settingsSidebar">
    <button @click="$base.settingsTab = 'General'" :class="{ 'active': tab ==  'General'}">General</button>
    <button @click="$base.settingsTab = 'Themes'" :class="{ 'active': tab ==  'Themes'}">Themes</button>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      ...this.mapData({
        tab: 'base/settingsTab'
      })

    }
  }
}
</script>

<style lang="scss" scoped>
#settingsSidebar {
  width: 250px;
  height: 100%;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  margin-right: 25px;

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
}
</style>

