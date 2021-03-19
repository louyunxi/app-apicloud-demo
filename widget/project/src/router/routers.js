module.exports = [
	{
		path: '/',
		redirect: '/home',
	}, {
		// 主页
		path: '/home',
		name: 'home',
		component: ()=>import('../views/home/index.vue')
	}
];