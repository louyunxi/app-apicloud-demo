const filters={
	/**
	 * 对日期进行格式化，
	 * @param date 要格式化的日期 日期对象 / 时间戳
	 * @param format 进行格式化的模式字符串 yyyy-MM-dd hh:mm:ss:SS q
	 *  支持的模式字母有：
	 *  y:年,
	 *  M:年中的月份(1-12),
	 *  d:月份中的天(1-31),
	 *  h:小时(0-23),
	 *  m:分(0-59),
	 *  s:秒(0-59),
	 *  S:毫秒(0-999),
	 *  q:季度(1-4)
	 * @return String
	 */
	price(price) {
		return '¥ '+price.toFixed(2);
	},
	dateFormat(date, format) {
		if (typeof date === 'string') {
			let mts = date.match(/(\/Date(\d+)\/)/);
			if (mts && mts.length >= 3) {
				date = parseInt(mts[2]);
			}
		}
		date = new Date(date);
		if (!date || date.toUTCString() === 'Invalid Date') {
			return '';
		}
		
		let map = {
			'M': date.getMonth() + 1, //月份
			'd': date.getDate(), //日
			'h': date.getHours(), //小时
			'm': date.getMinutes(), //分
			's': date.getSeconds(), //秒
			'q': Math.floor((date.getMonth() + 3) / 3), //季度
			'S': date.getMilliseconds(), //毫秒
		};
		format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
			let v = map[t];
			if (v !== undefined) {
				if (all.length > 1) {
					v = '0' + v;
					v = v.substr(v.length - 2);
				}
				return v;
			} else if (t === 'y') {
				return (date.getFullYear() + '').substr(4 - all.length);
			}
			return all;
		});
		return format;
	}, /**
	 * 浮点过滤器
	 * @returns {*}
	 * @param num
	 * @param n
	 * @param per
	 */
	toFloat(num = 0, n = 2, per) {
		if (num != 0) {
			if (arguments.length == 3 && per) {
				num = num * 100;
				return parseInt(num * Math.pow(10, n) + 0.5, 10) / Math.pow(10, n) + '%';
			} else {
				return parseInt(num * Math.pow(10, n) + 0.5, 10) / Math.pow(10, n);
			}
		} else {
			if (arguments.length === 3 && per) {
				return '0%';
			} else {
				return 0;
			}
		}
	}, // 阿里图片加载地址修改
	aliimg(imgsrc, ww, hh, keepformat= false, circle= false, otherparams= '') {
		var imgwh, imgSrc = imgsrc;
		if (ww && hh) {
			imgwh = 'w_' + ww + ',h_' + hh + ',m_fill';
		} else if (ww && !hh) {
			imgwh = 'w_' + ww + ',';
		} else if (!ww && hh) {
			imgwh = 'h_' + hh + ',';
		} else {
			imgwh = '';
		}
		if (imgSrc && imgSrc.indexOf('.aliyuncs.com/') !== -1) {
			var imgFormat='jpg',circleParams='',otherParams='';
			if(keepformat){
				if(imgSrc.indexOf('.png')!==-1){imgFormat='png'}
				if(imgSrc.indexOf('.gif')!==-1){imgFormat='gif'}
			}
			if(circle){
				circleParams='circle,r_'+ww+'/';
				imgFormat='png'
			}
			if(otherparams) otherParams=otherparams;    // 例如：quality,q_100/
			var newimgstr = imgSrc + '?x-oss-process=image/resize,' + imgwh + '/auto-orient,1/quality,q_100/sharpen,100/'+circleParams+otherParams+'format,'+imgFormat;
			return newimgstr;
		} else {
			return imgSrc;
		}
	},
	aliimgPlus(imgsrc, ww, hh, format) {
		var imgwh, imgSrc = imgsrc;
		if (ww && hh) {
			imgwh = 'w_' + ww + ',h_' + hh + ',m_fill';
		} else if (ww && !hh) {
			imgwh = 'w_' + ww + ',';
		} else if (!ww && hh) {
			imgwh = 'h_' + hh + ',';
		} else {
			imgwh = '';
		}
		if (imgSrc && imgSrc.indexOf('.aliyuncs.com/') !== -1) {
			var newimgstr = imgSrc + '?x-oss-process=image/resize,' + imgwh + '/auto-orient,1/quality,q_100/sharpen,100/'+'format,'+format;
			return newimgstr;
		} else {
			return imgSrc;
		}
	},
	//手机号隐藏中间四位
	phonehide(phone) {
		var tempphone = phone;
		if (typeof (phone) == 'number') {
			tempphone = String(tempphone);
		}
		const WEAK_LOGIN_REG = /^1\d{10}$/; // 弱：纯数字，纯字母，纯特殊字符
		if (WEAK_LOGIN_REG.test(tempphone)) {
			var hide_part = tempphone.substring(3, 8);
			return tempphone.replace(hide_part, '****');
		} else {
			return tempphone;
		}
	}, hasDay(date, target) {
		target = target || 1;
		return Math.floor(date / target / 86400);
	},
};
export default filters;
