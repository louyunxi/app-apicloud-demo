import axios from 'axios';
import {router} from '@/router/index.js';
import {messageCode} from '@/api/messageCode.js';
import {Toast} from 'vant';
import storage from '@/utils/storage';
let requireToast;
// new axios
export default function(vm) {
	const service = axios.create({
		timeout: 10000, // request timeout
	});
	// axios请求拦截
	service.interceptors.request.use((config) => {
		requireToast = Toast.loading({ message: '加载中...', loadingType: 'spinner', duration: 20000 });
		//加token
		
		return config;
	}, error => {
        requireToast && requireToast.clear();
	});
	
	// axios响应拦截器
	service.interceptors.response.use(response => {
		requireToast && requireToast.clear();
		const {respCode, respDesc} = response.data;
		if(respCode === 0){
			
		}else{
			respDesc && Toast({message: respDesc, className: 'mint-toast', duration: 2000,});
		}
		return response.data;
	}, (error) => {
        requireToast && requireToast.clear();
		return Promise.reject(error);
	});
	return service;
}