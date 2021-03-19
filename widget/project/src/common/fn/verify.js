//是否手机号码或者固话    请输入正确的电话号码或者固话号码
export function validatePhoneTwo(value) {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;;
    if (value == '' || value == undefined || value == null) {
        return false;
    } else {
        if ((!reg.test(value)) && value != '') {
            return false;
        } else {
            return true;
        }
    }
}
//是否固话 请输入正确的固定电话
export function validateTelphone(value) {
    const reg =/0\d{2,3}-\d{7,8}/;
    if(value==''||value==undefined||value==null){
        return false;
    }else {
        if ((!reg.test(value)) && value != '') {
            return false;
        } else {
            return true;
        }
    }
}
//是否手机号码    请输入正确的电话号码
export function validatePhone(value) {
    const reg =/^[1][3-9][0-9]{9}$/;
    if(value==''||value==undefined||value==null){
        return false;
    }else {
        if ((!reg.test(value)) && value != '') {
            return false;
        } else {
            return true;
        }
    }
}
//是否身份证号码 请输入正确的身份证号码
export function validateIdNo(value) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(value==''||value==undefined||value==null){
        return false;
    }else {
        if ((!reg.test(value)) && value != '') {
            return false;
        } else {
            return true;
        }
    }
}
//是否邮箱  请输入正确的邮箱
export function validateEMail(value) {
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if(value==''||value==undefined||value==null){
        return false;
    }else{
        if (!reg.test(value)){
            return false;
        } else {
            return true;
        }
    }
}
//合法url
export function validateURL(url) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(url);
}
//验证内容是否包含英文数字以及下划线 仅由英文字母，数字以及下划线组成
export function isPassword(value) {
    const reg =/^[_a-zA-Z0-9]+$/;
    if(value==''||value==undefined||value==null){
        return false;
    } else {
        if (!reg.test(value)){
            return false;
        } else {
            return true;
        }
    }
}