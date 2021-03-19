/* ----------------------------------------------------- apicloud 公共方法   ----------------------------------------------------- */
//本地存储的变量说明
//ACCESSTOKEN
//VERTICALFZ----竖屏根字体大小
//LANDSCAPEFZ----横屏根字体大小
//USERID-----用户id

/* ----------------------------------------------------- 可配置全局变量   ----------------------------------------------------- */
//针对 iphone6 不支持页面切换动画
function animationfn() {
    if (api.deviceModel == "iPhone 6") {
        animationtype = {
            type: 'none',
            duration: 0
        }
    } else {
        animationtype = {
            type: 'push',
            subType: "from_right",
            duration: 300
        }
    }
}

//普通打开window
function openWin(winname, winurl, from, slidBackBool) {
    animationfn();
    if (from) {
        animationtype.subType = "from_left"
    }
    ;
    api.openWin({
        name: winname,
        url: winurl,
        bounces: false,
        reload: true,
        slidBackType: 'edge',
        slidBackEnabled: slidBackBool == false ? false : true,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        animation: animationtype
    })
}

//打开普通iframe
function openFrame(framename, frameurl, xval, yval, slidBackBool) {
    animationfn();
    api.openFrame({
        name: framename,
        url: frameurl,
        bounces: false,
        reload: true,
        slidBackEnabled: slidBackBool == false ? false : true,
        delay: 0,
        rect: {
            x: xval,
            y: yval,
            w: 'auto',
            h: 'auto'
        },
        animation: {
            type: 'none'
        }
    });
}

//打开带参数的iframe
function openframeparam(framename, frameurl, xval, yval, pageParam, slidBackBool) {
    animationfn();
    api.openFrame({
        name: framename,
        url: frameurl,
        bounces: false,
        reload: true,
        slidBackEnabled: slidBackBool == false ? false : true,
        delay: 0,
        pageParam: pageParam,
        rect: {
            x: xval,
            y: yval,
            w: 'auto',
            h: 'auto'
        },
        animation: {
            type: "push",
            subType: "from_right"
        }
    });
}

//打开传参页面
function openwinparam(xx, yy, ww, hh, winName, winUrl, pageParam, slidBackBool) {
    animationfn();
    api.openWin({
        name: winName,
        url: winUrl,
        pageParam: pageParam,
        slidBackType: 'edge',
        slidBackEnabled: slidBackBool == false ? false : true,
        bounces: false,
        reload: true,
        rect: {
            x: xx,
            y: yy,
            w: ww,
            h: hh
        },
        animation: animationtype
    })
}

function closeWin() {
    api.closeWin();
}

//网络改变
function linechange(offlinefn, onlinefn) {
    //完全断网
    api.addEventListener({
        name: 'offline'
    }, function (ret, err) {
        if (api.connectionType == "none") {
            api.hideProgress();
            if (offlinefn) {
                offlinefn();
            } else {
                api.toast({
                    msg: "网络链接失败，请稍候重试",
                    duration: 3000,
                    location: 'middle'
                });
            }
        }
    });
    //网络恢复
    api.addEventListener({
        name: 'online'
    }, function (ret, err) {
        if (onlinefn) {
            onlinefn();
        } else {
            api.toast({
                msg: "网络恢复",
                duration: 3000,
                location: 'middle'
            });
        }
    });
}

//屏蔽ios右扫返回事件
function swiperightnone() {
    api.addEventListener({
        name: 'swiperight'
    }, function (ret, err) {
        return false;
    });
}

//检查更新
var updateurl;
function checkUpdate(mandatory) {
    mandatory = mandatory | false;
    if(!window.hasOwnProperty('api')){return false;}
    var mam = api.require('mam');
    if (mandatory) {	//显示加载进度框
        api.showProgress({title: '检查版本中', text: '请稍候...', modal: false});
        updateurl = './update.html';
    } else {
        updateurl = './update.html';
    }
    setTimeout(function(){api.hideProgress();},20000)
    mam.checkUpdate(function (ret, err) {
        api.hideProgress();
        if (ret) {
            var result = ret.result;
            if (result && !result.hasOwnProperty('update')) {return false;}
            if (result.update == true && result.closed == false) {	//有最新版本  非强制更新------------
                if ((!localStorage.getItem("UPDATEHELP") || (localStorage.getItem("UPDATEHELP") && Date.parse(new Date()) - localStorage.getItem("UPDATEHELP") >= 43200000)) || mandatory) {
                    //手动检测  有非强制更新版本
                    var updatestr = '更新内容：\n' + result.updateTip;
                    api.confirm({
                        title: '发现新版本V' + result.version,
                        msg: updatestr,
                        buttons: ['立即更新', '暂不更新']
                    }, function (ret, err) {
                        if (ret.buttonIndex == 1) {
                            appinstall(result);
                        } else {
                            localStorage.setItem("UPDATEHELP", Date.parse(new Date()));
                        }
                    });
                }
            } else if (result.update == true && result.closed == true) {	//有最新版本  强制更新---------
                //新更新版本 强制更新
                if (api.systemType == "android") {
                    api.alert({
                        title: '发现新版本V' + result.version + ',需强制更新！',
                        msg: '更新内容：\n' + result.updateTip,
                        buttons: ['立即更新']
                    }, function (ret, err) {
                        if (ret.buttonIndex == 1) {
                            appinstall(result);
                        }
                    });
                } else if (api.systemType == "ios") {
                    api.alert({
                        title: '发现新版本V' + result.version + ',需强制更新！',
                        msg: '更新内容：\n' + result.updateTip,
                        buttons: ['立即更新']
                    }, function (ret, err) {
                        if (ret.buttonIndex == 1) {
                            appinstall(result);
                        }
                    });
                }
            } else {		//已经最新版本---------
                //无更新情况
                if (mandatory) {
                    api.toast({msg: '当前已是最新版本', duration: 3000, location: 'bottom'});
                }
            }
        }
    });
}
//查询是否有最新版本
function hasNewVersion(nextfn){
    if(!window.hasOwnProperty('api')){return false;}
    var mam = api.require('mam');
    mam.checkUpdate(function (ret, err) {
        if (ret) {
            var result = ret.result;
            if (result && !result.hasOwnProperty('update')) {return false;}
            if (result.update == true) {	//有最新版本
                localStorage.setItem("HASNEXTVERSION", 1);
                nextfn && nextfn(true);
            }else {    //已经最新版本
                localStorage.setItem("HASNEXTVERSION", 0);
                nextfn && nextfn(false);
            }
        }
    });
}

