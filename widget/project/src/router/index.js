import Vue from 'vue';
import Router from 'vue-router';
import routerOpts from './routers';

function mapRoute(opt) {
	return opt.map((route) => {
		if (!route.children) route.children = [];
		if (!route.redirect) route.redirect = '';
		if (!route.meta) route.meta = {};
		var routeitem = {
			path: route.path, name: route.name, redirect: route.redirect, children: mapRoute(route.children), meta: route.meta,
		};
		routeitem.component =route.component;
		return routeitem;
	});
}
const routes = mapRoute(routerOpts);
Vue.use(Router);
const router = new Router({
	mode: 'hash', scrollBehavior: () => ({y: 0}), routes,
});
export {router};
