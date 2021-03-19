import {Toast} from 'vant';

export const copyText = function(text,noShowToast=false) {
	if (window.hasOwnProperty('api')) {
		var clipBoard = api.require('clipBoard');
		clipBoard.set({
			value: text,
		}, function(ret) {
			if (ret) {
				if(!noShowToast){
                    Toast && Toast({message: '复制成功', duration: 1500,});
				}
			}
		});
	}else{
        copyTextToClipboard(text);
        function copyTextToClipboard(text,noShowToast) {
            var textArea = document.createElement("textarea")
            textArea.style.position = 'fixed'
            textArea.style.top = 0
            textArea.style.left = 0
            textArea.style.width = '2em'
            textArea.style.height = '2em'
            textArea.style.padding = 0
            textArea.style.border = 'none'
            textArea.style.outline = 'none'
            textArea.style.boxShadow = 'none'
            textArea.style.background = 'transparent'
            textArea.value = text
            document.body.appendChild(textArea)
            textArea.select()
            try {
                var msg = document.execCommand('copy') ? '成功' : '失败'
                if(!noShowToast){
                    Toast && Toast({message: '复制成功', duration: 1500,});
                }
            } catch (err) {
                if(!noShowToast){
                    Toast && Toast({message: '复制失败', duration: 1500,});
                }
            }
            document.body.removeChild(textArea)
        }
    }
};