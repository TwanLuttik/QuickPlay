<template>
  <div>
    <div v-for="(item, index) in a" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'folders',
  data() {
    return {
      a: {
        b: 11,
        c: 22,
        d: 33,
        e: 44,
        f: 55,
      }
    }
  }
  
}
</script>


<style lang="scss">

</style>
