import Vue from 'vue'
import App from './App.vue'
// import router from './router'



import pulse from './core/index';
Vue.use(pulse);

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App)
  // mounted() {
  //   // Prevent blank screen in Electron builds
  //   this.$router.push('/')
  // }
}).$mount('#app')


// https://github.com/nklayman/vue-cli-plugin-electron-builder