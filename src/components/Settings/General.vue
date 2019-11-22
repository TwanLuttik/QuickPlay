<template>
  <div id="settings">
    <div class="locations">
      <h3>Locations</h3>
      <div class="list">
        <div v-for="(item, index) in locations" :key="index">
          <div class="item">
            <a>{{ item }}</a>
            <a class="remove" @click="$base.removeLocation(item)">remove</a>
          </div>
        </div>
      </div> 
      <input @input="$base.addLocation($refs.folderSelect.files[0].path)" type="file" webkitdirectory directory ref="folderSelect"/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'General',
  data() {
    return {
      ...this.mapData({
        locations: 'base/locations',
      })
    }
  },
  methods: {
    test() {
      console.log(this.$refs)
    }
  }
}
</script>

<style lang="scss" scoped>
#settings {
  display: flex;
  flex-direction: column;
  margin-top: 15px;


  button {
    height: 25px;
    background: rgb(68, 68, 68);
    border: none;
    color: white;
    cursor: pointer;

    &:hover {
      background: rgb(85, 85, 85);
    }
  }
  
  .locations {
    

    input {
      padding-top: 20px;
    }

    .list {
      background: rgb(37, 37, 37);
      overflow-y: auto;
      height: 200px;
      width: 500px;
      

      .item {
        display: flex;
        justify-content: space-between;
        margin: 7px 10px;
      
        .remove {
          font-size: 15px;
          width: fit-content;
          cursor: pointer;
          color: #e34747;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

