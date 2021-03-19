export default function isHasAndRequre(permissionname){
	var _this = this;
	return new Promise(function(resolve, reject) {
		if (!window.hasOwnProperty('api')){
			resolve(false);
			return false;
		}
		var resultList = api.hasPermission({list: [permissionname]});
		if (resultList[0].granted) {
			resolve(true);
		} else {
			api.requestPermission({
				list: [permissionname],
				code: 1,
			}, function(ret, err) {
				if (ret.list[0].granted) {	//打开了权限
					resolve(true);
				} else {
					resolve(false);
				}
			});
		}
	});
}