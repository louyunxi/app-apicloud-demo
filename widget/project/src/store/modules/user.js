import {getStorage} from '@/utils/storage';

const state = {
	token: getStorage('USERINFO', 'accessToken'),

};
const mutations = {
	SET_TOKEN: (state, obj) => {
		
	},
};

const actions = {
	setWxLoginInfo({commit}, data) {
		return new Promise((resolve, reject) => {
			
			resolve();
		});
	},
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
