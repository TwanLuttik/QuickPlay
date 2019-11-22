<template>
  <div id="settings">
    <Sidebar/>
    <General v-if="tab == 'General'"/>
    <Themes v-if="tab == 'Themes'"/>
    <!-- <input @input="test" type="file" webkitdirectory directory ref="folderSelect"/>
    <button @click="$base.addLocation($refs.folderSelect.files[0].path)">Add location</button>
    <div v-for="(item, index) in locations" :key="index">
      {{ item }}
    </div> -->
    <!-- {{locations}} -->
  </div>
</template>

<script>
import Sidebar from '../components/Settings/Sidebar';

import General from '../components/Settings/General';
import Themes from '../components/Settings/Themes';

export default {
  name: 'settings',
  components: {
    Sidebar,
    General,
    Themes
  },
  data() {
    return {
      ...this.mapData({
        locations: 'base/locations',
        tab: 'base/settingsTab'
      })
    }
  },
  methods: {
    test() {
      console.log(this.$refs.folderSelect.files[0].path)
    }
  }
  
}
</script>


<style lang="scss">
#settings {
  display: flex;
  flex-direction: row;
}
</style>
