const whiteList = [ //无需token 白名单
	'/login', '/phonelogin','/bindphone', '/forgetpassword','/agreement'
];
// 路由守卫
function initRouterGuard(api, ajax, router) {
	console.log('导航守卫初始化！')
	router.beforeEach(async (to, from, next) => {
		next();
	});
	router.afterEach(() => {});
}
export default initRouterGuard;
