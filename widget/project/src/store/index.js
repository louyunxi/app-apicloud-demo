import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import storage from '../utils/storage';

Vue.use(Vuex);
//不用storage 需要每次页面刷新都重新拉取的数据
storage.remove('NOWSTORE');
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});
const store = new Vuex.Store({
	modules, getters,
});
export default store;
