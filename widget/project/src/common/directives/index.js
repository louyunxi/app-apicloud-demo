import formatinput from "./formatinput.js";
const directives = [formatinput];
export default {
	install: Vue => {
		if (directives.length && directives.length > 0) {
			directives.map(item => {
				Vue.directive(item.key, item.func);
			});
		}
	}
};