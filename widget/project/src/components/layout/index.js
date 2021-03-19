import phoneHeaderFooter from './phone-header-footer.vue'
const phoneLayout = {
  install: function (Vue) {
    Vue.component('layout', phoneHeaderFooter)
  }
}
export default phoneLayout