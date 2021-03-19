function getStorage(storagename, key) {
	if (arguments.length == 2) {
		if (storage.get(storagename)) {
			return storage.get(storagename)[key] || '';
		} else {
			return '';
		}
	} else {
		if (storage.get(storagename)) {
			return storage.get(storagename) || '';
		} else {
			return '';
		}
	}
}

const storage = {
	// 存储
	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}, // 获取
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	}, // 删除
	remove(key) {
		localStorage.removeItem(key);
	}, // 清空
	clear() {
		localStorage.clear();
	},
};
export default storage;

export {getStorage};
