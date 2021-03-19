<template>
  <layout>
	<van-button type="default" @click="show=true">底部弹框</van-button>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      description="这是一段描述信息"
      close-on-click-action
    />
  </layout>
</template>
<script>
  import { mapGetters } from "vuex";
  import { ActionSheet as vanActionSheet } from "vant";
  import { Button as vanButton } from "vant";
  export default {
    name: "index",
    data() {
      return {
        show: false,
        actions: [
          { name: "选项一" },
          { name: "选项二" },
          { name: "选项三", subname: "描述信息" },
        ],
      };
    },
    mixins: [],
    components: {vanActionSheet,vanButton},
    computed: {},
    watch: {},
    async created() {
      const toast = this.$toast.loading({
        message: "加载中...",
        loadingType: "spinner",
        duration: 50000,
      });
	  setTimeout(()=>{
		  toast.clear();
	  },1000)
    },
    mounted() {},
    methods: {},
  };
</script>
<style lang="scss" scoped></style>
