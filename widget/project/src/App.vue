<template>
    <div id="app">
        <transition :name="transitionName" v-if="routerViewShow">
            <router-view class="app-page-animate"></router-view>
	        <!--<keep-alive></keep-alive>-->
        </transition>
    </div>
</template>
<script>
    import isHasAndRequre from '@/common/fn/getPermissionfn.js';

    export default {
	    name: 'app',
	    data() {
		    return {
			    transitionName: 'slide-right',
			    routerViewShow: true,  //刷新视图用变量
		    };
	    },
	    provide() {
		    return {
			    reload: this.reload,
		    };
	    },
	    components: {},
	    async mounted() {
		    var This = this;
		    this.$nextTick(() => {
			    $('#app').show();
			    $('body.loading').removeClass('loading');
			    window.setStatusFotter();
		    });
		    //Vconsole______________________ Vconsole _______________________ Vconsole_______________________ Vconsole_______________________
		    if (this.$api.servertype === '1') {
			    var vConsole = new VConsole();
		    }
		    var ready = await this.appReady();    //使用原生api的初始化 完成
		    if (!ready) return;
		    //监听联网断网
		    this.netWorkListener();
		    //监听静默更新监听
		    this.updataInit();
		    //监听键盘弹出收起
		    this.addEventKeyBoard((h) => {
			    //键盘弹起
			    this.$root.eventHub.$emit('openBoard', h);
		    }, (h) => {
			    //键盘收起
			    this.$root.eventHub.$emit('closeBoard', h);
		    });
	    },
	    watch: {
		    $route(val, oldval) {
			    // 切换动画
			    let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
			    if (isBack === undefined) {
				    this.transitionName = 'fade';
			    } else {
				    if ((val.path == '/home' || val.path == '/aboutme') && (oldval.path == '/home' || oldval.path == '/aboutme')) {
					    this.transitionName = '';
				    } else {
					    if (isBack) {
						    this.transitionName = 'slide-right';
					    } else {
						    this.transitionName = 'slide-left';
					    }
				    }
			    }
			    this.$router.isBack = false;
		    },
	    },
	    methods: {
		    //监听网络状态，存储网络状态值NETWORK
		    netWorkListener() {
			    var This = this;
			    if (!window.hasOwnProperty('api')) return;
			    //断网
			    api.addEventListener({
				    name: 'offline',
			    }, function(ret) {
				    if (api.connectionType == 'none') {
					    console.log('离线');
					    This.$router.push('/networkfailure');
				    }
			    });
			    //网络恢复
			    api.addEventListener({
				    name: 'online',
			    }, function(ret) {
				    if (api.connectionType != 'none') {
					    console.log('在线');
					    if (This.$route.path === '/networkfailure') {
						    This.$router.go(-1);
					    }
				    }
			    });
		    },
		    async updataInit() {
			    if (!window.hasOwnProperty('api')) return;
			    await isHasAndRequre('storage');//获取存储权限
			    //静默更新监听
			    api.addEventListener({
				    name: 'smartupdatefinish',
			    }, function(ret, err) {
				    if (api.systemType == 'ios') {
					    alert('应用已完成自动更新');
				    } else {
					    alert('应用即将自动更新，更新完会重启APP');
				    }
				    api.rebootApp();
			    });
		    },
		    reload() {   //刷新视图 刷新当前页面
			    this.routerViewShow = false;  //先关闭
			    this.$nextTick(() => {
				    this.routerViewShow = true;   //再打开
			    });
		    },
		    addEventKeyBoard(openBoardCallback, closeBoardCallback) {
			    if (!window.hasOwnProperty('api')) return;
			    var UIChatBox = api.require('UIChatBox');
			    var first = true, boardH = 0;
			    UIChatBox.open({
				    texts: {
					    recordBtn: {},
					    sendBtn: {title: ''},
				    },
				    styles: {
					    inputBar: {
						    borderColor: '#ffffff',
						    bgColor: '#ffffff',
					    },
					    inputBox: {
						    borderColor: '#ffffff',
						    bgColor: '#ffffff',
					    },
					    sendBtn: {
						    titleColor: '#ffffff',
						    bg: '#ffffff',
						    activeBg: '#ffffff',
						    titleSize: 14,
					    },
				    },
				    extras: {},
				    isClose: false,
			    }, function(ret, err) {});
			    UIChatBox.hide();
			    UIChatBox.addEventListener({
				    target: 'inputBar',
				    name: 'move',
			    }, function(ret, err) {
				    if (ret) {
					    if (ret.panelHeight === 0) {
						    if (first) {
							    first = false;
							    return;
						    }
						    closeBoardCallback && closeBoardCallback(boardH);
					    }
					    if (ret.panelHeight > 0) {
						    boardH = ret.panelHeight;
						    openBoardCallback && openBoardCallback(boardH);
					    }
				    }
			    });
		    },
		    appReady() { //使用原生api的监听初始化
			    return new Promise((resolve) => {
				    var errori = 0, timer = setInterval(() => {
					    if (pageready) {
						    clearInterval(timer);
						    resolve(true);
					    } else if (errori > 100) {
						    clearInterval(timer);
						    resolve(false);
					    } else {
						    errori++;
					    }
				    }, 100);
			    });
			
		    },
	    },
    };
</script>
<style lang="scss">
    #app{
	    width:100%;
	    height:100%;
    }
    .app-page-animate{
	    position:absolute;
	    top:0;
	    width:100%;
	    height:100%;
	    overflow-x:hidden;
	    overflow:visible;
    }
    /*home页面 切换动画*/
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active{
	    will-change:transform;
	    overflow:visible;
	    transition:all 200ms linear;
    }
    .slide-right-enter{
	    transform:translate(-100%, 0);
    }
    .slide-right-leave-active{
	    transform:translate(100%, 0);
    }
    .slide-left-enter{
	    transform:translate(100%, 0);
    }
    .slide-left-leave-active{
	    transform:translate(-100%, 0);
    }
    .fade-enter-active,
    .fade-leave-active{
	    overflow:visible;
	    opacity:1;
	    transition:all 100ms linear;
    }
    .fade-enter{
	    opacity:0;
    }
    .fade-leave-active{
	    opacity:0;
    }
</style>