//下载安装应用
function appinstall(result) {
    //判断设备类型
    if (api.systemType == "android") {
        installfn(result);
    } else if (api.systemType == "ios") {
        api.installApp({
            appUri: result.source
        });
    }
    function installfn(res) {
        if (api.connectionType != "wifi") {
            api.confirm({
                title: '温馨提示 ',
                msg: '检测到您当前未处于wifi环境下,是否继续下载 ',
                buttons: ['土豪流量多', '算了']
            }, function (ret, err) {
                if (ret.buttonIndex == 1) {
                    install(res);
                } else {
                    $api.setStorage("UPDATEHELP", Date.parse(new Date()));
                }
            });
        } else {
            install(res);
        }
    }
    function install(result) {
        //询问存储权限后 按照
        getFilePermission(function () {
            //打开下载页面
            api.openWin({
                name: 'update',
                url: updateurl,
                bounces: false,
                rect: {x: 0, y: 0, w: 'auto', h: 'auto'},
                animation: {type: 'none', duration: 0},
                slidBackEnabled: true,
                pageParam: {downurl: result.source}
            })
           	var apkname="fs://download/snmall.apk";
            deleteDir(function(){
            	api.download({
	                url: result.source,
	                savePath: apkname,
	                cache: false,
	                report: true
	            }, function (ret, err) {
	                if (ret && 0 == ret.state) { /* 下载进度 */
	                    //更新显示进度条
	                    api.execScript({
	                        name: 'update',
	                        script: 'goprogress(' + ret.percent + ')'
	                    });
	                }
	                if (ret && 1 == ret.state) { /* 下载完成 */
	                    api.closeWin({
	                        name: 'update'
	                    });
	                    var savePath = ret.savePath;
	                    api.installApp({
	                        appUri: savePath
	                    });
	                }
	            });
            })
        })
    }
}

//是否有读写权限
function getFilePermission(nextfn) {//请求是否有拍照或者相册权限
    var _this = this;
    var resultList = api.hasPermission({
        list: ['storage']
    });
    if (!resultList || !resultList[0] || !resultList[0].granted) {	//没权限
        api.requestPermission({
            list: ['storage'],
            code: 100001
        }, function (ret, err) {
            if (ret.list[0].granted) {	//打开了权限
                nextfn && nextfn();
            }else{
                api.alert({
                    title: '',
                    msg: '请手动开启应用存储权限',
                    buttons: ['好的']
                });
            }
        });
    } else {
        nextfn && nextfn();
    }
}
//删除文件夹
function deleteDir(nextfn){
	var fs = api.require('fs');
	fs.readDir({
	    path: 'fs://'
	}, function(ret, err) {
	    if (ret.status) {
	    	if(ret.data.indexOf('download')!=-1){
	    		deletefn('download');
	    	}else if(ret.data.indexOf('Download')!=-1){
	    		deletefn('Download');
	    	}else{
	    		nextfn && nextfn();
	    	}
	    }else{
	    	nextfn && nextfn();
	    }
	});
	function deletefn(dirname){
		fs.rmdir({
		    path: 'fs://'+dirname
		}, function(ret, err) {
		    nextfn && nextfn();
		});
	}
}

//物理返回键 退出应用
var timeback=0,timebackplus=0;
function fnRegisterKeyBack() {
    api.addEventListener({
        name: 'keyback'
    }, function (ret, err) {
        if(vm.$route.path.indexOf('/home')!=-1 || vm.$route.path.indexOf('/aboutme')!=-1){
            if (timeback == 0) {
                timeback = Date.parse(new Date());
            }
            if ((timeback - timebackplus) < 2000) {
                api.closeWidget({
                    silent: true
                });
            } else {
                api.toast({
                    msg: '再按一次退出程序',
                    duration: 3000,
                    location: 'bottom'
                });
                setTimeout(function () {
                    timeback = 0;
                }, 2000)
            }
            timebackplus = timeback;
        }else{
            vm.$router.go(-1);
        }
    })
}