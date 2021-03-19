<template>
  <div id="page">
    <div id="page-head" :style="{ background: statusbg }"></div>
    <div id="page-body">
      <slot></slot>
    </div>
    <div
      id="page-footer"
      :style="{ background: footerbg }"
      :class="{ 'no-footer': nofooter }"
    ></div>
  </div>
</template>
<script>
import pageHeadFooterConfig from './config.js'
export default {
  name: 'header-header-footer',
  props: {
    nofooter: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      statusbg: '#ff0000',
      statusFontColor: 'dark',
      footerbg: '#fff',
      footerClass: ''
    }
  },
  created () {
    this.headerAndFooterInit(this.$route.path)
  },
  methods: {
    headerAndFooterInit (routepath) {
      // status 状态栏状态
      const path = routepath
      let statustype = 'default'
      for (var item in pageHeadFooterConfig) {
        var paths = pageHeadFooterConfig[item].path
        if (paths.includes(path)) {
          statustype = item
        }
      }
      var statusbg =
        typeof pageHeadFooterConfig[statustype].headbg === 'function'
          ? `url(${pageHeadFooterConfig[statustype].headbg()}) no-repeat 100% center`
          : pageHeadFooterConfig[statustype].headbg
      this.statusbg =
        statusbg || pageHeadFooterConfig.default.headbg

      var footerbg =
        typeof pageHeadFooterConfig[statustype].footerbg ===
        'function'
          ? `url(${pageHeadFooterConfig[statustype].footerbg()}) no-repeat 100% center`
          : pageHeadFooterConfig[statustype].footerbg
      this.footerbg =
        footerbg || pageHeadFooterConfig.default.footerbg
      this.statusFontColor =
        pageHeadFooterConfig[statustype].statusFontColor ||
        pageHeadFooterConfig.default.statusFontColor
      // 修改status 字体颜色
      this.changeStatefn({ color: this.statusFontColor })
    },
    changeStatefn (options) {
      // 修改状态栏颜色
      // "dark"“light”
      if (window.api) {
        if (options && options.color) {
          window.api &&
          window.api.setStatusBarStyle({
            style: options.color
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
  #page {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    -webkit-display: flex;
    flex-flow: column;
  }

  #page-head {
    height: 20px;
  }

  #page-head {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #fff;
    -webkit-background-size: 100% 100% !important;
    background-size: 100% 100% !important;
  }

  #page-footer {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #fff;
    -webkit-background-size: 100% 100% !important;
    background-size: 100% 100% !important;
    z-index: 2;
  }

  #page-footer {
    z-index: 1;
    display: block;

    &.no-footer {
      display: none;
    }
  }

  #page-body {
    width: 100%;
    height: calc(100vh - 20px);
    flex-grow: 1;
    flex-shrink: 1;
    overflow: visible;
    position: relative;
    font-size: 14px;
  }
</style>
