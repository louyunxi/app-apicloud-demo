/**
 * @desc 验证整数类型数字方法
 * @param {Object} e
 * @param {regular} reg 正则
 * @param {Number} charcode 键盘code
 * */
let checkNumber = (e, reg, charcode) => {
	if (!reg.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
};

/**
 * @desc 验证浮点类型小数方法(建议用text类型的表单)
 * @param {Object} e
 * @param {regular} reg 正则
 * @param {Number} charcode 键盘code
 * @param {Object} el dom对象
 * */
let checkFloat = (e, reg, charcode, el) => {
	if (charcode == 46) {
		if (el.value.includes(".")) {
			e.preventDefault();
		}
		return;
	} else if (
		!reg.test(String.fromCharCode(charcode)) &&
		charcode > 9 &&
		!e.ctrlKey
	) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
};

/**
 * @author LeeYunxiang
 * @description 限制数字输入格式 int => 正整数 , num => 自然数(正整数包括0) , float => 正数包括小数(建议用text类型的input表单)
 *  */
export default {
	key: "formatinput",
	func: {
		inserted(el, bind) {
			el.addEventListener("keypress", e => {
				e = e || window.event;
				let charcode = typeof e.charCode == "number" ? e.charCode : e.keyCode;
				let reg = null;
				switch (bind.value) {
					case 'num': //自然数 可以为0的正整数
						reg = /\d/;
						checkNumber(e, reg, charcode);
						break;
					case "int": //正整数  大于0的正整数
						if (el.value.length === 0) {
							reg = /^[1-9]$/;
						} else {
							reg = /\d/;
						}
						checkNumber(e, reg, charcode);
						break;
					case "float": //大于0的小数
						reg = /\d/;
						checkFloat(e, reg, charcode, el);
						break;
				}
			});
		}
	}
};