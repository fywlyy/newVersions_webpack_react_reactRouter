import ajax from './ajax';

import './util-style.scss';

export default {
    dateFormat: function (dateStr) {
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd hh:mm:ss') : "";
    },
    dateFormatWithChinese: function (dateStr) {
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日 hh:mm:ss') : "";
    },
    dateFormatByMonth: function (dateStr) {
        const type = this.language().login_flag, dateInfo = this.getDateNum(dateStr);
        if(type == 1) {
            return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
        }
        return dateStr ? `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` : ''; 
    },
    dateFormatByMonthWithChinese: function (dateStr) {
        const type = this.language().login_flag, 
        month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], dateInfo = this.getDateNum(dateStr);
        
        if(type == 1) {
            return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
        }
        return dateStr ? `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` : '';
        // return dateStr ? `${month[dateInfo.month]} ${dateInfo.day}, ${dateInfo.year}` : "";
    },
    dayFormat: function (dataStr, type) {
        if (!dataStr) {
            return '';
        }
        if (!type) {
            type = '-';
        }
        var dateSs = new Date(dataStr);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        month > 9 ? null : (month = '0' + month);
        day > 9 ? null : (day = '0' + day);
        return year + type + month + type + day;
    },
    getDateNum(timestamp) {
        var dateSs = new Date(timestamp);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        if(month < 10) {
            month = `0${month}`;
        }
        if(day < 10) {
            day = `0${day}`;
        }
        return {
            year,
            month,
            day
        }
    },
    alertMessage: function (desc, delay, callback, hasIcon = true) {
        let time = 1500, doc = document,
            body = doc.body, h = 0, hints = doc.querySelector('.hint-popup'),
            timer1 = null, timer2 = null, icon = hasIcon;
        
        if(hints) {
            return;
        }

        if(typeof delay === 'boolean') {
            icon = delay;
        }else{
            if (!isNaN(delay)) {
                time = delay;
            }
        }
  
        const div = doc.createElement("div"),
            html = `<div class="hint-content">${icon ? '<i class="icon"></i>' : ''}${desc}</div>`;
        div.className = 'hint-popup show';
        div.innerHTML = html;

        body.appendChild(div);

        div.style.marginTop = `${-(div.offsetHeight / 2)}px`;
        
        setTimeout(()=>{
            div.className = 'hint-popup hide-hint';
            setTimeout(()=>{
                body.removeChild(div);
                clearTimeout(timer2);
            }, 300);
            clearTimeout(timer1);
            if (typeof delay === 'function') {
                delay();
            }
            if (callback) {
                if (typeof callback === 'function') {
                    callback();
                }

            }
        }, time);
    },
    clone: function (obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    htmlDecode: function (str) {
        return $('<div>').html(str).text();
    },
    htmlEncode: function (html) {
        return $('<div>').text(html).html();
    },
    loading: function (flag,loadingText) {
        if (flag) {
            var loadingText = loadingText || "努力加载中...";
            var html = '<div class="loader-inner">' +
                '<img src="' + spinnerImg + '"/>' +
                '<p>'+ loadingText +'</p></div>';
            var loader = document.createElement('div');

            loader.setAttribute('class','loader');
            document.body.appendChild(loader);
            document.getElementsByClassName('loader')[0].innerHTML = html;
        } else {
            var loader = document.getElementsByClassName('loader')[0];
            loader.parentNode.removeChild(loader);
        }
    },
    /**
     *
     * @param options {
     *  type: get or post or ...
     *  url: url,
     *  data: data,
     *  successCbk: success callback,
     *  errorCbk: error callback,
     *  flagErrorCbk: 防止重复提交的cbk
     * }
     */
    ajaxRequest: function(options){
        let {url, type, data, successCbk, errorCbk, flagErrorCbk} = options;
        let defaultOption = {
            url: url,
            method: type ? type : 'get',
            data
        };
        try{
            ajax(defaultOption)
                .then( (response) => {
                    let {success, message, result} = response;
                    if(success){ // 正常返回
                        successCbk && successCbk(result, response);
                    }else{
                        if(errorCbk){
                            errorCbk(response);
                            return false;
                        }
                        flagErrorCbk && flagErrorCbk(response);
                        this.alertMessage(message);
                    }
                })
                .catch((response, xhrObject) => {
                    let {status} = xhrObject;
                    if(errorCbk){
                        errorCbk(response);
                        return false;
                    }
                    flagErrorCbk && flagErrorCbk(response);
                    switch (+status){
                        case 401:
                            this.notLoginCallabck(true);
                            break;
                        case 400:
                        case 500:
                            this.alertMessage("系统出错");
                            break;
                        default: // 网络错误
                            this.alertMessage("网络错误");
                            break;
                    }
                });

        }catch(e){
            console.log(e);
        }
    },
    /**
     * 未登录回调
     */
    notLogin(callabck) {
        this.notLoginCallabck = callabck;
    },
}